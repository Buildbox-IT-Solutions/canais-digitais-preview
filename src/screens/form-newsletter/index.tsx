import { FooterDesktop } from '~/components/footer-desktop'
import { FormCheckbox } from '~/components/form-checkbox'
import { FormDisclaimer } from '~/components/form-disclaimer'
import { FormField } from '~/components/form-field'
import { FormSelect } from '~/components/form-select'
import { HeaderDesktop } from '~/components/header-desktop'
import { Orbit } from '~/components/orbit'

/**
 * Tela: Formulário Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1980-14001
 */
export default function FormNewsletterScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			<div className="bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)] relative overflow-hidden">
				<div className="absolute bottom-0 left-[348px] w-[912px] h-[240px] opacity-75 pointer-events-none">
					<Orbit className="w-full h-full" />
				</div>
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 relative">
					<div className="flex gap-12 items-start py-20">
						<div className="flex flex-1 flex-col gap-4 items-start py-10 text-white">
							<h1 className="font-display text-display-lg w-full">Assine a nossa newsletter</h1>
							<p className="font-display text-title-xl w-full">
								Preencha seus dados e fique por dentro das novidades
							</p>
						</div>

						<div className="bg-white flex flex-1 flex-col items-start max-w-[704px] rounded-sm shadow-sm">
							<div className="flex flex-col items-start w-full">
								<div className="flex flex-col gap-8 items-start pb-12 pt-8 px-8 w-full">
									<h2 className="font-display font-bold text-title-lg text-neutral-950 w-full">
										Dados pessoais
									</h2>

									<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
										<FormField label="Nome" required />
										<FormField label="Sobrenome" required />
									</div>

									<div className="max-w-[524px] w-full">
										<FormField
											label="E-mail"
											type="email"
											placeholder="exemplo@email.com"
											required
										/>
									</div>
								</div>

								<div className="flex flex-col gap-8 items-start pb-12 px-8 w-full">
									<h2 className="font-display font-bold text-title-lg text-neutral-950 w-full">
										Dados profissionais
									</h2>

									<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
										<FormField label="Empresa" required />
										<FormSelect label="Cargo" required />
									</div>

									<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
										<FormField
											label="Telefone"
											type="tel"
											placeholder="(xx) xxxxx-xxxx"
											required
										/>
										<FormSelect label="País" value="Brasil" required />
									</div>

									<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
										<FormSelect label="Estado" required />
										<FormField label="Cidade" required />
									</div>
								</div>

								<div className="flex flex-col items-start px-8 w-full">
									<FormCheckbox label="Sim, eu desejo receber informações da Informa Markets e seus parceiros" />
								</div>

								<div className="flex flex-col items-start p-8 w-full">
									<button
										type="submit"
										className="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full"
									>
										Assinar newsletter
									</button>
								</div>

								<FormDisclaimer />
							</div>
						</div>
					</div>
				</div>
			</div>

			<FooterDesktop />
		</main>
	)
}
