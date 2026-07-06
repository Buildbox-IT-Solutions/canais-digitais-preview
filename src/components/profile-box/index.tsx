import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import type { IProfileBoxProps } from './types'

/**
 * Componente: Profile Box
 * Figma: 6152:31044 / 6152:31045 / 6152:31046
 * Card com 3 colunas: icon-tile + título + descrição · preview de campos · CTA.
 * Variante "incomplete": chip "Complete seu Perfil" no topo.
 * Tokens: --color-primary-600, --color-neutral-100, --color-neutral-400, --color-neutral-700,
 *         --color-neutral-950, --color-white
 */
export function ProfileBox({
	icon,
	title,
	description,
	fields,
	href = '#',
	cta = 'Atualizar',
	incomplete = false,
	placeholder = false,
	chip = 'Complete seu Perfil',
	className,
}: IProfileBoxProps) {
	const fieldTextColor = placeholder ? 'text-neutral-400' : 'text-neutral-950'
	// Padding por coluna: no mobile as 3 colunas empilham, então o topo/base é
	// distribuído (título em cima, CTA embaixo) para não triplicar o ritmo
	// vertical. Em ≥lg volta ao padding uniforme original (p-6 / pt-3 pb-6 px-6).
	// Strings literais — Tailwind não detecta classes montadas dinamicamente.
	const col1Pad = incomplete ? 'px-6 pt-3 pb-2 lg:pb-6' : 'px-6 pt-6 pb-2 lg:pb-6'
	const col2Pad = incomplete ? 'px-6 py-2 lg:pt-3 lg:pb-6' : 'px-6 py-2 lg:pt-6 lg:pb-6'
	const col3Pad = incomplete ? 'px-6 pt-2 pb-6 lg:pt-3' : 'px-6 pt-2 pb-6 lg:pt-6'

	return (
		<div className={twMerge('bg-white border border-neutral-100 rounded-lg w-full', className)}>
			{incomplete ? (
				<div className="px-6 pt-4 flex">
					<Badge label={chip} tone="mint" icon={<Icon name="star-filled" className="size-4" />} />
				</div>
			) : null}

			<div className="flex flex-col lg:flex-row lg:items-stretch w-full">
				<div className={twMerge('flex-1 min-w-0 flex items-start gap-4', col1Pad)}>
					<div className="bg-neutral-100 inline-flex items-center justify-center p-3 rounded-sm shrink-0">
						<Icon name={icon} className="size-6 text-primary-600" />
					</div>
					<div className="flex-1 min-w-0 flex flex-col gap-1">
						<h3 className="font-display font-bold text-title-md text-primary-600">{title}</h3>
						<p className="font-body text-body-md text-neutral-700">{description}</p>
					</div>
				</div>

				<div className={twMerge('flex-1 min-w-0 flex flex-col gap-1', col2Pad)}>
					{fields.map((f, i) => (
						<p key={i} className={twMerge('font-body text-body-md lg:truncate', fieldTextColor)}>
							{f}
						</p>
					))}
				</div>

				<div
					className={twMerge('shrink-0 flex flex-col items-start lg:items-end justify-center', col3Pad)}
				>
					<a
						href={href}
						className="inline-flex items-center gap-2 h-8 pl-3 pr-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0"
					>
						<Icon name="edit" className="size-5" />
						{cta}
					</a>
				</div>
			</div>
		</div>
	)
}
