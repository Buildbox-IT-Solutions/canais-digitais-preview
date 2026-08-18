import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconButtonSize, IconButtonType, IIconButtonProps } from './types'

/**
 * Componente: Icon Button [1.0]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6001
 * Variantes: type × size (27 variants)
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50, --color-white
 */

const TYPE_CLASSES: Record<IconButtonType, string> = {
	filled: 'bg-primary-600 text-white hover:bg-secondary-950 disabled:bg-neutral-200',
	outlined:
		'border border-primary-600 text-primary-600 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-200',
	ghost: 'text-primary-600 hover:bg-neutral-50 disabled:text-neutral-200',
}

const SIZE_CLASSES: Record<IconButtonSize, string> = {
	large: 'h-12 w-12',
	medium: 'h-10 w-10',
	small: 'h-8 w-8',
}

const ICON_SIZE: Record<IconButtonSize, string> = {
	large: 'size-6',
	medium: 'size-[18px]',
	small: 'size-4',
}

export function IconButton({
	icon,
	label,
	type = 'ghost',
	size = 'medium',
	href,
	target,
	disabled,
	onClick,
	ariaHasPopup,
	ariaExpanded,
	ariaControls,
	ariaPressed,
	className,
}: IIconButtonProps) {
	const classes = twMerge(
		'inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed',
		TYPE_CLASSES[type],
		SIZE_CLASSES[size],
		className,
	)

	const iconNode = <Icon name={icon} className={ICON_SIZE[size]} />

	if (href) {
		return (
			<a
				href={href}
				target={target}
				rel={target === '_blank' ? 'noopener noreferrer' : undefined}
				aria-label={label}
				className={classes}
			>
				{iconNode}
			</a>
		)
	}
	return (
		<button
			type="button"
			aria-label={label}
			aria-haspopup={ariaHasPopup}
			aria-expanded={ariaExpanded}
			aria-controls={ariaControls}
			aria-pressed={ariaPressed}
			onClick={onClick}
			disabled={disabled}
			className={classes}
		>
			{iconNode}
		</button>
	)
}
