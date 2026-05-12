import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { DropdownMenu } from '~/components/dropdown-menu'
import { HeaderInforma } from '~/components/header-informa'
import { Icon } from '~/components/icon'
import { LoginButton } from '~/components/login-button'
import { MenuListItem } from '~/components/menu-list-item'
import { NavItem } from '~/components/nav-item'
import { SearchBar } from '~/components/search-bar'
import type { IHeaderDesktopProps, NavCategory } from './types'

/**
 * Componente: Header Desktop v3.0
 * Figma: 5754:7270 (Header 2.0) + estado logado v3 (figma-specs/header.md §v3.0)
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-200, --color-neutral-950, --color-white
 *
 * O header é sticky (`sticky top-0 z-40`). A transição Expanded → Compact que
 * acontece em produção quando o usuário rola (header-sticky.js) NÃO está
 * implementada aqui — o header mantém a mesma altura durante todo o scroll.
 */

const DEFAULT_CATEGORIES: NavCategory[] = [
	{ label: 'Eventos', href: '#', slug: 'eventos', dropdown: true, dropdownItems: [
		{ label: 'Próximos', href: '#' },
		{ label: 'Anteriores', href: '#' },
	]},
	{ label: 'Ingredientes', href: '#', slug: 'ingredientes' },
	{ label: 'Indústria A&B', href: '#', slug: 'industria-ab', dropdown: true, dropdownItems: [
		{ label: 'Padaria', href: '#' },
		{ label: 'Confeitaria', href: '#' },
	]},
	{ label: 'Proteína Animal', href: '#', slug: 'proteina-animal' },
	{ label: 'Food Service', href: '#', slug: 'food-service' },
	{ label: 'Sorvetes', href: '#', slug: 'sorvetes' },
	{ label: 'Tecnologia', href: '#', slug: 'tecnologia' },
	{ label: 'Embalagens', href: '#', slug: 'embalagens' },
	{ label: 'ESG', href: '#', slug: 'esg', dropdown: true, dropdownItems: [
		{ label: 'Sustentabilidade', href: '#' },
		{ label: 'Responsabilidade Social', href: '#' },
	]},
	{ label: 'Especialistas', href: '#', slug: 'especialistas' },
	{ label: 'E-books', href: '#', slug: 'ebooks' },
]

export function HeaderDesktop({
	categories = DEFAULT_CATEGORIES,
	activeCategory,
	userLoggedIn = false,
	userName = 'Usuário',
	userEmail = '',
	userInitials = 'U',
	userAvatar = null,
	className,
}: IHeaderDesktopProps) {
	return (
		<header className={twMerge('w-full bg-white sticky top-0 z-40', className)}>
			<HeaderInforma />

			{/* Main row: logo + search + login + Anuncie */}
			<div className="flex flex-col items-center pb-4">
				<div className="max-w-screen-xl w-full flex items-center">
					<div className="flex flex-col justify-center h-24 px-3 py-4 shrink-0">
						<a href="#" aria-label="Food Connection — ir para a home" className="inline-flex items-center">
							<img
								src="https://d2yghbees9788u.cloudfront.net/foodconnection/2025/12/cropped-cropped-Logo-FC-WP-300x104.png"
								alt="Food Connection"
								className="h-16 w-auto"
							/>
						</a>
					</div>

					<div className="flex flex-1 items-center justify-end gap-3 px-3 py-6 self-stretch">
						<SearchBar placeholder="Buscar" />

						<div className="w-px self-stretch bg-neutral-200" aria-hidden="true" />

						{userLoggedIn ? (
							<UserMenu
								name={userName}
								email={userEmail}
								initials={userInitials}
								avatar={userAvatar}
							/>
						) : (
							<LoginButton logged={false} href="#" />
						)}

						<Button label="Anuncie" href="#" type="filled" size="medium" />
					</div>
				</div>

				{/* Nav-list pill */}
				<nav className="mt-4 max-w-screen-xl w-full flex items-start justify-center bg-neutral-50 rounded-full px-6">
					{categories.map((cat) => (
						<NavItem
							key={cat.slug}
							label={cat.label}
							href={cat.href}
							dropdown={cat.dropdown}
							active={activeCategory === cat.slug}
							dropdownItems={cat.dropdownItems}
						/>
					))}
				</nav>
			</div>
		</header>
	)
}

/**
 * Trigger (LoginButton logged) + dropdown 264px com cabeçalho de usuário,
 * link "Minha Conta Informa" e "Sair". Spec: figma-specs/header.md §v3.0.
 */
interface IUserMenuProps {
	name: string
	email: string
	initials: string
	avatar: string | null
}

function UserMenu({ name, email, initials, avatar }: IUserMenuProps) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [open])

	const avatarLarge = avatar ? (
		<img src={avatar} alt="" className="size-10 rounded-full object-cover shrink-0" />
	) : (
		<span
			className="size-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-lg"
			aria-hidden="true"
		>
			{initials}
		</span>
	)

	return (
		<div ref={ref} className="relative">
			<LoginButton
				logged
				name={name}
				initials={initials}
				avatar={avatar}
				onClick={() => setOpen((v) => !v)}
			/>

			{open ? (
				<div className="absolute right-0 top-full mt-2 origin-top-right animate-fade-up-sm z-50">
					<DropdownMenu tone="white" width="w-[264px]" className="py-0">
						<div className="flex items-center gap-3 p-4 w-full">
							{avatarLarge}
							<div className="flex flex-1 flex-col gap-0.5 min-w-0">
								<p className="font-body font-semibold text-body-md text-primary-600 truncate">
									{name}
								</p>
								{email ? (
									<p className="font-body text-label-md text-neutral-700 truncate">{email}</p>
								) : null}
								<span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-secondary-50 px-2 py-0.5 font-body font-semibold text-label-sm text-secondary-950">
									Conta Informa
								</span>
							</div>
						</div>

						<MenuListItem
							label="Minha Conta Informa"
							href="/dashboard-perfil-v3"
							density="compact"
							leading={<Icon name="account-circle" className="size-5" />}
						/>

						<div className="bg-neutral-100 h-px mx-4 w-[calc(100%-2rem)]" />

						<MenuListItem
							label="Sair"
							href="/home"
							density="compact"
							leading={<Icon name="logout" className="size-5" />}
							className="text-red-700 hover:bg-red-50"
						/>
					</DropdownMenu>
				</div>
			) : null}
		</div>
	)
}
