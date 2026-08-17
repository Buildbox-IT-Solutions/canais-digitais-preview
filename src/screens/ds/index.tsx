import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router'
import { getFoundationEntries } from '~/lib/ds/foundation-registry'
import { getComponentEntries } from '~/lib/ds/component-registry'
import { COMPONENT_GROUPS, humanizeSlug } from '~/lib/ds/catalog'
import type { DsStatus } from '~/lib/ds/status'

/**
 * Tela: /ds — layout com sidebar persistente (arquitetura de referência:
 * primer.style/design). Não é mais um catálogo em grade — a sidebar lista o
 * vocabulário do DS (catálogo curado, ver lib/ds/catalog.ts); a área de
 * conteúdo (<Outlet/>) renderiza a introdução ou a página de cada item.
 * Item sem doc fica visível e desabilitado, com selo discreto — sem link.
 * Nenhum contador de progresso em lugar nenhum desta interface.
 */

const STATUS_LABEL: Record<'em-breve' | 'bloqueado', string> = {
	'em-breve': 'em breve',
	bloqueado: 'bloqueado',
}

function navLinkClass(isActive: boolean): string {
	return `block px-3 py-1.5 rounded-sm font-body text-label-md transition-colors truncate ${
		isActive
			? 'bg-primary-100 text-primary-600 font-semibold'
			: 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
	}`
}

function NavItem({ slug, label, status, motivo }: { slug: string; label: string; status: DsStatus; motivo?: string }) {
	if (status === 'documentado') {
		return (
			<NavLink to={`/ds/${slug}`} className={({ isActive }) => navLinkClass(isActive)}>
				{label}
			</NavLink>
		)
	}

	return (
		<span
			className="flex items-center gap-1.5 px-3 py-1.5 font-body text-label-md text-neutral-400 cursor-not-allowed"
			title={motivo}
		>
			<span className="truncate">{label}</span>
			<span className="shrink-0 font-body text-label-sm text-neutral-300">· {STATUS_LABEL[status]}</span>
		</span>
	)
}

function GroupHeader({ children, top = true }: { children: ReactNode; top?: boolean }) {
	return (
		<p
			className={`px-3 pb-1 font-body font-semibold text-label-sm uppercase tracking-wide text-neutral-500 ${
				top ? 'pt-5' : 'pt-3'
			}`}
		>
			{children}
		</p>
	)
}

export default function DsLayoutScreen() {
	const foundations = getFoundationEntries()
	const componentsBySlug = new Map(getComponentEntries().map((c) => [c.slug, c]))

	return (
		<div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
			<aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-neutral-100 py-6">
				<NavLink
					to="/"
					className="block px-3 pb-1 font-body font-semibold text-label-sm text-neutral-500 hover:text-primary-600 transition-colors"
				>
					← Índice principal
				</NavLink>
				<NavLink to="/ds" end className="block px-3 pt-1 pb-5 font-display font-bold text-title-lg text-primary-600">
					Design System
				</NavLink>

				<nav className="flex flex-col gap-0.5 pb-8">
					<NavLink to="/ds" end className={({ isActive }) => navLinkClass(isActive) + ' font-semibold'}>
						Introdução
					</NavLink>

					<GroupHeader>Foundations</GroupHeader>
					{foundations.map((f) => (
						<NavItem key={f.slug} slug={f.slug} label={f.label} status={f.status} motivo={f.motivo} />
					))}

					<GroupHeader>Componentes</GroupHeader>
					{COMPONENT_GROUPS.map((group) => (
						<div key={group.key}>
							<GroupHeader top={false}>{group.label}</GroupHeader>
							{group.slugs.map((slug) => {
								const entry = componentsBySlug.get(slug)
								if (!entry) return null
								return (
									<NavItem
										key={slug}
										slug={slug}
										label={humanizeSlug(slug)}
										status={entry.status}
										motivo={entry.motivo}
									/>
								)
							})}
						</div>
					))}
				</nav>
			</aside>

			<div className="flex-1 min-w-0">
				<div className="max-w-screen-md mx-auto px-4 lg:px-8 py-12">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
