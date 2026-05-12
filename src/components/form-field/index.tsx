import { twMerge } from '~/lib/tw-merge'
import type { IFormFieldProps } from './types'

/**
 * Componente: Form Field
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1757-14338
 * Variantes: text | email | tel | password | url | number (com label e asterisco se required)
 * Tokens: --color-neutral-100, --color-neutral-500, --color-neutral-950, --color-primary-600, --color-white
 */
export function FormField({
	label,
	type = 'text',
	required = false,
	className,
	...inputProps
}: IFormFieldProps) {
	return (
		<label className={twMerge('flex flex-1 flex-col items-start min-w-0 rounded-sm', className)}>
			<div className="flex gap-0.5 items-center pb-1 px-1 w-full">
				<span className="font-body font-semibold text-label-lg text-neutral-950">{label}</span>
				{required ? (
					<span className="font-body font-semibold text-label-lg text-neutral-950">*</span>
				) : null}
			</div>
			<div className="bg-white border border-neutral-100 flex flex-col h-10 items-start justify-center rounded-sm w-full">
				<input
					type={type}
					required={required}
					{...inputProps}
					className="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none"
				/>
			</div>
		</label>
	)
}
