import { twMerge } from '~/lib/tw-merge'
import { Divider } from '~/components/divider'
import { Icon } from '~/components/icon'
import type { IDashboardWelcomeProps } from './types'

/**
 * Componente: Dashboard Welcome
 * Figma: 6188:4601 (Desktop) · 7416:34161 (Mobile)
 * Desktop: avatar 120px + saudação + bloco e-mail + link "Alterar senha" + botão "Sair" (ghost), em linha.
 * Mobile: layout próprio (não é um empilhamento do desktop) — avatar 80px lado a lado
 * com nome/e-mail, divider, e rodapé com "Alterar Senha" + "Sair" (ghost) lado a lado.
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
		<div className={twMerge('bg-white border border-neutral-50 rounded-lg w-full', className)}>
			{/* Mobile — avatar+nome lado a lado, divider, ações lado a lado */}
			<div className="flex lg:hidden flex-col gap-4 p-4">
				<div className="flex items-center gap-4">
					<div className="relative shrink-0 size-20">
						{avatarSrc ? (
							<img src={avatarSrc} alt={firstName} className="size-20 rounded-full object-cover" />
						) : (
							<div className="size-20 rounded-full bg-primary-100 flex items-center justify-center">
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

					<div className="flex-1 min-w-0 flex flex-col gap-1">
						<h1 className="font-display font-bold text-title-xl text-primary-600 truncate">
							Olá, {firstName}!
						</h1>
						<div className="flex flex-col">
							<span className="font-body font-bold text-label-md text-neutral-900">Seu e-mail</span>
							<span className="font-body font-bold text-body-md text-primary-600 truncate">
								{email}
							</span>
						</div>
					</div>
				</div>

				<Divider />

				<div className="flex items-center justify-between gap-3">
					<a
						href={changePasswordHref}
						className="font-body font-bold text-body-md text-secondary-950 hover:underline"
					>
						Alterar Senha
					</a>
					<a
						href={logoutHref}
						className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0"
					>
						<Icon name="logout" className="size-5" />
						Sair
					</a>
				</div>
			</div>

			{/* Desktop — avatar 120px + saudação em linha + botão Sair (ghost) */}
			<div className="hidden lg:flex flex-row items-start gap-10 p-6">
				<div className="relative shrink-0 size-[120px]">
					{avatarSrc ? (
						<img
							src={avatarSrc}
							alt={firstName}
							className="size-[120px] rounded-full object-cover"
						/>
					) : (
						<div className="size-[120px] rounded-full bg-primary-100 flex items-center justify-center">
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

				<div className="flex-1 min-w-0 flex flex-col items-start gap-4">
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
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-md shrink-0"
				>
					<Icon name="logout" className="size-5" />
					Sair
				</a>
			</div>
		</div>
	)
}
