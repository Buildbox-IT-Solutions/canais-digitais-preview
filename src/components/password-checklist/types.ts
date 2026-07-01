export interface PasswordCriteria {
	length: boolean
	uppercase: boolean
	number: boolean
	special: boolean
}

export interface IPasswordChecklistProps {
	/** Senha a partir da qual os critérios são derivados. */
	value?: string
	/** Sobrescreve critérios específicos (útil em telas estáticas/DaC). */
	criteria?: Partial<PasswordCriteria>
	className?: string
}
