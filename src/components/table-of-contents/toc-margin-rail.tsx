import type { FocusEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import type { Heading } from '~/types/post'
import { TocList } from './toc-list'
import { TocPanel } from './toc-panel'

interface ITocMarginRailProps {
	headings: Heading[]
	activeId: string | null
	onSelect: (id: string) => void
}

/**
 * Régua de tracinhos na margem esquerda + painel no hover — visual e
 * interação do Medium. Reaproveitada pela Opção 2 (table-of-contents-margin,
 * onde sempre é a única UI) e pela Opção 3 (table-of-contents-icon, onde é a
 * metade "tela larga" do híbrido — a outra metade é o botão flutuante,
 * visível só abaixo de 2xl).
 * Só existe em 2xl: (>=1536px, onde existe espaço vazio de verdade fora do
 * container de max-w-screen-xl — 1280px / 2 = 640px + 40px de respiro =
 * 680px do centro da viewport). Abaixo de 2xl não renderiza nada (visível).
 * Abre no hover (mouseenter) e no foco por teclado — nunca no clique.
 * Fecha no mouseleave, blur pra fora do wrapper, ou Escape.
 */
export function TocMarginRail({ headings, activeId, onSelect }: ITocMarginRailProps) {
	const [panelOpen, setPanelOpen] = useState(false)
	const wrapperRef = useRef<HTMLDivElement>(null)

	// Painel fecha com Escape, além do mouseleave/blur tratados inline.
	useEffect(() => {
		if (!panelOpen) return
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setPanelOpen(false)
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [panelOpen])

	// Foco saindo do wrapper (régua + painel) fecha; foco se movendo entre
	// os dois (ex.: da régua pro link dentro do painel) mantém aberto.
	// Tipado como HTMLElement (não HTMLDivElement/HTMLButtonElement) porque é
	// usado como onBlur tanto do <button> da régua quanto do <div> do painel.
	function handleBlur(e: FocusEvent<HTMLElement>) {
		if (wrapperRef.current?.contains(e.relatedTarget as Node | null)) return
		setPanelOpen(false)
	}

	return (
		<div
			ref={wrapperRef}
			onMouseEnter={() => setPanelOpen(true)}
			onMouseLeave={() => setPanelOpen(false)}
			className={twMerge(
				'hidden 2xl:block fixed left-[calc(50%_-_680px)] top-1/2 -translate-y-1/2 z-30',
				panelOpen && 'w-96',
			)}
		>
			{/*
				Largura do wrapper externo precisa ser >= régua (~16px) + ml-3
				(12px) + painel (288px) quando o painel está aberto — daí o w-96
				condicional. O left-full do painel resolve contra o div interno
				relative inline-block (não este wrapper), então esse div interno
				é essencial — não remover nem trocar por block/w-full.
			*/}
			<div className="relative inline-block">
				<button
					type="button"
					aria-label="Neste artigo"
					aria-expanded={panelOpen}
					onFocus={() => setPanelOpen(true)}
					onBlur={handleBlur}
					className="flex flex-col gap-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35 rounded-xs"
				>
					{headings.map((h) => (
						<span
							key={h.id}
							aria-hidden="true"
							className={twMerge(
								'block h-0.5 rounded-full transition-colors motion-reduce:transition-none',
								h.level === 3 ? 'w-2' : 'w-4',
								activeId === h.id ? 'bg-secondary-950' : 'bg-neutral-300',
							)}
						/>
					))}
				</button>

				{panelOpen ? (
					<TocPanel
						onFocus={() => setPanelOpen(true)}
						onBlur={handleBlur}
						className="absolute left-full ml-3 top-1/2 -translate-y-1/2"
					>
						<nav aria-label="Neste artigo">
							<TocList headings={headings} activeId={activeId} onSelect={onSelect} />
						</nav>
					</TocPanel>
				) : null}
			</div>
		</div>
	)
}
