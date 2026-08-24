import { parseFrontmatter } from './parse-frontmatter'
import { COMPONENT_CATALOG_SLUGS } from './catalog'
import type { DsStatus } from './status'

const componentSources = import.meta.glob('/src/components/*/index.tsx', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>

const componentDocs = import.meta.glob('/ds/componentes/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>

export interface DsComponentEntry {
	slug: string
	status: DsStatus
	motivo?: string
	content?: string
}

function slugFromComponentPath(path: string): string {
	return path.split('/')[3]
}

function slugFromDocPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '')
}

const sourceBySlug = new Map<string, string>()
for (const [path, raw] of Object.entries(componentSources)) {
	sourceBySlug.set(slugFromComponentPath(path), raw)
}

const docsBySlug = new Map<string, string>()
for (const [path, raw] of Object.entries(componentDocs)) {
	docsBySlug.set(slugFromDocPath(path), raw)
}

/**
 * Só os 39 itens do catálogo curado (ver catalog.ts) — não é um scan de
 * src/components/. Um cataloged que vier a ser arquivado (cabeçalho
 * `ARQUIVADO`, regra invariante 7) some daqui automaticamente, como rede de
 * segurança, mas a curadoria de QUAIS componentes entram é manual e editorial.
 * Status (documentado/em-breve/bloqueado) é derivado do .md, nunca manual.
 */
export function getComponentEntries(): DsComponentEntry[] {
	const entries: DsComponentEntry[] = []

	for (const slug of COMPONENT_CATALOG_SLUGS) {
		const source = sourceBySlug.get(slug)
		if (source?.includes('ARQUIVADO')) continue

		const doc = docsBySlug.get(slug)
		if (!doc) {
			entries.push({ slug, status: 'em-breve' })
			continue
		}

		const { data, content } = parseFrontmatter(doc)
		if (data.status === 'bloqueado') {
			entries.push({ slug, status: 'bloqueado', motivo: data.motivo, content })
		} else {
			entries.push({ slug, status: 'documentado', content })
		}
	}

	return entries
}

export function getComponentEntry(slug: string): DsComponentEntry | undefined {
	return getComponentEntries().find((e) => e.slug === slug)
}
