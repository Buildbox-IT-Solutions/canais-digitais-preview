import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { twMerge } from '~/lib/tw-merge'

/**
 * "Moldura" visual do painel flutuante do TOC — mesmo tratamento nas três
 * opções (Opção 1, Opção 2, Opção 3), só a posição (`className`) muda.
 * `forwardRef` + rest-spread porque a Opção 2 precisa passar `onFocus`/
 * `onBlur` (interação por hover) e a Opção 1 precisa de `ref` (clique-fora).
 */
export const TocPanel = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function TocPanel(
	{ className, children, ...rest },
	ref,
) {
	return (
		<div
			ref={ref}
			className={twMerge(
				'w-72 max-h-[70vh] overflow-y-auto p-4 rounded-sm bg-white border border-neutral-100 shadow-lg',
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
})
