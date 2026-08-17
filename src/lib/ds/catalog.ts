/**
 * Catálogo curado do /ds — a ÚNICA lista mantida à mão neste sistema, porque é
 * "o que é vocabulário do design system", uma decisão editorial. O status de
 * cada item (documentado/em-breve/bloqueado) NÃO mora aqui — é derivado da
 * existência do .md em docs/, ver component-registry.ts e foundation-registry.ts.
 *
 * Não é src/components/. Componentes de uso único do repo (ex.: dashboard-welcome,
 * proof-panel-minimal) não entram — não são peça reutilizável do sistema.
 * Arquivados não entram (regra invariante 7 do briefing).
 */

export interface DsFoundationCatalogItem {
	slug: string
	label: string
}

export const FOUNDATION_CATALOG: DsFoundationCatalogItem[] = [
	{ slug: 'cor', label: 'Cor' },
	{ slug: 'tipografia', label: 'Tipografia' },
	{ slug: 'radius', label: 'Radius' },
	{ slug: 'elevacao', label: 'Elevação' },
	{ slug: 'state-layers', label: 'State layers' },
	{ slug: 'layout', label: 'Layout' },
	{ slug: 'espacamento', label: 'Espaçamento' },
	{ slug: 'icone', label: 'Ícone' },
	{ slug: 'focus-ring', label: 'Focus ring' },
	{ slug: 'motion', label: 'Motion' },
	{ slug: 'z-index', label: 'Z-index' },
	{ slug: 'breakpoints', label: 'Breakpoints' },
]

export interface DsComponentGroup {
	key: string
	label: string
	slugs: string[]
}

export const COMPONENT_GROUPS: DsComponentGroup[] = [
	{
		key: 'base',
		label: 'Base',
		slugs: ['icon', 'button', 'icon-button', 'badge', 'categoria', 'divider', 'avatar', 'thumbnail', 'spinner', 'tag'],
	},
	{
		key: 'formulario',
		label: 'Formulário',
		slugs: ['form-field', 'form-select', 'form-checkbox', 'switch', 'toggle'],
	},
	{
		key: 'sobreposicao',
		label: 'Sobreposição',
		slugs: ['modal', 'dialog', 'bottom-sheet', 'drawer', 'dropdown-menu', 'tooltip'],
	},
	{
		key: 'feedback-navegacao',
		label: 'Feedback e navegação',
		slugs: ['toast', 'pagination', 'skeleton', 'menu-list-item'],
	},
	{
		key: 'conteudo',
		label: 'Conteúdo',
		slugs: ['news-card', 'section-title'],
	},
	{
		key: 'estrutura',
		label: 'Estrutura',
		slugs: ['header-desktop', 'footer-desktop'],
	},
]

export const COMPONENT_CATALOG_SLUGS: string[] = COMPONENT_GROUPS.flatMap((g) => g.slugs)

export function humanizeSlug(slug: string): string {
	return slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')
}
