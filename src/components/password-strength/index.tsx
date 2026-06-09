import { twMerge } from '~/lib/tw-merge'
import { PasswordChecklist, computeCriteria } from '~/components/password-checklist'
import type { PasswordCriteria } from '~/components/password-checklist/types'
import type { IPasswordStrengthProps, PasswordStrengthLevel } from './types'

/**
 * Componente: Password Strength
 * Barra de 3 segmentos + label de força + checklist com 4 critérios (PasswordChecklist).
 * Tokens: --color-neutral-100, --color-neutral-500, --color-neutral-700, --color-neutral-950
 * Cores de status via hex (red-600/amber-500/green-600 — fora do DS pois são sinais universais).
 */

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

			<PasswordChecklist criteria={criteria} className="mt-0.5" />
		</div>
	)
}
