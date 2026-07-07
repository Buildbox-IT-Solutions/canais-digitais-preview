import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IDashboardWelcomeProps } from './types'

/**
 * Componente: Dashboard Welcome
 * Figma: 6188:4601
 * Avatar 120px + saudação + bloco e-mail + texto multi-portais + botão Sair.
 * Tokens: --color-primary-600, --color-primary-100, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-900, --color-white
 */
export function DashboardWelcome({
	firstName,
	email,
	initials = 'U',
	avatarSrc = null,
	logoutHref = '#',
	changePasswordHref = '#',
	className,
}: IDashboardWelcomeProps) {
	return (
		<div
			className={twMerge(
				'bg-white border border-neutral-50 rounded-lg p-4 lg:p-6 flex flex-col items-center text-center gap-6 lg:flex-row lg:items-start lg:text-left lg:gap-10 w-full',
				className,
			)}
		>
			<div className="relative shrink-0 size-24 lg:size-[120px]">
				{avatarSrc ? (
					<img
						src={avatarSrc}
						alt={firstName}
						className="size-24 lg:size-[120px] rounded-full object-cover"
					/>
				) : (
					<div className="size-24 lg:size-[120px] rounded-full bg-primary-100 flex items-center justify-center">
						<span className="font-body font-semibold text-display-sm text-primary-600 leading-none">
							{initials}
						</span>
					</div>
				)}
				<button
					type="button"
					aria-label="Alterar foto de perfil"
					className="absolute bottom-0 right-0 size-8 rounded-full bg-primary-600 text-white inline-flex items-center justify-center hover:bg-secondary-950 transition-colors"
				>
					<Icon name="camera" className="size-4" />
				</button>
			</div>

			<div className="w-full lg:flex-1 min-w-0 flex flex-col items-center lg:items-start gap-4">
				<h1 className="font-display font-bold text-headline-md text-primary-600">
					Olá, {firstName}!
				</h1>
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<span className="font-body font-bold text-label-md text-neutral-900">Seu e-mail</span>
						<span className="font-body font-bold text-body-md text-primary-600">{email}</span>
					</div>
					<a
						href={changePasswordHref}
						className="font-body font-bold text-body-md text-secondary-950 hover:underline w-fit"
					>
						Alterar senha
					</a>
				</div>
			</div>

			<a
				href={logoutHref}
				className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0"
			>
				<Icon name="logout" className="size-5" />
				Sair
			</a>
		</div>
	)
}
