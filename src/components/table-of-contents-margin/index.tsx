/**
 * Componente: TableOfContentsMargin — "Neste artigo" (Opção 2, régua na margem)
 * ARQUIVADO em 2026-07-31 — só a Opção 3 (table-of-contents-icon) segue pra
 * produção. Mantido congelado, acessível via `?toc=margem` a partir de
 * `/archive` (referência histórica; não recebe mais ajustes de design —
 * por isso não passa `title`/`dense` pra <TocMarginRail>, diferente da
 * Opção 3, que reusa o mesmo componente com esses extras).
 * Sem referência no Figma — protótipo de comparação com a Opção 1
 * (table-of-contents/index.tsx) pro briefing pagina-conteudo-toc, inspirado
 * no TOC do Medium (régua de traços na margem esquerda + painel no hover).
 * Diferente da Opção 1: não tem bloco "Neste artigo" no início do artigo —
 * só a régua, sempre visível em telas largas o bastante (correção do
 * usuário em 2026-07-31, pós-primeira rodada de revisão com o cliente).
 * A régua em si (tracinhos, hover/foco/blur/Escape, painel) vive em
 * <TocMarginRail>, compartilhada com a Opção 3 (table-of-contents-icon),
 * que reusa a mesma régua em telas largas e cai pro botão flutuante abaixo
 * do breakpoint em que ela deixa de caber.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-neutral-300, --color-neutral-900, --color-secondary-950, rounded-sm
 */
import { TocMarginRail } from '~/components/table-of-contents/toc-margin-rail'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsMarginProps } from './types'

export function TableOfContentsMargin({ headings, className }: ITableOfContentsMarginProps) {
	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)

	if (!hasEnoughHeadings) return null

	return (
		<div className={className}>
			<TocMarginRail headings={headings} activeId={activeId} onSelect={scrollToHeading} />
		</div>
	)
}
