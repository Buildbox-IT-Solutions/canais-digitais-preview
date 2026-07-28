import { twMerge } from '~/lib/tw-merge'
import type { ISwitchProps } from './types'

/**
 * Componente: Switch
 * Base de interação: shadcn/ui Switch (checked/unchecked, focus-visible, disabled).
 * Sem Figma spec dedicado — dimensões (33×18, thumb 16px) herdadas do switch já validado em
 * NewsletterItem; aqui viram componente compartilhado. Renderiza só o controle — o texto de
 * estado ao lado é responsabilidade de quem consome (ex.: dentro de um <label>).
 * `group-has-[...]` em vez de `peer-*` (mesmo motivo do FormCheckbox: o thumb não é irmão
 * direto do input).
 * Tokens: --color-primary-100, --color-secondary-950, --color-white
 */
export function Switch({ className, ...inputProps }: ISwitchProps) {
	return (
		<span
			className={twMerge(
				'group relative inline-flex h-[18px] w-[33px] shrink-0 rounded-full bg-primary-100 transition-colors has-[:checked]:bg-secondary-950 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-secondary-950/35 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
				className,
			)}
		>
			<input
				type="checkbox"
				role="switch"
				className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
				{...inputProps}
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute left-[1px] top-[1px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out group-has-[:checked]:translate-x-[15px]"
			/>
		</span>
	)
}
