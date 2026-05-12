import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IPaginationProps } from './types'

/**
 * Componente: Pagination
 * Figma: 6106:6544
 * Estrutura: prev / pages 1..N / next. Botões 32px circular.
 * Tokens: --color-primary-600, --color-neutral-50, --color-neutral-300, --color-white
 */
export function Pagination({
	current,
	total,
	baseHref = '?',
	pageParam = 'page',
	className,
}: IPaginationProps) {
	const totalSafe = Math.max(1, total)
	const currentSafe = Math.min(Math.max(1, current), totalSafe)
	const separator = baseHref.includes('?') ? '&' : '?'
	const mkHref = (p: number) => `${baseHref}${separator}${pageParam}=${p}`

	const prevDisabled = currentSafe === 1
	const nextDisabled = currentSafe === totalSafe

	return (
		<nav
			className={twMerge('flex items-center justify-center gap-2', className)}
			aria-label="Paginação"
		>
			<a
				href={prevDisabled ? '#' : mkHref(currentSafe - 1)}
				aria-disabled={prevDisabled || undefined}
				tabIndex={prevDisabled ? -1 : undefined}
				aria-label="Página anterior"
				className={twMerge(
					'inline-flex items-center justify-center size-8 rounded-full transition-colors',
					prevDisabled
						? 'text-neutral-300 cursor-not-allowed'
						: 'text-primary-600 hover:bg-neutral-50',
				)}
			>
				<Icon name="chevron-left" className="size-5" />
			</a>

			{Array.from({ length: totalSafe }, (_, i) => i + 1).map((p) => {
				const isOn = p === currentSafe
				return (
					<a
						key={p}
						href={mkHref(p)}
						aria-current={isOn ? 'page' : undefined}
						className={twMerge(
							'inline-flex items-center justify-center size-8 rounded-full font-body font-bold text-label-lg transition-colors',
							isOn ? 'bg-primary-600 text-white' : 'text-primary-600 hover:bg-neutral-50',
						)}
					>
						{p}
					</a>
				)
			})}

			<a
				href={nextDisabled ? '#' : mkHref(currentSafe + 1)}
				aria-disabled={nextDisabled || undefined}
				tabIndex={nextDisabled ? -1 : undefined}
				aria-label="Próxima página"
				className={twMerge(
					'inline-flex items-center justify-center size-8 rounded-full transition-colors',
					nextDisabled
						? 'text-neutral-300 cursor-not-allowed'
						: 'text-primary-600 hover:bg-neutral-50',
				)}
			>
				<Icon name="chevron-right" className="size-5" />
			</a>
		</nav>
	)
}
