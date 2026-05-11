import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { IFormSelectProps } from './types'

/**
 * Componente: Form Select (visual)
 * Dropdown read-only com label e chevron. Reprodução visual do Figma — não tem
 * lista interativa nativa.
 * Tokens: --color-neutral-100, --color-neutral-500, --color-neutral-900, --color-neutral-950,
 *         --color-primary-600, --color-white
 */
export function FormSelect({
	label,
	value,
	placeholder = 'Selecione',
	required = false,
	className,
}: IFormSelectProps) {
	return (
		<label className={twMerge('flex flex-1 flex-col items-start min-w-0 rounded-sm', className)}>
			<div className="flex gap-0.5 items-center pb-1 px-1 w-full">
				<span className="font-body font-semibold text-label-lg text-neutral-950">{label}</span>
				{required ? (
					<span className="font-body font-semibold text-label-lg text-neutral-950">*</span>
				) : null}
			</div>
			<div className="bg-white border border-neutral-100 flex h-10 items-center justify-between px-3 rounded-sm w-full">
				{value ? (
					<span className="font-body text-body-lg text-primary-600">{value}</span>
				) : (
					<span className="font-body text-body-lg text-neutral-500">{placeholder}</span>
				)}
				<Icon name="chevron-down" className="size-4 text-neutral-900" />
			</div>
		</label>
	)
}
