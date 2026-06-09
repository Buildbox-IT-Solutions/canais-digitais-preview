import { twMerge } from '~/lib/tw-merge'
import type { IPasswordChecklistProps, PasswordCriteria } from './types'

/**
 * Componente: Password Checklist
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0
 * Lista de obrigatoriedade de senha — 4 critérios, cada um com ícone de status (atendido/pendente).
 * Usado no Cadastro (step 2) e reaproveitado internamente pelo PasswordStrength.
 * Tokens: --color-neutral-500, --color-neutral-700, --color-neutral-950
 * Verde de status via hex (green-600 — sinal universal, fora do DS).
 */

const CRITERIA_LABELS: Record<keyof PasswordCriteria, string> = {
	length: 'Mínimo de 8 caracteres',
	uppercase: 'Pelo menos uma letra maiúscula',
	number: 'Pelo menos um número',
	special: 'Pelo menos um caractere especial',
}

export function computeCriteria(value: string): PasswordCriteria {
	return {
		length: value.length >= 8,
		uppercase: /[A-Z]/.test(value),
		number: /\d/.test(value),
		special: /[^A-Za-z0-9]/.test(value),
	}
}

export function PasswordChecklist({ value = '', criteria: criteriaOverride, className }: IPasswordChecklistProps) {
	const criteria: PasswordCriteria = { ...computeCriteria(value), ...criteriaOverride }

	return (
		<ul className={twMerge('flex flex-col gap-1.5', className)} role="list">
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
	)
}
