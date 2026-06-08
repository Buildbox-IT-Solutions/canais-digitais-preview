export type ProofPanelMinimalVariant =
	| 'login'
	| 'signup-1'
	| 'signup-2'
	| 'signup-3'
	| 'welcome'
	| 'confirm-waiting'
	| 'confirm-welcome'

/**
 * Tamanho do painel, por contexto de uso:
 * - `sm` — modais compactos (912×600): headline-md (28px), p-8, subtítulo body-md.
 * - `md` — fullpage v2 (split 50/50): display-sm (36px), p-16, subtítulo body-lg.
 * - `lg` — página inteira legada: display-md (45px), p-20, min-h-screen. (default)
 */
export type ProofPanelMinimalSize = 'sm' | 'md' | 'lg'

export interface IProofPanelMinimalProps {
	variant?: ProofPanelMinimalVariant
	size?: ProofPanelMinimalSize
	className?: string
}
