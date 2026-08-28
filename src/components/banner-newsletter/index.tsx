/**
 * Componente: Banner Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1188-11621
 * Variante implementada: "com photo" (Desktop/Mobile) — imagem 3:2 empilha acima do
 * texto no mobile, ao lado no desktop.
 * Layouts: `destaque` (faixa larga da home) e `sidebar` (coluna lateral da página de
 * conteúdo, sempre empilhado). O `sidebar` era markup solto dentro de
 * screens/conteudo até 28/08/2026 — virou variante daqui quando o banner ganhou
 * estados, para os dois lugares não divergirem no comportamento de assinar.
 * Estados: o CTA é um `SubscribeButton` (idle | pending | subscribed) — o MESMO
 * componente que o NewsletterCard usa, para as duas superfícies de "assinar" não
 * divergirem. Falha não é estado daqui: quem chama faz rollback para idle e avisa por
 * toast — ver src/lib/use-assinar-newsletter.ts.
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-50,
 *         --color-secondary-950, --text-display-sm, --text-headline-sm, --text-body-lg
 */
import { SubscribeButton } from '~/components/subscribe-button'
import { twMerge } from '~/lib/tw-merge'
import type { IBannerNewsletterProps } from './types'

export function BannerNewsletter({
	image,
	title,
	description,
	ctaLabel,
	ctaHref,
	onCtaClick,
	variant = 'destaque',
	state = 'idle',
	className,
}: IBannerNewsletterProps) {
	const sidebar = variant === 'sidebar'

	return (
		<section className={twMerge('w-full', sidebar ? undefined : 'py-10', className)}>
			<div className={sidebar ? 'w-full' : 'max-w-screen-xl mx-auto px-4 lg:px-6'}>
				<div
					className={twMerge(
						'bg-primary-100 flex flex-col overflow-hidden rounded-sm w-full',
						sidebar ? 'items-start' : 'items-center lg:flex-row',
					)}
				>
					<div
						className={twMerge(
							'aspect-[300/200] flex flex-col items-center justify-center overflow-hidden w-full',
							sidebar ? undefined : 'lg:flex-1 lg:min-w-0 lg:self-stretch',
						)}
					>
						<img src={image} alt="" className="w-full h-full object-cover" />
					</div>

					<div
						className={twMerge(
							'flex flex-col items-start justify-center w-full',
							sidebar ? undefined : 'lg:flex-1 lg:min-w-0',
						)}
					>
						<div
							className={twMerge(
								'flex flex-col gap-4 items-start justify-center pb-4 pt-8 px-6 text-primary-600 w-full',
								sidebar ? undefined : 'lg:pt-10 lg:px-10',
							)}
						>
							<p
								className={twMerge(
									'font-display font-bold text-headline-sm w-full',
									sidebar ? undefined : 'lg:text-display-sm lg:leading-[44px]',
								)}
							>
								{title}
							</p>
							<p className="font-body text-body-lg w-full">{description}</p>
						</div>

						{/* `min-h-24` e não `h-24`: o estado `subscribed` empilha o selo e o link de
						    gerenciar, e altura fixa recortaria o segundo. Em `idle` a caixa continua
						    com a mesma altura de antes. */}
						<div
							className={twMerge(
								'flex flex-col gap-3 items-start justify-center min-h-24 pb-8 pt-4 px-6 w-full',
								sidebar ? undefined : 'lg:pb-10 lg:px-10',
							)}
						>
							<SubscribeButton
								status={state}
								label={ctaLabel}
								size="large"
								href={ctaHref}
								onSubscribe={onCtaClick}
								// Só o CTA em `idle` ocupa a linha inteira; o selo "Assinado" e o
								// botão em espera ficam do tamanho do próprio conteúdo — esticar um
								// status por 400px transforma confirmação em faixa.
								className={twMerge(
									state === 'idle' ? 'w-full' : undefined,
									state === 'idle' && !sidebar ? 'lg:w-auto' : undefined,
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
