/**
 * Componente: TableOfContentsIcon — "Neste artigo" (versão final)
 * Sem referência no Figma. Única versão de TOC apresentada ao PO — as
 * outras duas (table-of-contents/ e table-of-contents-margin/) foram
 * arquivadas em 2026-07-31 e ficam congeladas, acessíveis só via
 * `?toc=pill`/`?toc=margem` a partir de `/archive`.
 * Em telas largas (2xl/>=1536px), se comporta como a régua na margem
 * (<TocMarginRail> compartilhada com a Opção 2 arquivada) — abre no hover.
 * A régua só aparece depois que a página rola além de um marcador logo
 * abaixo da imagem destaque (`useScrolledPast`) — no carregamento da
 * página ela ficaria na mesma faixa vertical do título/cabeçalho, o que
 * ficava visualmente ruim (feedback do PO em 2026-07-31).
 * Abaixo desse limiar, cai para um botão flutuante com texto "Neste
 * artigo" (reaproveitado da Opção 1 arquivada), fixo top-right, clique
 * abre/fecha — esse continua sempre visível desde o carregamento, sem
 * gate de scroll (só a régua precisa do gate). Os dois blocos (régua e
 * botão) ficam montados ao mesmo tempo; a visibilidade por breakpoint é
 * só CSS (`hidden 2xl:block` / `2xl:hidden`) — elementos com
 * `display:none` saem da árvore de foco/tab.
 * Seta do botão é `arrow-drop-down` (mesmo ícone do botão "Acessar" do
 * header), não `chevron-down` — padronização pedida na revisão com o PO.
 * O popover (tanto da régua quanto do botão) ganha o título muted "Neste
 * artigo" e itens mais compactos (`dense`) — só nesta versão; a régua da
 * Opção 2 arquivada continua sem título e com o espaçamento original.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-neutral-500, --color-primary-600, --color-secondary-950, rounded-sm, rounded-full
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { TocList } from '~/components/table-of-contents/toc-list'
import { TocMarginRail } from '~/components/table-of-contents/toc-margin-rail'
import { TocPanel } from '~/components/table-of-contents/toc-panel'
import { scrollToHeading } from '~/lib/scroll-to-heading'
import { twMerge } from '~/lib/tw-merge'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useScrolledPast } from '~/lib/use-scrolled-past'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsIconProps } from './types'

export function TableOfContentsIcon({ headings, className }: ITableOfContentsIconProps) {
	const [panelOpen, setPanelOpen] = useState(false)

	const triggerRef = useRef<HTMLButtonElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const railAnchorRef = useRef<HTMLDivElement>(null)

	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)
	const pastHero = useScrolledPast(railAnchorRef, hasEnoughHeadings)

	useClickAwayAndEscape(triggerRef, panelRef, panelOpen, () => setPanelOpen(false))

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		scrollToHeading(id)
		setPanelOpen(false)
	}

	return (
		<div className={className}>
			{/* Marcador logo abaixo da imagem destaque — só define quando a régua pode aparecer. h-px (não h-0) porque um sentinel de altura zero é observado de forma inconsistente pelo IntersectionObserver entre browsers. */}
			<div ref={railAnchorRef} aria-hidden="true" className="h-px" />

			{pastHero ? (
				<TocMarginRail
					headings={headings}
					activeId={activeId}
					onSelect={scrollToHeading}
					title="Neste artigo"
					dense
				/>
			) : null}

			<div className="2xl:hidden fixed top-24 right-4 lg:right-6 z-30">
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
						name="arrow-drop-down"
						className={twMerge(
							'size-4 motion-safe:transition-transform motion-reduce:transition-none',
							panelOpen && 'rotate-180',
						)}
					/>
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
