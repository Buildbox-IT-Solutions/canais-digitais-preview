import { useId } from 'react'
import { Modal } from '~/components/modal'
import { Icon } from '~/components/icon'
import type { DialogAction, DialogIconTone, IDialogProps } from './types'

/**
 * Componente: Dialog
 * Casca padronizada de dialog de coluna única sobre o Modal: cabeçalho (badge de ícone ou eyebrow +
 * título + descrição) → corpo (children) → rodapé de ações responsivo. Desktop: botões pareados à
 * direita (secundária ghost + primária). Mobile: empilhados full-width, primária em cima.
 * Fonte da verdade dos dialogs (excluir-conta, meus-dados, gate-download). Auth 50/50 fica fora.
 * Tokens: --color-primary-600, --color-secondary-950, --color-red-600, --color-neutral-*
 */

const ICON_TONE: Record<DialogIconTone, string> = {
	primary: 'bg-primary-50 text-primary-600',
	secondary: 'bg-secondary-50 text-secondary-500',
	danger: 'bg-red-50 text-red-700',
	warning: 'bg-amber-50 text-amber-700',
	success: 'bg-mint/10 text-mint',
}

const ACTION_BASE =
	'inline-flex items-center justify-center gap-2 rounded-full font-body font-bold text-body-lg transition-colors w-full sm:w-auto h-10 px-6'

const ACTION_VARIANT = {
	filled: 'bg-primary-600 hover:bg-secondary-950 text-white',
	ghost: 'bg-transparent hover:bg-neutral-50 text-primary-600',
	danger: 'bg-red-600 hover:bg-red-700 text-white',
}

function ActionButton({
	action,
	variant,
}: {
	action: DialogAction
	variant: keyof typeof ACTION_VARIANT
}) {
	const className = `${ACTION_BASE} ${ACTION_VARIANT[variant]}`
	const iconNode = action.icon ? <Icon name={action.icon} className="size-5" /> : null
	const content = (
		<>
			{action.iconPosition !== 'trailing' ? iconNode : null}
			{action.label}
			{action.iconPosition === 'trailing' ? iconNode : null}
		</>
	)

	if (action.href) {
		return (
			<a href={action.href} className={className}>
				{content}
			</a>
		)
	}
	return (
		<button
			type={action.type === 'submit' ? 'submit' : 'button'}
			form={action.form}
			onClick={action.onClick}
			className={className}
		>
			{content}
		</button>
	)
}

export function Dialog({
	open = true,
	size = 'md',
	closeHref,
	onClose,
	labelledById,
	icon,
	eyebrow,
	title,
	description,
	children,
	primary,
	secondary,
	destructive,
	bottomLink,
}: IDialogProps) {
	const generatedId = useId()
	const titleId = labelledById ?? generatedId

	return (
		<Modal open={open} size={size} closeHref={closeHref} onClose={onClose} labelledById={titleId}>
			<div className="flex flex-col gap-6">
				{icon ? (
					<div
						className={`inline-flex items-center justify-center size-16 rounded-full ${ICON_TONE[icon.tone ?? 'primary']}`}
					>
						<Icon name={icon.name} className="size-8" />
					</div>
				) : null}

				<div className="flex flex-col gap-2 pr-8">
					{eyebrow}
					<h2 id={titleId} className="font-display font-bold text-headline-sm text-primary-600">
						{title}
					</h2>
					{description ? (
						<p className="font-body text-body-md text-neutral-700">{description}</p>
					) : null}
				</div>

				{children}

				{primary ? (
					<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2 pt-4 border-t border-neutral-50">
						{secondary ? <ActionButton action={secondary} variant="ghost" /> : null}
						<ActionButton action={primary} variant={destructive ? 'danger' : 'filled'} />
					</div>
				) : null}

				{bottomLink ? <div className="text-center">{bottomLink}</div> : null}
			</div>
		</Modal>
	)
}
