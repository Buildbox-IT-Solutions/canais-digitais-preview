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
	className,
}: IDashboardWelcomeProps) {
	return (
		<div
			className={twMerge(
				'bg-white border border-neutral-50 rounded-lg p-6 flex items-start gap-10 w-full',
				className,
			)}
		>
			<div className="relative shrink-0 size-[120px]">
				{avatarSrc ? (
					<img
						src={avatarSrc}
						alt={firstName}
						className="size-[120px] rounded-full object-cover"
					/>
				) : (
					<div className="size-[120px] rounded-full bg-primary-100 flex items-center justify-center">
						<span className="font-body font-semibold text-display-lg text-primary-600 leading-none">
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

			<div className="flex-1 min-w-0 flex flex-col gap-4">
				<h1 className="font-display font-bold text-headline-md text-primary-600">
					Olá, {firstName}!
				</h1>
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<span className="font-body font-bold text-label-md text-neutral-900">Seu e-mail</span>
						<span className="font-body font-bold text-body-md text-primary-600">{email}</span>
					</div>
					<p className="font-body text-body-sm text-neutral-900">
						Sua conta é válida em todos os portais Informa Markets. Ao acessar outro portal, faça
						login com o mesmo e-mail e senha.
					</p>
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
