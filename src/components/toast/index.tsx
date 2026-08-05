import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'
import type { IToastProps, ToastType } from './types'

/**
 * Componente: Toast
 * Notificação flutuante com ícone, mensagem e dismiss.
 * Tokens: --color-white, --color-neutral-100, --color-neutral-500, --color-neutral-950,
 *         --color-secondary-950. Status colors via hex universais.
 */

const TYPE_META: Record<ToastType, { icon: IconName; accent: string; border: string }> = {
	success: { icon: 'check-circle', accent: 'text-[#16A34A]', border: 'border-l-[#16A34A]' },
	error: { icon: 'cancel', accent: 'text-[#bf0413]', border: 'border-l-[#bf0413]' },
	warning: { icon: 'warning', accent: 'text-[#F59E0B]', border: 'border-l-[#F59E0B]' },
	info: { icon: 'info', accent: 'text-secondary-950', border: 'border-l-secondary-950' },
}

export function Toast({ type = 'info', message, action, id, onDismiss, className }: IToastProps) {
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
			<Icon name={meta.icon} className={twMerge('size-5 shrink-0', meta.accent)} />
			<p className="flex-1 font-body text-body-md text-neutral-950">{message}</p>
			{action ? (
				<button
					type="button"
					onClick={action.onClick}
					className="shrink-0 font-body font-bold text-body-md text-secondary-950 hover:underline"
				>
					{action.label}
				</button>
			) : null}
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
