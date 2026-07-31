import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { twMerge } from '~/lib/tw-merge'

interface ITocPanelOwnProps {
	title?: string
}

/**
 * "Moldura" visual do painel flutuante do TOC — mesmo tratamento nas opções
 * arquivadas e na versão final, só a posição (`className`) muda.
 * `forwardRef` + rest-spread porque a régua precisa passar `onFocus`/
 * `onBlur` (interação por hover) e o botão precisa de `ref` (clique-fora).
 * `title` é opcional e só usado pela versão final (table-of-contents-icon) —
 * sem ele, comportamento idêntico ao das opções arquivadas.
 */
export const TocPanel = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & ITocPanelOwnProps>(
	function TocPanel({ className, title, children, ...rest }, ref) {
		return (
			<div
				ref={ref}
				className={twMerge(
					'w-72 max-h-[70vh] overflow-y-auto p-4 rounded-sm bg-white border border-neutral-100 shadow-lg',
					className,
				)}
				{...rest}
			>
				{title ? (
					<p className="font-body font-semibold text-label-sm uppercase tracking-wider text-neutral-500 mb-2">
						{title}
					</p>
				) : null}
				{children}
			</div>
		)
	},
)
