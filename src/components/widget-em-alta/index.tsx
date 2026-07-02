/**
 * Componente: WidgetEmAlta
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0
 * Variantes: default (lista numerada top-N de sidebar)
 * Tokens: --text-title-xl, --text-display-sm, --text-title-lg, --color-primary-600, --color-neutral-900
 */
import { twMerge } from '~/lib/tw-merge'
import { Divider } from '~/components/divider'
import type { IWidgetEmAltaProps } from './types'

export function WidgetEmAlta({ title = 'Em Alta', items, className }: IWidgetEmAltaProps) {
	return (
		<aside
			className={twMerge(
				'bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-4 rounded-lg w-full',
				className,
			)}
		>
			<div className="flex items-center p-6 w-full">
				<p className="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">{title}</p>
			</div>
			<div className="flex flex-col items-start w-full">
				{items.map((item, i) => {
					const inner = (
						<>
							<p className="text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">{i + 1}</p>
							<p className="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">
								{item.title}
							</p>
						</>
					)
					const rowClass = 'group flex font-display font-bold gap-4 items-start w-full'
					return (
						<div key={item.title} className="flex flex-col gap-4 items-start py-2 px-6 w-full">
							{item.href ? (
								<a href={item.href} className={rowClass}>
									{inner}
								</a>
							) : (
								<div className={rowClass}>{inner}</div>
							)}
							{i < items.length - 1 ? <Divider /> : null}
						</div>
					)
				})}
			</div>
		</aside>
	)
}
