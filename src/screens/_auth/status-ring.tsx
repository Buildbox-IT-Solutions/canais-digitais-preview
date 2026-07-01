import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'

export type StatusRingAccent = 'primary' | 'mint' | 'neutral'

const ACCENT_CLASSES: Record<StatusRingAccent, string> = {
	primary: 'border-primary-600 text-primary-600',
	mint: 'border-mint text-mint',
	neutral: 'border-neutral-900 text-neutral-900',
}

interface IAuthStatusRingProps {
	accent: StatusRingAccent
	icon: IconName
	className?: string
}

/**
 * Anel de status das telas full page de autenticação — círculo 120px com borda 2.5px
 * + ícone 40px (Figma 6989:17827). Usado em Confirmação de e-mail, Redefinir senha e Recuperar senha.
 * Tokens: --color-primary-600, --color-mint, --color-neutral-900
 */
export function AuthStatusRing({ accent, icon, className }: IAuthStatusRingProps) {
	return (
		<div
			className={twMerge(
				'inline-flex items-center justify-center size-[120px] shrink-0 rounded-full border-[2.5px]',
				ACCENT_CLASSES[accent],
				className,
			)}
		>
			<Icon name={icon} className="size-10" />
		</div>
	)
}
