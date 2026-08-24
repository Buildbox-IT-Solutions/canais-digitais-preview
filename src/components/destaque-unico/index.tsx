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
 * `orientation="horizontal"` + `boxed` (+ `sponsor` opcional). A foto fica sempre à
 * direita e não existe versão com a foto à esquerda (decisão do Pedro em 2026-08-23)
 * — por isso não há prop pra isso aqui nem story do lado invertido. Isso já não é
 * nem escolha deste arquivo: o split do `boxed` do NewsCard tem a ordem fixa desde
 * 2026-08-24, quando a prop `inverse` saiu do contrato do card. Nada de
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
 * Clamps — DOIS pares, conforme haja patrocinador (decisões do Pedro em 2026-08-23 e
 * 2026-08-24):
 *
 *   sem sponsor  → título 3 linhas, lead 4
 *   com sponsor  → título 2 linhas, lead 3   (o par que o Figma desenha)
 *
 * O motivo de existirem dois: no split a foto e o texto dividem a MESMA altura, então
 * cada par de clamps exige uma largura mínima pra caber — e a SponsorLine consome 80px
 * desse orçamento. A conta (só desktop: abaixo de `lg:` o card empilha, a foto mantém
 * 3:2 e o texto flui embaixo, sem clamp apertando nada):
 *
 *   altura da foto   = (min(largura, 1280) − 48 de página − 2 de borda) / 2 / 1,5
 *   custo fixo texto = 64 (p-8) + 16 (categoria) + 16 (2× gap-2)              = 96
 *   custo do sponsor = 24 (gap-6) + 56 (SponsorLine: pt-3 + 16 + gap-1 + 24)  = 80
 *   custo das linhas = 40×linhas do título + 24×linhas do lead
 *
 * Daí a largura mínima de cada par. COM patrocinador: 2+3 = 152px pede 1034px; 3+3
 * pede 1082px; o 3+4 pede 1226px. SEM patrocinador o 3+4 pede 986px, e é por isso que
 * ele é o par lá — cabe em toda a faixa desde a entrada do `lg:`.
 *
 * Por que 2+3 no patrocinado e não 2+2 (que cabe com folga em qualquer largura): o 2+3
 * só estoura de 1024 a 1034px, e por 3px — o orçamento em 1024 é 149px e o par pede
 * 152. Comprar 10px de largura ao custo de uma linha de lead não se paga. E por que
 * não um clamp responsivo (2+3 abaixo de `xl:`, 3+4 acima), que é o que a conta pediria:
 * com 11 portais reimplementando isso em PHP, um clamp que troca de valor no breakpoint
 * é uma regra a mais pra divergir entre eles. Par fixo é mais seguro de reproduzir que
 * ótimo.
 *
 * Quando estoura (o 2+3 entre 1024 e 1034px), o `lg:grow` da Thumbnail deixa a foto
 * crescer além do 3:2 pra acompanhar o texto e a imagem recorta por `object-cover` —
 * não distorce nem quebra layout. Ver docs/_achados.md.
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
					image={picsumSrc(article.seed, 1224, 816)}
					mediaRatio="photo"
					href={article.href ?? '/conteudo'}
					title={article.title}
					categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
					lead={article.lead}
					titleClassName={sponsor ? 'line-clamp-2' : 'line-clamp-3'}
					leadClassName={sponsor ? 'line-clamp-3' : 'line-clamp-4'}
					sponsor={sponsor ? { company: sponsor, href: sponsorHref } : undefined}
				/>
			</div>
		</section>
	)
}
