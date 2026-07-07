/**
 * Componente: WebstoryCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0
 * Variantes: default (320:569, chip de categoria + título em overlay com gradiente no hover)
 * Tokens: --color-primary-600, --text-title-md
 */
import { twMerge } from '~/lib/tw-merge'
import { Categoria } from '~/components/categoria'
import type { IWebstoryCardProps } from './types'

export function WebstoryCard({ title, image, label, color, href = '#', className }: IWebstoryCardProps) {
	return (
		<a
			href={href}
			className={twMerge(
				'group shrink-0 w-[312px] lg:w-[288px] aspect-[320/569] relative rounded-sm overflow-hidden',
				className,
			)}
		>
			<img
				src={image}
				alt="Story"
				className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
			/>
			<div className="absolute inset-0 flex flex-col justify-between">
				<div className="flex flex-col items-start p-5">
					<Categoria color={color} label={label} chip />
				</div>
				<div className="bg-primary-600/70 group-hover:bg-gradient-to-b group-hover:from-primary-600/0 group-hover:via-primary-600/70 group-hover:to-primary-600 flex flex-col gap-2 items-start px-5 py-4 w-full">
					<h3 className="font-display font-bold text-title-md text-white w-full">{title}</h3>
				</div>
			</div>
		</a>
	)
}
