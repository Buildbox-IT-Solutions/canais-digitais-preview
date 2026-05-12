import type { InputHTMLAttributes } from 'react'

export interface IFormCheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string
	className?: string
}
