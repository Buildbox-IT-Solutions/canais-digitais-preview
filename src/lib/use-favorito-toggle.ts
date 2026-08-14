/**
 * Regra de negócio do toggle de favoritar — único lugar que conhece
 * favoritos-store, useLogado e o toast. O componente Toggle (src/components/toggle)
 * é genérico e não sabe nada disto; ele só recebe `pressed`/`onPressedChange`.
 *
 * Comportamento exato (o dev reimplementa isto em PHP — precisa bater 1:1):
 *
 * 1. Atualização otimista: o estado muda IMEDIATAMENTE no clique, antes de qualquer
 *    confirmação. Nunca desabilita o controle nem troca o ícone por spinner durante
 *    a operação (requisito não-funcional do PRD).
 * 2. Falha e rollback: se a operação simulada falha, volta ao estado que existia
 *    ANTES daquele clique específico (não ao inverso do estado atual no momento da
 *    falha) — relevante quando há cliques rápidos em sequência.
 * 3. Cliques rápidos em sequência: o resultado final visível (toast de sucesso/erro,
 *    e o rollback se houver falha) é sempre o do ÚLTIMO clique. Uma resposta
 *    atrasada de um clique anterior nunca sobrescreve o que um clique mais recente
 *    já decidiu — ver `requestIdRef` abaixo.
 * 4. Conteúdo indisponível nunca bloqueia: a store não olha pra flag `disponivel`,
 *    então remover dos favoritos um conteúdo que saiu do ar funciona normalmente,
 *    sem tratamento especial aqui.
 * 5. Deslogado: se `useLogado()` for false, chama `onRequestAuth` e não escreve nada
 *    na store. `onRequestAuth` abre o IncentiveDownloadDialog (conteúdo de
 *    favoritos) — quem chama este hook decide o que fazer com o gancho.
 * 6. Guard: contentId vazio nunca consulta a store — nem leitura (`pressed` sempre
 *    false), nem escrita (clique é no-op). Cobre o caso de NewsCard chamar este hook
 *    sem `contentId` (regra dos hooks exige chamada incondicional).
 * 7. Deslogado nunca exibe estado "favoritado": a store (localStorage) é a simulação
 *    do back-end, não uma sessão — ela persiste entre navegações mesmo sem login
 *    (inclusive a seed de 25 itens do portal padrão). Sem esta regra, um visitante
 *    deslogado veria cards já marcados como favoritados (o histórico de outra
 *    "conta"), o que não existe no produto real: favoritos pertencem à conta
 *    logada. Por isso `pressed` é sempre `false` quando `!logado`, mesmo que
 *    `contentId` já esteja salvo na store — só a ESCRITA é bloqueada por
 *    `onRequestAuth` (regra 5); a LEITURA visual também precisa ser.
 *
 * Retomada da intenção pós-login (feature Favoritos, passo "auth"):
 * - A intenção (qual contentId favoritar) viaja no parâmetro `?favoritar=<id>` da
 *   própria URL de retorno — NÃO em sessionStorage/localStorage. Motivo: se o
 *   cadastro exigir confirmação por e-mail, quem clica no link pode estar em outra
 *   aba ou outro dispositivo, onde nenhum storage da aba original existe. O
 *   parâmetro sobrevive a isso porque é a própria URL, sempre a mesma cadeia de
 *   texto independente de onde é aberta.
 * - "Favoritar", não "alternar": no retorno, este hook chama `favoritar(contentId)`
 *   direto — nunca teria como saber alternar de forma segura contra um estado que
 *   pode já ter mudado, e a store não expõe toggle por esse mesmo motivo.
 * - O parâmetro é removido da URL assim que aplicado (`setSearchParams` com
 *   `replace: true`) — senão a URL (agora sem `logado=true`, mas ainda com
 *   `favoritar=`) favoritaria o mesmo conteúdo de novo se recarregada ou
 *   compartilhada.
 * - Intenção "perdida" (chega logado sem o parâmetro, ex.: link expirado/fluxo
 *   interrompido): não há erro nem aviso — o toggle simplesmente aparece desligado,
 *   e um clique normal resolve. Silêncio é melhor que um erro sem causa visível.
 * - PONTE COM O MUNDO REAL (pendência técnica, não decisão de design deste passo):
 *   este protótipo simula "voltar autenticado" preservando `?favoritar=` através de
 *   login-v2/cadastro-v2/confirmacao-email-v2 (formulários GET com campo oculto,
 *   ver esses arquivos). Na implementação real, quem processa o login/cadastro é o
 *   WordPress — garantir que o parâmetro de retorno sobrevive ao fluxo de auth do
 *   WP (redirects, plugins, etc.) é responsabilidade do Tech Lead, não algo que este
 *   código possa garantir sozinho.
 */
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { desfavoritar, favoritar, isFavorito, useFavorito } from './favoritos-store'
import { toast } from './toast-store'
import { useLogado } from './use-logado'

// Delay fixo do modo de latência artificial — não é configurável pela URL, só
// liga/desliga (ver seção "Simulação de rede" no passo 3 do plano). Artifício de
// protótipo: não existe no produto real.
const SIMULATED_LATENCY_MS = 900

const FAVORITOS_TAB_HREF = '/dashboard-perfil-v4?tab=favoritos'

export interface UseFavoritoToggleResult {
	pressed: boolean
	onPressedChange: (next: boolean) => void
}

export function useFavoritoToggle(
	contentId: string,
	onRequestAuth?: () => void,
): UseFavoritoToggleResult {
	const logado = useLogado()
	const storedFavorito = useFavorito(contentId)
	// Regra 7 acima: deslogado nunca vê "favoritado", mesmo que a store já tenha
	// o id salvo (seed ou favorito de uma sessão logada anterior no mesmo navegador).
	const pressed = logado && storedFavorito
	const navigate = useNavigate()

	// Simulação de rede via querystring — mesma convenção de ?logado=true e ?cenario=.
	// Ambos os modos são independentes e combináveis (latência com falha, latência
	// sem falha, etc.). Padrão: sem latência, sem falha.
	const [params, setSearchParams] = useSearchParams()
	const simulateLatency = params.get('favoritos-latencia') === 'true'
	const forceFailure = params.get('favoritos-falha') === 'true'

	// Contador de "qual foi o clique mais recente" — cada clique incrementa e captura
	// o próprio número. Quando a resposta (simulada) desse clique chega, ela só age
	// se ainda for o clique mais recente; senão, foi superada por outro clique
	// enquanto estava "em voo" e é descartada em silêncio (nem toast, nem rollback).
	const requestIdRef = useRef(0)

	// Guard contra o StrictMode (mount → cleanup → mount) do dev: sem isto, o efeito
	// abaixo dispararia duas vezes na montagem e duplicaria o toast. O ref sobrevive
	// ao duplo-disparo (mesma instância do componente), então só a primeira execução
	// real aplica o favorito.
	const resumedRef = useRef(false)

	// Retomada pós-login: só o card cujo contentId bate com `?favoritar=` age — os
	// demais, renderizados na mesma página, simplesmente não têm match e ignoram.
	// `logado` no dep array cobre o caso (que não deveria acontecer na prática, já
	// que o parâmetro só chega numa URL pós-auth, mas é defensivo) de a página
	// montar antes do estado de login se resolver.
	useEffect(() => {
		if (!contentId || !logado || resumedRef.current) return
		const pendingId = params.get('favoritar')
		if (pendingId !== contentId) return

		resumedRef.current = true
		favoritar(contentId)

		const next = new URLSearchParams(params)
		next.delete('favoritar')
		setSearchParams(next, { replace: true })

		toast.success('Conteúdo salvo com sucesso!', {
			action: { label: 'Ver favoritos', onClick: () => navigate(FAVORITOS_TAB_HREF) },
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentId, logado, params])

	function onPressedChange(next: boolean): void {
		if (!contentId) return // guard: sem id real, nunca consulta/escreve a store

		if (!logado) {
			onRequestAuth?.()
			return
		}

		// Estado exatamente como estava ANTES deste clique — é pra onde o rollback
		// deste clique específico volta, não o inverso do estado no momento da falha.
		const previous = isFavorito(contentId)

		// Otimista: aplica na hora, sem esperar a simulação de rede.
		if (next) favoritar(contentId)
		else desfavoritar(contentId)

		const myRequestId = ++requestIdRef.current

		function settle(): void {
			if (requestIdRef.current !== myRequestId) return // superado por um clique mais novo

			if (forceFailure) {
				if (previous) favoritar(contentId)
				else desfavoritar(contentId)
				toast.error('Não foi possível salvar. Tente de novo.')
				return
			}

			if (next) {
				toast.success('Conteúdo salvo com sucesso!', {
					action: { label: 'Ver favoritos', onClick: () => navigate(FAVORITOS_TAB_HREF) },
				})
			} else {
				toast.success('Removido dos favoritos.')
			}
		}

		if (simulateLatency) {
			setTimeout(settle, SIMULATED_LATENCY_MS)
		} else {
			settle()
		}
	}

	return { pressed, onPressedChange }
}
