import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import { LoginButton } from '~/components/login-button'
import { NavItem } from '~/components/nav-item'
import { SearchBar } from '~/components/search-bar'
import type { IHeaderDesktopProps, NavCategory } from './types'

/**
 * Componente: Header Desktop v4.0
 * Figma: 5754:7270 (Header 2.0)
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-200, --color-neutral-950, --color-white
 *
 * O comportamento sticky com transição Expanded → Compact (header-sticky.js) é
 * comportamento de produção — aqui mantido apenas como estrutura visual estática.
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
	userInitials = 'U',
	userAvatar = null,
	className,
}: IHeaderDesktopProps) {
	return (
		<header className={twMerge('w-full bg-white sticky top-0 z-40', className)}>
			{/* Informa strip */}
			<div className="w-full bg-neutral-950 text-white">
				<div className="flex items-center justify-center h-10 px-6 cursor-pointer">
					<div className="inline-flex items-center gap-1">
						<span className="font-display font-bold text-label-lg">informa</span>
						<Icon name="arrow-drop-down" className="size-5" />
					</div>
				</div>
			</div>

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
						<div className="w-32">
							<SearchBar placeholder="Buscar" expanded />
						</div>

						<div className="w-px self-stretch bg-neutral-200" aria-hidden="true" />

						<LoginButton
							logged={userLoggedIn}
							name={userName}
							initials={userInitials}
							avatar={userAvatar}
							href="#"
						/>

						<a
							href="#"
							className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg whitespace-nowrap"
						>
							Anuncie
						</a>
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
