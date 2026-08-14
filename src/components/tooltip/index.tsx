/**
 * Componente: Tooltip
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-19519
 * Variantes: side (top|right|bottom|left)
 * Tokens: --color-neutral-950, --text-label-md
 *
 * Balão Material 3 — bg-neutral-950, rounded-sm, px-2 py-1, text-label-md branco,
 * seta triangular 11.5×5px (CSS border-triangle) na lateral oposta ao apontamento,
 * conferido contra figma-specs/tooltip.md. Só a APARÊNCIA vem do Figma (esse spec
 * é uma spec estática, sem interação) — o show/hide com delay é decisão de
 * interação deste componente (padrão "Instagram": aparece só depois de um hover
 * sustentado, não no primeiro pixel de mouseenter, pra não disparar em cliques
 * rápidos ou o mouse só passando por cima a caminho de outro lugar).
 *
 * Mostra: no hover (depois de `delay`ms) ou no focus (imediato — teclado não tem
 * "hover sustentado", então não faz sentido atrasar). Esconde: no mouseleave/blur
 * (imediato) e no pointerdown (clique dispensa o balão na hora, ele já cumpriu o
 * papel de avisar o que o clique vai fazer).
 *
 * `children` fica dentro de um wrapper `<span>` que escuta os eventos e serve de
 * containing block pro balão (`relative` por padrão). Quando o chamador passa
 * `className` de posicionamento (ex. Toggle repassando `absolute top-2 right-2`
 * de NewsCard pro wrapper, não pro filho), o `absolute` do twMerge substitui o
 * `relative` da base (mesmo grupo de conflito) — o wrapper continua sendo um
 * containing block válido (`absolute` também é "positioned"), então o balão
 * (também `absolute`, side-aware) se posiciona certo nos dois casos.
 */
import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import type { ITooltipProps, TooltipSide } from './types'

const BUBBLE_POSITION: Record<TooltipSide, string> = {
	top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
	bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
	right: 'left-full top-1/2 -translate-y-1/2 ml-2',
	left: 'right-full top-1/2 -translate-y-1/2 mr-2',
}

// Seta sempre na lateral OPOSTA ao lado do balão — aponta de volta pro gatilho.
// `w-0 h-0` é o truque do CSS-triangle: o tamanho visível vem só das bordas.
const ARROW_CLASSES: Record<TooltipSide, string> = {
	top: 'absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-950',
	bottom:
		'absolute left-1/2 -translate-x-1/2 -top-[5px] w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-b-[5px] border-l-transparent border-r-transparent border-b-neutral-950',
	right:
		'absolute top-1/2 -translate-y-1/2 -left-[5px] w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-r-[5px] border-t-transparent border-b-transparent border-r-neutral-950',
	left: 'absolute top-1/2 -translate-y-1/2 -right-[5px] w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-l-[5px] border-t-transparent border-b-transparent border-l-neutral-950',
}

export function Tooltip({ label, side = 'bottom', delay = 500, disabled, children, className }: ITooltipProps) {
	const [visible, setVisible] = useState(false)
	const timeoutRef = useRef<number | undefined>(undefined)

	useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

	function show(withDelay: boolean): void {
		if (disabled) return
		window.clearTimeout(timeoutRef.current)
		if (withDelay) {
			timeoutRef.current = window.setTimeout(() => setVisible(true), delay)
		} else {
			setVisible(true)
		}
	}

	function hide(): void {
		window.clearTimeout(timeoutRef.current)
		setVisible(false)
	}

	return (
		<span
			className={twMerge('relative inline-flex', className)}
			onMouseEnter={() => show(true)}
			onMouseLeave={hide}
			onFocus={() => show(false)}
			onBlur={hide}
			onPointerDown={hide}
		>
			{children}
			{visible && !disabled ? (
				<span role="tooltip" className={twMerge('absolute z-30 pointer-events-none', BUBBLE_POSITION[side])}>
					<span className="relative inline-flex items-center justify-center px-2 py-1 rounded-sm bg-neutral-950">
						<p className="font-body font-semibold text-label-md text-white whitespace-nowrap">{label}</p>
						<span className={ARROW_CLASSES[side]} />
					</span>
				</span>
			) : null}
		</span>
	)
}
