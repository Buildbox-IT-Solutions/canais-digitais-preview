import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IDrawerProps } from './types'

/**
 * Componente: Drawer — painel slide-in 560px à direita com scrim
 * Figma: 6045:6857
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-200, --color-white
 */
export function Drawer({
	open,
	title,
	children,
	onClose,
	onCancel,
	onSave,
	closeHref,
	cancelHref,
	saveHref,
	saveDisabled = false,
	saveLabel = 'Salvar',
	cancelLabel = 'Cancelar',
	className,
}: IDrawerProps) {
	if (!open) return null

	const saveBtnClasses = saveDisabled
		? 'bg-neutral-200 text-white pointer-events-none'
		: 'bg-primary-600 text-white hover:bg-secondary-950'

	const Scrim = closeHref ? 'a' : 'button'
	const CancelEl = cancelHref ? 'a' : 'button'
	const SaveEl = saveHref ? 'a' : 'button'

	return (
		<div
			className={twMerge('fixed inset-0 z-50', className)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="drawer-title"
		>
			<Scrim
				{...(closeHref ? { href: closeHref } : { type: 'button' as const, onClick: onClose })}
				className="absolute inset-0 bg-[#050708]/30 cursor-pointer animate-fade-in w-full h-full"
				aria-label="Fechar"
			/>

			<aside className="absolute inset-y-0 right-0 w-full max-w-[560px] bg-white border-l border-neutral-100 shadow-xl flex flex-col animate-slide-in-right will-change-transform">
				<div className="flex items-center gap-4 pl-8 pr-5 py-5 shrink-0">
					<h2
						id="drawer-title"
						className="flex-1 min-w-0 font-display font-bold text-headline-md text-primary-600"
					>
						{title}
					</h2>
					{closeHref ? (
						<a
							href={closeHref}
							aria-label="Fechar painel"
							className="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="close" className="size-6" />
						</a>
					) : (
						<button
							type="button"
							onClick={onClose}
							aria-label="Fechar painel"
							className="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="close" className="size-6" />
						</button>
					)}
				</div>

				<div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 flex flex-col gap-6">
					{children}
				</div>

				<div className="flex items-center justify-end gap-2 px-8 py-5 border-t border-neutral-50 shrink-0">
					<CancelEl
						{...(cancelHref
							? { href: cancelHref }
							: { type: 'button' as const, onClick: onCancel })}
						className="inline-flex items-center justify-center h-10 px-6 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg"
					>
						{cancelLabel}
					</CancelEl>
					<SaveEl
						{...(saveHref
							? { href: saveHref }
							: { type: 'button' as const, onClick: onSave, disabled: saveDisabled })}
						className={twMerge(
							'inline-flex items-center justify-center h-10 px-6 rounded-full font-body font-bold text-body-lg transition-colors',
							saveBtnClasses,
						)}
					>
						{saveLabel}
					</SaveEl>
				</div>
			</aside>
		</div>
	)
}
