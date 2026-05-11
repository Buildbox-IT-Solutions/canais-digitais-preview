import { isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'
import type { ButtonIcon, ButtonSize, ButtonType, IButtonProps } from './types'

/**
 * Componente: Button [1.1]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3185-47973
 * Variantes: type × size × icon (81 variants)
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50, --color-neutral-200, --color-white
 */

const TYPE_CLASSES: Record<ButtonType, string> = {
	filled: 'bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200',
	outlined:
		'bg-transparent text-primary-600 border-[1.5px] border-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200',
	ghost: 'bg-transparent text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200',
}

const SIZE_HEIGHT: Record<ButtonSize, string> = {
	large: 'h-12 gap-3 text-body-lg',
	medium: 'h-10 gap-2 text-body-lg',
	small: 'h-8 gap-2 text-title-sm',
}

const PADDING_NO_ICON: Record<ButtonSize, string> = {
	large: 'px-6',
	medium: 'px-6',
	small: 'px-3',
}

const PADDING_WITH_ICON: Record<ButtonSize, string> = {
	large: 'pl-6 pr-5',
	medium: 'pl-5 pr-4',
	small: 'pl-4 pr-3',
}

function BuiltInIcon({ icon, size }: { icon: ButtonIcon; size: ButtonSize }) {
	const iconSize = size === 'small' ? 'size-5' : 'size-6'
	if (icon === 'arrow-right') {
		return (
			<svg
				className={iconSize}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M5 12h14M13 5l7 7-7 7" />
			</svg>
		)
	}
	if (icon === 'plus') {
		return (
			<svg
				className={iconSize}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M12 8v8M8 12h8" />
			</svg>
		)
	}
	return null
}

export function Button({
	label,
	href,
	type = 'filled',
	size = 'medium',
	icon = 'none',
	disabled,
	onClick,
	className,
}: IButtonProps) {
	const hasIcon = icon !== 'none'
	const classes = twMerge(
		'inline-flex items-center justify-center rounded-full font-body font-bold transition-colors disabled:cursor-not-allowed',
		TYPE_CLASSES[type],
		SIZE_HEIGHT[size],
		hasIcon ? PADDING_WITH_ICON[size] : PADDING_NO_ICON[size],
		className,
	)

	const iconNode = isValidElement(icon)
		? icon
		: typeof icon === 'string' && icon !== 'none'
			? <BuiltInIcon icon={icon as ButtonIcon} size={size} />
			: null

	const content = (
		<>
			{label}
			{iconNode}
		</>
	)

	if (href) {
		return (
			<a href={href} className={classes}>
				{content}
			</a>
		)
	}

	return (
		<button type="button" onClick={onClick} disabled={disabled} className={classes}>
			{content}
		</button>
	)
}
