import { Dialog } from '~/components/dialog'
import type { IIncentiveDownloadDialogProps } from './types'

/**
 * Componente: Incentive Download Dialog
 * In-house (sem nodeId Figma) — modal exibido ao clicar num CTA de download
 * deslogado (Home e Post). Sem cooldown: sempre aparece. Cópia genérica —
 * não referencia o material específico (MVP). Casca: Dialog (Modal).
 * Controlado por estado (onClose), não por rota.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
 */
export function IncentiveDownloadDialog({
	open,
	onCreateAccount,
	onLogin,
	onDismiss,
}: IIncentiveDownloadDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onDismiss}
			icon={{ name: 'download', tone: 'secondary' }}
			title="Crie sua conta para baixar"
			description="Baixe este material agora e tenha acesso a todos os outros com um clique, sem preencher formulários de novo."
			primary={{ label: 'Criar conta', onClick: onCreateAccount }}
			secondary={{ label: 'Entrar', onClick: onLogin }}
			bottomLink={
				<button
					type="button"
					onClick={onDismiss}
					className="font-body font-bold text-body-md text-secondary-950 hover:underline"
				>
					Agora não
				</button>
			}
		/>
	)
}
