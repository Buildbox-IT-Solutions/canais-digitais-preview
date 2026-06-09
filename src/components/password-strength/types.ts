import type { PasswordCriteria } from '~/components/password-checklist/types'

export type PasswordStrengthLevel = 'empty' | 'weak' | 'medium' | 'strong'
export type { PasswordCriteria }

export interface IPasswordStrengthProps {
	value?: string
	level?: PasswordStrengthLevel
	criteria?: Partial<PasswordCriteria>
	inputId?: string
	className?: string
}
