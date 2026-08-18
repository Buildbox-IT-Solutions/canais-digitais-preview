/**
 * Componente: EspecialistasSection
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-36721
 * Conserta interacao pre-existente: overflow-hidden + botoes sem handler tornavam os
 * itens alem dos ~3 primeiros inacessiveis em qualquer device. Agora overflow-x-auto +
 * scrollBy, mesmo padrao do WebstoriesSection. Scrollbar nativa escondida via utilitario
 * `.scrollbar-hide` (src/index.css). Botoes prev/next usam IconButton (size medium) com
 * disabled real, calculado a partir da posicao de scroll.
 * Mobile: card 312px, gap 16px, sem botoes (swipe nativo). Desktop (lg+): card com
 * largura calculada — calc((100% - 3*gap) / 3.25) — para deixar ~25% do 4º card visivel
 * sem rolagem (sinaliza que ha mais conteudo). Isso NAO reflete o Figma; e um teste visual.
 */
import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { IconButton } from '~/components/icon-button'
import { CardColunista } from '~/components/card-colunista'
import type { IEspecialistasSectionProps } from './types'

export function EspecialistasSection({ items, className }: IEspecialistasSectionProps) {
	const scrollerRef = useRef<HTMLDivElement>(null)
	const [canScrollPrev, setCanScrollPrev] = useState(false)
	const [canScrollNext, setCanScrollNext] = useState(false)

	useEffect(() => {
		const el = scrollerRef.current
		if (!el) return

		function updateScrollState() {
			if (!el) return
			setCanScrollPrev(el.scrollLeft > 0)
			setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
		}

		updateScrollState()
		el.addEventListener('scroll', updateScrollState)
		window.addEventListener('resize', updateScrollState)
		return () => {
			el.removeEventListener('scroll', updateScrollState)
			window.removeEventListener('resize', updateScrollState)
		}
	}, [])

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
							<IconButton
								icon="chevron-left"
								label="Anterior"
								type="outlined"
								size="medium"
								disabled={!canScrollPrev}
								onClick={() => scroll(-1)}
							/>
							<IconButton
								icon="chevron-right"
								label="Próximo"
								type="outlined"
								size="medium"
								disabled={!canScrollNext}
								onClick={() => scroll(1)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 relative">
				<div ref={scrollerRef} className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth h-[236px]">
					{items.map((esp) => (
						<CardColunista
							key={esp.name}
							image={`https://i.pravatar.cc/208?img=${esp.img}`}
							name={esp.name}
							role={esp.role}
							quote={esp.quote}
							className="w-[312px] lg:w-[calc((100%-72px)/3.25)]"
						/>
					))}
				</div>
			</div>
		</section>
	)
}
