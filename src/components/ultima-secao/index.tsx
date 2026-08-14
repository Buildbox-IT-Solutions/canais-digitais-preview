/**
 * Componente: UltimaSecao (Home)
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-7005
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3046-37142
 * Mobile: pilha unica, SEM Categoria/Byline, titulo text-title-lg (18px), ordem
 * [0,1,3,2,ad] (diferente do desktop) — por isso duas arvores em vez de reflow por
 * classe, igual ao DestaqueSection.
 * Desktop: grid-cols-[600px_1fr] + sub-grid-cols-2, ordem [0,1,2,3,ad], inalterado.
 *
 * Feature Favoritos — mesma conversão de DestaqueSection: todo card aqui era
 * markup à mão (Thumbnail+h3/a, às vezes +Categoria) sem toggle; agora é
 * `NewsCard size="small" orientation="vertical"` (o único par vertical do
 * componente além de medium/large). Sem Categoria no mobile (comentário acima:
 * "SEM Categoria/Byline") — a prop simplesmente não é passada, o componente já
 * omite o chip sozinho. No desktop (second/third/fourth), o markup antigo usava
 * `text-title-md`, que não existe em nenhum par vertical do NewsCard — ao
 * padronizar, o texto sobe pra `text-title-lg` (small-vertical), mesma
 * diferença já reportada em DestaqueSection.
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { picsumSrc } from '~/mocks/articles'
import type { IUltimaSecaoProps } from './types'

export function UltimaSecao({ title, articles, className }: IUltimaSecaoProps) {
	const [hero, second, third, fourth] = articles

	return (
		<section className={twMerge('w-full', className)}>
			<SectionTitle label={title} color="primary-600" href="/categoria" />

			{/* Mobile (<lg): pilha unica, sem Categoria/Byline, ordem [0,1,3,2,ad] */}
			<div className="lg:hidden max-w-screen-xl mx-auto px-4 mt-4 pb-6 flex flex-col gap-8">
				{[hero, second, fourth, third].map((card) => (
					<NewsCard
						key={card.id}
						contentId={card.id}
						size="small"
						orientation="vertical"
						image={picsumSrc(card.seed, 600, 338)}
						href="/conteudo"
						title={card.title}
						lead={card.id === hero.id ? card.lead : undefined}
					/>
				))}
				<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
					<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
				</div>
			</div>

			{/* Desktop (>=lg) */}
			<div className="hidden lg:grid max-w-screen-xl mx-auto px-6 mt-6 grid-cols-[600px_1fr] gap-6">
				<NewsCard
					contentId={hero.id}
					size="large"
					orientation="vertical"
					image={picsumSrc(hero.seed, 1200, 675)}
					href="/conteudo"
					title={hero.title}
					categoria={{ label: hero.category, color: hero.categoryColor, href: '/categoria' }}
					lead={hero.lead}
					author={hero.author}
					authorHref="/categoria"
				/>

				<div className="grid grid-cols-2 gap-6">
					{[second, third].map((card) => (
						<NewsCard
							key={card.id}
							contentId={card.id}
							size="small"
							orientation="vertical"
							image={picsumSrc(card.seed, 600, 338)}
							href="/conteudo"
							title={card.title}
							categoria={{ label: card.category, color: card.categoryColor, href: '/categoria' }}
						/>
					))}
					<NewsCard
						contentId={fourth.id}
						size="small"
						orientation="vertical"
						image={picsumSrc(fourth.seed, 600, 338)}
						href="/conteudo"
						title={fourth.title}
					/>
					<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
						<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
					</div>
				</div>
			</div>
		</section>
	)
}
