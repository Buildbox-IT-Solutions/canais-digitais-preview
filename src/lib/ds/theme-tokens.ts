/**
 * Parser mínimo do bloco `@theme { ... }` de src/index.css — extrai os pares
 * `--nome: valor;` como texto. Não resolve `var(...)` nem faz cálculo de cor;
 * isso fica a cargo do navegador (ver probe.ts) quando o valor real importa.
 */
export interface ThemeToken {
	name: string
	value: string
}

export function parseThemeTokens(cssRaw: string): ThemeToken[] {
	const themeMatch = cssRaw.match(/@theme\s*\{([\s\S]*?)\n\}/)
	if (!themeMatch) return []

	const tokens: ThemeToken[] = []
	const re = /(--[\w-]+):\s*([^;]+);/g
	let m: RegExpExecArray | null
	// eslint-disable-next-line no-cond-assign
	while ((m = re.exec(themeMatch[1]))) {
		tokens.push({ name: m[1], value: m[2].trim() })
	}
	return tokens
}

export function colorTokens(tokens: ThemeToken[]): ThemeToken[] {
	return tokens.filter((t) => t.name.startsWith('--color-'))
}

export interface ColorSwatch {
	name: string
	family: string
	shade?: string
}

/** Agrupa tokens de cor por família (primary, secondary, danger…), ordenando por shade. */
export function groupColorTokens(tokens: ThemeToken[]): { family: string; swatches: ColorSwatch[] }[] {
	const groups = new Map<string, ColorSwatch[]>()

	for (const t of colorTokens(tokens)) {
		const rest = t.name.replace('--color-', '')
		const shadeMatch = rest.match(/^(.*)-(\d{2,3})$/)
		const family = shadeMatch ? shadeMatch[1] : rest
		const shade = shadeMatch ? shadeMatch[2] : undefined

		const list = groups.get(family) ?? []
		list.push({ name: t.name, family, shade })
		groups.set(family, list)
	}

	for (const list of groups.values()) {
		list.sort((a, b) => Number(a.shade ?? 0) - Number(b.shade ?? 0))
	}

	return Array.from(groups.entries()).map(([family, swatches]) => ({ family, swatches }))
}

export interface TypographyLevel {
	name: string
	varName: string
	size: string
	lineHeight?: string
	letterSpacing?: string
}

/** Reconstrói os 17 níveis da escala tipográfica a partir dos tokens `--text-*`. */
export function typographyLevels(tokens: ThemeToken[]): TypographyLevel[] {
	const base = tokens.filter(
		(t) => t.name.startsWith('--text-') && !t.name.includes('--line-height') && !t.name.includes('--letter-spacing'),
	)

	return base.map((b) => {
		const scale = b.name.replace('--text-', '')
		const lh = tokens.find((t) => t.name === `--text-${scale}--line-height`)
		const ls = tokens.find((t) => t.name === `--text-${scale}--letter-spacing`)
		return { name: scale, varName: b.name, size: b.value, lineHeight: lh?.value, letterSpacing: ls?.value }
	})
}

/** Família tipográfica pelo nome do nível — display/headline/title = Aleo, body/label = Open Sans. */
export function fontClassForLevel(levelName: string): 'font-display' | 'font-body' {
	return levelName.startsWith('display') || levelName.startsWith('headline') || levelName.startsWith('title')
		? 'font-display'
		: 'font-body'
}
