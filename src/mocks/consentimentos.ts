export type ConsentType = 'termos' | 'privacidade' | 'newsletters' | 'comunicacoes' | 'cookies'

export interface ConsentEvent {
	date: string
	year: number
	type: ConsentType
	action: string
	title: string
	detail?: string
	docHref?: string
}

export const CONSENT_EVENTS: ConsentEvent[] = [
	{ date: '12 abr 2026', year: 2026, type: 'newsletters', action: 'Opt-in', title: 'Newsletter Saúde Business', detail: 'Frequência semanal · sextas-feiras' },
	{ date: '03 abr 2026', year: 2026, type: 'comunicacoes', action: 'Opt-in', title: 'Convites para eventos do setor', detail: 'Feiras Informa Markets' },
	{ date: '28 mar 2026', year: 2026, type: 'cookies', action: 'Atualização', title: 'Preferências de cookies', detail: 'Funcionais + Analítica · Marketing recusado' },
	{ date: '15 fev 2026', year: 2026, type: 'newsletters', action: 'Opt-out', title: 'Newsletter Food Connection', detail: 'Cancelamento espontâneo' },
	{ date: '20 dez 2025', year: 2025, type: 'privacidade', action: 'Aceite', title: 'Política de Privacidade v3.1', detail: 'Atualização da finalidade de coleta', docHref: '#' },
	{ date: '20 dez 2025', year: 2025, type: 'termos', action: 'Aceite', title: 'Termos de Uso v4.2', detail: 'Cláusula de força maior atualizada', docHref: '#' },
	{ date: '11 set 2025', year: 2025, type: 'newsletters', action: 'Opt-in', title: 'Newsletter Food Connection', detail: 'Frequência diária' },
	{ date: '11 set 2025', year: 2025, type: 'cookies', action: 'Aceite', title: 'Preferências de cookies (inicial)', detail: 'Aceite total no primeiro acesso' },
	{ date: '11 set 2025', year: 2025, type: 'privacidade', action: 'Aceite', title: 'Política de Privacidade v3.0', detail: 'Cadastro inicial', docHref: '#' },
	{ date: '11 set 2025', year: 2025, type: 'termos', action: 'Aceite', title: 'Termos de Uso v4.1', detail: 'Cadastro inicial', docHref: '#' },
]

export const FILTER_LABELS: Record<ConsentType | 'all', string> = {
	all: 'Tudo',
	termos: 'Termos',
	privacidade: 'Privacidade',
	newsletters: 'Newsletters',
	comunicacoes: 'Comunicações',
	cookies: 'Cookies',
}

export const TYPE_LABELS: Record<ConsentType, string> = {
	termos: 'Termos de Uso',
	privacidade: 'Privacidade',
	newsletters: 'Newsletter',
	comunicacoes: 'Comunicações',
	cookies: 'Cookies',
}
