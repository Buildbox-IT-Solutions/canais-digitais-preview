import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import DashboardPerfilV4Screen from '../dashboard-perfil-v4'

/**
 * Tela: Baixar Dados (Modal) — LGPD Portabilidade (Art. 18 V)
 * Modal de ação direta sobre o Perfil: clica em "Baixar meus dados" → baixa (ACC-02).
 * A rota renderiza o Perfil ao fundo + o modal, no padrão do gate-download.
 */
export default function MeusDadosScreen() {
	return (
		<>
			{/* Perfil ao fundo */}
			<DashboardPerfilV4Screen />

			<Modal open size="md" closeHref="/dashboard-perfil-v4" labelledById="baixar-dados-title">
				<div className="flex flex-col gap-6">
					<div className="inline-flex items-center justify-center size-16 rounded-full bg-secondary-50">
						<Icon name="download" className="size-8 text-secondary-500" />
					</div>

					<div className="flex flex-col gap-2">
						<h2
							id="baixar-dados-title"
							className="font-display font-bold text-headline-sm text-primary-600"
						>
							Baixar dados pessoais
						</h2>
						<p className="font-body text-body-md text-neutral-700">
							Faça o download de uma cópia completa dos seus dados cadastrados, conforme a LGPD
							(Art. 18 V). O arquivo é gerado na hora.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<a
							href="#"
							download
							className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
						>
							<Icon name="download" className="size-5" />
							Baixar arquivo
						</a>
						<a
							href="/dashboard-perfil-v4"
							className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-transparent hover:bg-neutral-50 text-primary-600 font-body font-bold text-body-lg transition-colors"
						>
							Fechar
						</a>
					</div>
				</div>
			</Modal>
		</>
	)
}
