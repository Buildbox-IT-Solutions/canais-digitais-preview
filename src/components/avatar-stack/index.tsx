/**
 * Componente: Avatar Stack
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3422-29955
 * Variantes: qty (2|3|4|5|6)
 * Tokens: rounded-full, border-white
 */
import { twMerge } from '~/lib/tw-merge'
import type { IAvatarStackProps } from './types'

const WIDTH_CLASS_BY_QTY: Record<number, string> = {
	2: 'w-[72px]',
	3: 'w-[104px]',
	4: 'w-[136px]',
	5: 'w-[168px]',
	6: 'w-[200px]',
}

export function AvatarStack({ authors, className }: IAvatarStackProps) {
	const visible = authors.slice(0, 6)
	const qty = Math.max(2, Math.min(6, visible.length))

	return (
		<div className={twMerge('flex items-center justify-between pr-2 shrink-0', WIDTH_CLASS_BY_QTY[qty], className)}>
			{visible.map((author) => (
				<img
					key={author.name}
					src={author.avatarUrl}
					alt={author.name}
					className="size-10 rounded-full border-2 border-white object-cover bg-neutral-100 mr-[-8px]"
				/>
			))}
		</div>
	)
}
