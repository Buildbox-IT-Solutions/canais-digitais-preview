import { createContext, useContext, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type {
	IAccordionProps,
	IAccordionItemProps,
	IAccordionTriggerProps,
	IAccordionContentProps,
} from './types'

/**
 * Componente: Accordion
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1944-7508
 * Base de interação: shadcn/ui Accordion (estrutura Root/Item/Trigger/Content, `type`
 * single/multiple), com paleta e ícone do nosso DS. Sem Radix — Context próprio do React;
 * a animação de altura do shadcn depende de uma var. CSS medida em runtime pelo Radix,
 * substituída aqui por `grid-template-rows: 0fr → 1fr` (puro CSS, mesmo efeito).
 * Tokens: --color-neutral-100, --color-neutral-500, --color-secondary-950, --text-label-lg,
 *         --text-body-md
 */

interface IAccordionContext {
	openValues: string[]
	toggle: (value: string) => void
}

interface IAccordionItemContext {
	value: string
	isOpen: boolean
}

const AccordionContext = createContext<IAccordionContext | null>(null)
const AccordionItemContext = createContext<IAccordionItemContext | null>(null)

function toArray(value: string | string[] | undefined): string[] {
	if (value === undefined) return []
	return Array.isArray(value) ? value : [value]
}

export function Accordion({
	type = 'single',
	defaultValue,
	value,
	onValueChange,
	children,
	className,
}: IAccordionProps) {
	const [uncontrolled, setUncontrolled] = useState<string[]>(() => toArray(defaultValue))
	const isControlled = value !== undefined
	const openValues = isControlled ? toArray(value) : uncontrolled

	function toggle(itemValue: string) {
		const isOpen = openValues.includes(itemValue)
		const next = type === 'single' ? (isOpen ? [] : [itemValue]) : isOpen ? openValues.filter((v) => v !== itemValue) : [...openValues, itemValue]

		if (!isControlled) setUncontrolled(next)
		onValueChange?.(type === 'single' ? (next[0] ?? '') : next)
	}

	return (
		<AccordionContext.Provider value={{ openValues, toggle }}>
			<div className={className}>{children}</div>
		</AccordionContext.Provider>
	)
}

export function AccordionItem({ value, children, className }: IAccordionItemProps) {
	const ctx = useContext(AccordionContext)
	if (!ctx) throw new Error('AccordionItem deve ser usado dentro de Accordion')
	const isOpen = ctx.openValues.includes(value)

	return (
		<AccordionItemContext.Provider value={{ value, isOpen }}>
			<div className={twMerge('border-b border-neutral-100 last:border-b-0', className)}>{children}</div>
		</AccordionItemContext.Provider>
	)
}

export function AccordionTrigger({ children, className, disabled }: IAccordionTriggerProps) {
	const accordionCtx = useContext(AccordionContext)
	const itemCtx = useContext(AccordionItemContext)
	if (!accordionCtx || !itemCtx) throw new Error('AccordionTrigger deve ser usado dentro de AccordionItem')

	return (
		<h3 className="flex">
			<button
				type="button"
				disabled={disabled}
				aria-expanded={itemCtx.isOpen}
				onClick={() => accordionCtx.toggle(itemCtx.value)}
				className={twMerge(
					'flex flex-1 items-start justify-between gap-4 rounded-sm py-4 text-left font-body font-semibold text-label-lg text-neutral-950 transition-all outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-secondary-950/35 disabled:pointer-events-none disabled:opacity-50',
					className,
				)}
			>
				{children}
				<Icon
					name="chevron-down"
					className={twMerge(
						'size-4 shrink-0 translate-y-0.5 text-neutral-500 transition-transform duration-200',
						itemCtx.isOpen && 'rotate-180',
					)}
				/>
			</button>
		</h3>
	)
}

export function AccordionContent({ children, className }: IAccordionContentProps) {
	const itemCtx = useContext(AccordionItemContext)
	if (!itemCtx) throw new Error('AccordionContent deve ser usado dentro de AccordionItem')

	return (
		<div
			className={twMerge(
				'grid transition-[grid-template-rows] duration-200 ease-out',
				itemCtx.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
			)}
		>
			<div className="overflow-hidden">
				<div className={twMerge('pb-4 font-body text-body-md text-neutral-600', className)}>{children}</div>
			</div>
		</div>
	)
}
