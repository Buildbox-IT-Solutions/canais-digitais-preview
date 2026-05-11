export type PasswordStrengthLevel = 'empty' | 'weak' | 'medium' | 'strong'

export interface PasswordCriteria {
	length: boolean
	uppercase: boolean
	number: boolean
	special: boolean
}

export interface IPasswordStrengthProps {
	value?: string
	level?: PasswordStrengthLevel
	criteria?: Partial<PasswordCriteria>
	inputId?: string
	className?: string
}
