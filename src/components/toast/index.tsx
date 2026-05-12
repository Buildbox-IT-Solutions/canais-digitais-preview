import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IToastProps, ToastType } from './types'

/**
 * Componente: Toast
 * Notificação flutuante com ícone, mensagem e dismiss.
 * Tokens: --color-white, --color-neutral-100, --color-neutral-500, --color-neutral-950,
 *         --color-secondary-950. Status colors via hex universais.
 */

const TYPE_META: Record<ToastType, { iconPath: string; accent: string; border: string }> = {
	success: {
		iconPath:
			'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
		accent: 'text-[#16A34A]',
		border: 'border-l-[#16A34A]',
	},
	error: {
		iconPath:
			'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
		accent: 'text-[#bf0413]',
		border: 'border-l-[#bf0413]',
	},
	warning: {
		iconPath: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
		accent: 'text-[#F59E0B]',
		border: 'border-l-[#F59E0B]',
	},
	info: {
		iconPath:
			'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
		accent: 'text-secondary-950',
		border: 'border-l-secondary-950',
	},
}

export function Toast({ type = 'info', message, id, onDismiss, className }: IToastProps) {
	const meta = TYPE_META[type]
	const isAlert = type === 'error' || type === 'warning'

	return (
		<div
			id={id}
			role={isAlert ? 'alert' : 'status'}
			aria-live={isAlert ? 'assertive' : 'polite'}
			className={twMerge(
				'flex items-start gap-3 w-full max-w-[420px] bg-white border border-neutral-100 border-l-4 rounded-lg shadow-lg p-4',
				meta.border,
				className,
			)}
		>
			<svg
				className={twMerge('size-5 shrink-0', meta.accent)}
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path d={meta.iconPath} />
			</svg>
			<p className="flex-1 font-body text-body-md text-neutral-950">{message}</p>
			<button
				type="button"
				aria-label="Fechar notificação"
				onClick={onDismiss}
				className="shrink-0 text-neutral-500 hover:text-neutral-950 transition-colors"
			>
				<Icon name="close" className="size-4" />
			</button>
		</div>
	)
}
