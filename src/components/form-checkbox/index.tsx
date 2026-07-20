import { useEffect, useRef } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IFormCheckboxProps } from './types'

/**
 * Componente: Form Checkbox
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1944-7508
 * Base de interação: shadcn/ui Checkbox (tamanho, raio, anel de foco, disabled, sombra),
 * com paleta e ícone do nosso DS. Usa `group-has-[...]` (seletor de descendente) em vez de
 * `peer-*` — não depende do box ser irmão direto do input.
 * Tokens: --color-neutral-300, --color-secondary-950, --text-label-lg
 */
export function FormCheckbox({
	label,
	indeterminate = false,
	className,
	...inputProps
}: IFormCheckboxProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) inputRef.current.indeterminate = indeterminate
	}, [indeterminate])

	return (
		<label
			className={twMerge(
				'group flex w-full items-start gap-2 cursor-pointer has-[:disabled]:cursor-not-allowed',
				className,
			)}
		>
			<input ref={inputRef} type="checkbox" className="sr-only" {...inputProps} />
			<span
				className="relative mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border border-neutral-300 bg-white shadow-xs transition-shadow group-has-[:checked]:border-secondary-950 group-has-[:checked]:bg-secondary-950 group-has-[:indeterminate]:border-secondary-950 group-has-[:indeterminate]:bg-secondary-950 group-has-[:focus-visible]:border-secondary-950 group-has-[:focus-visible]:ring-[3px] group-has-[:focus-visible]:ring-secondary-950/35 group-has-[:disabled]:opacity-50"
				aria-hidden="true"
			>
				<Icon
					name="check"
					className="absolute size-3.5 text-white opacity-0 group-has-[:checked]:opacity-100"
				/>
				<Icon
					name="remove"
					className="absolute size-3.5 text-white opacity-0 group-has-[:indeterminate]:opacity-100"
				/>
			</span>
			<span className="font-body text-label-lg text-neutral-950 group-has-[:disabled]:opacity-50">
				{label}
			</span>
		</label>
	)
}
