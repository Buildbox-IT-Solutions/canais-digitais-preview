import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { IFormCheckboxProps } from './types'

/**
 * Componente: Form Checkbox
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1944-7508
 * Tokens: --color-neutral-950, --color-secondary-950
 */
export function FormCheckbox({ label, checked, className, ...inputProps }: IFormCheckboxProps) {
	return (
		<label
			className={twMerge('flex gap-4 items-start cursor-pointer w-full group', className)}
		>
			<input type="checkbox" checked={checked} {...inputProps} className="sr-only peer" />
			<span className="flex items-center justify-center px-3 py-2 rounded-full shrink-0">
				<span
					className="size-[18px] rounded-xs border-2 border-neutral-950 peer-checked:group-has-[:checked]:bg-secondary-950 peer-checked:group-has-[:checked]:border-secondary-950 flex items-center justify-center text-white"
					aria-hidden="true"
				>
					{checked ? <Icon name="check" className="size-3" /> : null}
				</span>
			</span>
			<span className="flex flex-1 flex-col items-start justify-center min-w-0 py-2">
				<span className="font-body text-body-md text-neutral-950 w-full">{label}</span>
			</span>
		</label>
	)
}
