/**
 * Componente: TableOfContentsHybrid — "Neste artigo" (híbrido régua + botão)
 * ARQUIVADO em 2026-08-31 — snapshot congelado da versão que esteve em
 * produção entre 2026-07-31 e 2026-08-31. Acessível via `?toc=hibrido` a
 * partir de `/archive`; não recebe mais ajustes de design.
 *
 * Por que saiu: feedback da Micaelly (2026-08-25) de que, no desktop, a
 * régua "não ficou muito intuitiva a visualização para o usuário, ficando
 * despercebida". A régua discreta era intencional (padrão de Medium e
 * ChatGPT: índice como ferramenta de apoio, não conteúdo), mas a
 * descoberta pesou mais que a limpeza visual — a versão vigente
 * (table-of-contents-icon) passou a usar o botão flutuante com texto em
 * TODOS os breakpoints, igualando desktop e mobile.
 *
 * Comportamento congelado aqui (para não perder o racional se precisarmos
 * reviver):
 * - Em telas largas (>=1400px), régua de tracinhos na margem esquerda
 *   (<TocMarginRail>, compartilhada com a Opção 2 arquivada), abre no
 *   hover, visível desde o carregamento.
 * - 1400px vem da decisão de 2026-08-18 (Pedro): a régua saiu de
 *   centralizada em relação ao container (`2xl`/1536px, com gate de scroll
 *   pra não invadir a faixa vertical do título/cabeçalho no carregamento)
 *   pra colada na borda real da viewport (`left-6`, sem gate — nessa
 *   posição ela não competia mais com o título/cabeçalho). 1400px é o menor
 *   ponto em que a régua cabe sem sobrepor o início do texto do artigo; o
 *   painel do hover podia invadir o conteúdo, só a régua em si não podia —
 *   trade-off aceito deliberadamente pra cobrir notebooks como MacBook Pro
 *   14", que não chegam a 1536px.
 * - Abaixo de 1400px, botão flutuante com texto "Neste artigo" fixo
 *   top-right, clique abre/fecha. A distância até o header é a mesma da
 *   margem direita (`right-4`/`lg:right-6`), medida a partir da altura REAL
 *   do header (`useHeaderHeight`) em vez de um valor fixo — o header
 *   alterna Expanded/Compact e muda de altura por breakpoint (feedback do
 *   PO em 2026-07-31).
 * - Os dois blocos ficam montados ao mesmo tempo; a visibilidade por
 *   breakpoint é só CSS (`hidden min-[1400px]:block` / `min-[1400px]:hidden`)
 *   — elementos com `display:none` saem da árvore de foco/tab.
 * - Painel com título muted "Neste artigo" e itens `dense`.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-neutral-500, --color-primary-600, --color-secondary-950, rounded-sm, rounded-full
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { TocList } from '~/components/table-of-contents/toc-list'
import { TocMarginRail } from '~/components/table-of-contents/toc-margin-rail'
import { TocPanel } from '~/components/table-of-contents/toc-panel'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useHeaderHeight } from '~/lib/use-header-height'
import { useMediaQuery } from '~/lib/use-media-query'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsHybridProps } from './types'

export function TableOfContentsHybrid({ headings, className }: ITableOfContentsHybridProps) {
	const [panelOpen, setPanelOpen] = useState(false)

	const triggerRef = useRef<HTMLButtonElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)
	const headerHeight = useHeaderHeight()
	const isLgUp = useMediaQuery('(min-width: 1024px)')
	// Mesma distância que o botão já tem da margem direita (right-4/lg:right-6).
	const buttonTop = headerHeight + (isLgUp ? 24 : 16)

	useClickAwayAndEscape(triggerRef, panelRef, panelOpen, () => setPanelOpen(false))

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		scrollToHeading(id)
		setPanelOpen(false)
	}

	return (
		<div className={className}>
			<TocMarginRail
				headings={headings}
				activeId={activeId}
				onSelect={scrollToHeading}
				title="Neste artigo"
				dense
			/>

			<div className="min-[1400px]:hidden fixed right-4 lg:right-6 z-30" style={{ top: buttonTop }}>
				<button
					ref={triggerRef}
					type="button"
					onClick={() => setPanelOpen((v) => !v)}
					aria-expanded={panelOpen}
					aria-label="Neste artigo"
					className="flex items-center gap-2 h-11 px-4 rounded-full bg-white border border-neutral-100 shadow-lg text-body-md font-body font-semibold text-primary-600 outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
				>
					<Icon name="toc" className="size-5" />
					Neste artigo
				</button>
				{panelOpen ? (
					<TocPanel ref={panelRef} title="Neste artigo" className="absolute right-0 mt-2">
						<nav aria-label="Neste artigo">
							<TocList headings={headings} activeId={activeId} onSelect={handleSelect} dense />
						</nav>
					</TocPanel>
				) : null}
			</div>
		</div>
	)
}
