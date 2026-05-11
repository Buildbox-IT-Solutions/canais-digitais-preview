import { twMerge } from 'tailwind-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import type { AccessMethodIcon, IAccessMethodCardProps } from './types'

/**
 * Componente: Access Method Card
 * Figma: 6145:29897 / 6145:29904 / 6145:29911
 * Card 1/3 da seção "Método de acesso" (Conta).
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-600, --color-white
 */

function MethodIcon({ icon }: { icon: AccessMethodIcon }) {
	if (icon === 'linkedin') {
		return <Icon name="linkedin" className="size-5 text-secondary-950" />
	}
	if (icon === 'google') {
		return (
			<svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				/>
				<path
					fill="#FBBC05"
					d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				/>
				<path
					fill="#EA4335"
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				/>
			</svg>
		)
	}
	return <Icon name="mail" className="size-5 text-primary-600" />
}

export function AccessMethodCard({
	icon,
	name,
	chip,
	detail,
	cta = 'Alterar',
	ctaHref = '#',
	className,
}: IAccessMethodCardProps) {
	return (
		<div
			className={twMerge(
				'bg-white border border-neutral-100 rounded-lg p-4 flex flex-col gap-2 h-full',
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<MethodIcon icon={icon} />
				<span className="font-display font-bold text-title-md text-primary-600 flex-1 min-w-0">
					{name}
				</span>
				{chip ? <Badge label={chip} tone="mint" /> : null}
			</div>
			<p className="font-body text-body-md text-neutral-600 flex-1 truncate">{detail}</p>
			<a
				href={ctaHref}
				className="inline-flex items-center font-body font-bold text-body-md text-secondary-950 hover:underline w-fit"
			>
				{cta}
			</a>
		</div>
	)
}
