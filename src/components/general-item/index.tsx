import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import { IconTile } from '~/components/icon-tile'
import type { IGeneralItemProps } from './types'

/**
 * Componente: General Item
 * Figma: 6152:31288 / 6155:31409 / 6152:31290
 * Linha LGPD/Privacidade — icon-tile + título + descrição + chevron.
 * Variante "danger" → vermelha (Excluir conta).
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-600,
 *         red-600/red-700 (Tailwind default)
 */
export function GeneralItem({
	icon,
	title,
	desc,
	href = '#',
	danger = false,
	isLast = false,
	className,
}: IGeneralItemProps) {
	const titleClasses = danger
		? 'text-red-700 group-hover:text-red-600'
		: 'text-primary-600 group-hover:text-secondary-950'

	return (
		<a
			href={href}
			className={twMerge(
				'flex items-center gap-4 py-4 px-1 group',
				!isLast && 'border-b border-neutral-100',
				className,
			)}
		>
			<IconTile icon={icon} tone={danger ? 'danger' : 'neutral'} />
			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<p
					className={twMerge(
						'font-display font-bold text-title-md transition-colors',
						titleClasses,
					)}
				>
					{title}
				</p>
				<p className="font-body text-body-md text-neutral-600">{desc}</p>
			</div>
			<Icon name="chevron-right" className="size-6 text-primary-600 shrink-0" />
		</a>
	)
}
