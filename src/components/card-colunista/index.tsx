/**
 * Componente: CardColunista
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1352-23176
 * Variantes: default (foto + nome + cargo + citação/título em destaque)
 * Bloco da citação fixo em h-[108px] (3 linhas de --text-title-md a 24px + padding vertical
 * de 16px + folga de 4px) para caber line-clamp-3 sem cortar o padding. Nome/cargo alinhados
 * ao fim da linha (self-end) para reduzir o espaço em branco acima da citação.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50, --color-neutral-100,
 * --color-neutral-900, --text-title-lg, --text-title-md, --text-body-md
 */
import { twMerge } from '~/lib/tw-merge'
import type { ICardColunistaProps } from './types'

export function CardColunista({ image, name, role, quote, className }: ICardColunistaProps) {
	return (
		<article
			className={twMerge(
				'group bg-white border border-neutral-100 hover:bg-neutral-50 hover:border-primary-600 transition-colors flex flex-col items-start justify-center rounded-sm overflow-hidden shrink-0 w-[392px]',
				className,
			)}
		>
			<div className="flex items-center w-full">
				<div className="flex items-center p-3">
					<div className="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
						<img src={image} alt="Foto" className="w-full h-full object-cover" />
					</div>
				</div>
				<div className="flex flex-col self-end flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
					<p className="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
						<a href="/categoria" className="hover:underline">{name}</a>
					</p>
					<p className="font-body text-body-md text-neutral-900 line-clamp-2 w-full">{role}</p>
				</div>
			</div>
			<div className="flex flex-col items-start justify-end h-[108px] p-4 w-full">
				<p className="font-display font-bold text-title-md tracking-[0.15px] text-primary-600 line-clamp-3 w-full">
					{quote}
				</p>
			</div>
		</article>
	)
}
