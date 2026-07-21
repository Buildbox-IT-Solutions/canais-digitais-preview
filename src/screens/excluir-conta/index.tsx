import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Dialog } from '~/components/dialog'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/accordion'
import { FormCheckbox } from '~/components/form-checkbox'
import { LinkButton } from '~/components/link-button'
import DashboardPerfilV4Screen from '../dashboard-perfil-v4'
import HomeScreen from '../home'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthTerminalModal } from '../_auth/terminal-modal'

const MOTIVOS = [
	'Não uso mais',
	'O conteúdo não é relevante para mim',
	'Preocupações com privacidade',
	'Recebo muitos e-mails',
	'Encontrei outra solução',
	'Outro motivo',
]

/**
 * Tela: Excluir Conta (Modal) — LGPD Direito ao Esquecimento (Art. 18 IX)
 * Ação direta sobre o Perfil (ACC-01), em 2 estados: confirm (padrão) → done (?state=done).
 * Usa o Dialog padrão; Perfil ao fundo em confirm. Em done a conta já foi excluída — não há
 * mais sessão — então o fundo passa a ser a home deslogada, não a área logada.
 */
export default function ExcluirContaScreen() {
	const [params] = useSearchParams()
	const isDone = params.get('state') === 'done'

	return (
		<>
			{isDone ? (
				<div className="hidden lg:block">
					<HomeScreen />
				</div>
			) : (
				<DashboardPerfilV4Screen />
			)}

			{isDone ? <DoneDialog /> : <ConfirmDialog />}

			<AuthDevNav
				paramName="state"
				label="Estado"
				options={['confirm', 'done']}
				current={isDone ? 'done' : 'confirm'}
			/>
		</>
	)
}

function ConfirmDialog() {
	return (
		<Dialog
			size="lg"
			closeHref="/dashboard-perfil-v4"
			mobileFullScreen
			title="Excluir sua conta"
			description={
				<strong className="font-bold text-red-700">
					A exclusão é imediata, permanente e não pode ser desfeita.
				</strong>
			}
			destructive
			secondary={{ label: 'Cancelar', href: '/dashboard-perfil-v4' }}
			primary={{
				label: 'Excluir permanentemente',
				type: 'submit',
				form: 'excluir-form',
			}}
		>
			<form id="excluir-form" action="/excluir-conta" method="get" className="flex flex-col gap-6">
				<input type="hidden" name="state" value="done" />

				<label className="flex flex-col w-full">
					<span className="flex items-center gap-1 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
						Por que está saindo?
					</span>
					<div className="relative flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-secondary-950 transition-colors">
						<select
							name="motivo"
							required
							defaultValue=""
							className="flex-1 appearance-none bg-transparent font-body text-body-lg text-primary-600 focus:outline-none pr-7"
						>
							<option value="" disabled>
								Selecione um motivo
							</option>
							{MOTIVOS.map((m) => (
								<option key={m}>{m}</option>
							))}
						</select>
						<Icon
							name="arrow-drop-down"
							className="size-4 absolute right-3 text-neutral-500 pointer-events-none"
						/>
					</div>
				</label>

				<label className="flex flex-col w-full">
					<span className="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
						Digite{' '}
						<code className="font-mono font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-xs">
							EXCLUIR
						</code>{' '}
						para confirmar
					</span>
					<div className="flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-red-600 transition-colors">
						<input
							type="text"
							name="confirma"
							required
							autoComplete="off"
							placeholder="Digite EXCLUIR (em maiúsculas)"
							pattern="EXCLUIR"
							className="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none"
						/>
					</div>
				</label>

				<FormCheckbox
					name="entendi"
					required
					label={
						<>
							Entendo que esta ação <strong className="font-bold">não pode ser desfeita</strong>.
						</>
					}
				/>

				<Accordion type="single">
					<AccordionItem value="dados">
						<AccordionTrigger>O que acontece com meus dados?</AccordionTrigger>
						<AccordionContent>
							<ul className="flex flex-col gap-1.5 list-disc pl-5">
								<li>
									<strong className="font-semibold text-neutral-900">Excluídos agora:</strong> perfil,
									preferências, conteúdo salvo
								</li>
								<li>
									<strong className="font-semibold text-neutral-900">Mantidos por prazo legal:</strong>{' '}
									registros de acesso e transações — eliminados depois
								</li>
								<li>
									<strong className="font-semibold text-neutral-900">Nunca usados</strong> para novas
									comunicações
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</form>
		</Dialog>
	)
}

function DoneDialog() {
	return (
		<AuthTerminalModal
			accent="mint"
			icon="check"
			title="Conta excluída"
			labelledById="excluir-conta-done-title"
			closeHref="/home"
			body={
				<>
					Sua conta foi excluída permanentemente. Quando quiser voltar a acessar o conteúdo
					exclusivo do Food Connection, é só{' '}
					<LinkButton label="criar uma nova conta" href="/cadastro" size="sm" />.
				</>
			}
		/>
	)
}
