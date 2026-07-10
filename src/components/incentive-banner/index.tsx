import { Icon } from '~/components/icon'
import type { IIncentiveBannerProps } from './types'

/**
 * Componente: Incentive Banner
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7469-34686
 * Variantes: portal (Home) | leitura (Post) — mesma estrutura, ícone/copy por prop.
 * Barra sticky na base da viewport (fixed, sem scrim) — não bloqueia a página atrás.
 * Desktop: ícone + texto + CTAs pareados + X numa linha. Mobile: sem ícone, texto+X em
 * cima, CTAs empilhados full-width embaixo.
 * Tokens: --color-primary-600, --color-secondary-950, --color-secondary-500, --color-white
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
	if (!open) return null

	return (
		<div
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

			<div className="relative max-w-screen-xl mx-auto px-4 lg:px-6 py-4 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-4">
				<div className="flex items-start gap-4 lg:flex-1 lg:items-center lg:gap-6 lg:py-6">
					<div className="hidden lg:flex items-center justify-center shrink-0 size-12 rounded-full border-2 border-white">
						<Icon name={icon} className="size-6 text-white" />
					</div>

					<div className="flex-1 min-w-0 flex flex-col gap-1">
						<p className="font-display font-semibold lg:font-normal text-title-lg lg:text-headline-md text-white">
							{title} <span className="font-bold text-secondary-500">{titleHighlight}</span>
						</p>
						<p className="font-body text-body-md text-white">{description}</p>
					</div>

					<button
						type="button"
						onClick={onDismiss}
						aria-label="Fechar"
						className="lg:hidden inline-flex items-center justify-center size-8 rounded-full text-white shrink-0"
					>
						<Icon name="close" className="size-6" />
					</button>
				</div>

				<div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center lg:shrink-0">
					<button
						type="button"
						onClick={onCreateAccount}
						className="w-full lg:w-auto inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-body font-bold text-body-lg text-primary-600"
					>
						Criar conta
					</button>
					<button
						type="button"
						onClick={onLogin}
						className="w-full lg:w-auto inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-2 font-body font-bold text-body-lg text-white"
					>
						Entrar
					</button>
				</div>

				<button
					type="button"
					onClick={onDismiss}
					aria-label="Fechar"
					className="hidden lg:inline-flex items-center justify-center size-10 rounded-full text-white shrink-0"
				>
					<Icon name="close" className="size-6" />
				</button>
			</div>
		</div>
	)
}
