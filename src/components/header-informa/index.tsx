import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IHeaderInformaProps } from './types'

/**
 * Componente: Header Informa
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=110-3575
 * Variantes do Figma: device (Desktop|Mobile) × opened (false|true) — 4 variants
 * Tokens: --color-neutral-950, --color-white
 *
 * Faixa institucional Informa PLC no topo do header. Clica e expande para
 * mostrar o texto legal + lista de links. Fecha com clique fora ou Escape.
 *
 * Esta versão é responsiva: o painel usa flex-wrap no desktop (≥768px) e
 * flex-col no mobile.
 */
export function HeaderInforma({ className }: IHeaderInformaProps) {
	const [opened, setOpened] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!opened) return

		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpened(false)
			}
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpened(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [opened])

	return (
		<div
			ref={containerRef}
			className={twMerge('w-full bg-neutral-950 text-white', className)}
			aria-expanded={opened}
		>
			<button
				type="button"
				onClick={() => setOpened((v) => !v)}
				aria-controls="header-informa-panel"
				aria-label={opened ? 'Fechar painel institucional' : 'Abrir painel institucional'}
				className="flex items-center justify-center h-10 px-6 w-full cursor-pointer hover:bg-white/8 transition-colors"
			>
				<span className="inline-flex items-center gap-1">
					<span className="font-display font-bold text-label-lg">informa</span>
					<Icon
						name="arrow-drop-down"
						className={twMerge(
							'size-5 transition-transform duration-300',
							opened && 'rotate-180',
						)}
					/>
				</span>
			</button>

			<div
				id="header-informa-panel"
				aria-hidden={!opened}
				className={twMerge(
					'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
					opened ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
				)}
			>
				<div className="flex flex-col items-center pb-6 pt-2 px-4 md:px-6 w-full">
					<div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-x-10 md:gap-y-6 items-center md:items-start md:justify-center max-w-screen-xl w-full text-left">
						<p className="flex-1 min-w-0 font-body text-body-md text-white">
							Este site é operado por uma empresa ou empresas de propriedade da Informa PLC e
							todos os direitos autorais residem com eles. A sede da Informa PLC é 5 Howick
							Place, Londres SW1P 1WG. Registrado na Inglaterra e no País de Gales. Número
							8860726.
						</p>
						<div className="flex-1 min-w-0 flex flex-col gap-4 items-start">
							<p className="font-body text-body-md text-white w-full">
								Food Connection faz parte da divisão Informa Markets da Informa PLC
							</p>
							<div className="flex flex-wrap gap-x-6 gap-y-2 items-start w-full">
								<span className="font-body font-bold text-body-md text-white">Informa PLC</span>
								<a
									href="#"
									className="font-body font-semibold text-body-md text-white hover:underline"
								>
									Sobre Nós
								</a>
								<a
									href="#"
									className="font-body font-semibold text-body-md text-white hover:underline"
								>
									Relação com Cinvestidores
								</a>
								<a
									href="#"
									className="font-body font-semibold text-body-md text-white hover:underline"
								>
									Talento
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
