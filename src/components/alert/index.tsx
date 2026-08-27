import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'
import type { AlertType, IAlertProps } from './types'

/**
 * Componente: Alert
 * Banner de status inline — sem nodeId no Figma (utilitário in-house, como Badge).
 * Estrutura fiel ao Alert "custom colors" do shadcn/ui (borda + fundo tintado +
 * texto na cor do status), temizado com os tokens de status do projeto.
 * Substitui o antigo `AuthErrorAlert`, que hardcodava red-600 em vez do token danger.
 * Tokens: --color-danger-600, --color-warning-500, --color-success-600, --color-secondary-950
 */

const TYPE_META: Record<AlertType, { icon: IconName; accent: string }> = {
	success: { icon: 'check-circle', accent: 'border-success-600/30 bg-success-600/10 text-success-600' },
	error: { icon: 'error', accent: 'border-danger-600/30 bg-danger-600/10 text-danger-600' },
	warning: { icon: 'warning', accent: 'border-warning-500/30 bg-warning-500/10 text-warning-500' },
	// Sem token --color-info dedicado — mesmo fallback que o Toast usa (--color-secondary-950).
	info: { icon: 'info', accent: 'border-secondary-950/30 bg-secondary-950/10 text-secondary-950' },
}

export function Alert({ type = 'info', title, message, className }: IAlertProps) {
	const meta = TYPE_META[type]
	const isUrgent = type === 'error' || type === 'warning'

	return (
		<div
			role={isUrgent ? 'alert' : 'status'}
			aria-live={isUrgent ? 'assertive' : 'polite'}
			className={twMerge(
				'flex gap-2.5 px-3 py-2.5 rounded-sm border',
				title ? 'items-start' : 'items-center',
				meta.accent,
				className,
			)}
		>
			<Icon name={meta.icon} className={twMerge('size-5 shrink-0', title ? 'mt-0.5' : undefined)} />
			<div className="flex flex-col gap-0.5">
				{title ? <p className="font-body font-bold text-body-md">{title}</p> : null}
				<p className={twMerge('font-body text-body-md', title ? 'text-body-sm' : 'font-semibold')}>
					{message}
				</p>
			</div>
		</div>
	)
}
