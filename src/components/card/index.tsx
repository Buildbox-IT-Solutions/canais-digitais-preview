import { twMerge } from '~/lib/tw-merge'
import type { ICardProps } from './types'

/**
 * Componente: Card
 * Base: shadcn/ui Card (Card/CardHeader/CardTitle/CardDescription/CardContent/CardFooter).
 * Sem Figma spec dedicado — raio, borda e sombra seguem o padrão de card já usado no projeto
 * (AccessMethodCard: bg-white border-neutral-100 rounded-lg), não o rounded-xl (12px) do
 * shadcn — 12px não existe na nossa escala de raio.
 * Header/Content/Footer só ganham padding horizontal (px-6); o `py-6` fica no Card, e um
 * divisor opcional (`border-t`/`border-b` passado via className) atravessa a largura toda —
 * mesmo truque do shadcn original.
 * Tokens: --color-neutral-100, --color-primary-600, --color-neutral-600, --text-title-md,
 *         --text-body-md
 */
export function Card({ className, children, ...divProps }: ICardProps) {
	return (
		<div
			className={twMerge('flex flex-col gap-6 rounded-lg border border-neutral-100 bg-white py-6 shadow-sm', className)}
			{...divProps}
		>
			{children}
		</div>
	)
}

export function CardHeader({ className, children, ...divProps }: ICardProps) {
	return (
		<div className={twMerge('flex flex-col gap-1.5 px-6 [.border-b]:pb-6', className)} {...divProps}>
			{children}
		</div>
	)
}

export function CardTitle({ className, children, ...divProps }: ICardProps) {
	return (
		<div
			className={twMerge('font-display font-bold text-title-md text-primary-600 leading-tight', className)}
			{...divProps}
		>
			{children}
		</div>
	)
}

export function CardDescription({ className, children, ...divProps }: ICardProps) {
	return (
		<p className={twMerge('font-body text-body-md text-neutral-600', className)} {...divProps}>
			{children}
		</p>
	)
}

export function CardContent({ className, children, ...divProps }: ICardProps) {
	return (
		<div className={twMerge('px-6', className)} {...divProps}>
			{children}
		</div>
	)
}

export function CardFooter({ className, children, ...divProps }: ICardProps) {
	return (
		<div className={twMerge('flex items-center px-6 [.border-t]:pt-6', className)} {...divProps}>
			{children}
		</div>
	)
}
