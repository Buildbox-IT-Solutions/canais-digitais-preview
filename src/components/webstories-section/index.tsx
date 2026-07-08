/**
 * Componente: WebstoriesSection
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-35681
 * Mobile: strip com sangria a direita (sem padding-right) para revelar o proximo card
 * (peek); gap/margem menores que desktop; card w-[312px] (vs w-[288px] em lg:, ver
 * WebstoryCard).
 * Tokens: --text-title-md, --color-primary-600
 */
import { twMerge } from '~/lib/tw-merge'
import { SectionTitle } from '~/components/section-title'
import { WebstoryCard } from '~/components/webstory-card'
import { picsumSrc } from '~/mocks/articles'
import type { IWebstoriesSectionProps } from './types'

export function WebstoriesSection({ items, className }: IWebstoriesSectionProps) {
	return (
		<section className={twMerge('w-full', className)}>
			<SectionTitle label="Webstories" color="primary-600" href="/categoria" />
			<div className="max-w-screen-xl mx-auto pl-4 lg:px-6 mt-4 lg:mt-6 flex gap-4 lg:gap-6 overflow-x-auto pb-6 lg:pb-2">
				{items.map((ws) => (
					<WebstoryCard
						key={ws.seed}
						href="/conteudo"
						image={picsumSrc(ws.seed, 640, 1138)}
						label={ws.label}
						color={ws.color}
						title={ws.title}
					/>
				))}
			</div>
		</section>
	)
}
