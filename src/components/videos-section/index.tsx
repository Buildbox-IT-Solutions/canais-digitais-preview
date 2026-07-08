/**
 * Componente: Videos Section
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-35926
 * Secao de fundo escuro. Suporta 2-4 itens (figma-specs/_regras-de-negocio.md).
 * Mobile: todos os itens empilham como VideoCard size=sm — sem branch por quantidade.
 * Desktop: items[0] vira hero (VideoCard size=lg) + lista compacta (size=xs/horizontal).
 * Tokens: --color-primary-600, --color-white
 */
import { twMerge } from '~/lib/tw-merge'
import { VideoCard } from '~/components/video-card'
import type { IVideosSectionProps } from './types'

export function VideosSection({ title = 'Vídeos', items, categoriaHref = '/categoria', contentHref = '/conteudo', className }: IVideosSectionProps) {
	const [hero, ...rest] = items

	return (
		<section className={twMerge('w-full bg-primary-600 mt-6', className)}>
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-10">
				<div className="w-full space-y-2 mb-4 lg:mb-6">
					<div className="flex items-center gap-1 h-1.5 text-white">
						<div className="flex items-center gap-1">
							<span className="block size-[5px] rounded-full bg-current" />
							<span className="block size-[5px] rounded-full bg-current opacity-40" />
							<span className="block size-[5px] rounded-full bg-current opacity-40" />
						</div>
						<div className="flex-1 h-px bg-current" />
					</div>
					<h2 className="text-headline-md font-display font-bold text-white">{title}</h2>
				</div>

				<div className="flex lg:hidden flex-col gap-8">
					{items.map((item) => (
						<VideoCard
							key={item.id}
							size="sm"
							title={item.title}
							image={item.image}
							href={item.href ?? contentHref}
							lead={item.lead}
							categoria={{ label: item.category, color: item.categoryColor, href: categoriaHref }}
						/>
					))}
				</div>

				<div className="hidden lg:grid grid-cols-2 gap-6">
					<VideoCard
						size="lg"
						title={hero.title}
						image={hero.image}
						href={hero.href ?? contentHref}
						lead={hero.lead}
						categoria={{ label: hero.category, color: hero.categoryColor, href: categoriaHref }}
					/>
					<div className="flex flex-col gap-6">
						{rest.map((item) => (
							<VideoCard
								key={item.id}
								size="xs"
								orientation="horizontal"
								title={item.title}
								image={item.image}
								href={item.href ?? contentHref}
								categoria={{ label: item.category, color: item.categoryColor, href: categoriaHref }}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
