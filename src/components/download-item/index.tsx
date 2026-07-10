import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import { IconTile } from '~/components/icon-tile'
import type { IDownloadItemProps } from './types'

/**
 * Componente: Download Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6989-10370
 * Icon-tile + título (link) + meta + botão Baixar ou "Indisponível".
 * Desktop: linha única, botão ghost. Mobile: empilhado (ícone / conteúdo / botão full-width com borda).
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50, --color-neutral-100,
 *         --color-neutral-200, --color-neutral-600
 */
export function DownloadItem({
	icon,
	title,
	date,
	size,
	titleHref = '#',
	fileHref = '#',
	disabled = false,
	isLast = false,
	className,
}: IDownloadItemProps) {
	const metaParts = [date, size].filter(Boolean) as string[]

	return (
		<div className={twMerge(!isLast && 'border-b border-neutral-100', 'px-1', className)}>
			<div className="flex flex-col lg:flex-row lg:items-start gap-4 py-4">
				<IconTile icon={icon} tone={disabled ? 'disabled' : 'neutral'} />

				<div className="flex-1 min-w-0 flex flex-col gap-1">
					{disabled ? (
						<p className="font-display font-bold text-title-lg text-neutral-600 max-w-[75ch]">
							{title}
						</p>
					) : (
						<a
							href={titleHref}
							className="font-display font-bold text-title-lg text-primary-600 hover:text-secondary-950 transition-colors w-fit max-w-[75ch]"
						>
							{title}
						</a>
					)}
					{metaParts.length > 0 ? (
						<div className="flex items-center gap-1.5 font-body text-body-md text-neutral-600 flex-wrap max-w-[75ch]">
							{metaParts.map((part, i) => (
								<span key={i} className="contents">
									{i > 0 ? <span aria-hidden="true">•</span> : null}
									<span>{part}</span>
								</span>
							))}
						</div>
					) : null}
				</div>

				{disabled ? (
					<span
						aria-disabled="true"
						className="inline-flex items-center justify-center h-10 px-6 rounded-full font-body font-bold text-body-lg text-neutral-200 select-none shrink-0"
					>
						Indisponível
					</span>
				) : (
					<a
						href={fileHref}
						download
						className="inline-flex items-center justify-center gap-2 h-10 pl-4 pr-5 rounded-full border-[1.5px] border-primary-600 lg:border-0 font-body font-bold text-body-lg text-primary-600 hover:bg-neutral-50 transition-colors shrink-0"
					>
						<Icon name="download" className="size-6" />
						Baixar
					</a>
				)}
			</div>
		</div>
	)
}
