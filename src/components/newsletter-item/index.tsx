import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { INewsletterItemProps } from './types'

/**
 * Componente: Newsletter Item
 * Figma: 6091:4814
 * Título + chip "checked" + descrição + switch shadcn-like 33×18.
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-50, --color-secondary-950,
 *         --color-neutral-100, --color-neutral-600, --color-white
 */
export function NewsletterItem({
	id,
	title,
	desc,
	checked = false,
	isLast = false,
	onChange,
	className,
}: INewsletterItemProps) {
	return (
		<div
			className={twMerge(!isLast && 'border-b border-neutral-100', 'px-1', className)}
		>
			<label htmlFor={id} className="group flex items-start gap-4 py-4 cursor-pointer">
				<input
					type="checkbox"
					id={id}
					checked={checked}
					onChange={(e) => onChange?.(e.target.checked)}
					className="peer sr-only"
				/>

				<div className="flex-1 min-w-0 flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<h3 className="font-display font-bold text-title-lg text-primary-600 max-w-[75ch] group-hover:text-secondary-950 transition-colors">
							{title}
						</h3>
						{checked ? (
							<span
								className="inline-flex items-center justify-center bg-secondary-50 rounded-xs p-1"
								aria-hidden="true"
							>
								<Icon name="check" className="size-4 text-primary-600" />
							</span>
						) : null}
					</div>
					{desc ? (
						<p className="font-body text-body-md text-neutral-600 max-w-[75ch]">{desc}</p>
					) : null}
				</div>

				<span
					className={twMerge(
						'relative shrink-0 mt-1 w-[33px] h-[18px] rounded-full transition-colors',
						checked ? 'bg-secondary-950' : 'bg-primary-100',
					)}
					aria-hidden="true"
				>
					<span
						className={twMerge(
							'absolute top-[1px] left-[1px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out',
							checked && 'translate-x-[15px]',
						)}
					/>
				</span>
			</label>
		</div>
	)
}
