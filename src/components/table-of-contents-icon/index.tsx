/**
 * Componente: TableOfContentsIcon — "Neste artigo" (versão final)
 * Sem referência no Figma. Única versão de TOC apresentada ao PO — as
 * outras três (table-of-contents/, table-of-contents-margin/ e
 * table-of-contents-hybrid/) foram arquivadas e ficam congeladas,
 * acessíveis via `?toc=pill`/`?toc=margem`/`?toc=hibrido` a partir de
 * `/archive`.
 * Botão flutuante com texto "Neste artigo" em TODOS os breakpoints, fixo
 * top-right, clique abre/fecha, sempre visível desde o carregamento —
 * desktop e mobile idênticos. Decisão de 2026-08-31 (Micaelly, feedback de
 * 2026-08-25): até então, a partir de 1400px o botão dava lugar à régua de
 * tracinhos na margem esquerda (ver table-of-contents-hybrid, snapshot
 * congelado com o racional completo daquele breakpoint). A régua discreta
 * era deliberada — padrão de Medium e ChatGPT, índice tratado como
 * ferramenta de apoio e não como conteúdo — mas passou despercebida no
 * desktop na revisão com a Micaelly, e descoberta pesou mais que limpeza
 * visual. Um único affordance explícito em toda largura elimina também a
 * divergência desktop/mobile, que é o risco central com 11 portais.
 * A distância até o header é a mesma da margem direita
 * (`right-4`/`lg:right-6`), mas medida a partir da altura REAL do header
 * (`useHeaderHeight`) em vez de um valor fixo — o header alterna
 * Expanded/Compact e muda de altura por breakpoint, então um `top-N` fixo
 * grudava ou afastava demais dependendo do estado (feedback do PO em
 * 2026-07-31, terceira rodada de ajuste).
 * Botão sem seta indicadora — só ícone `toc` + texto (pedido do PO em 2026-08-03).
 * O popover ganha o título muted "Neste artigo" e itens mais compactos
 * (`dense`) — só nesta versão; a régua da Opção 2 arquivada continua sem
 * título e com o espaçamento original.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-primary-600, --color-secondary-950, rounded-full
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { TocList } from '~/components/table-of-contents/toc-list'
import { TocPanel } from '~/components/table-of-contents/toc-panel'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useHeaderHeight } from '~/lib/use-header-height'
import { useMediaQuery } from '~/lib/use-media-query'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsIconProps } from './types'

export function TableOfContentsIcon({ headings, className }: ITableOfContentsIconProps) {
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
			<div className="fixed right-4 lg:right-6 z-30" style={{ top: buttonTop }}>
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
