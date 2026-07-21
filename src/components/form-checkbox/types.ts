import type { InputHTMLAttributes, ReactNode } from 'react'

export interface IFormCheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: ReactNode
	indeterminate?: boolean
	className?: string
}
