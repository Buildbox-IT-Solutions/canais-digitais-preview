import { useId } from 'react'
import { BottomSheet } from '~/components/bottom-sheet'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { StatusRing } from '~/components/status-ring'
import { useMediaQuery } from '~/lib/use-media-query'
import type { IIncentiveNewsletterDialogProps } from './types'

/**
 * Componente: Incentive Newsletter Dialog
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7469-34686
 * Mesma exceção do Incentive Download Dialog: sempre modal/dialog próprio, nunca banner,
 * sem cooldown/supressão/storage. Desktop: Modal centralizado. Mobile: BottomSheet
 * (ganha o swipe-to-dismiss de fábrica). Dispensa só pelo X (sem link "Agora não").
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-900, --color-neutral-50, --color-white
 */
export function IncentiveNewsletterDialog({
	open,
	onCreateAccount,
	onLogin,
	onDismiss,
}: IIncentiveNewsletterDialogProps) {
	const titleId = useId()
	const isDesktop = useMediaQuery('(min-width: 1024px)')

	if (isDesktop) {
		return (
			<Modal open={open} size="sm" onClose={onDismiss} labelledById={titleId}>
				<NewsletterDialogContent titleId={titleId} onCreateAccount={onCreateAccount} onLogin={onLogin} />
			</Modal>
		)
	}

	return (
		<BottomSheet open={open} onClose={onDismiss} labelledById={titleId}>
			<button
				type="button"
				onClick={onDismiss}
				aria-label="Fechar"
				className="absolute right-4 top-4 inline-flex items-center justify-center size-8 rounded-full text-primary-600"
			>
				<Icon name="close" className="size-4" />
			</button>
			<NewsletterDialogContent titleId={titleId} onCreateAccount={onCreateAccount} onLogin={onLogin} />
		</BottomSheet>
	)
}

interface INewsletterDialogContentProps {
	titleId: string
	onCreateAccount: () => void
	onLogin: () => void
}

function NewsletterDialogContent({ titleId, onCreateAccount, onLogin }: INewsletterDialogContentProps) {
	return (
		<div className="flex flex-col gap-6">
			<StatusRing accent="primary" icon="mail" size="sm" />

			<div className="flex flex-col gap-1">
				<p id={titleId} className="font-display font-normal text-headline-md text-primary-600">
					Crie sua conta para <span className="font-bold text-secondary-500">assinar</span>
				</p>
				<p className="font-body text-body-lg text-neutral-900">
					Assine a Food Connection e receba as principais notícias do setor direto no seu
					e-mail, sem preencher formulários de novo.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<button
					type="button"
					onClick={onCreateAccount}
					className="w-full h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white font-body font-bold text-body-lg hover:bg-secondary-950 transition-colors"
				>
					Criar conta grátis
				</button>
				<button
					type="button"
					onClick={onLogin}
					className="w-full h-12 inline-flex items-center justify-center rounded-full border-2 border-primary-600 text-primary-600 font-body font-bold text-body-lg hover:bg-neutral-50 transition-colors"
				>
					Já tenho conta • Entrar
				</button>
			</div>
		</div>
	)
}
