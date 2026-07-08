/**
 * Componente: EspecialistasSection
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-36721
 * Conserta interacao pre-existente: overflow-hidden + botoes sem handler tornavam os
 * itens alem dos ~3 primeiros inacessiveis em qualquer device. Agora overflow-x-auto +
 * scrollBy, mesmo padrao do WebstoriesSection.
 * Mobile: card 312px, gap 16px, sem botoes (swipe nativo). Desktop (lg+): card 392px,
 * gap 24px, botoes prev/next + fade gradient.
 */
import { useRef } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IEspecialistasSectionProps } from './types'

export function EspecialistasSection({ items, className }: IEspecialistasSectionProps) {
	const scrollerRef = useRef<HTMLDivElement>(null)

	function scroll(direction: 1 | -1) {
		const el = scrollerRef.current
		if (!el) return
		el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
	}

	return (
		<section className={twMerge('w-full', className)}>
			<div className="block text-primary-600 w-full pt-10">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
					<div className="flex items-center gap-1 h-1.5">
						<div className="flex items-center gap-1">
							<span className="block size-[5px] rounded-full bg-current" />
							<span className="block size-[5px] rounded-full bg-current opacity-40" />
							<span className="block size-[5px] rounded-full bg-current opacity-40" />
						</div>
						<div className="flex-1 h-px bg-current" />
					</div>
					<div className="flex items-center gap-4">
						<h2 className="flex-1 text-headline-md font-display font-bold">Especialistas</h2>
						<div className="hidden lg:flex gap-2 items-center shrink-0">
							<button
								type="button"
								aria-label="Anterior"
								onClick={() => scroll(-1)}
								className="border border-neutral-100 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:border-primary-600 transition-colors"
							>
								<Icon name="chevron-left" className="size-8" />
							</button>
							<button
								type="button"
								aria-label="Próximo"
								onClick={() => scroll(1)}
								className="border border-primary-600 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
							>
								<Icon name="chevron-right" className="size-8" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 relative">
				<div ref={scrollerRef} className="flex gap-4 lg:gap-6 overflow-x-auto pb-2 scroll-smooth h-[224px]">
					{items.map((esp) => (
						<article
							key={esp.name}
							className="group bg-white border border-neutral-100 hover:bg-neutral-50 hover:border-primary-600 transition-colors flex flex-col items-start justify-center rounded-sm overflow-hidden shrink-0 w-[312px] lg:w-[392px]"
						>
							<div className="flex items-center w-full">
								<div className="flex items-center p-3">
									<div className="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
										<img src={`https://i.pravatar.cc/208?img=${esp.img}`} alt="Foto" className="w-full h-full object-cover" />
									</div>
								</div>
								<div className="flex flex-col flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
									<p className="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
										<a href="/categoria" className="hover:underline">{esp.name}</a>
									</p>
									<p className="font-body text-body-md text-neutral-900 truncate w-full">{esp.role}</p>
								</div>
							</div>
							<div className="flex flex-col items-start justify-end h-24 p-4 w-full">
								<p className="font-display font-bold text-title-md text-primary-600 line-clamp-3 w-full">{esp.quote}</p>
							</div>
						</article>
					))}
				</div>
				<div className="hidden lg:block absolute inset-y-0 right-0 w-[79px] bg-gradient-to-l from-white to-transparent pointer-events-none" />
			</div>
		</section>
	)
}
