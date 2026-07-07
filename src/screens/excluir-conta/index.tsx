import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Dialog } from '~/components/dialog'
import DashboardPerfilV4Screen from '../dashboard-perfil-v4'
import { AuthDevNav } from '../_auth/dev-nav'

const MOTIVOS = [
	'Não uso mais',
	'O conteúdo não é relevante para mim',
	'Preocupações com privacidade',
	'Recebo muitos e-mails',
	'Encontrei outra solução',
	'Outro motivo',
]

const DELETION_DATE = '29 de maio de 2026'

/**
 * Tela: Excluir Conta (Modal) — LGPD Direito ao Esquecimento (Art. 18 IX)
 * Ação direta sobre o Perfil (ACC-01), em 2 estados: confirm (padrão) → done (?state=done).
 * Usa o Dialog padrão; Perfil ao fundo.
 */
export default function ExcluirContaScreen() {
	const [params] = useSearchParams()
	const isDone = params.get('state') === 'done'

	return (
		<>
			{/* Perfil ao fundo */}
			<DashboardPerfilV4Screen />

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
			eyebrow={
				<span className="font-body font-semibold text-label-md tracking-wider text-red-700 uppercase">
					LGPD · Art. 18 IX
				</span>
			}
			title="Excluir sua conta"
			description={
				<>
					Você tem <strong className="font-bold">30 dias para cancelar</strong> após confirmar.
					Parte dos dados pode ser mantida por obrigação legal.
				</>
			}
			destructive
			secondary={{ label: 'Cancelar', href: '/dashboard-perfil-v4' }}
			primary={{ label: 'Confirmar exclusão', type: 'submit', form: 'excluir-form' }}
		>
			<form id="excluir-form" action="/excluir-conta" method="get" className="flex flex-col gap-6" noValidate>
				<input type="hidden" name="state" value="done" />

				<label className="flex flex-col w-full">
					<span className="flex items-center gap-1 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
						Por que está saindo?
						<span className="font-body font-normal text-label-md text-neutral-500 ml-1">
							(opcional)
						</span>
					</span>
					<div className="relative flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-secondary-950 transition-colors">
						<select
							name="motivo"
							defaultValue=""
							className="flex-1 appearance-none bg-transparent font-body text-body-lg text-primary-600 focus:outline-none pr-7"
						>
							<option value="">Selecione um motivo</option>
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

				<label className="flex items-start gap-3 cursor-pointer group">
					<input type="checkbox" name="entendi" required className="sr-only peer" />
					<span className="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-1 shrink-0 transition-colors peer-checked:bg-primary-600 peer-checked:border-primary-600">
						<svg
							className="size-3 text-white opacity-0 peer-checked:opacity-100"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
						</svg>
					</span>
					<span className="flex-1 font-body text-body-md text-neutral-900">
						Entendo que após 30 dias da confirmação, esta ação{' '}
						<strong className="font-bold">não pode ser desfeita</strong> e que parte dos meus dados
						pode ser mantida por obrigação legal.
					</span>
				</label>
			</form>
		</Dialog>
	)
}

function DoneDialog() {
	return (
		<Dialog
			size="lg"
			closeHref="/dashboard-perfil-v4"
			icon={{ name: 'schedule', tone: 'warning' }}
			title="Conta marcada para exclusão"
			description={
				<>
					Sua conta será excluída em <strong className="font-bold">{DELETION_DATE}</strong> (30
					dias). Você pode cancelar a qualquer momento até lá e nada será perdido.
				</>
			}
			primary={{ label: 'Voltar ao Perfil', href: '/dashboard-perfil-v4' }}
		/>
	)
}
