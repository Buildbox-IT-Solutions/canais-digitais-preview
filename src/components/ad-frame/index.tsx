import { twMerge } from '~/lib/tw-merge'
import type { IAdFrameProps } from './types'

/**
 * Componente: Ad Frame (placeholder)
 * Caixa visual representando um espaço de mídia. Não há lógica de ad serving aqui —
 * é apenas uma reprodução fiel das wireframes Figma.
 * Tokens: --color-primary-100, --color-neutral-50, --color-neutral-700
 */
export function AdFrame({ width, height, className }: IAdFrameProps) {
	return (
		<div
			className={twMerge(
				'border border-primary-100 bg-neutral-50 flex items-center justify-center shrink-0',
				className,
			)}
			style={{ width: `${width}px`, height: `${height}px` }}
		>
			<span className="font-body font-bold text-label-md text-neutral-700">
				{width} × {height}
			</span>
		</div>
	)
}
