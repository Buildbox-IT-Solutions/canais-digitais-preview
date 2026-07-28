import { useEffect, useRef, useState } from 'react'
import { Button } from '~/components/button'
import { Icon } from '~/components/icon'
import type { IIncentiveBannerProps } from './types'

/**
 * Componente: Incentive Banner
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7469-34686
 * Variantes: portal (Home) | leitura (Post) — mesma estrutura, ícone/copy por prop.
 * Barra sticky na base da viewport (fixed, sem scrim) — não bloqueia a página atrás.
 * Desktop/tablet (md+): ícone + texto + CTAs pareados + X numa linha só. Mobile (<md):
 * sem ícone, texto+X em cima, CTAs embaixo — pareados (largura automática) a partir de
 * sm, empilhados full-width só abaixo disso. CTAs usam Button (type=filled/outlined,
 * tone="inverse") — ver src/components/button.
 * Reserva um spacer com a altura real da barra (ResizeObserver) logo após o container
 * fixed, para o fim da página nunca ficar preso atrás dela em nenhum breakpoint.
 * Tokens: --color-primary-600, --color-secondary-950, --color-secondary-500, --color-white,
 *         --color-neutral-50
 */
export function IncentiveBanner({
	open,
	icon,
	title,
	titleHighlight,
	description,
	backgroundImage,
	onCreateAccount,
	onLogin,
	onDismiss,
}: IIncentiveBannerProps) {
	const barRef = useRef<HTMLDivElement>(null)
	const [barHeight, setBarHeight] = useState(0)

	useEffect(() => {
		if (!open || !barRef.current) return
		const el = barRef.current
		const observer = new ResizeObserver(([entry]) => setBarHeight(entry.contentRect.height))
		observer.observe(el)
		return () => observer.disconnect()
	}, [open])

	if (!open) return null

	return (
		<>
		<div
			ref={barRef}
			role="region"
			aria-label={`${title} ${titleHighlight}`}
			className="fixed inset-x-0 bottom-0 z-50 overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-950 shadow-xl animate-slide-up"
		>
			{backgroundImage ? (
				<img
					src={backgroundImage}
					alt=""
					aria-hidden="true"
					className="absolute inset-0 size-full object-cover opacity-20 pointer-events-none"
				/>
			) : null}

			<div className="relative max-w-screen-xl mx-auto px-4 md:px-6 py-4 md:py-0 flex flex-col md:flex-row md:items-center gap-4">
				<div className="flex items-start gap-4 md:flex-1 md:items-center md:gap-6 md:py-6">
					<div className="hidden md:flex items-center justify-center shrink-0 size-12 rounded-full border-2 border-white">
						<Icon name={icon} className="size-6 text-white" />
					</div>

					<div className="flex-1 min-w-0 flex flex-col gap-1">
						<p className="font-display font-semibold md:font-normal text-title-lg md:text-headline-md text-white">
							{title} <span className="font-bold text-secondary-500">{titleHighlight}</span>
						</p>
						<p className="font-body text-body-md text-white">{description}</p>
					</div>

					<button
						type="button"
						onClick={onDismiss}
						aria-label="Fechar"
						className="md:hidden inline-flex items-center justify-center size-8 rounded-full text-white shrink-0"
					>
						<Icon name="close" className="size-6" />
					</button>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center md:shrink-0">
					<Button
						label="Criar conta"
						onClick={onCreateAccount}
						type="filled"
						tone="inverse"
						className="w-full sm:w-auto"
					/>
					<Button
						label="Entrar"
						onClick={onLogin}
						type="outlined"
						tone="inverse"
						className="w-full sm:w-auto"
					/>
				</div>

				<button
					type="button"
					onClick={onDismiss}
					aria-label="Fechar"
					className="hidden md:inline-flex items-center justify-center size-10 rounded-full text-white shrink-0"
				>
					<Icon name="close" className="size-6" />
				</button>
			</div>
		</div>
		<div aria-hidden="true" style={{ height: barHeight }} />
		</>
	)
}
