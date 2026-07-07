import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IModalProps, ModalSize } from './types'

/**
 * Componente: Modal — diálogo centralizado com scrim
 * Figma: 6268:18394 (deriva do markup de login-modal + acessibilidade do Drawer)
 * Modo padrão: painel único com padding. Modo `padded={false}`: painel em flex (duas colunas,
 * ex.: form + ProofPanelMinimal), recortado com overflow-hidden.
 * `mobileFullScreen`: no mobile (<lg) o painel vira tela cheia (usado pelos fluxos de auth).
 * Tokens: --color-primary-600, --color-primary-950, --color-secondary-950, --color-neutral-50,
 *         --color-white
 */

const SIZE_MAP: Record<ModalSize, string> = {
	sm: 'max-w-[400px]',
	md: 'max-w-[480px]',
	lg: 'max-w-[560px]',
	xl: 'max-w-[960px]',
}

const SIZE_MAP_MOBILE_FULLSCREEN: Record<ModalSize, string> = {
	sm: 'max-w-none lg:max-w-[400px]',
	md: 'max-w-none lg:max-w-[480px]',
	lg: 'max-w-none lg:max-w-[560px]',
	xl: 'max-w-none lg:max-w-[960px]',
}

export function Modal({
	open,
	children,
	size = 'md',
	padded = true,
	mobileFullScreen = false,
	closeHref,
	onClose,
	labelledById,
	ariaLabel,
	showClose = true,
	className,
}: IModalProps) {
	if (!open) return null

	const Scrim = closeHref ? 'a' : 'button'

	const closeClasses = twMerge(
		'inline-flex items-center justify-center h-10 w-10 rounded-full text-primary-600 transition-colors',
		padded ? 'hover:bg-neutral-50' : 'bg-white shadow-md hover:bg-neutral-50',
	)

	return (
		<div
			className={twMerge(
				'fixed inset-0 z-50 flex items-center justify-center',
				mobileFullScreen ? 'p-0 lg:p-4' : 'p-4',
			)}
			role="dialog"
			aria-modal="true"
			aria-labelledby={labelledById}
			aria-label={labelledById ? undefined : ariaLabel}
		>
			<Scrim
				{...(closeHref ? { href: closeHref } : { type: 'button' as const, onClick: onClose })}
				className="absolute inset-0 bg-primary-950/[.32] cursor-pointer animate-fade-in w-full h-full"
				aria-label="Fechar"
			/>

			<div
				className={twMerge(
					'relative bg-white w-full animate-fade-up-sm',
					mobileFullScreen
						? 'h-full max-h-none rounded-none shadow-none lg:h-auto lg:max-h-[90vh] lg:rounded-lg lg:shadow-lg'
						: 'rounded-lg shadow-lg max-h-[90vh]',
					padded
						? mobileFullScreen
							? 'overflow-y-auto flex flex-col items-center p-6 lg:block lg:p-8'
							: 'overflow-y-auto p-6 md:p-8'
						: 'flex items-stretch overflow-hidden',
					mobileFullScreen ? SIZE_MAP_MOBILE_FULLSCREEN[size] : SIZE_MAP[size],
					className,
				)}
			>
				{showClose ? (
					<div className="absolute right-3 top-3 z-10">
						{closeHref ? (
							<a href={closeHref} aria-label="Fechar" className={closeClasses}>
								<Icon name="close" className="size-[18px]" />
							</a>
						) : (
							<button type="button" onClick={onClose} aria-label="Fechar" className={closeClasses}>
								<Icon name="close" className="size-[18px]" />
							</button>
						)}
					</div>
				) : null}

				{padded && mobileFullScreen ? (
					<div className="w-full my-auto lg:contents">{children}</div>
				) : (
					children
				)}
			</div>
		</div>
	)
}
