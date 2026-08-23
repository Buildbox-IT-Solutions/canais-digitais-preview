/**
 * Componente: DestaqueUnico — "Destaque único" / super-highlight da home
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6775-18688
 * Handoff: node 6780:2648 ("📋 Handoff — Destaque Home"), Opção B — Card Lado a Lado.
 *
 * Seção configurável (on/off no admin do WP) que destaca 1 conteúdo na posição mais
 * nobre da home, ACIMA da seção de 3 destaques — não a substitui. Desligada, a seção
 * não renderiza e o resto da home segue intacto (RN02/RN03). Quem decide isso é a
 * tela: este componente só monta a seção.
 *
 * O CARD é uma instância do `NewsCard` — variante `size="xlarge"` +
 * `orientation="horizontal"` + `boxed` + `inverse` (+ `sponsor` opcional). Nada de
 * markup próprio aqui: moldura, split 50/50, empilhamento no mobile, SponsorLine,
 * favoritar e modal de auth vêm todos do NewsCard. Este arquivo é só o invólucro de
 * seção (container `max-w-screen-xl`, padding de página) mais a documentação das
 * regras de negócio abaixo.
 *
 * Regras de negócio cobertas aqui:
 * - RN01 — exatamente 1 conteúdo, sem slider nem múltipla seleção: a prop é um
 *   `Article`, não uma lista. Não existe caminho pra renderizar dois.
 * - RN05 — `sponsor` é opcional: sem a prop, a SponsorLine não existe.
 * - RN06 — categoria vem do próprio artigo (`article.category`/`categoryColor`),
 *   nunca de uma prop separada, pra não abrir espaço pra divergir do conteúdo.
 * - RN07 — título e imagem apontam pra página do artigo.
 *
 * Proporção da imagem: 3:2 (`mediaRatio="photo"`, aspect 1.5) — no Figma o card tem
 * 1224×408 com a imagem em 612×408, e o handoff registra "aspect-ratio 300/200 na
 * foto". Combinada com `w-1/2`, é ela que dita a altura do card, sem altura fixa.
 *
 * Clamps: título e lead em 4 linhas cada (decisão do Pedro em 2026-08-23). O Figma
 * desenha 2 e 3 (80px = 2×40, 72px = 3×24), mas essas são as alturas do conteúdo de
 * exemplo, não um limite editorial — 4/4 dá folga pra manchete real sem deixar o
 * texto crescer indefinidamente. Ver docs/_achados.md.
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { picsumSrc } from '~/mocks/articles'
import type { IDestaqueUnicoProps } from './types'

export function DestaqueUnico({ article, sponsor, sponsorHref, className }: IDestaqueUnicoProps) {
	return (
		<section className={twMerge('w-full', className)}>
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
				<NewsCard
					contentId={article.id}
					size="xlarge"
					orientation="horizontal"
					boxed
					inverse
					image={picsumSrc(article.seed, 1224, 816)}
					mediaRatio="photo"
					href={article.href ?? '/conteudo'}
					title={article.title}
					categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
					lead={article.lead}
					titleClassName="line-clamp-4"
					leadClassName="line-clamp-4"
					sponsor={sponsor ? { company: sponsor, href: sponsorHref } : undefined}
				/>
			</div>
		</section>
	)
}
