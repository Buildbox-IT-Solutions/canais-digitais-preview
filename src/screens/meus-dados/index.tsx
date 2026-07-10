import { Dialog } from '~/components/dialog'
import DashboardPerfilV4Screen from '../dashboard-perfil-v4'

/**
 * Tela: Baixar Dados (Modal) — LGPD Portabilidade (Art. 18 V)
 * Modal de ação direta sobre o Perfil: clica em "Baixar meus dados" → baixa (ACC-02).
 * Usa o Dialog padrão; Perfil ao fundo.
 */
export default function MeusDadosScreen() {
	return (
		<>
			{/* Perfil ao fundo */}
			<DashboardPerfilV4Screen />

			<Dialog
				closeHref="/dashboard-perfil-v4"
				mobileFullScreen
				icon={{ name: 'download', tone: 'secondary' }}
				title="Baixar dados pessoais"
				description="Faça o download de uma cópia completa dos seus dados cadastrados, conforme a LGPD (Art. 18 V). O arquivo é gerado na hora."
				secondary={{ label: 'Cancelar', href: '/dashboard-perfil-v4' }}
				primary={{ label: 'Baixar arquivo', href: '#', icon: 'download' }}
			/>
		</>
	)
}
