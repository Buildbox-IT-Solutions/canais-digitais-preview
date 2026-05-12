import { twMerge } from '~/lib/tw-merge'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import type {
	DashboardSection,
	DashboardSectionId,
	IDashboardHeaderProps,
} from './types'

/**
 * Componente: Dashboard Header
 * Header desktop + sub-navegação sticky com 7 abas (ícone + label).
 * Tokens: --color-primary-600, --color-neutral-50, --color-neutral-700, --color-coral, --color-white
 */

const DEFAULT_SECTIONS: DashboardSection[] = [
	{ id: 'visao', label: 'Visão geral', icon: 'dashboard', href: '?section=visao' },
	{ id: 'biblio', label: 'Biblioteca', icon: 'book', href: '?section=biblio' },
	{ id: 'favoritos', label: 'Favoritos', icon: 'bookmark', href: '?section=favoritos' },
	{ id: 'arquivos', label: 'Arquivos', icon: 'folder', href: '?section=arquivos' },
	{ id: 'newsletters', label: 'Newsletters', icon: 'mail', href: '?section=newsletters' },
	{ id: 'perfil', label: 'Perfil', icon: 'account-circle', href: '?section=perfil' },
	{ id: 'conta', label: 'Conta', icon: 'settings', href: '?section=conta' },
]

export function DashboardHeader({
	headerProps,
	activeSection = 'visao',
	sections = DEFAULT_SECTIONS,
	className,
}: IDashboardHeaderProps) {
	return (
		<div className={className}>
			<HeaderDesktop {...headerProps} />
			<div className="sticky top-0 z-9 bg-white border-b border-neutral-50">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-1 overflow-x-auto">
					{sections.map((s) => {
						const on = s.id === activeSection
						return (
							<a
								key={s.id}
								href={s.href}
								className={twMerge(
									'inline-flex items-center gap-2 px-4 py-4 font-body text-label-lg uppercase tracking-wider whitespace-nowrap transition-colors border-b-2',
									on
										? 'font-bold text-primary-600 border-coral'
										: 'font-semibold text-neutral-700 border-transparent hover:text-primary-600',
								)}
							>
								<Icon name={s.icon} className="size-4" />
								{s.label}
							</a>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export type { DashboardSection, DashboardSectionId }
