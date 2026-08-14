/**
 * Componente: ProteinaAnimalSection
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-35314
 * Mobile: cabecalho padrao (SectionTitle/coral) + 4 cards empilhados.
 * Desktop: mesmo SectionTitle/coral (era um cabecalho bespoke centralizado, "Style 2" —
 * ver comentário abaixo) + grid-cols-4.
 * Tokens: --color-coral, --text-title-lg
 *
 * Feature Favoritos:
 * - Título da seção: o desktop tinha um cabeçalho escrito à mão (linha horizontal
 *   + título centralizado, "text-headline-md") diferente do `SectionTitle` (Style
 *   1) que toda outra seção da home usa — inconsistência apontada e corrigida:
 *   agora é o mesmo `<SectionTitle>` em qualquer largura, sem split mobile/desktop.
 * - Cards: eram `<article>` escritos à mão (Thumbnail + h3/a, sem Categoria, sem
 *   toggle) — por isso o hover de favoritar nunca aparecia, não tinha toggle
 *   nenhum. Viraram `NewsCard size="small" orientation="vertical"` (mesmo padrão
 *   já aplicado em DestaqueSection/UltimaSecao), sem Categoria — preservando o
 *   conteúdo visual de antes, só ganhando o toggle.
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { picsumSrc } from '~/mocks/articles'
import type { IProteinaAnimalSectionProps } from './types'

export function ProteinaAnimalSection({ title = 'Proteína Animal', articles, className }: IProteinaAnimalSectionProps) {
	return (
		<section className={twMerge('w-full', className)}>
			<SectionTitle label={title} color="coral" href="/categoria" />

			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-4 lg:mt-6 pb-6 lg:pb-0 flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
				{articles.map((card) => (
					<NewsCard
						key={card.id}
						contentId={card.id}
						size="small"
						orientation="vertical"
						image={picsumSrc(card.seed, 600, 338)}
						href="/conteudo"
						title={card.title}
					/>
				))}
			</div>
		</section>
	)
}
