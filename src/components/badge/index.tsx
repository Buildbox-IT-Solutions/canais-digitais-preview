import { twMerge } from '~/lib/tw-merge'
import type { BadgeTone, IBadgeProps } from './types'

/**
 * Componente: Badge
 * Figma: utilitário in-house (sem nodeId) — pill informativo/status criado
 * durante a migração para cobrir casos não cobertos por Tag/Categoria.
 * Spec: figma-specs/badge.md
 * Diferença vs. Tag/Categoria: Badge = status (Ativo/Em breve/Bloqueado).
 * Tag = keyword clicável. Categoria = etiqueta editorial colorida.
 * Tokens: --color-mint-light, --color-mint, --color-coral-light, --color-coral,
 *         --color-neutral-100, --color-neutral-900, --color-secondary-50, --color-secondary-950
 */

const TONE_CLASSES: Record<BadgeTone, string> = {
	mint: 'bg-mint-light text-mint',
	neutral: 'bg-neutral-100 text-neutral-900',
	coral: 'bg-coral-light text-coral',
	secondary: 'bg-secondary-50 text-secondary-950',
}

export function Badge({
	label,
	tone = 'mint',
	shape = 'square',
	icon,
	className,
}: IBadgeProps) {
	const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-sm'
	const paddingClass = icon ? 'pl-1.5 pr-2' : 'px-2'

	return (
		<span
			className={twMerge(
				'inline-flex items-center gap-1 py-1 font-body font-semibold text-label-sm',
				paddingClass,
				shapeClass,
				TONE_CLASSES[tone],
				className,
			)}
		>
			{icon ? <span className="inline-flex size-4 items-center justify-center">{icon}</span> : null}
			{label}
		</span>
	)
}
