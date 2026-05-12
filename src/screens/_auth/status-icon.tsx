import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'

export type StatusTone = 'success' | 'warning' | 'info-secondary' | 'info-primary' | 'info-secondary-tint'

interface IAuthStatusIconProps {
	tone: StatusTone
	icon: IconName
	className?: string
}

const TONE_CLASSES: Record<StatusTone, string> = {
	success: 'bg-green-50 text-green-600',
	warning: 'bg-amber-50 text-amber-700',
	'info-secondary': 'bg-secondary-500/10 text-secondary-950',
	'info-secondary-tint': 'bg-secondary-500/10 text-secondary-950',
	'info-primary': 'bg-primary-100 text-primary-600',
}

export function AuthStatusIcon({ tone, icon, className }: IAuthStatusIconProps) {
	return (
		<div
			className={twMerge(
				'inline-flex items-center justify-center size-12 rounded-full',
				TONE_CLASSES[tone],
				className,
			)}
		>
			<Icon name={icon} className="size-6" />
		</div>
	)
}
