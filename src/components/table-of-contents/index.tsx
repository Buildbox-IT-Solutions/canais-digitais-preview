/**
 * Componente: TableOfContents — "Neste artigo" (TOC híbrido)
 * Sem referência no Figma (feature nova da Fase 5 do briefing
 * pagina-conteudo-toc). Um único componente cobre os dois estados:
 *   Estado A — bloco colapsável no início do conteúdo, aberto por padrão.
 *   Estado B — botão flutuante que aparece quando o bloco A sai da
 *   viewport; abre um painel com a mesma lista.
 * `activeSection` é estado único, compartilhado pelos dois estados.
 * Não renderiza nada quando `headings.length < 3`.
 * Tokens: --color-neutral-100, --color-secondary-950, --text-label-md, rounded-sm
 */
import { useEffect, useRef, useState } from 'react'
import { Icon } from '~/components/icon'
import { twMerge } from '~/lib/tw-merge'
import type { Heading } from '~/types/post'
import type { ITableOfContentsProps } from './types'

function prefersReducedMotion(): boolean {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function TableOfContents({ headings, className }: ITableOfContentsProps) {
	const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)
	const [blockVisible, setBlockVisible] = useState(true)
	const [expanded, setExpanded] = useState(true)
	const [panelOpen, setPanelOpen] = useState(false)

	const sentinelRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)

	const hasEnoughHeadings = headings.length >= 3

	// Scrollspy: ativa a seção quando ela entra no terço superior da viewport.
	useEffect(() => {
		if (!hasEnoughHeadings) return

		const elements = headings
			.map((h) => document.getElementById(h.id))
			.filter((el): el is HTMLElement => el !== null)

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id)
				})
			},
			{ rootMargin: '0px 0px -66% 0px', threshold: 0 },
		)

		elements.forEach((el) => observer.observe(el))
		return () => observer.disconnect()
	}, [headings, hasEnoughHeadings])

	// Estado B aparece quando o bloco do Estado A sai da viewport.
	useEffect(() => {
		if (!hasEnoughHeadings || !sentinelRef.current) return

		const observer = new IntersectionObserver(([entry]) => setBlockVisible(entry.isIntersecting), {
			threshold: 0,
		})
		observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [hasEnoughHeadings])

	// Painel do Estado B fecha ao clicar fora ou pressionar Escape.
	useEffect(() => {
		if (!panelOpen) return

		function handleClickOutside(e: MouseEvent) {
			const target = e.target as Node
			if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
			setPanelOpen(false)
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setPanelOpen(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [panelOpen])

	if (!hasEnoughHeadings) return null

	function handleSelect(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
		window.history.replaceState(null, '', `#${id}`)
		setPanelOpen(false)
	}

	function renderList(onSelect: (id: string) => void) {
		return (
			<ul className="flex flex-col">
				{headings.map((h: Heading) => (
					<li key={h.id} className={h.level === 3 ? 'pl-4' : undefined}>
						<a
							href={`#${h.id}`}
							aria-current={activeId === h.id ? 'location' : undefined}
							onClick={(e) => {
								e.preventDefault()
								onSelect(h.id)
							}}
							className={twMerge(
								'block py-3 font-body text-body-md rounded-xs outline-none transition-colors motion-reduce:transition-none',
								'focus-visible:ring-2 focus-visible:ring-secondary-950/35',
								activeId === h.id
									? 'font-bold text-secondary-950'
									: 'text-neutral-700 hover:text-primary-600',
							)}
						>
							{h.text}
						</a>
					</li>
				))}
			</ul>
		)
	}

	return (
		<div className={className}>
			{/* Estado A — bloco no início do conteúdo */}
			<div ref={sentinelRef}>
				<nav aria-label="Neste artigo" className="w-full border border-neutral-100 rounded-sm bg-white">
					<button
						type="button"
						onClick={() => setExpanded((v) => !v)}
						aria-expanded={expanded}
						className="flex items-center justify-between gap-2 p-4 w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35 rounded-sm"
					>
						<span className="font-body font-bold text-label-md tracking-wider text-neutral-700 uppercase">
							Neste artigo
						</span>
						<Icon
							name="chevron-down"
							className={twMerge(
								'size-5 text-primary-600 shrink-0 motion-safe:transition-transform motion-reduce:transition-none',
								expanded && 'rotate-180',
							)}
						/>
					</button>
					{expanded ? <div className="px-4 pb-4">{renderList(handleSelect)}</div> : null}
				</nav>
			</div>

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
						<Icon name="menu" className="size-5" />
						Neste artigo
						<Icon
							name="chevron-down"
							className={twMerge(
								'size-4 motion-safe:transition-transform motion-reduce:transition-none',
								panelOpen && 'rotate-180',
							)}
						/>
					</button>
					{panelOpen ? (
						<div
							ref={panelRef}
							className="absolute right-0 mt-2 w-72 max-h-[70vh] overflow-y-auto p-4 rounded-sm bg-white border border-neutral-100 shadow-lg"
						>
							<nav aria-label="Neste artigo">{renderList(handleSelect)}</nav>
						</div>
					) : null}
				</div>
			) : null}
		</div>
	)
}
