import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
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
 * Modal de ação direta sobre o Perfil (ACC-01), em 2 estados: confirm (padrão) → done (?state=done).
 * A rota renderiza o Perfil ao fundo + o modal, no padrão do gate-download.
 */
export default function ExcluirContaScreen() {
	const [params] = useSearchParams()
	const isDone = params.get('state') === 'done'

	return (
		<>
			{/* Perfil ao fundo */}
			<DashboardPerfilV4Screen />

			<Modal open size="lg" closeHref="/dashboard-perfil-v4" labelledById="excluir-title">
				{isDone ? <DoneState /> : <ConfirmState />}
			</Modal>

			<AuthDevNav
				paramName="state"
				label="Estado"
				options={['confirm', 'done']}
				current={isDone ? 'done' : 'confirm'}
			/>
		</>
	)
}

function ConfirmState() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2 pr-8">
				<p className="font-body font-semibold text-label-md tracking-wider text-red-700 uppercase">
					LGPD · Art. 18 IX
				</p>
				<h2 id="excluir-title" className="font-display font-bold text-headline-sm text-primary-600">
					Excluir sua conta
				</h2>
				<p className="font-body text-body-md text-neutral-700">
					Você tem <strong className="font-bold">30 dias para cancelar</strong> após confirmar.
					Parte dos dados pode ser mantida por obrigação legal.
				</p>
			</div>

			<form action="/excluir-conta" method="get" className="flex flex-col gap-6" noValidate>
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

				<div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-neutral-50">
					<a
						href="/dashboard-perfil-v4"
						className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors"
					>
						Cancelar
					</a>
					<button
						type="submit"
						className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-body font-bold text-body-lg transition-colors"
					>
						Confirmar exclusão
					</button>
				</div>
			</form>
		</div>
	)
}

function DoneState() {
	return (
		<div className="flex flex-col gap-6">
			<div className="inline-flex items-center justify-center size-16 rounded-full bg-amber-50 text-amber-700">
				<Icon name="schedule" className="size-8" />
			</div>

			<div className="flex flex-col gap-2 pr-8">
				<h2 id="excluir-title" className="font-display font-bold text-headline-sm text-primary-600">
					Conta marcada para exclusão
				</h2>
				<p className="font-body text-body-md text-neutral-700">
					Sua conta será excluída em <strong className="font-bold">{DELETION_DATE}</strong> (30
					dias). Você pode cancelar a qualquer momento até lá e nada será perdido.
				</p>
			</div>

			<a
				href="/dashboard-perfil-v4"
				className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
			>
				Voltar ao Perfil
			</a>
		</div>
	)
}
