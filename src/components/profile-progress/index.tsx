import { twMerge } from 'tailwind-merge'
import type { IProfileProgressProps } from './types'

/**
 * Componente: Profile Progress — barra gamificada de preenchimento do perfil
 * Tokens: --color-neutral-100, --color-neutral-600, --color-neutral-700, --color-neutral-950,
 *         --color-secondary-950
 */

function pickMessage(pct: number): string {
	if (pct >= 90) return 'Perfil completo! Você recebe o melhor do portal.'
	if (pct >= 61) return 'Quase lá! Faltam poucos campos.'
	if (pct >= 31) return 'Bom progresso! Adicione seus dados profissionais.'
	return 'Seu perfil está começando. Complete para desbloquear recomendações.'
}

export function ProfileProgress({
	filledFields,
	totalFields = 14,
	className,
}: IProfileProgressProps) {
	const total = Math.max(1, totalFields)
	const filled = Math.min(Math.max(0, filledFields), total)
	const pct = Math.round((filled / total) * 100)
	const message = pickMessage(pct)

	return (
		<div className={twMerge('flex flex-col gap-2 w-full', className)}>
			<div className="flex items-baseline justify-between gap-4">
				<p className="font-body text-label-lg font-semibold text-neutral-950">
					Perfil {pct}% completo
				</p>
				<p className="font-body text-label-md text-neutral-600">
					{filled} de {total} campos
				</p>
			</div>
			<div
				className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={pct}
				aria-label="Progresso do preenchimento do perfil"
			>
				<div
					className="h-full rounded-full bg-secondary-950 transition-[width] duration-500"
					style={{ width: `${pct}%` }}
				/>
			</div>
			<p className="font-body text-body-md text-neutral-700">{message}</p>
		</div>
	)
}
