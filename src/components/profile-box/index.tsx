import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import type { IProfileBoxProps } from './types'

/**
 * Componente: Profile Box
 * Figma: 6989:10233 — Desktop 6989:10234/6989:10246 · Mobile 7416:34464/7416:34449
 * Desktop: 3 colunas lado a lado — icon-tile ao lado de título+descrição · preview
 * de campos · CTA. Mobile: empilhamento próprio — icon-tile+título em linha, com a
 * descrição abaixo (largura cheia, não indentada ao lado do ícone); padding do
 * card 16px (24px no desktop).
 * Variante "incomplete": chip "Complete seu Perfil" no topo.
 * Tokens: --color-primary-600, --color-neutral-50, --color-neutral-100, --color-neutral-500,
 *         --color-neutral-600, --color-neutral-950, --color-white
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
	const fieldTextColor = placeholder ? 'text-neutral-500' : 'text-neutral-950'
	// Padding por coluna: no mobile as 3 colunas empilham, então o topo/base é
	// distribuído (título em cima, CTA embaixo) para não triplicar o ritmo
	// vertical. Em ≥lg volta ao padding uniforme original (p-6 / pt-3 pb-6 px-6).
	// Strings literais — Tailwind não detecta classes montadas dinamicamente.
	const col1Pad = incomplete ? 'px-4 lg:px-6 pt-3 pb-2 lg:pb-6' : 'px-4 lg:px-6 pt-6 pb-2 lg:pb-6'
	const col2Pad = incomplete
		? 'px-4 lg:px-6 py-2 lg:pt-3 lg:pb-6'
		: 'px-4 lg:px-6 py-2 lg:pt-6 lg:pb-6'
	const col3Pad = incomplete ? 'px-4 lg:px-6 pt-2 pb-6 lg:pt-3' : 'px-4 lg:px-6 pt-2 pb-6 lg:pt-6'

	const iconTile = (
		<div className="bg-neutral-50 inline-flex items-center justify-center p-3 rounded-lg shrink-0">
			<Icon name={icon} className="size-6 text-primary-600" />
		</div>
	)

	return (
		<div className={twMerge('bg-white border border-neutral-100 rounded-lg w-full', className)}>
			{incomplete ? (
				<div className="px-4 lg:px-6 pt-4 flex">
					<Badge label={chip} tone="mint" icon={<Icon name="star-filled" className="size-4" />} />
				</div>
			) : null}

			<div className="flex flex-col lg:flex-row lg:items-stretch w-full">
				<div className={twMerge('flex-1 min-w-0', col1Pad)}>
					{/* Mobile: icon-tile + título em linha; descrição abaixo, largura cheia */}
					<div className="flex lg:hidden flex-col gap-2">
						<div className="flex items-center gap-4">
							{iconTile}
							<h3 className="font-display font-bold text-title-md text-primary-600">{title}</h3>
						</div>
						<p className="font-body text-body-md text-neutral-600">{description}</p>
					</div>

					{/* Desktop: icon-tile ao lado da coluna título+descrição */}
					<div className="hidden lg:flex items-start gap-4">
						{iconTile}
						<div className="flex-1 min-w-0 flex flex-col gap-1">
							<h3 className="font-display font-bold text-title-md text-primary-600">{title}</h3>
							<p className="font-body text-body-md text-neutral-600">{description}</p>
						</div>
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
						className="inline-flex items-center justify-center gap-2 w-full h-10 pl-4 pr-5 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg lg:w-auto lg:h-8 lg:pl-3 lg:pr-4 lg:text-body-md"
					>
						<Icon name="edit" className="size-6 lg:size-5" />
						{cta}
					</a>
				</div>
			</div>
		</div>
	)
}
