import { twMerge } from '~/lib/tw-merge'
import type { ISkeletonProps } from './types'

/**
 * Componente: Skeleton
 * Placeholder de carregamento — retângulo com pulse, sem spinner. Dimensione via
 * `className` (largura/altura/aspect-ratio) pra espelhar a métrica do conteúdo real.
 * Tokens: --color-neutral-100
 */
export function Skeleton({ className }: ISkeletonProps) {
	return <div aria-hidden="true" className={twMerge('animate-pulse rounded-sm bg-neutral-100', className)} />
}
