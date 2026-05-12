import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { FooterLink, FooterSocial, IFooterDesktopProps } from './types'

/**
 * Componente: Footer Desktop
 * Brand Informa + grid de 11 editorias + descrição + legal + social vertical.
 * Tokens: --color-primary-600, --color-primary-100, --color-neutral-100, --color-white
 */

const DEFAULT_CATEGORIES: FooterLink[] = [
	{ label: 'Eventos', href: '#' },
	{ label: 'Ingredientes', href: '#' },
	{ label: 'Indústria A&B', href: '#' },
	{ label: 'Proteína Animal', href: '#' },
	{ label: 'Food Service', href: '#' },
	{ label: 'Sorvetes', href: '#' },
	{ label: 'Tecnologia', href: '#' },
	{ label: 'Embalagens', href: '#' },
	{ label: 'ESG', href: '#' },
	{ label: 'Especialistas', href: '#' },
	{ label: 'E-books', href: '#' },
]

const DEFAULT_LEGAL: FooterLink[] = [
	{ label: 'Acessibilidade', href: '#' },
	{ label: 'Termos e condições do visitante', href: '#' },
	{ label: 'Termos de Uso', href: '#' },
	{ label: 'Política de privacidade', href: '#' },
]

const DEFAULT_SOCIALS: FooterSocial[] = [
	{ provider: 'whatsapp', href: '#', label: 'WhatsApp' },
	{ provider: 'linkedin', href: '#', label: 'LinkedIn' },
	{ provider: 'facebook', href: '#', label: 'Facebook' },
	{ provider: 'youtube', href: '#', label: 'YouTube' },
	{ provider: 'twitter', href: '#', label: 'X / Twitter' },
]

const DEFAULT_DESCRIPTION =
	'Canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service. Aqui você encontra conteúdo relevante e entrevistas com profissionais que compartilham informações, tendências e ideias para revolucionar a cadeia de alimentos e bebidas.'

export function FooterDesktop({
	categories = DEFAULT_CATEGORIES,
	legalLinks = DEFAULT_LEGAL,
	socials = DEFAULT_SOCIALS,
	copyright = '© 2026 Informa PLC',
	description = DEFAULT_DESCRIPTION,
	className,
}: IFooterDesktopProps) {
	return (
		<footer className={twMerge('w-full bg-primary-600 text-white', className)}>
			<div className="max-w-screen-xl mx-auto flex gap-[72px] items-start px-6">
				<div className="flex-1 flex flex-col items-start">
					<div className="flex items-start pt-8 pb-4 w-full">
						<div className="h-10 inline-flex items-center font-display font-bold text-title-xl text-white">
							informa
						</div>
					</div>

					<div className="grid grid-cols-4 gap-x-14 gap-y-4 py-4 w-full">
						{categories.map((cat) => (
							<a
								key={cat.label}
								href={cat.href}
								className="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors"
							>
								{cat.label}
							</a>
						))}
					</div>

					<div className="flex flex-col gap-4 items-center justify-center py-4 w-full">
						<div className="h-px w-full bg-neutral-100/50" />
						<p className="text-body-sm font-body text-white w-full leading-4">{description}</p>
						<div className="h-px w-full bg-neutral-100/50" />
					</div>

					<div className="flex items-center w-full">
						<div className="flex-1 flex flex-wrap gap-x-14 gap-y-4 items-start pb-10 pt-4">
							{legalLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="font-body font-semibold text-label-lg text-white hover:text-primary-100 transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>
						<div className="flex items-center justify-end pb-10 pt-4">
							<p className="font-body text-body-sm text-white whitespace-nowrap">{copyright}</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 items-end px-4 py-8 self-stretch">
					{socials.map((s) => (
						<a
							key={s.provider}
							href={s.href}
							aria-label={s.label}
							className="inline-flex items-center justify-center size-10 rounded-full border border-white text-white hover:bg-white/10 transition-colors"
						>
							<Icon name={s.provider} className="size-5" />
						</a>
					))}
				</div>
			</div>
		</footer>
	)
}
