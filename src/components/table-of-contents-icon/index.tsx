/**
 * Componente: TableOfContentsIcon — "Neste artigo" (Opção 3, ícone flutuante)
 * Sem referência no Figma — protótipo de comparação com as Opções 1 e 2
 * pro briefing pagina-conteudo-toc, inspirado no botão de TOC do Claude:
 * só ícone, sem texto, sem seta. Diferente das outras duas: não tem bloco
 * no início do artigo nem gate de scroll/breakpoint — o botão fica fixo
 * (`fixed top-[100px] left-4 lg:left-6 z-30`, espelhando o pill da Opção 1)
 * desde o carregamento da página, em qualquer largura de tela.
 * Botão próprio com as mesmas classes visuais da variante ghost+large do
 * IconButton (não importa o componente — ele não faz forwardRef nem
 * aceita aria-expanded, mesmo motivo pelo qual a Opção 1 também não usa
 * IconButton pro seu próprio botão), mais o tratamento de cartão flutuante
 * (bg-white border shadow-lg) que a Opção 1/2 já usam.
 * Abre/fecha no clique (igual à Opção 1; diferente da Opção 2, que abre no
 * hover). Fecha no clique fora ou Escape via useClickAwayAndEscape.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-primary-600, --color-secondary-950, rounded-sm, rounded-full
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { TocList } from '~/components/table-of-contents/toc-list'
import { TocPanel } from '~/components/table-of-contents/toc-panel'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsIconProps } from './types'

export function TableOfContentsIcon({ headings, className }: ITableOfContentsIconProps) {
	const [panelOpen, setPanelOpen] = useState(false)

	const triggerRef = useRef<HTMLButtonElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)

	useClickAwayAndEscape(triggerRef, panelRef, panelOpen, () => setPanelOpen(false))

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		scrollToHeading(id)
		setPanelOpen(false)
	}

	return (
		<div className={className}>
			<div className="fixed top-[100px] left-4 lg:left-6 z-30">
				<button
					ref={triggerRef}
					type="button"
					onClick={() => setPanelOpen((v) => !v)}
					aria-expanded={panelOpen}
					aria-label="Neste artigo"
					className="inline-flex items-center justify-center rounded-full transition-colors text-primary-600 hover:bg-neutral-50 h-12 w-12 bg-white border border-neutral-100 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
				>
					<Icon name="toc" className="size-6" />
				</button>
				{panelOpen ? (
					<TocPanel ref={panelRef} className="absolute left-0 mt-2">
						<nav aria-label="Neste artigo">
							<TocList headings={headings} activeId={activeId} onSelect={handleSelect} />
						</nav>
					</TocPanel>
				) : null}
			</div>
		</div>
	)
}
