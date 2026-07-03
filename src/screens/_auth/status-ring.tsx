import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'

export type StatusRingAccent = 'primary' | 'mint' | 'neutral'
export type StatusRingSize = 'md' | 'sm'

const ACCENT_CLASSES: Record<StatusRingAccent, string> = {
	primary: 'border-primary-600 text-primary-600',
	mint: 'border-mint text-mint',
	neutral: 'border-neutral-900 text-neutral-900',
}

const SIZE_CLASSES: Record<StatusRingSize, { ring: string; icon: string }> = {
	md: { ring: 'size-[120px] border-[2.5px]', icon: 'size-10' },
	sm: { ring: 'size-20 border-2', icon: 'size-7' },
}

interface IAuthStatusRingProps {
	accent: StatusRingAccent
	icon: IconName
	size?: StatusRingSize
	className?: string
}

/**
 * Anel de status das telas de autenticação — círculo com borda + ícone centralizado (Figma 6989:17827).
 * Usado em Confirmação de e-mail, Redefinir senha e Recuperar senha.
 * - `md` (padrão): 120px / borda 2.5px / ícone 40px — telas full page.
 * - `sm`: 80px / borda 2px / ícone 28px — hierarquia enxuta para o conteúdo do modal de confirmação.
 * Tokens: --color-primary-600, --color-mint, --color-neutral-900
 */
export function AuthStatusRing({ accent, icon, size = 'md', className }: IAuthStatusRingProps) {
	const sz = SIZE_CLASSES[size]
	return (
		<div
			className={twMerge(
				'inline-flex items-center justify-center shrink-0 rounded-full',
				sz.ring,
				ACCENT_CLASSES[accent],
				className,
			)}
		>
			<Icon name={icon} className={sz.icon} />
		</div>
	)
}
