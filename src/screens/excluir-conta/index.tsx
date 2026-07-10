import { useState } from 'react'
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
	const [mode, setMode] = useState<'grace' | 'immediate'>('grace')
	const [dadosOpen, setDadosOpen] = useState(false)
	const isImmediate = mode === 'immediate'

	return (
		<Dialog
			size="lg"
			closeHref="/dashboard-perfil-v4"
			mobileFullScreen
			title="Excluir sua conta"
			description={
				isImmediate ? (
					<strong className="font-bold text-red-700">
						A exclusão imediata é permanente e não pode ser desfeita.
					</strong>
				) : (
					<>
						Depois de confirmar, você tem <strong className="font-bold">14 dias</strong> para
						reativar sua conta. Passado esse prazo, a exclusão é permanente.
					</>
				)
			}
			destructive
			secondary={{ label: 'Cancelar', href: '/dashboard-perfil-v4' }}
			primary={{
				label: isImmediate ? 'Excluir permanentemente' : 'Confirmar exclusão',
				type: 'submit',
				form: 'excluir-form',
			}}
			bottomLink={
				!isImmediate ? (
					<button
						type="button"
						onClick={() => setMode('immediate')}
						className="font-body text-body-md text-neutral-600 hover:text-neutral-950 hover:underline transition-colors"
					>
						Prefiro excluir agora, sem período de recuperação
					</button>
				) : undefined
			}
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
						Entendo que, após 14 dias, esta ação{' '}
						<strong className="font-bold">não pode ser desfeita</strong>.
					</span>
				</label>

				<div className="flex flex-col gap-2">
					<button
						type="button"
						onClick={() => setDadosOpen((v) => !v)}
						aria-expanded={dadosOpen}
						className="self-start inline-flex items-center gap-1 font-body text-body-md text-neutral-600 hover:text-neutral-950 transition-colors"
					>
						O que acontece com meus dados?
						<Icon
							name="arrow-drop-down"
							className={`size-4 transition-transform ${dadosOpen ? 'rotate-180' : ''}`}
						/>
					</button>
					{dadosOpen ? (
						<p className="font-body text-body-md text-neutral-600">
							A maior parte dos seus dados é excluída. Uma pequena parte pode ser mantida por
							tempo limitado apenas para cumprir obrigações legais (por exemplo, registros exigidos
							por lei) e depois também é eliminada.
						</p>
					) : null}
				</div>
			</form>
		</Dialog>
	)
}

function DoneDialog() {
	return (
		<Dialog
			size="lg"
			closeHref="/dashboard-perfil-v4"
			mobileFullScreen
			icon={{ name: 'schedule', tone: 'warning' }}
			title="Conta marcada para exclusão"
			description={
				<>
					Sua conta será excluída em <strong className="font-bold">{DELETION_DATE}</strong> (14
					dias). Você pode cancelar a qualquer momento até lá e nada será perdido.
				</>
			}
			primary={{ label: 'Voltar ao Perfil', href: '/dashboard-perfil-v4' }}
		/>
	)
}
