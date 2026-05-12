import type { InputHTMLAttributes } from 'react'

export type FormFieldType = 'text' | 'email' | 'tel' | 'password' | 'url' | 'number'

export interface IFormFieldProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> {
	label: string
	type?: FormFieldType
	required?: boolean
	className?: string
}
