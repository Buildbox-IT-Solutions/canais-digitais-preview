import { twMerge } from '~/lib/tw-merge'
import { formatarDataLeitura } from '~/lib/formatar-data-leitura'
import { Badge } from '~/components/badge'
import { Categoria } from '~/components/categoria'
import type { CategoriaColor } from '~/components/categoria/types'
import { Divider } from '~/components/divider'
import { Thumbnail } from '~/components/thumbnail'
import { ReadListItemMenu } from './read-list-item-menu'
import type { IReadListItemProps } from './types'

/**
 * Componente: Read List Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7794-9235
 * Linha "Últimas leituras" — reaproveitado por "Favoritos" (mesma UI, ações e verbo de
 * data diferentes, ver `menuActions`/`verbo`). Mobile: thumb 16:9 full-width, categoria +
 * título embaixo, rodapé com data relativa (ou Badge "Indisponível") + ⋮. Desktop (≥md):
 * thumb 208px + conteúdo lado a lado, ⋮ em coluna fixa na borda direita.
 * Indisponível: título perde o link (vira texto em tom apagado), imagem MANTIDA com
 * opacidade reduzida (não substituída por ícone), data vira Badge. Sem aria-disabled no
 * <li> — colocá-lo lá marcaria o botão "⋮" (que precisa continuar funcional, ver
 * restrição de remoção) como não-interativo em ferramentas de automação/AT, já que
 * aria-disabled num ancestral é tratado como desabilitando os descendentes também.
 * O sinal de indisponibilidade já é claro por si (título vira <p> sem link + Badge).
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
	verbo,
	indisponivel = false,
	menuActions,
}: IReadListItemProps) {
	const metaLabel = formatarDataLeitura(readAt, undefined, verbo)

	const thumb = image ? (
		<Thumbnail
			src={image}
			alt={title}
			ratio="video"
			className={indisponivel ? 'opacity-50' : undefined}
		/>
	) : (
		<div
			aria-hidden="true"
			className={twMerge(
				'flex aspect-video items-center justify-center rounded-sm font-display font-bold text-title-xl',
				FALLBACK_TILE_CLASSES[categoryColor],
				indisponivel && 'opacity-50',
			)}
		>
			{category.charAt(0).toUpperCase()}
		</div>
	)

	const titleClasses = twMerge(
		'max-w-[75ch] font-display font-bold transition-colors',
		indisponivel ? 'text-neutral-600' : 'text-primary-600 group-hover:text-secondary-950',
	)

	return (
		<li className={twMerge('list-none', className)}>
			{/* Mobile (<md): thumb full-width, rodapé com data (ou badge) + ⋮ */}
			<div className="flex flex-col gap-3 py-4 md:hidden">
				{indisponivel ? (
					<div className="flex flex-col gap-3 rounded-sm">
						{thumb}
						<div className="flex flex-col gap-1">
							<Categoria label={category} color={categoryColor} />
							<p title={title} className={twMerge('line-clamp-3', titleClasses, 'text-title-md')}>
								{title}
							</p>
						</div>
					</div>
				) : (
					<a
						href={href}
						className="group flex flex-col gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
					>
						{thumb}
						<div className="flex flex-col gap-1">
							<Categoria label={category} color={categoryColor} />
							<p title={title} className={twMerge('line-clamp-3', titleClasses, 'text-title-md')}>
								{title}
							</p>
						</div>
					</a>
				)}

				<div className="flex items-center justify-between gap-3">
					{indisponivel ? (
						<Badge label="Indisponível" tone="neutral" />
					) : (
						<a
							href={href}
							className="min-w-0 flex-1 font-body text-body-md text-neutral-600 transition-colors hover:text-secondary-950"
						>
							{metaLabel}
						</a>
					)}
					<ReadListItemMenu title={title} actions={menuActions} triggerClassName="-mr-[11px]" />
				</div>
			</div>

			{/* Desktop (≥md): thumb + conteúdo lado a lado, ⋮ em coluna fixa */}
			<div className="hidden items-start gap-4 py-4 md:flex">
				{indisponivel ? (
					<div className="flex min-w-0 flex-1 items-start gap-4 rounded-sm">
						<div className="w-[208px] shrink-0">{thumb}</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
							<Categoria label={category} color={categoryColor} />
							<p title={title} className={twMerge('line-clamp-2', titleClasses, 'text-title-lg')}>
								{title}
							</p>
							<Badge label="Indisponível" tone="neutral" className="self-start" />
						</div>
					</div>
				) : (
					<a
						href={href}
						className="group flex min-w-0 flex-1 items-start gap-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
					>
						<div className="w-[208px] shrink-0">{thumb}</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
							<Categoria label={category} color={categoryColor} />
							<p title={title} className={twMerge('line-clamp-2', titleClasses, 'text-title-lg')}>
								{title}
							</p>
							<span className="font-body text-body-md text-neutral-600">{metaLabel}</span>
						</div>
					</a>
				)}

				<div className="flex w-10 shrink-0 justify-end pt-0.5">
					<ReadListItemMenu title={title} actions={menuActions} />
				</div>
			</div>

			{!isLast ? <Divider /> : null}
		</li>
	)
}
