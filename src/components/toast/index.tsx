import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'
import type { IToastProps, ToastType } from './types'

/**
 * Componente: Toast
 * Notificação flutuante com ícone, mensagem e dismiss — fiel à estrutura do shadcn/ui
 * (card neutro + ícone colorido, sem borda de destaque), temizado com os tokens do projeto.
 * Tokens: --color-white, --color-neutral-200, --color-neutral-500, --color-neutral-600,
 *         --color-neutral-950, --color-secondary-950, --color-danger-600, --color-warning,
 *         --color-success
 */

const TYPE_META: Record<ToastType, { icon: IconName; accent: string }> = {
	success: { icon: 'check-circle', accent: 'text-success' },
	error: { icon: 'cancel', accent: 'text-danger-600' },
	warning: { icon: 'warning', accent: 'text-warning' },
	info: { icon: 'info', accent: 'text-secondary-950' },
}

export function Toast({ type = 'info', title, message, action, id, onDismiss, className }: IToastProps) {
	const meta = TYPE_META[type]
	const isAlert = type === 'error' || type === 'warning'

	return (
		<div
			id={id}
			role={isAlert ? 'alert' : 'status'}
			aria-live={isAlert ? 'assertive' : 'polite'}
			className={twMerge(
				'flex items-center gap-3 w-full max-w-[420px] bg-white border border-neutral-200 rounded-lg shadow-lg p-4',
				className,
			)}
		>
			<Icon name={meta.icon} className={twMerge('size-5 shrink-0', meta.accent)} />
			<div className="flex-1 flex flex-col gap-0.5">
				{title ? <p className="font-body font-bold text-body-md text-neutral-950">{title}</p> : null}
				<p className={twMerge('font-body text-neutral-950', title ? 'text-body-sm text-neutral-600' : 'text-body-md')}>
					{message}
				</p>
			</div>
			{action ? (
				<button
					type="button"
					onClick={action.onClick}
					className="shrink-0 h-8 px-3 rounded-full border border-neutral-200 font-body font-semibold text-label-lg text-neutral-950 hover:bg-neutral-50 transition-colors"
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
