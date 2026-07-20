import type { ReactNode } from 'react'
import { Modal } from '~/components/modal'
import { StatusRing, type StatusRingAccent } from '~/components/status-ring'
import type { IconName } from '~/components/icon/paths'

export interface AuthTerminalButton {
	label: string
	/** Navega para uma rota. Omita e use `onClick` para uma ação in-page (ex.: retry). */
	href?: string
	onClick?: () => void
	variant: 'filled' | 'ghost'
}

const BTN_BASE =
	'inline-flex items-center justify-center w-full h-12 px-6 rounded-full font-body font-bold text-body-lg transition-colors'

const BTN_VARIANT: Record<AuthTerminalButton['variant'], string> = {
	filled: 'bg-primary-600 hover:bg-secondary-950 text-white',
	ghost: 'bg-transparent hover:bg-neutral-50 text-primary-600',
}

interface IAuthTerminalModalProps {
	accent: StatusRingAccent
	icon: IconName
	title: string
	body: ReactNode
	buttons?: AuthTerminalButton[]
	labelledById: string
	closeHref?: string
}

/**
 * Modal terminal compacto — estados de fim de linha (link expirado / ja usado / conta excluída),
 * sem proof panel. Casca unica centralizada (size md) sobre a home: anel de status + titulo +
 * corpo + CTA(s) opcionais + fechar. Sem `buttons`, o conteúdo ganha padding extra no rodapé pra
 * não ficar colado na borda do modal.
 * Compartilhado por Confirmacao de e-mail, Redefinir senha e Excluir conta.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50
 */
export function AuthTerminalModal({
	accent,
	icon,
	title,
	body,
	buttons = [],
	labelledById,
	closeHref = '/home',
}: IAuthTerminalModalProps) {
	return (
		<Modal
			open
			size="md"
			mobileFullScreen
			closeHref={closeHref}
			showClose
			labelledById={labelledById}
		>
			<div
				className={`flex flex-col items-center gap-8 text-center w-full max-w-[392px] mx-auto lg:max-w-none ${buttons.length === 0 ? 'pb-6' : ''}`}
			>
				<StatusRing accent={accent} icon={icon} size="sm" />

				<div className="flex flex-col gap-2 w-full">
					<h2
						id={labelledById}
						className="font-display font-bold text-headline-sm text-primary-600"
					>
						{title}
					</h2>
					<p className="font-body text-body-md text-neutral-900">{body}</p>
				</div>

				{buttons.length > 0 ? (
					<div className="flex flex-col gap-3 w-full">
						{buttons.map((b) =>
							b.href ? (
								<a key={b.label} href={b.href} className={`${BTN_BASE} ${BTN_VARIANT[b.variant]}`}>
									{b.label}
								</a>
							) : (
								<button
									key={b.label}
									type="button"
									onClick={b.onClick}
									className={`${BTN_BASE} ${BTN_VARIANT[b.variant]}`}
								>
									{b.label}
								</button>
							),
						)}
					</div>
				) : null}
			</div>
		</Modal>
	)
}
