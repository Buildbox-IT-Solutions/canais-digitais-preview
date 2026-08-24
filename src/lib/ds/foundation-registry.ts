import { parseFrontmatter } from './parse-frontmatter'
import { FOUNDATION_CATALOG } from './catalog'
import type { DsFoundationCatalogItem } from './catalog'
import type { DsStatus } from './status'

const foundationDocs = import.meta.glob('/ds/foundations/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>

export interface DsFoundationEntry extends DsFoundationCatalogItem {
	status: DsStatus
	motivo?: string
	content?: string
}

function slugFromDocPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '')
}

const docsBySlug = new Map<string, string>()
for (const [path, raw] of Object.entries(foundationDocs)) {
	docsBySlug.set(slugFromDocPath(path), raw)
}

/**
 * Status vem só do catálogo curado (FOUNDATION_CATALOG) cruzado com a
 * existência do .md — nenhuma lista de status mantida à mão.
 */
export function getFoundationEntries(): DsFoundationEntry[] {
	return FOUNDATION_CATALOG.map((item) => {
		const doc = docsBySlug.get(item.slug)
		if (!doc) return { ...item, status: 'em-breve' as const }

		const { data, content } = parseFrontmatter(doc)
		if (data.status === 'bloqueado') {
			return { ...item, status: 'bloqueado' as const, motivo: data.motivo, content }
		}
		return { ...item, status: 'documentado' as const, content }
	})
}

export function getFoundationEntry(slug: string): DsFoundationEntry | undefined {
	return getFoundationEntries().find((e) => e.slug === slug)
}
