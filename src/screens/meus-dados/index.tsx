import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { AuthBackLink } from '../_auth/back-link'

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

/**
 * Tela: Meus Dados — LGPD Portabilidade (Art. 18 V)
 * Card único com heading + descrição + linha de download (padrão Conta Globo).
 */
export default function MeusDadosScreen() {
	const firstName = USER_NAME.split(' ')[0] || 'Olá'

	return (
		<main className="bg-white min-h-screen flex flex-col">
			<HeaderDesktop
				userLoggedIn
				userName={USER_NAME}
				userEmail={USER_EMAIL}
				userInitials={USER_INITIALS}
			/>

			<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
				<div className="animate-fade-up-sm">
					<AuthBackLink
						href="/dashboard-perfil-v3?tab=conta"
						label="Voltar para minha conta"
					/>
				</div>

				<section
					className="mt-8 max-w-3xl bg-secondary-500/5 rounded-lg px-8 py-8 animate-fade-up-sm"
					style={{ animationDelay: '60ms' }}
				>
					<header className="flex flex-col gap-4 max-w-[60ch]">
						<h1 className="font-display font-bold text-headline-md text-primary-600">
							Baixar dados pessoais
						</h1>
						<div className="flex flex-col gap-3 font-body text-body-lg text-neutral-900">
							<p>Você pode fazer o download de uma cópia de seus dados a qualquer momento.</p>
							<p>Clique no botão "Baixar" para que o download seja efetuado.</p>
						</div>
					</header>

					<div className="my-8 h-px bg-neutral-100" />

					<div className="flex flex-col md:flex-row md:items-center gap-5">
						<span className="inline-flex items-center justify-center size-12 rounded-lg bg-white shrink-0">
							<Icon name="doc" className="size-6 text-secondary-950" />
						</span>

						<div className="flex-1 min-w-0 max-w-[55ch]">
							<h2 className="font-display font-bold text-title-lg text-primary-600">
								Dados pessoais
							</h2>
							<p className="mt-1 font-body text-body-md text-neutral-700">
								{firstName}, baixe todos os seus dados pessoais cadastrados em nosso site.
							</p>
						</div>

						<a
							href="#"
							download
							className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border-[1.5px] border-secondary-950 bg-white hover:bg-secondary-500/10 text-secondary-950 font-body font-bold text-body-lg transition-colors shrink-0 md:self-auto self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
						>
							<Icon name="download" className="size-5" />
							Baixar
						</a>
					</div>
				</section>
			</div>

			<FooterDesktop />
		</main>
	)
}
