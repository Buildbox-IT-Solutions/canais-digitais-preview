import { twMerge } from '~/lib/tw-merge'
import orbitUrl from '~/assets/icons/orbit.svg?url'
import type { IOrbitProps } from './types'

/**
 * Componente: Informa Orbit — grafismo decorativo
 * Figma: nodeId 7660:31084. Concentric rings em gradiente azul.
 * `orbit.svg` substituído pela versão oficial (a antiga tinha PNGs embutidos em
 * base64 corrompidos e aparecia como imagem quebrada).
 * Renderizado como background-image (`bg-cover`), igual à referência em
 * foodconnection.com.br/formulario — a arte é propositalmente cortada pelo
 * container, não "encolhida pra caber". O wrapper externo deve ser
 * `relative overflow-hidden`; este componente posiciona-se via classes
 * utilitárias absolute repassadas via className.
 */
export function Orbit({ className }: IOrbitProps) {
	return (
		<div
			className={twMerge('pointer-events-none bg-no-repeat bg-cover', className)}
			style={{ backgroundImage: `url(${orbitUrl})` }}
		/>
	)
}
