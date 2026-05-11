import { twMerge } from 'tailwind-merge'
import type { ISponsorLineProps } from './types'

/**
 * Componente: Sponsor Line
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2676-8328
 * "Conteúdo Patrocinado" + nome do patrocinador.
 * Tokens: --color-neutral-900, --color-secondary-950
 */
export function SponsorLine({ company, href, className }: ISponsorLineProps) {
	return (
		<div className={twMerge('flex flex-col gap-1 items-start pt-3 w-full', className)}>
			<p className="font-body font-semibold text-label-sm text-neutral-900 w-full">
				Conteúdo Patrocinado
			</p>
			{href ? (
				<a
					href={href}
					className="font-display font-bold text-title-md text-secondary-950 hover:underline"
				>
					{company}
				</a>
			) : (
				<span className="font-display font-bold text-title-md text-secondary-950">{company}</span>
			)}
		</div>
	)
}
