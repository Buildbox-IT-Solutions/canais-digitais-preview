/**
 * Componente: TableOfContentsMargin — "Neste artigo" (Opção 2, régua na margem)
 * Sem referência no Figma — protótipo de comparação com a Opção 1
 * (table-of-contents/index.tsx) pro briefing pagina-conteudo-toc, inspirado
 * no TOC do Medium (régua de traços na margem esquerda + painel no hover).
 * Estado A (bloco no início do artigo) é idêntico à Opção 1 — reaproveita
 * <TocInlineBlock>. Estado B muda: em vez do botão pill flutuante, uma
 * régua fixa na margem esquerda que só existe em 2xl: (>=1536px, onde
 * existe espaço vazio de verdade fora do container de max-w-screen-xl —
 * 1280px / 2 = 640px + 40px de respiro = 680px do centro da viewport).
 * Abaixo de 2xl não há nenhum affordance flutuante — fiel ao
 * comportamento do Medium fora do desktop largo (decisão confirmada com o
 * usuário em 2026-07-31).
 * Abre no hover (mouseenter) e no foco por teclado — nunca no clique
 * (fiel ao Medium). Fecha no mouseleave, blur pra fora do wrapper, ou Escape.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-neutral-300, --color-neutral-900, --color-secondary-950, rounded-sm
 */
import type { FocusEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { TocInlineBlock } from '~/components/table-of-contents/toc-inline-block'
import { TocList } from '~/components/table-of-contents/toc-list'
import { prefersReducedMotion } from '~/lib/prefers-reduced-motion'
import { twMerge } from '~/lib/tw-merge'
import { useSentinelVisibility } from '~/lib/use-sentinel-visibility'
import { useTocScrollspy } from '~/lib/use-toc-scrollspy'
import type { ITableOfContentsMarginProps } from './types'

export function TableOfContentsMargin({ headings, className }: ITableOfContentsMarginProps) {
	const [expanded, setExpanded] = useState(true)
	const [panelOpen, setPanelOpen] = useState(false)

	const sentinelRef = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const hasEnoughHeadings = headings.length >= 3
	const activeId = useTocScrollspy(headings, hasEnoughHeadings)
	const blockVisible = useSentinelVisibility(sentinelRef, hasEnoughHeadings)

	// Painel fecha com Escape, além do mouseleave/blur tratados inline.
	useEffect(() => {
		if (!panelOpen) return
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setPanelOpen(false)
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [panelOpen])

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
		window.history.replaceState(null, '', `#${id}`)
		setPanelOpen(false)
	}

	// Foco saindo do wrapper (régua + painel) fecha; foco se movendo entre
	// os dois (ex.: da régua pro link dentro do painel) mantém aberto.
	// Tipado como HTMLElement (não HTMLDivElement/HTMLButtonElement) porque é
	// usado como onBlur tanto do <button> da régua quanto do <div> do painel.
	function handleBlur(e: FocusEvent<HTMLElement>) {
		if (wrapperRef.current?.contains(e.relatedTarget as Node | null)) return
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

			{/* Estado B — régua na margem esquerda, só em telas largas o bastante pra ter espaço vazio de verdade fora do container */}
			{!blockVisible ? (
				<div
					ref={wrapperRef}
					onMouseEnter={() => setPanelOpen(true)}
					onMouseLeave={() => setPanelOpen(false)}
					className="hidden 2xl:block fixed left-[calc(50%_-_680px)] top-1/2 -translate-y-1/2 z-30"
				>
					<button
						type="button"
						aria-label="Neste artigo"
						aria-expanded={panelOpen}
						onFocus={() => setPanelOpen(true)}
						onBlur={handleBlur}
						className="flex flex-col gap-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35 rounded-xs"
					>
						{headings.map((h) => (
							<span
								key={h.id}
								aria-hidden="true"
								className={twMerge(
									'block h-0.5 rounded-full transition-colors motion-reduce:transition-none',
									h.level === 3 ? 'w-3 ml-2' : 'w-4',
									activeId === h.id ? 'bg-secondary-950' : 'bg-neutral-300',
								)}
							/>
						))}
					</button>

					{panelOpen ? (
						<div
							onFocus={() => setPanelOpen(true)}
							onBlur={handleBlur}
							className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-72 max-h-[70vh] overflow-y-auto p-4 rounded-sm bg-white border border-neutral-100 shadow-lg"
						>
							<nav aria-label="Neste artigo">
								<TocList headings={headings} activeId={activeId} onSelect={handleSelect} />
							</nav>
						</div>
					) : null}
				</div>
			) : null}
		</div>
	)
}
