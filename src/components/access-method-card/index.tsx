import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import { GoogleLogo } from '~/components/google-logo'
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
		return <GoogleLogo className="size-5" />
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
