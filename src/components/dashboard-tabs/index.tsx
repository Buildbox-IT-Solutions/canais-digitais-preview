import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import type { DashboardTab, IDashboardTabsProps } from './types'

/**
 * Componente: Dashboard Tabs
 * Figma: 6045:6002
 * Canônico da navegação por seções da área logada. Ordem: Perfil (ativa por
 * padrão), Downloads, Newsletter, Últimas leituras, Favoritos, Biblioteca
 * exclusiva — todas ativas.
 * Versão anterior arquivada em src/components/dashboard-tabs-v3/.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-400,
 *         --color-neutral-900
 */

const DEFAULT_TABS: DashboardTab[] = [
	{ id: 'perfil', label: 'Meu Perfil' },
	{ id: 'downloads', label: 'Downloads' },
	{ id: 'newsletter', label: 'Newsletter' },
	{ id: 'ultimas', label: 'Últimas leituras' },
	{ id: 'favoritos', label: 'Favoritos' },
	// Única aba com `href` absoluto: a Biblioteca é uma ROTA (/biblioteca-exclusiva), não
	// um `?tab=` de /dashboard-perfil-v4 como as outras cinco — o filtro por categoria e a
	// paginação da grade já ocupam a querystring dela. **Para o back-end: as duas formas
	// de navegação convivem nesta barra de propósito; a aba não é uniforme.**
	{ id: 'biblioteca', label: 'Biblioteca exclusiva', href: '/biblioteca-exclusiva' },
]

export function DashboardTabs({
	active = 'perfil',
	tabs = DEFAULT_TABS,
	baseHref = '',
	queryExtra = '',
	className,
}: IDashboardTabsProps) {
	return (
		<div className={twMerge('w-full border-b border-neutral-100', className)}>
			<nav aria-label="Seções da conta" className="flex items-center overflow-x-auto">
				{tabs.map((t) => {
					const isActive = t.id === active
					const isDisabled = Boolean(t.disabled)
					const href = t.href ?? `${baseHref}?tab=${t.id}${queryExtra}`

					const labelClasses = isActive
						? 'font-bold text-primary-600'
						: isDisabled
							? 'font-semibold text-neutral-400'
							: 'font-semibold text-neutral-900 hover:text-secondary-950'
					const borderClass = isActive ? 'border-primary-600' : 'border-transparent'
					const commonClasses = twMerge(
						'h-11 shrink-0 whitespace-nowrap inline-flex items-center pt-3 pb-2 px-5 border-b-2 font-body text-label-lg transition-colors',
						borderClass,
						labelClasses,
					)

					if (isDisabled) {
						return (
							<button
								key={t.id}
								type="button"
								aria-disabled="true"
								disabled
								className={twMerge(commonClasses, 'gap-2 cursor-not-allowed')}
							>
								{t.label}
								{t.chip ? <Badge label={t.chip} tone="neutral" shape="pill" /> : null}
							</button>
						)
					}

					return (
						<a
							key={t.id}
							href={href}
							aria-current={isActive ? 'page' : undefined}
							className={commonClasses}
						>
							{t.label}
						</a>
					)
				})}
			</nav>
		</div>
	)
}
