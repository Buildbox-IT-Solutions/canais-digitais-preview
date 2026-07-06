import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IPaginationProps } from './types'

/**
 * Componente: Pagination
 * Figma: 4545:15797 (Desktop 352×72 · Mobile 320×80)
 * Desktop: ‹ · páginas 1..N com truncamento por reticências · › — item 40px, a
 * página atual em contorno navy, as demais em neutral-900. Mobile: ‹ · "atual de
 * total" · ›. Baseado em URL (?page=N), sem estado local.
 * Tokens: --color-primary-600, --color-neutral-600, --color-neutral-900, --color-neutral-300
 */

const ELLIPSIS = '…'

/**
 * Páginas visíveis com truncamento (referência Atlassian): mostra sempre a 1ª e a
 * última, uma janela ao redor da atual, e "…" nos vãos. Até 7 páginas mostra tudo.
 */
function getPageItems(current: number, total: number): (number | typeof ELLIPSIS)[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
	if (current <= 3) return [1, 2, 3, 4, ELLIPSIS, total]
	if (current >= total - 2) return [1, ELLIPSIS, total - 3, total - 2, total - 1, total]
	return [1, ELLIPSIS, current - 1, current, current + 1, ELLIPSIS, total]
}

function PrevNext({
	dir,
	href,
	disabled,
	big = false,
}: {
	dir: 'prev' | 'next'
	href: string
	disabled: boolean
	big?: boolean
}) {
	return (
		<a
			href={disabled ? '#' : href}
			aria-disabled={disabled || undefined}
			tabIndex={disabled ? -1 : undefined}
			aria-label={dir === 'prev' ? 'Página anterior' : 'Próxima página'}
			className={twMerge(
				'inline-flex items-center justify-center rounded-full transition-colors',
				big ? 'size-12' : 'size-10',
				disabled
					? 'text-neutral-300 cursor-not-allowed pointer-events-none'
					: 'text-primary-600 hover:bg-neutral-50',
			)}
		>
			<Icon
				name={dir === 'prev' ? 'chevron-left' : 'chevron-right'}
				className={big ? 'size-8' : 'size-6'}
			/>
		</a>
	)
}

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
	const items = getPageItems(currentSafe, totalSafe)

	return (
		<nav className={twMerge('flex items-center justify-center', className)} aria-label="Paginação">
			{/* Desktop: ‹ · páginas (truncadas) · › */}
			<div className="hidden lg:flex items-center justify-center">
				<PrevNext dir="prev" href={mkHref(currentSafe - 1)} disabled={prevDisabled} />

				{items.map((item, i) =>
					item === ELLIPSIS ? (
						<span
							key={`ellipsis-${i}`}
							aria-hidden="true"
							className="inline-flex items-center justify-center size-10 font-body font-bold text-label-lg text-neutral-900"
						>
							{ELLIPSIS}
						</span>
					) : (
						<a
							key={item}
							href={mkHref(item)}
							aria-current={item === currentSafe ? 'page' : undefined}
							aria-label={`Página ${item}`}
							className={twMerge(
								'inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg transition-colors',
								item === currentSafe
									? 'border border-primary-600 text-primary-600'
									: 'text-neutral-900 hover:bg-neutral-50',
							)}
						>
							{item}
						</a>
					),
				)}

				<PrevNext dir="next" href={mkHref(currentSafe + 1)} disabled={nextDisabled} />
			</div>

			{/* Mobile: ‹ · "atual de total" · › */}
			<div className="flex lg:hidden items-center justify-center gap-6">
				<PrevNext dir="prev" href={mkHref(currentSafe - 1)} disabled={prevDisabled} big />
				<p className="font-body text-label-lg tracking-[0.1px] whitespace-nowrap">
					<span className="font-bold text-primary-600">{currentSafe}</span>{' '}
					<span className="font-semibold text-neutral-600">de {totalSafe}</span>
				</p>
				<PrevNext dir="next" href={mkHref(currentSafe + 1)} disabled={nextDisabled} big />
			</div>
		</nav>
	)
}
