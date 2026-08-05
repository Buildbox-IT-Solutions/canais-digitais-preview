import { twMerge } from '~/lib/tw-merge'
import { formatarDataLeitura } from '~/lib/formatar-data-leitura'
import { toast } from '~/lib/toast-store'
import { Categoria } from '~/components/categoria'
import type { CategoriaColor } from '~/components/categoria/types'
import { Divider } from '~/components/divider'
import { Thumbnail } from '~/components/thumbnail'
import { ReadListItemMenu } from './read-list-item-menu'
import type { IReadListItemProps } from './types'

async function compartilhar(title: string, href: string) {
	const url = new URL(href, window.location.origin).toString()

	if (navigator.share) {
		try {
			await navigator.share({ title, url })
		} catch {
			// usuário cancelou o compartilhamento nativo — não é um erro
		}
		return
	}

	try {
		await navigator.clipboard.writeText(url)
		toast.success('Link copiado.')
	} catch {
		toast.error('Não foi possível copiar o link.')
	}
}

/**
 * Componente: Read List Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7794-9235
 * Linha "Últimas leituras". Mobile: thumb 16:9 full-width, categoria + título embaixo,
 * rodapé com data relativa + ⋮. Desktop (≥md): thumb 208px + conteúdo lado a lado, ⋮ em
 * coluna fixa na borda direita — vencedor do teste comparativo com o layout em linha.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-600,
 *         --color-coral-light, --color-mint-light, --color-saffron, --color-lavander,
 *         --color-secondary-50, --color-primary-100
 */

const FALLBACK_TILE_CLASSES: Record<CategoriaColor, string> = {
	coral: 'bg-coral-light text-coral',
	mint: 'bg-mint-light text-mint',
	saffron: 'bg-saffron/10 text-saffron',
	lavander: 'bg-lavander/10 text-lavander',
	'secondary-950': 'bg-secondary-50 text-secondary-950',
	'secondary-500': 'bg-secondary-50 text-secondary-500',
	'primary-600': 'bg-primary-100 text-primary-600',
}

export function ReadListItem({
	category,
	categoryColor,
	title,
	href,
	readAt,
	image,
	isLast = false,
	className,
	onRemove,
}: IReadListItemProps) {
	const metaLabel = formatarDataLeitura(readAt)

	return (
		<li className={twMerge('list-none', className)}>
			{/* Mobile (<md): thumb full-width, rodapé com data + ⋮ */}
			<div className="flex flex-col gap-3 py-4 md:hidden">
				<a
					href={href}
					className="group flex flex-col gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
				>
					{image ? (
						<Thumbnail src={image} alt={title} ratio="video" />
					) : (
						<div
							aria-hidden="true"
							className={twMerge(
								'flex aspect-video items-center justify-center rounded-sm font-display font-bold text-title-xl',
								FALLBACK_TILE_CLASSES[categoryColor],
							)}
						>
							{category.charAt(0).toUpperCase()}
						</div>
					)}

					<div className="flex flex-col gap-1">
						<Categoria label={category} color={categoryColor} />
						<p
							title={title}
							className="line-clamp-3 max-w-[75ch] font-display font-bold text-title-md text-primary-600 transition-colors group-hover:text-secondary-950"
						>
							{title}
						</p>
					</div>
				</a>

				<div className="flex items-center justify-between gap-3">
					<a
						href={href}
						className="min-w-0 flex-1 font-body text-body-md text-neutral-600 transition-colors hover:text-secondary-950"
					>
						{metaLabel}
					</a>
					<ReadListItemMenu
						title={title}
						onShare={() => compartilhar(title, href)}
						onRemove={onRemove}
						triggerClassName="-mr-[11px]"
					/>
				</div>
			</div>

			{/* Desktop (≥md): thumb + conteúdo lado a lado, ⋮ em coluna fixa */}
			<div className="hidden items-start gap-4 py-4 md:flex">
				<a
					href={href}
					className="group flex min-w-0 flex-1 items-start gap-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
				>
					<div className="w-[208px] shrink-0">
						{image ? (
							<Thumbnail src={image} alt={title} ratio="video" />
						) : (
							<div
								aria-hidden="true"
								className={twMerge(
									'flex aspect-video items-center justify-center rounded-sm font-display font-bold text-title-xl',
									FALLBACK_TILE_CLASSES[categoryColor],
								)}
							>
								{category.charAt(0).toUpperCase()}
							</div>
						)}
					</div>

					<div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
						<Categoria label={category} color={categoryColor} />
						<p
							title={title}
							className="line-clamp-2 max-w-[75ch] font-display font-bold text-title-lg text-primary-600 transition-colors group-hover:text-secondary-950"
						>
							{title}
						</p>
						<span className="font-body text-body-md text-neutral-600">{metaLabel}</span>
					</div>
				</a>

				<div className="flex w-10 shrink-0 justify-end pt-0.5">
					<ReadListItemMenu title={title} onShare={() => compartilhar(title, href)} onRemove={onRemove} />
				</div>
			</div>

			{!isLast ? <Divider /> : null}
		</li>
	)
}
