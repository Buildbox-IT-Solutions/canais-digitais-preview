import { twMerge } from '~/lib/tw-merge'
import type { Heading } from '~/types/post'

interface ITocListProps {
	headings: Heading[]
	activeId: string | null
	onSelect: (id: string) => void
}

/** Lista de headings do TOC — reaproveitada pelo bloco do topo e pelos painéis flutuantes das duas opções. */
export function TocList({ headings, activeId, onSelect }: ITocListProps) {
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
