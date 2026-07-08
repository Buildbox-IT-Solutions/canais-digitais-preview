/**
 * Componente: CategoryColumn
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-34982
 * Coluna de categoria: link de título + card "boxed" + lista de Small H cards.
 * Card compacto é fluido no mobile (max-w-40/min-w-52), trava em w-[120px] a partir de lg:.
 * Tokens: --text-headline-md, --text-title-md, --text-label-sm, --color-mint,
 *         --color-primary-600, --color-secondary-950
 */
import { twMerge } from '~/lib/tw-merge'
import { Categoria } from '~/components/categoria'
import { Thumbnail } from '~/components/thumbnail'
import { picsumSrc } from '~/mocks/articles'
import type { ICategoryColumnProps } from './types'

export function CategoryColumn({ color, label, boxedTitle, boxedSeed, list, className }: ICategoryColumnProps) {
	const colorClass = color === 'mint' ? 'text-mint' : 'text-primary-600'

	return (
		<div className={twMerge('flex flex-col pt-10', className)}>
			<a
				href="/categoria"
				className={twMerge('group block no-underline hover:opacity-75 transition-opacity space-y-2', colorClass)}
			>
				<div className="flex items-center gap-1 h-1.5">
					<div className="flex items-center gap-1">
						<span className="block size-[5px] rounded-full bg-current" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
					</div>
					<div className="flex-1 h-px bg-current" />
				</div>
				<h2 className="text-headline-md font-display font-bold">{label}</h2>
			</a>
			<div className="flex flex-col gap-4 mt-4">
				<a
					href="/conteudo"
					className="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-full aspect-[392/262]"
				>
					<img
						src={picsumSrc(boxedSeed, 784, 524)}
						alt="Capa"
						className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					<div className="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
						<p className="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
						<p className="font-display font-bold text-title-md text-secondary-950">Company Name</p>
					</div>
					<div className="relative bg-black/60 px-4 py-3 w-full z-10">
						<h3 className="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
							{boxedTitle}
						</h3>
					</div>
				</a>

				{list.map((card) => (
					<article key={card.id} className="group flex flex-row items-center gap-4 w-full">
						<div className="flex-1 max-w-40 shrink-0 lg:flex-none lg:w-[120px] lg:max-w-none">
							<Thumbnail src={picsumSrc(card.seed, 240, 135)} alt="Capa" href="/conteudo" ratio="video" />
						</div>
						<div className="flex flex-col gap-1 flex-1 min-w-52 lg:min-w-0">
							<Categoria color={color} label={card.category} href="/categoria" />
							<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{card.title}
								</a>
							</h3>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}
