import { twMerge } from '~/lib/tw-merge'
import type {
	IPasswordStrengthProps,
	PasswordCriteria,
	PasswordStrengthLevel,
} from './types'

/**
 * Componente: Password Strength
 * Barra de 3 segmentos + label de força + checklist com 4 critérios.
 * Tokens: --color-neutral-100, --color-neutral-500, --color-neutral-700, --color-neutral-950
 * Cores de status via hex (red-600/amber-500/green-600 — fora do DS pois são sinais universais).
 */

const CRITERIA_LABELS: Record<keyof PasswordCriteria, string> = {
	length: 'Mínimo de 8 caracteres',
	uppercase: 'Pelo menos uma letra maiúscula',
	number: 'Pelo menos um número',
	special: 'Pelo menos um caractere especial',
}

function computeCriteria(value: string): PasswordCriteria {
	return {
		length: value.length >= 8,
		uppercase: /[A-Z]/.test(value),
		number: /\d/.test(value),
		special: /[^A-Za-z0-9]/.test(value),
	}
}

function deriveLevel(metCount: number): PasswordStrengthLevel {
	if (metCount === 0) return 'empty'
	if (metCount <= 2) return 'weak'
	if (metCount === 3) return 'medium'
	return 'strong'
}

const LEVEL_META: Record<
	PasswordStrengthLevel,
	{ value: number; label: string; barClass: string; textClass: string; fills: number }
> = {
	empty: { value: 0, label: '', barClass: 'bg-neutral-100', textClass: 'text-neutral-500', fills: 0 },
	weak: { value: 1, label: 'Fraca', barClass: 'bg-[#DC2626]', textClass: 'text-[#DC2626]', fills: 1 },
	medium: { value: 2, label: 'Média', barClass: 'bg-[#F59E0B]', textClass: 'text-[#F59E0B]', fills: 2 },
	strong: { value: 3, label: 'Forte', barClass: 'bg-[#16A34A]', textClass: 'text-[#16A34A]', fills: 3 },
}

export function PasswordStrength({
	value = '',
	level: levelOverride,
	criteria: criteriaOverride,
	inputId,
	className,
}: IPasswordStrengthProps) {
	const base = computeCriteria(value)
	const criteria: PasswordCriteria = { ...base, ...criteriaOverride }
	const metCount = Object.values(criteria).filter(Boolean).length
	const level = levelOverride ?? deriveLevel(metCount)
	const meta = LEVEL_META[level]

	return (
		<div
			className={twMerge('flex flex-col gap-2 w-full', className)}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={3}
			aria-valuenow={meta.value}
			aria-controls={inputId}
			aria-live="polite"
		>
			<div className="flex items-center gap-1 w-full">
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className={twMerge(
							'h-1 flex-1 rounded-full',
							i <= meta.fills ? meta.barClass : 'bg-neutral-100',
						)}
					/>
				))}
			</div>

			<p className={twMerge('font-body text-label-md min-h-[1rem]', meta.textClass)}>
				{meta.label ? `Força: ${meta.label}` : ''}
			</p>

			<ul className="flex flex-col gap-1.5 mt-0.5" role="list">
				{(Object.keys(CRITERIA_LABELS) as Array<keyof PasswordCriteria>).map((key) => {
					const met = criteria[key]
					return (
						<li key={key} className="flex items-center gap-2">
							<svg
								className={twMerge(
									'size-4 shrink-0 transition-colors',
									met ? 'text-[#16A34A]' : 'text-neutral-500',
								)}
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d={
										met
											? 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
											: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
									}
								/>
							</svg>
							<span
								className={twMerge(
									'font-body text-label-md transition-colors',
									met ? 'text-neutral-950 font-semibold' : 'text-neutral-700',
								)}
							>
								{CRITERIA_LABELS[key]}
							</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
