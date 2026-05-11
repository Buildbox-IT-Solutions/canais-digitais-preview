import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { ICadastroStepperProps } from './types'

/**
 * Componente: Cadastro Stepper — indicador de 3 passos
 * Figma: 6271:18977
 * Estados: done (check) | active (filled) | pending (light bg).
 * Tokens: --color-primary-100, --color-primary-600, --color-neutral-900, --color-white
 */
export function CadastroStepper({ current, totalSteps = 3, className }: ICadastroStepperProps) {
	const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

	return (
		<div className={twMerge('flex items-center gap-2 w-full', className)}>
			{steps.map((n, i) => {
				const state = n < current ? 'done' : n === current ? 'active' : 'pending'

				let stepNode = null
				if (state === 'done') {
					stepNode = (
						<div
							className="size-6 rounded-full border border-primary-600 bg-white text-primary-600 flex items-center justify-center shrink-0"
							aria-label={`Passo ${n} concluído`}
						>
							<Icon name="check" className="size-4" />
						</div>
					)
				} else if (state === 'active') {
					stepNode = (
						<div
							className="size-6 rounded-full bg-primary-600 text-white font-body font-bold text-label-md flex items-center justify-center shrink-0"
							aria-current="step"
							aria-label={`Passo ${n} atual`}
						>
							{n}
						</div>
					)
				} else {
					stepNode = (
						<div
							className="size-6 rounded-full bg-primary-100 text-neutral-900 font-body font-bold text-label-md flex items-center justify-center shrink-0"
							aria-label={`Passo ${n}`}
						>
							{n}
						</div>
					)
				}

				return (
					<Fragment key={n}>
						{stepNode}
						{i < steps.length - 1 ? (
							<div className="flex-1 h-0.5 bg-primary-100 rounded-full" aria-hidden="true" />
						) : null}
					</Fragment>
				)
			})}
		</div>
	)
}
