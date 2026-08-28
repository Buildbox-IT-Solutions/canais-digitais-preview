import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { FooterDesktop } from '~/components/footer-desktop'
import { FormCheckbox } from '~/components/form-checkbox'
import { FormDisclaimer } from '~/components/form-disclaimer'
import { FormField } from '~/components/form-field'
import { FormSelect } from '~/components/form-select'
import { HeaderDesktop } from '~/components/header-desktop'
import { IncentiveBanner } from '~/components/incentive-banner'
import { Orbit } from '~/components/orbit'
import {
	dismissNewsletterFormReminder,
	isNewsletterFormReminderDismissed,
} from '~/lib/incentive-storage'
import { buildReturnToHref, sanitizeReturnTo, serializeReturnTo } from '~/lib/sanitize-return-to'
import { NEWSLETTER_TAB_HREF } from '~/lib/use-assinar-newsletter'
import { useLogado } from '~/lib/use-logado'

/**
 * Tela: Formulário Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1980-14001
 * Estados: ?state=confirmado (troca o form pelo painel de sucesso, sem navegar)
 *
 * Esta tela é EXCLUSIVA de visitante. Nenhum caminho do produto traz um logado até
 * aqui: nos dois banners de newsletter o clique dele assina na hora, sem navegar. Se
 * chegar mesmo assim (link antigo, URL compartilhada, `?logado=true` na barra), o
 * destino certo é a aba Newsletter do perfil — nunca um formulário pedindo os dados
 * que a conta já tem. Por isso a tela também não registra o eixo Sessão na
 * ScenarioBar: "logado" aqui não é um cenário para revisar, é um estado impossível.
 *
 * Lembrete de login (barra fixa na base, `IncentiveBanner`) — o deslogado que clica em
 * "Assine agora" continua vindo direto para este formulário, sem modal nenhum no
 * caminho. O único incentivo é esta barra, e o trabalho dela é lembrar quem JÁ TEM
 * CONTA de que dá para entrar em vez de preencher 9 campos. Regras:
 *
 * · Aparece na ENTRADA da tela, não por scroll nem por timer: o lembrete só serve
 *   antes de a pessoa começar a preencher.
 * · Some no PRIMEIRO FOCO em qualquer campo — quem começou a preencher já escolheu o
 *   caminho, e insistir depois disso é ignorar um "não" que já foi dado. É essa regra
 *   que também resolve o mobile: barra fixa na base + teclado virtual aberto cobriria
 *   o campo em foco, e a barra sai justamente no foco.
 * · Dispensa (X, foco ou clique num CTA) vale pelo resto da sessão de aba, com chave
 *   própria — NÃO entra no cooldown de 7 dias dos modais passivos (ver
 *   src/lib/incentive-storage.ts).
 * · Os dois CTAs continuam: "Criar conta" também é desfecho válido aqui.
 * · "Entrar" e "Criar conta" levam `intent=newsletter` + o `returnTo` de ONDE A PESSOA
 *   VEIO (home ou matéria) — nunca de volta a este formulário, que é exatamente o que
 *   ela está tentando evitar. O fluxo de auth já assina a newsletter nesse caminho e
 *   devolve com toast (ver login-v2 e confirmacao-email-v2).
 * · ?preview=lembrete força a barra aberta para revisão depois de dispensada.
 */
export default function FormNewsletterScreen() {
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const logado = useLogado()
	const confirmado = params.get('state') === 'confirmado'

	// De onde a pessoa veio (?returnTo=/home ou /conteudo?post=…). Sem parâmetro, cai em
	// /home — mesmo default de todo o resto do fluxo de auth.
	const returnTo = sanitizeReturnTo(params.get('returnTo'))
	const authQuery = `intent=newsletter&returnTo=${encodeURIComponent(serializeReturnTo(returnTo))}`

	const previewLembrete = params.get('preview') === 'lembrete'
	// Sem `!logado` na conta: quem chega aqui é sempre visitante (ver o redirect abaixo).
	const [lembreteOpen, setLembreteOpen] = useState(
		() => previewLembrete || (!confirmado && !isNewsletterFormReminderDismissed()),
	)

	function encerrarLembrete() {
		dismissNewsletterFormReminder()
		setLembreteOpen(false)
	}

	function handleCriarConta() {
		encerrarLembrete()
		navigate(`/cadastro?step=1&${authQuery}`)
	}

	function handleEntrar() {
		encerrarLembrete()
		navigate(`/login?${authQuery}`)
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// `returnTo` sobrevive à confirmação: é ele que o painel de sucesso usa para
		// devolver a pessoa à leitura de onde ela saiu.
		navigate(`/form-newsletter?state=confirmado&returnTo=${encodeURIComponent(serializeReturnTo(returnTo))}`)
	}

	// Depois dos hooks (eles não podem ficar atrás de um return) e antes de qualquer
	// render: logado não vê formulário, vai para a aba onde a assinatura dele mora.
	if (logado) return <Navigate to={NEWSLETTER_TAB_HREF} replace />

	return (
		<>
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
								<ConfirmacaoPane href={buildReturnToHref(returnTo)} />
							) : (
								<form
									onSubmit={handleSubmit}
									// Captura o foco de qualquer campo do formulário — é o gatilho que
									// encerra o lembrete (ver o cabeçalho da tela).
									onFocusCapture={lembreteOpen ? encerrarLembrete : undefined}
									className="flex flex-col items-start w-full"
									noValidate
								>
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

		<IncentiveBanner
			open={lembreteOpen}
			icon="account-circle"
			title="Já tem uma conta?"
			titleHighlight="Entre e assine em um clique."
			description="Com a sua conta você assina sem preencher este formulário de novo."
			backgroundImage={incentiveBannerTexture}
			onCreateAccount={handleCriarConta}
			onLogin={handleEntrar}
			onDismiss={encerrarLembrete}
		/>
		</>
	)
}

function ConfirmacaoPane({ href }: { href: string }) {
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
					href={href}
					className="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
				>
					Continuar navegando
				</a>
			</div>
		</div>
	)
}
