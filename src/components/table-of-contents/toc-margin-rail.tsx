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
	/** Título muted acima da lista do painel. Só passado pela versão final (table-of-contents-icon) — a Opção 2 arquivada (table-of-contents-margin) não passa, mantendo o visual congelado. */
	title?: string
	/** Espaçamento mais compacto entre itens do painel. Mesma regra do `title` acima. */
	dense?: boolean
}

/**
 * Régua de tracinhos na margem esquerda + painel no hover — visual e
 * interação do Medium. Não está mais em uso pela versão vigente do TOC
 * (table-of-contents-icon, só botão flutuante desde 2026-08-31): sobrevive
 * nas duas variantes arquivadas e congeladas — table-of-contents-margin
 * (nunca passa `title`/`dense`) e table-of-contents-hybrid (onde é a metade
 * "tela larga", com a outra metade sendo o botão flutuante abaixo do
 * breakpoint descrito adiante).
 * Colada na borda real da viewport (`left-6`), não mais centralizada em
 * relação ao container de max-w-screen-xl — decisão de 2026-08-18 pra
 * baixar o breakpoint sem depender da folga fora do container (que só
 * existe de verdade a partir de xl/1280px). `min-[1400px]` é o menor ponto
 * em que a régua (traço + respiro) cabe antes do início do texto do artigo
 * sem sobrepor — o painel do hover pode invadir o conteúdo (aceito por
 * decisão do usuário em 2026-08-18); só a régua em si não pode.
 * Abaixo do breakpoint não renderiza nada (visível).
 * Abre no hover (mouseenter) e no foco por teclado — nunca no clique.
 * Fecha no mouseleave, blur pra fora do wrapper, ou Escape.
 */
export function TocMarginRail({ headings, activeId, onSelect, title, dense }: ITocMarginRailProps) {
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
				'hidden min-[1400px]:block fixed left-6 top-1/2 -translate-y-1/2 z-30',
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
						title={title}
						onFocus={() => setPanelOpen(true)}
						onBlur={handleBlur}
						className="absolute left-full ml-3 top-1/2 -translate-y-1/2"
					>
						<nav aria-label="Neste artigo">
							<TocList headings={headings} activeId={activeId} onSelect={onSelect} dense={dense} />
						</nav>
					</TocPanel>
				) : null}
			</div>
		</div>
	)
}
