import { getPortalAtual } from '~/lib/portal-atual'
import {
	hasPassiveShownThisSession,
	markPassiveShown,
	resetPassiveShownThisSession,
} from '~/lib/incentive-storage'

/**
 * Regras de exibição do What's New — implementa
 * `notas/2026-09-10-regras-exibicao-whats-new.md` (decidido em 10/09/2026).
 *
 * O componente `whats-new-dialog` é só visual; quando/para quem/quantas vezes mora
 * aqui, e quem orquestra é a home. No WordPress isto é reimplementado — o que importa
 * é a decisão, não este código.
 *
 * ⚠️ Depende de uma pergunta ainda aberta com os devs: se a home é servida por cache
 * de página cheia, nada disto pode ser decidido no PHP que monta a página, e a leitura
 * de estado tem de ser client-side como está aqui.
 */

// ── Campanha ────────────────────────────────────────────────────────────────

/**
 * Item 5 — a janela é POR PORTAL, porque os 11 não lançam o login no mesmo dia. Data
 * fixa no código faria o portal que subir depois anunciar como novidade algo com três
 * meses. No WordPress isto vira configuração editável sem deploy; aqui é um mapa para
 * a regra poder ser demonstrada (`?portal=saude-business` cai fora da janela).
 */
const INICIO_POR_PORTAL: Record<string, string> = {
	'food-connection': '2026-09-01',
	'saude-business': '2026-11-15',
}

const INICIO_PADRAO = '2026-09-01'

export const WHATS_NEW_CAMPANHA = {
	/**
	 * Trocar a cada nova campanha. É o que permite um segundo What's New sem migrar
	 * nem limpar storage: quem encerrou `login-2026` continua elegível para a próxima.
	 */
	id: 'login-2026',
	duracaoDias: 90,
	/** Item 3 — no máximo 2 impressões por pessoa/dispositivo… */
	maxImpressoes: 2,
	/** …com 4 dias entre elas. */
	intervaloDias: 4,
} as const

const DIA_MS = 24 * 60 * 60 * 1000

/**
 * Chave versionada pela campanha (item 6). Sem o portal no nome de propósito: em
 * produção cada portal é uma instalação em domínio próprio, então o `localStorage` já
 * é isolado por origem. No protótipo os dois portais dividem a origem — não incomoda,
 * porque o segundo está fora da janela de campanha de qualquer jeito.
 */
const CHAVE = `cd:whatsnew:${WHATS_NEW_CAMPANHA.id}`

// ── Estado persistido ───────────────────────────────────────────────────────

export interface IEstadoWhatsNew {
	impressoes: number
	/** ISO da última impressão. `null` enquanto nunca apareceu. */
	ultimaEm: string | null
	/** `encerrado` = a pessoa dispensou de vez ou já leu os três passos (item 4). */
	status: 'aberto' | 'encerrado'
}

const ESTADO_INICIAL: IEstadoWhatsNew = { impressoes: 0, ultimaEm: null, status: 'aberto' }

/** `null` quando o storage está indisponível (janela anônima, storage bloqueado). */
export function lerEstado(): IEstadoWhatsNew | null {
	try {
		const bruto = localStorage.getItem(CHAVE)
		if (!bruto) return { ...ESTADO_INICIAL }
		const lido = JSON.parse(bruto) as Partial<IEstadoWhatsNew>
		return {
			impressoes: typeof lido.impressoes === 'number' ? lido.impressoes : 0,
			ultimaEm: typeof lido.ultimaEm === 'string' ? lido.ultimaEm : null,
			status: lido.status === 'encerrado' ? 'encerrado' : 'aberto',
		}
	} catch {
		// JSON corrompido também cai aqui: melhor tratar como sem storage do que
		// estourar na home por causa de um anúncio.
		return null
	}
}

function gravarEstado(estado: IEstadoWhatsNew): void {
	try {
		localStorage.setItem(CHAVE, JSON.stringify(estado))
	} catch {
		// Sem storage não há o que gravar — `resolverWhatsNew` já não exibe nesse caso.
	}
}

// ── Decisão ─────────────────────────────────────────────────────────────────

export type MotivoWhatsNew =
	| 'exibir'
	| 'logado'
	| 'campanha-nao-comecou'
	| 'campanha-encerrada'
	| 'storage-indisponivel'
	| 'encerrado-pelo-usuario'
	| 'limite-de-impressoes'
	| 'aguardando-intervalo'
	| 'interrupcao-ja-usada'

/** Texto curto por motivo — para a barra de cenários e para quem for depurar. */
export const MOTIVO_WHATS_NEW_LABEL: Record<MotivoWhatsNew, string> = {
	exibir: 'aparece',
	logado: 'não aparece — pessoa logada',
	'campanha-nao-comecou': 'não aparece — campanha ainda não começou neste portal',
	'campanha-encerrada': 'não aparece — passaram os 90 dias',
	'storage-indisponivel': 'não aparece — sem storage para contar impressão',
	'encerrado-pelo-usuario': 'não aparece — já foi dispensado de vez',
	'limite-de-impressoes': 'não aparece — já apareceu 2 vezes',
	'aguardando-intervalo': 'não aparece — menos de 4 dias desde a última',
	'interrupcao-ja-usada': 'não aparece — já houve uma interrupção nesta sessão',
}

function janelaDaCampanha(agora: number): 'antes' | 'dentro' | 'depois' {
	const inicioIso = INICIO_POR_PORTAL[getPortalAtual()] ?? INICIO_PADRAO
	const inicio = new Date(`${inicioIso}T00:00:00`).getTime()
	if (agora < inicio) return 'antes'
	if (agora >= inicio + WHATS_NEW_CAMPANHA.duracaoDias * DIA_MS) return 'depois'
	return 'dentro'
}

/**
 * A decisão inteira num lugar só. Devolve `'exibir'` ou o motivo de não exibir — o
 * motivo é o que torna a regra revisável: sem ele, "não apareceu" e "quebrou" ficam
 * indistinguíveis para quem está revisando.
 *
 * A ordem das checagens é a do documento, das condições mais externas (quem é a
 * pessoa, a campanha está no ar) para as mais internas (histórico dela, esta sessão).
 */
export function resolverWhatsNew({ logado, agora = Date.now() }: { logado: boolean; agora?: number }): MotivoWhatsNew {
	// Item 2 — para quem está logado os três passos anunciam benefícios que ela já tem,
	// e o CTA "Criar conta" está errado.
	if (logado) return 'logado'

	const janela = janelaDaCampanha(agora)
	if (janela === 'antes') return 'campanha-nao-comecou'
	if (janela === 'depois') return 'campanha-encerrada'

	const estado = lerEstado()
	// Falha fechada: sem onde contar impressão, exibir significaria exibir em toda
	// visita. Preferimos não alcançar quem navega em janela anônima a incomodá-la
	// sempre. 🔴 A CONFIRMAR com os devs — é a pergunta do item 3/6 da nota.
	if (!estado) return 'storage-indisponivel'

	if (estado.status === 'encerrado') return 'encerrado-pelo-usuario'
	if (estado.impressoes >= WHATS_NEW_CAMPANHA.maxImpressoes) return 'limite-de-impressoes'

	if (estado.ultimaEm) {
		const desde = agora - new Date(estado.ultimaEm).getTime()
		if (desde < WHATS_NEW_CAMPANHA.intervaloDias * DIA_MS) return 'aguardando-intervalo'
	}

	// Item 7 — teto de uma interrupção por sessão de aba, compartilhado com os
	// incentivos passivos. Fica por último porque é a condição mais volátil: muda
	// dentro da própria sessão, enquanto as de cima valem por dias.
	if (hasPassiveShownThisSession()) return 'interrupcao-ja-usada'

	return 'exibir'
}

// ── Escrita ─────────────────────────────────────────────────────────────────

/**
 * Item 3/4 — a impressão é contada quando o modal APARECE, não quando fecha. Quem
 * abandona a aba sem fechar consumiu a impressão do mesmo jeito.
 */
export function registrarImpressaoWhatsNew(agora = Date.now()): void {
	const estado = lerEstado()
	if (!estado) return
	gravarEstado({
		impressoes: estado.impressoes + 1,
		ultimaEm: new Date(agora).toISOString(),
		status: estado.status,
	})
}

/**
 * Item 4 — "Pular", chegar ao último passo e "Criar conta" encerram a campanha para
 * esta pessoa. O X e o scrim NÃO chamam isto: são "agora não", e a impressão já
 * registrada é o que segura os 4 dias até a segunda (e última) aparição.
 */
export function encerrarWhatsNew(): void {
	const estado = lerEstado()
	if (!estado) return
	gravarEstado({ ...estado, status: 'encerrado' })
}

// ── Cenários do protótipo ───────────────────────────────────────────────────

/**
 * Presets da ScenarioBar. Existem porque as regras têm prazo em dias: sem poder
 * plantar um histórico, revisar "volta em 4 dias" custaria quatro dias. Cada preset
 * escreve um estado plausível e deixa `resolverWhatsNew` decidir normalmente — nenhum
 * deles desvia da regra, todos alimentam a mesma função.
 *
 * Só o protótipo usa isto; não existe equivalente no WordPress.
 */
export type PresetWhatsNew =
	| 'auto'
	| 'limpo'
	| 'aguardando'
	| 'segunda'
	| 'esgotado'
	| 'encerrado'
	| 'interrupcao-usada'

export function aplicarPresetWhatsNew(preset: PresetWhatsNew): void {
	if (preset === 'auto') return

	// Todo preset parte de uma sessão sem interrupção — senão o teto do item 7
	// mascararia o que o preset quer mostrar. O preset dedicado religa o flag.
	resetPassiveShownThisSession()

	const agora = Date.now()
	const haDias = (dias: number) => new Date(agora - dias * DIA_MS).toISOString()

	switch (preset) {
		case 'limpo':
			gravarEstado({ ...ESTADO_INICIAL })
			return
		case 'aguardando':
			gravarEstado({ impressoes: 1, ultimaEm: haDias(1), status: 'aberto' })
			return
		case 'segunda':
			gravarEstado({ impressoes: 1, ultimaEm: haDias(5), status: 'aberto' })
			return
		case 'esgotado':
			gravarEstado({ impressoes: 2, ultimaEm: haDias(5), status: 'aberto' })
			return
		case 'encerrado':
			gravarEstado({ impressoes: 1, ultimaEm: haDias(5), status: 'encerrado' })
			return
		case 'interrupcao-usada':
			gravarEstado({ ...ESTADO_INICIAL })
			markPassiveShown()
			return
	}
}
