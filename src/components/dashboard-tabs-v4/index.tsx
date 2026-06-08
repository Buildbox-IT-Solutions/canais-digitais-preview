import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import type { DashboardTab, IDashboardTabsV4Props } from './types'

/**
 * Componente: Dashboard Tabs v4
 * Figma: 6045:6002 (deriva de dashboard-tabs-v3)
 * Ordem: Perfil (ativa por padrão), Minha Conta, Últimas leituras, Favoritos (desabilitada),
 * Newsletter, Downloads. "Visão geral" foi removida.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-400,
 *         --color-neutral-900
 */

const DEFAULT_TABS: DashboardTab[] = [
	{ id: 'perfil', label: 'Perfil' },
	{ id: 'conta', label: 'Minha Conta' },
	{ id: 'ultimas', label: 'Últimas leituras' },
	{ id: 'favoritos', label: 'Favoritos', disabled: true, chip: 'Em breve' },
	{ id: 'newsletter', label: 'Newsletter' },
	{ id: 'downloads', label: 'Downloads' },
]

export function DashboardTabsV4({
	active = 'perfil',
	tabs = DEFAULT_TABS,
	baseHref = '',
	queryExtra = '',
	className,
}: IDashboardTabsV4Props) {
	return (
		<div className={twMerge('w-full border-b border-neutral-100', className)}>
			<div className="flex items-center" role="tablist">
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
						'h-11 inline-flex items-center pt-3 pb-2 px-5 border-b-2 font-body text-label-lg transition-colors',
						borderClass,
						labelClasses,
					)

					if (isDisabled) {
						return (
							<button
								key={t.id}
								type="button"
								role="tab"
								aria-selected="false"
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
							role="tab"
							aria-selected={isActive}
							className={commonClasses}
						>
							{t.label}
						</a>
					)
				})}
			</div>
		</div>
	)
}
