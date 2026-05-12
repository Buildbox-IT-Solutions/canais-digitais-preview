import { twMerge } from '~/lib/tw-merge'
import type { IFormToggleProps } from './types'

/**
 * Componente: Form Toggle
 * Switch on/off MD3-like com label e hint opcional.
 * Tokens: --color-secondary-950, --color-neutral-100, --color-neutral-200,
 *         --color-neutral-500, --color-neutral-950, --color-white
 */
export function FormToggle({
	id,
	label,
	hint,
	checked = false,
	disabled = false,
	onChange,
	className,
}: IFormToggleProps) {
	return (
		<label
			className={twMerge(
				'flex items-start gap-3',
				disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
				className,
			)}
		>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				disabled={disabled}
				onChange={(e) => onChange?.(e.target.checked)}
				className="sr-only peer"
			/>
			<div
				className="relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 bg-neutral-200 peer-checked:bg-secondary-950 peer-disabled:bg-neutral-100"
				aria-hidden="true"
			>
				<div
					className={twMerge(
						'absolute top-[2px] left-[2px] size-5 rounded-full bg-white shadow-sm transition-transform duration-200',
						checked && 'translate-x-5',
					)}
				/>
			</div>
			<div className="flex flex-col">
				<span className="font-body text-body-lg text-neutral-950">{label}</span>
				{hint ? (
					<span className="font-body text-label-md text-neutral-500 mt-0.5">{hint}</span>
				) : null}
			</div>
		</label>
	)
}
