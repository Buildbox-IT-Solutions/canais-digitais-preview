import type { ReactNode } from 'react'

export type AuthShellMode = 'login' | 'signup'

export interface IAuthShellProps {
	children: ReactNode
	mode?: AuthShellMode
	narrow?: boolean
	hideProof?: boolean
	proofPanel?: ReactNode
	className?: string
}
