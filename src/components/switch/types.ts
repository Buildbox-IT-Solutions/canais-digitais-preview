import type { InputHTMLAttributes } from 'react'

export interface ISwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	className?: string
}
