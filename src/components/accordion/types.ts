import type { ReactNode } from 'react'

export type AccordionType = 'single' | 'multiple'

export interface IAccordionProps {
	type?: AccordionType
	defaultValue?: string | string[]
	value?: string | string[]
	onValueChange?: (value: string | string[]) => void
	children: ReactNode
	className?: string
}

export interface IAccordionItemProps {
	value: string
	children: ReactNode
	className?: string
}

export interface IAccordionTriggerProps {
	children: ReactNode
	className?: string
	disabled?: boolean
}

export interface IAccordionContentProps {
	children: ReactNode
	className?: string
}
