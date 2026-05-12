import { twMerge } from 'tailwind-merge'
import OrbitSvg from '~/assets/icons/orbit.svg'
import type { IOrbitProps } from './types'

/**
 * Componente: Informa Orbit — grafismo decorativo
 * Figma: nodeId 2085:41892. Concentric rings em gradiente azul.
 * O wrapper externo deve ser `relative overflow-hidden`; este componente
 * posiciona-se via classes utilitárias absolute repassadas via className.
 */
export function Orbit({ className }: IOrbitProps) {
	return <OrbitSvg className={twMerge('pointer-events-none', className)} />
}
