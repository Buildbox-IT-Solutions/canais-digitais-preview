/**
 * Componente: TableOfContents — "Neste artigo" (TOC híbrido, Opção 1)
 * ARQUIVADO em 2026-07-31 — só a Opção 3 (table-of-contents-icon) segue
 * pra produção. Mantido congelado, acessível via `?toc=pill` a partir de
 * `/archive` (referência histórica; não recebe mais ajustes de design).
 * Sem referência no Figma (feature nova da Fase 5 do briefing
 * pagina-conteudo-toc). Um único componente cobre os dois estados:
 *   Estado A — bloco colapsável no início do conteúdo, aberto por padrão
 *   (ver <TocInlineBlock>, compartilhado com a Opção 2 em table-of-contents-margin).
 *   Estado B — botão flutuante que aparece quando o bloco A sai da
 *   viewport; abre um painel com a mesma lista.
 * `activeId` é estado único (via useTocScrollspy), compartilhado pelos dois estados.
 * Não renderiza nada quando `headings.length < 3`.
 * Título do Estado A estilizado igual ao header do AiSummaryBlock ("Ver
 * resumo") — mesmo tratamento, incluindo o hover de borda (Figma node
 * 619:7291: border neutral-100 -> neutral-900 no hover).
 * Tokens: --color-neutral-100, --color-neutral-900, --color-secondary-950, --text-title-lg, rounded-sm
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { twMerge } from '~/lib/tw-merge'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useSentinelVisibility } from '~/lib/use-sentinel-visibility'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import { TocInlineBlock } from './toc-inline-block'
import { TocList } from './toc-list'
import { TocPanel } from './toc-panel'
import type { ITableOfContentsProps } from './types'

export function TableOfContents({ headings, className }: ITableOfContentsProps) {
	const [expanded, setExpanded] = useState(true)
	const [panelOpen, setPanelOpen] = useState(false)

	const sentinelRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)

	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)
	const blockVisible = useSentinelVisibility(sentinelRef, hasEnoughHeadings)

	useClickAwayAndEscape(triggerRef, panelRef, panelOpen, () => setPanelOpen(false))

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		scrollToHeading(id)
		setPanelOpen(false)
	}

	return (
		<div className={className}>
			<TocInlineBlock
				headings={headings}
				activeId={activeId}
				expanded={expanded}
				onToggleExpanded={() => setExpanded((v) => !v)}
				onSelect={handleSelect}
				sentinelRef={sentinelRef}
			/>

			{/* Estado B — botão flutuante, some quando o bloco acima está visível */}
			{!blockVisible ? (
				<div className="fixed top-[100px] right-4 lg:right-6 z-30">
					<button
						ref={triggerRef}
						type="button"
						onClick={() => setPanelOpen((v) => !v)}
						aria-expanded={panelOpen}
						aria-label="Neste artigo"
						className="flex items-center gap-2 h-11 pl-4 pr-3 rounded-full bg-white border border-neutral-100 shadow-lg text-body-md font-body font-semibold text-primary-600 outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35"
					>
						<Icon name="toc" className="size-5" />
						Neste artigo
						<Icon
							name="expand-more"
							className={twMerge(
								'size-4 motion-safe:transition-transform motion-reduce:transition-none',
								panelOpen && 'rotate-180',
							)}
						/>
					</button>
					{panelOpen ? (
						<TocPanel ref={panelRef} className="absolute right-0 mt-2">
							<nav aria-label="Neste artigo">
								<TocList headings={headings} activeId={activeId} onSelect={handleSelect} />
							</nav>
						</TocPanel>
					) : null}
				</div>
			) : null}
		</div>
	)
}
