import { Dialog } from '~/components/dialog'
import type { IIncentivePortalDialogProps } from './types'

/**
 * Componente: Incentive Portal Dialog
 * In-house (sem nodeId Figma) — modal passivo de incentivo ao cadastro, exibido
 * ~4s após o load da Home para o visitante deslogado. Casca: Dialog (Modal).
 * Controlado por estado (onClose), não por rota — a Home continua montada atrás dele.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
 */
export function IncentivePortalDialog({
	open,
	onCreateAccount,
	onLogin,
	onDismiss,
}: IIncentivePortalDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onDismiss}
			icon={{ name: 'account-circle', tone: 'primary' }}
			title="Crie sua conta gratuita"
			description="Acesse materiais exclusivos e assine nossas newsletters sem custo. Leva menos de um minuto."
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
