import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IStatusRingProps, StatusRingAccent, StatusRingSize } from './types'

/**
 * Componente: Status Ring — círculo contornado (borda + ícone da mesma cor).
 * Figma: 6989:17827. Fonte da verdade dos ícones circulares de status/ação —
 * usado nos modais de auth (confirmação de e-mail, recuperar/redefinir senha) e
 * no cabeçalho do Dialog.
 * - `md` (padrão): 120px / borda 2.5px / ícone 40px — telas full page.
 * - `sm`: 80px / borda 2px / ícone 28px — modais e dialogs.
 * Tokens: --color-primary-600, --color-mint, --color-neutral-900, red-600
 */
const ACCENT_CLASSES: Record<StatusRingAccent, string> = {
	primary: 'border-primary-600 text-primary-600',
	mint: 'border-mint text-mint',
	neutral: 'border-neutral-900 text-neutral-900',
	danger: 'border-red-600 text-red-600',
}

const SIZE_CLASSES: Record<StatusRingSize, { ring: string; icon: string }> = {
	md: { ring: 'size-[120px] border-[2.5px]', icon: 'size-10' },
	sm: { ring: 'size-20 border-2', icon: 'size-7' },
}

export function StatusRing({ accent, icon, size = 'md', className }: IStatusRingProps) {
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

export type { IStatusRingProps, StatusRingAccent, StatusRingSize } from './types'
