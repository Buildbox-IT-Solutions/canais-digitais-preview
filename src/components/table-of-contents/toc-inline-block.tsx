import type { RefObject } from 'react'
import { Icon } from '~/components/icon'
import { twMerge } from '~/lib/tw-merge'
import type { Heading } from '~/types/post'
import { TocList } from './toc-list'

interface ITocInlineBlockProps {
	headings: Heading[]
	activeId: string | null
	expanded: boolean
	onToggleExpanded: () => void
	onSelect: (id: string) => void
	sentinelRef: RefObject<HTMLDivElement | null>
}

/**
 * Estado A do TOC híbrido — bloco colapsável "Neste artigo" no início do
 * conteúdo. Idêntico entre a Opção 1 (painel flutuante) e a Opção 2 (régua
 * na margem) — só o Estado B (o que aparece ao rolar) difere entre elas.
 */
export function TocInlineBlock({
	headings,
	activeId,
	expanded,
	onToggleExpanded,
	onSelect,
	sentinelRef,
}: ITocInlineBlockProps) {
	return (
		<div ref={sentinelRef}>
			<nav
				aria-label="Neste artigo"
				className="w-full border border-neutral-100 rounded-sm bg-white transition-colors hover:border-neutral-900"
			>
				<button
					type="button"
					onClick={onToggleExpanded}
					aria-expanded={expanded}
					className="flex items-center justify-between gap-2 p-4 w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-secondary-950/35 rounded-sm"
				>
					<span className="font-display font-bold text-title-lg text-primary-600">Neste artigo</span>
					<Icon
						name="chevron-down"
						className={twMerge(
							'size-6 text-primary-600 shrink-0 motion-safe:transition-transform motion-reduce:transition-none',
							expanded && 'rotate-180',
						)}
					/>
				</button>
				{expanded ? (
					<div className="px-4 pb-4">
						<TocList headings={headings} activeId={activeId} onSelect={onSelect} />
					</div>
				) : null}
			</nav>
		</div>
	)
}
