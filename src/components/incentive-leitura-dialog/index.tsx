import { Dialog } from '~/components/dialog'
import type { IIncentiveLeituraDialogProps } from './types'

/**
 * Componente: Incentive Leitura Dialog
 * In-house (sem nodeId Figma) — modal passivo de incentivo ao cadastro, exibido
 * ao cruzar ~50% de scroll no Post para o visitante deslogado. Casca: Dialog (Modal).
 * Controlado por estado (onClose), não por rota — o Post continua montado atrás dele.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
 */
export function IncentiveLeituraDialog({
	open,
	onCreateAccount,
	onLogin,
	onDismiss,
}: IIncentiveLeituraDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onDismiss}
			icon={{ name: 'description', tone: 'primary' }}
			title="Gostando da leitura?"
			description="Crie uma conta gratuita para acessar mais conteúdos como este e receber nossas newsletters."
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
