/**
 * Componente: TableOfContentsIcon — "Neste artigo" (versão final)
 * Sem referência no Figma. Única versão de TOC apresentada ao PO — as
 * outras duas (table-of-contents/ e table-of-contents-margin/) foram
 * arquivadas em 2026-07-31 e ficam congeladas, acessíveis só via
 * `?toc=pill`/`?toc=margem` a partir de `/archive`.
 * Em telas largas (>=1400px), se comporta como a régua na margem
 * (<TocMarginRail> compartilhada com a Opção 2 arquivada) — abre no hover,
 * visível desde o carregamento da página. Decisão de 2026-08-18 (Pedro):
 * régua saiu de centralizada em relação ao container (`2xl`/1536px, com
 * gate de scroll pra não invadir a faixa vertical do título/cabeçalho no
 * carregamento) pra colada na borda real da viewport (`left-6`, sem gate —
 * nessa posição ela não compete mais com o título/cabeçalho, então o
 * motivo original do gate deixou de existir). 1400px é o menor ponto em
 * que ela cabe sem sobrepor o início do texto do artigo; o painel do hover
 * pode invadir o conteúdo, só a régua em si não pode — trade-off aceito
 * deliberadamente pra viabilizar um breakpoint menor (cobre notebooks como
 * MacBook Pro 14", que não chegavam a 1536px).
 * Abaixo desse limiar, cai para um botão flutuante com texto "Neste
 * artigo" (reaproveitado da Opção 1 arquivada), fixo top-right, clique
 * abre/fecha, sempre visível desde o carregamento. A distância até o
 * header é a mesma da margem direita (`right-4`/`lg:right-6`), mas medida
 * a partir da altura REAL do header (`useHeaderHeight`) em vez de um valor
 * fixo — o header alterna Expanded/Compact e muda de altura por
 * breakpoint, então um `top-N` fixo grudava ou afastava demais dependendo
 * do estado (feedback do PO em 2026-07-31, terceira rodada de ajuste).
 * Os dois blocos (régua e botão) ficam montados ao mesmo tempo; a
 * visibilidade por breakpoint é só CSS (`hidden min-[1400px]:block` /
 * `min-[1400px]:hidden`) — elementos com `display:none` saem da árvore de
 * foco/tab.
 * Botão sem seta indicadora — só ícone `toc` + texto (pedido do PO em 2026-08-03).
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
