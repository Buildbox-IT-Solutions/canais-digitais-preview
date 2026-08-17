/**
 * Frontmatter mínimo dos .md de docs/ — só chave: valor de uma linha, sem
 * aninhamento. Suficiente para o campo que o /ds precisa (`status`, `motivo`);
 * não é um parser YAML de propósito geral.
 */
export interface DsFrontmatter {
	status?: string
	motivo?: string
	[key: string]: string | undefined
}

export interface ParsedDoc {
	data: DsFrontmatter
	content: string
}

export function parseFrontmatter(raw: string): ParsedDoc {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
	if (!match) return { data: {}, content: raw }

	const data: DsFrontmatter = {}
	for (const line of match[1].split('\n')) {
		const idx = line.indexOf(':')
		if (idx === -1) continue
		const key = line.slice(0, idx).trim()
		let value = line.slice(idx + 1).trim()
		const isQuoted =
			(value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
		if (isQuoted) value = value.slice(1, -1)
		if (key) data[key] = value
	}

	return { data, content: raw.slice(match[0].length) }
}
