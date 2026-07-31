/**
 * Componente: TableOfContentsIcon — "Neste artigo" (Opção 3, híbrido)
 * Sem referência no Figma — protótipo de comparação com as Opções 1 e 2
 * pro briefing pagina-conteudo-toc. Não é uma terceira alternativa
 * independente: é um híbrido entre a Opção 1 e a Opção 2 (correção do
 * usuário em 2026-07-31, pós-primeira rodada de revisão).
 * Em telas largas (mesmo limiar 2xl/>=1536px que a Opção 2 já usa), se
 * comporta exatamente como a Opção 2 — <TocMarginRail> compartilhada, régua
 * de tracinhos na margem, abre no hover. Só abaixo desse limiar, onde a
 * régua não cabe, cai para o botão flutuante com ícone (estilo Claude: só
 * ícone, sem texto, sem seta), fixo desde o carregamento da página.
 * Os dois blocos ficam montados ao mesmo tempo; a visibilidade é só CSS
 * (`hidden 2xl:block` na régua, `2xl:hidden` no botão) — igual ao mecanismo
 * que a própria Opção 2 já usa pra esconder a régua fora de 2xl. Elementos
 * com `display:none` saem da árvore de foco/tab, então não há dois
 * affordances tabuláveis ao mesmo tempo.
 * Botão próprio com as mesmas classes visuais da variante ghost+large do
 * IconButton (não importa o componente — ele não faz forwardRef nem aceita
 * aria-expanded), mais o tratamento de cartão flutuante (bg-white border
 * shadow-lg) que as outras opções já usam. Abre/fecha no clique — igual à
 * Opção 1, diferente da régua (que abre no hover). Fecha no clique fora ou
 * Escape via useClickAwayAndEscape.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-primary-600, --color-secondary-950, rounded-sm, rounded-full
 */
import { useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { TocList } from '~/components/table-of-contents/toc-list'
import { TocMarginRail } from '~/components/table-of-contents/toc-margin-rail'
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
			<TocMarginRail headings={headings} activeId={activeId} onSelect={scrollToHeading} />

			<div className="2xl:hidden fixed top-[100px] left-4 lg:left-6 z-30">
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
