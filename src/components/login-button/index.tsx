import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { ILoginButtonProps } from './types'

/**
 * Componente: Login Button
 * Figma: 5955:22722 (component set !logged + logged)
 * Variantes: !logged (account_circle + "Entrar") | logged (avatar + 1º nome + arrow_drop_down)
 * Tokens: --color-primary-600, --color-primary-100, --color-neutral-50
 */
export function LoginButton({
	logged = false,
	name = '',
	initials = 'U',
	avatar = null,
	href = '#',
	onClick,
	className,
}: ILoginButtonProps) {
	const baseClasses =
		'inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg whitespace-nowrap'

	if (!logged) {
		return (
			<a href={href} className={twMerge(baseClasses, 'pl-3 pr-4 py-2', className)}>
				<Icon name="account-circle" className="size-6 shrink-0" />
				Entrar
			</a>
		)
	}

	const firstName = name ? name.trim().split(' ')[0] || 'Usuário' : 'Usuário'
	const triggerClasses = twMerge(baseClasses, 'pl-1 pr-2 py-1', className)
	const avatarNode = avatar ? (
		<img src={avatar} alt="" className="size-8 rounded-full object-cover shrink-0" />
	) : (
		<span
			className="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-md"
			aria-hidden="true"
		>
			{initials}
		</span>
	)

	if (onClick) {
		return (
			<button
				type="button"
				aria-haspopup="true"
				aria-expanded="false"
				onClick={onClick}
				className={triggerClasses}
			>
				{avatarNode}
				<span>{firstName}</span>
				<Icon name="arrow-drop-down" className="size-5 shrink-0" />
			</button>
		)
	}

	return (
		<a href={href} className={triggerClasses}>
			{avatarNode}
			<span>{firstName}</span>
			<Icon name="arrow-drop-down" className="size-5 shrink-0" />
		</a>
	)
}
