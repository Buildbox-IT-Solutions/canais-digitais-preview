import { useNavigate, useSearchParams } from 'react-router'
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
 * Estados: ?state=confirmado (troca o form pelo painel de sucesso, sem navegar)
 */
export default function FormNewsletterScreen() {
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const confirmado = params.get('state') === 'confirmado'

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		navigate('/form-newsletter?state=confirmado')
	}

	return (
		<main className="bg-white">
			<HeaderDesktop />

			<div className="bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)] relative overflow-hidden">
				<div className="absolute left-0 bottom-0 w-full h-[280px] lg:w-[912px] lg:h-[452px] pointer-events-none">
					<Orbit className="w-full h-full" />
				</div>
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 relative">
					<div className="flex flex-col lg:flex-row gap-12 items-stretch py-12 lg:py-20">
						<div className="flex flex-1 flex-col gap-4 items-start py-6 lg:py-10 text-white w-full lg:w-auto">
							<h1 className="font-display text-display-sm lg:text-display-lg w-full">
								Assine a nossa newsletter
							</h1>
							<p className="font-display text-title-lg lg:text-title-xl w-full">
								Preencha seus dados e fique por dentro das novidades
							</p>
						</div>

						<div className="bg-white flex flex-1 flex-col items-start w-full lg:max-w-[704px] rounded-sm shadow-sm">
							{confirmado ? (
								<ConfirmacaoPane />
							) : (
								<form onSubmit={handleSubmit} className="flex flex-col items-start w-full" noValidate>
									<div className="flex flex-col gap-8 items-start pb-12 pt-8 px-8 w-full">
										<h2 className="font-display font-bold text-title-lg text-neutral-950 w-full">
											Dados pessoais
										</h2>

										<div className="flex flex-col lg:flex-row gap-6 lg:gap-x-6 lg:gap-y-8 items-stretch lg:items-start w-full">
											<FormField label="Nome" name="nome" required />
											<FormField label="Sobrenome" name="sobrenome" required />
										</div>

										<div className="max-w-[524px] w-full">
											<FormField
												label="E-mail"
												name="email"
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

										<div className="flex flex-col lg:flex-row gap-6 lg:gap-x-6 lg:gap-y-8 items-stretch lg:items-start w-full">
											<FormField label="Empresa" name="empresa" required />
											<FormSelect label="Cargo" required />
										</div>

										<div className="flex flex-col lg:flex-row gap-6 lg:gap-x-6 lg:gap-y-8 items-stretch lg:items-start w-full">
											<FormField
												label="Telefone"
												name="telefone"
												type="tel"
												placeholder="(xx) xxxxx-xxxx"
												required
											/>
											<FormSelect label="País" value="Brasil" required />
										</div>

										<div className="flex flex-col lg:flex-row gap-6 lg:gap-x-6 lg:gap-y-8 items-stretch lg:items-start w-full">
											<FormSelect label="Estado" required />
											<FormField label="Cidade" name="cidade" required />
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
								</form>
							)}
						</div>
					</div>
				</div>
			</div>

			<FooterDesktop />
		</main>
	)
}

function ConfirmacaoPane() {
	return (
		<div className="flex flex-col items-start w-full">
			<div className="flex flex-col gap-6 items-start pb-8 pt-10 px-8 text-center text-primary-600 w-full">
				<h2 className="font-display font-bold text-display-sm w-full">Inscrição confirmada!</h2>
				<p className="font-body text-body-lg w-full">
					Obrigado por se inscrever na nossa newsletter. A partir de agora, você vai receber
					conteúdos selecionados diretamente no seu e-mail.
				</p>
			</div>
			<div className="flex flex-col items-center justify-center pb-10 pt-4 px-8 w-full">
				<a
					href="/home"
					className="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
				>
					Continuar navegando
				</a>
			</div>
		</div>
	)
}
