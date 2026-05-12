import { twMerge } from '~/lib/tw-merge'
import type { ISectionTitleProps, SectionTitleColor } from './types'

/**
 * Componente: Section Title / Style 1
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=552-9108
 * Grafismo: 3 bullets + linha + título (text-headline-md font-display).
 * Tokens: --color-{primary-600, secondary-950, secondary-500, lavander, coral, saffron, mint,
 *         neutral-950, white}
 */

const COLOR_CLASSES: Record<SectionTitleColor, string> = {
	'primary-600': 'text-primary-600',
	'secondary-950': 'text-secondary-950',
	'secondary-500': 'text-secondary-500',
	lavander: 'text-lavander',
	coral: 'text-coral',
	saffron: 'text-saffron',
	mint: 'text-mint',
	'neutral-950': 'text-neutral-950',
	white: 'text-white',
}

function Decoration({ uppercase, label }: { uppercase: boolean; label: string }) {
	return (
		<div className="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
			<div className="flex items-center gap-1 h-1.5">
				<div className="flex items-center gap-1">
					<span className="block size-[5px] rounded-full bg-current" />
					<span className="block size-[5px] rounded-full bg-current opacity-40" />
					<span className="block size-[5px] rounded-full bg-current opacity-40" />
				</div>
				<div className="flex-1 h-px bg-current" />
			</div>
			<h2 className={twMerge('text-headline-md font-display font-bold', uppercase && 'uppercase')}>
				{label}
			</h2>
		</div>
	)
}

export function SectionTitle({
	label,
	color = 'primary-600',
	href,
	uppercase = false,
	className,
}: ISectionTitleProps) {
	const colorClass = COLOR_CLASSES[color]

	if (href) {
		return (
			<a
				href={href}
				className={twMerge(
					'group block w-full pt-10 no-underline hover:opacity-75 transition-opacity',
					colorClass,
					className,
				)}
			>
				<Decoration uppercase={uppercase} label={label} />
			</a>
		)
	}

	return (
		<div className={twMerge('block w-full pt-10', colorClass, className)}>
			<Decoration uppercase={uppercase} label={label} />
		</div>
	)
}
