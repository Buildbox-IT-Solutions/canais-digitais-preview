import { twMerge } from '~/lib/tw-merge'
import type { IPlayButtonProps, PlayButtonSize } from './types'

/**
 * Componente: Play Button 2.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2279-19957
 * Variantes: size × type × estado (24 variants)
 * Tokens: --color-white, --color-primary-600, --color-secondary-950, --color-neutral-200
 *
 * `as=div` é obrigatório quando usado como overlay dentro de <a> (botão não pode aninhar em <a>).
 */

const WRAPPER_SIZE: Record<PlayButtonSize, string> = {
	xlarge: 'size-18 p-4',
	large: 'size-16 p-4',
	medium: 'size-12 p-3',
	small: 'size-10 p-2',
	xsmall: 'size-8 p-1',
}

const ICON_SIZE: Record<PlayButtonSize, string> = {
	xlarge: 'size-10',
	large: 'size-8',
	medium: 'size-6',
	small: 'size-6',
	xsmall: 'size-5',
}

export function PlayButton({
	size = 'medium',
	as = 'button',
	type = 'play',
	disabled,
	onClick,
	className,
}: IPlayButtonProps) {
	const iconPath = type === 'play' ? 'M8 5v14l11-7L8 5z' : 'M6 5h4v14H6zM14 5h4v14h-4z'

	const icon = (
		<svg className={ICON_SIZE[size]} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d={iconPath} />
		</svg>
	)

	if (as === 'div') {
		return (
			<div
				className={twMerge(
					'inline-flex items-center justify-center rounded-full bg-white text-primary-600 pointer-events-none',
					WRAPPER_SIZE[size],
					className,
				)}
			>
				{icon}
			</div>
		)
	}

	return (
		<button
			type="button"
			aria-label={type === 'play' ? 'Reproduzir' : 'Pausar'}
			onClick={onClick}
			disabled={disabled}
			className={twMerge(
				'inline-flex items-center justify-center rounded-full transition-colors bg-white text-primary-600 hover:text-secondary-950 disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed',
				WRAPPER_SIZE[size],
				className,
			)}
		>
			{icon}
		</button>
	)
}
