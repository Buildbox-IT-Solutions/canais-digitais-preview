export type ProofPanelMinimalVariant =
	| 'login'
	| 'signup-1'
	| 'signup-2'
	| 'signup-3'
	| 'welcome'

export interface IProofPanelMinimalProps {
	variant?: ProofPanelMinimalVariant
	className?: string
}
