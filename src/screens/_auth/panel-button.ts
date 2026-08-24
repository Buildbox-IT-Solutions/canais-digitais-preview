/**
 * Estilo dos botões dos painéis de desfecho da autenticação (confirmação de e-mail e
 * login). Mora aqui porque as duas telas terminam no MESMO painel — "Tudo pronto! / Seu
 * material está pronto para baixar" — e um botão que diverge entre elas seria divergência
 * visual entre dois caminhos do mesmo fluxo.
 */
export type AuthPanelButtonVariant = 'filled' | 'outlined' | 'ghost'

export const AUTH_PANEL_BTN_BASE =
	'inline-flex items-center justify-center w-full h-12 px-6 rounded-full font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2'

export const AUTH_PANEL_BTN_VARIANT: Record<AuthPanelButtonVariant, string> = {
	filled: 'bg-primary-600 hover:bg-secondary-950 text-white',
	outlined: 'border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600',
	ghost: 'bg-transparent hover:bg-neutral-50 text-primary-600',
}
