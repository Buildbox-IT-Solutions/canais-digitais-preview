/**
 * Componente: AiSummaryBlock ("Resumo Box" / "Ver resumo")
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=619-7290
 * Nota de designer ("Resumo"): resumo feito por IA, configurável no Admin,
 * começa fechado — usuário clica para ver o resumo.
 * Hover (node 619:7291): borda muda de neutral-100 para neutral-900.
 * Tokens: --color-neutral-100, --color-neutral-900, --text-title-lg, --text-body-md, --text-label-sm, rounded-sm
 */
import { useState } from 'react'
import { Icon } from '~/components/icon'
import { twMerge } from '~/lib/tw-merge'
import type { IAiSummaryBlockProps } from './types'

export function AiSummaryBlock({ bullets, disclaimer, className }: IAiSummaryBlockProps) {
	const [open, setOpen] = useState(false)

	return (
		<div
			className={twMerge(
				'bg-white border border-neutral-100 rounded-sm w-full transition-colors hover:border-neutral-900',
				className,
			)}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				className="flex items-center justify-between gap-2 p-4 w-full text-left"
			>
				<span className="font-display font-bold text-title-lg text-primary-600">Ver resumo</span>
				<Icon
					name="chevron-down"
					className={twMerge(
						'size-6 text-primary-600 transition-transform shrink-0',
						open && 'rotate-180',
					)}
				/>
			</button>
			{open ? (
				<div className="flex flex-col gap-3 px-4 pb-4">
					<ul className="flex flex-col gap-2">
						{bullets.map((bullet) => (
							<li key={bullet} className="flex gap-2 font-body text-body-md text-neutral-950">
								<span className="text-primary-600" aria-hidden="true">
									•
								</span>
								<span>{bullet}</span>
							</li>
						))}
					</ul>
					<p className="font-body text-label-sm text-neutral-500">{disclaimer}</p>
				</div>
			) : null}
		</div>
	)
}
