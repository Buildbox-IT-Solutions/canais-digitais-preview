// Eixos de cenário das telas de auth, para a ScenarioBar (ver src/dev).
// Substitui o `_auth/dev-nav.tsx` (removido em 27/08/2026): as pílulas eram <a href>,
// recarregavam a página e obrigavam cada tela a remontar à mão os parâmetros de contexto
// (?email=, ?returnTo=, ?intent=) em `extraQuery`. A ScenarioBar navega por merge, então
// esses parâmetros sobrevivem sem ninguém repeti-los.
//
// Os rótulos existem porque a barra agora é sempre visível: quem revisa lê "E-mail já
// cadastrado", não `existente`.
import type { ScenarioAxis } from '~/dev/scenario-store'

const ERROR_LABELS: Record<string, string> = {
	none: 'Sem erro',
	empty: 'Campos vazios',
	invalid: 'Credenciais inválidas',
	invalido: 'E-mail inválido',
	existente: 'E-mail já cadastrado',
	campos: 'Campos obrigatórios',
	mismatch: 'Senhas não coincidem',
	termos: 'Termos não aceitos',
	fraca: 'Senha fraca',
	locked: 'Conta bloqueada',
	throttle: 'Muitas tentativas',
}

const STATE_LABELS: Record<string, string> = {
	// recupera-senha
	default: 'Formulário',
	sent: 'E-mail enviado',
	// redefine-senha
	valid: 'Formulário',
	loading: 'Carregando',
	success: 'Sucesso',
	expired: 'Link expirado',
	used: 'Link já usado',
	// confirmacao-email
	waiting: 'Aguardando confirmação',
	corrigir: 'Corrigir e-mail',
	'link-expired': 'Link expirado',
	'link-used': 'Link já usado',
	// excluir-conta
	confirm: 'Confirmação',
	done: 'Concluído',
}

const CADASTRO_STEP_LABELS: Record<string, string> = {
	'1': '1 · E-mail',
	'2': '2 · Senha',
	'3': '3 · Sobre você',
	'4': '4 · Localização',
}

function toOptions(values: readonly string[], labels: Record<string, string>) {
	return values.map((value) => ({ value, label: labels[value] ?? value }))
}

/**
 * Eixo do passo do cadastro (?step=), somado ao eixo de erro: os dois se acumulam, e é
 * a combinação que se revisa ("passo 3 com campos obrigatórios em falta"). Trocar de
 * passo limpa ?error= porque cada passo tem seu próprio conjunto (ERRORS_BY_STEP) —
 * `termos` não existe no passo 3.
 */
export function cadastroStepAxis(values: readonly number[], value: number): ScenarioAxis {
	return {
		param: 'step',
		label: 'Passo',
		value: String(value),
		options: toOptions(values.map(String), CADASTRO_STEP_LABELS),
		clears: ['error'],
	}
}

/**
 * Eixo do estado do fluxo (?state=). Trocar de estado limpa ?error=: o erro é específico
 * do estado que o exibe, e sobreviver à troca deixaria a URL num par impossível.
 */
export function authStateAxis(
	values: readonly string[],
	value: string,
	labels?: Record<string, string>,
): ScenarioAxis {
	return {
		param: 'state',
		label: 'Estado',
		value,
		options: toOptions(values, { ...STATE_LABELS, ...labels }),
		clears: ['error'],
	}
}

/**
 * Eixo do erro exibido (?error=). `none` é o default — selecionar remove o parâmetro em
 * vez de gravar `?error=none`, que é ruído no link compartilhado.
 */
export function authErrorAxis(
	values: readonly string[],
	value: string,
	labels?: Record<string, string>,
): ScenarioAxis {
	return {
		param: 'error',
		label: 'Erro',
		value,
		options: toOptions(values, { ...ERROR_LABELS, ...labels }),
		defaultValue: 'none',
	}
}
