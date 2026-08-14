// Feature Favoritos: /buscar e /categoria entraram porque o toggle de favoritar
// (e o gatilho de auth que ele abre) agora existe nessas duas telas, além de
// /home. Só o path exato — nunca uma rota fora desta lista.
const ALLOWED_RETURN_TO = ['/home', '/conteudo', '/buscar', '/categoria']

// Allowlist de PARÂMETROS de querystring preservados no retorno — nomeada, não
// "aceita qualquer querystring". Hoje só /conteudo tem estado dirigido por query
// (`?post=`, escolhe o fixture); /buscar e /categoria ainda são telas estáticas
// (busca e filtros são só UI, sem `?q=`/`?categoria=` real no código) — adicione
// aqui quando isso passar a existir, não antes.
const ALLOWED_RETURN_TO_PARAMS = ['post']

// Nunca preservar: são parâmetros do PRÓPRIO fluxo de auth, reinjetados no
// retorno por login-v2/cadastro-v2/confirmacao-email-v2. Deixá-los sobreviver
// dentro de um returnTo abre caminho pra intenção duplicada (dois `favoritar=`
// competindo, um vindo do fluxo e outro emendado no destino) ou pra uma URL
// forjada/compartilhada favoritar conteúdo na conta de quem a abrir.
const FORBIDDEN_RETURN_TO_PARAMS = ['logado', 'favoritar', 'intent']

export interface SanitizedReturnTo {
	/** Path validado contra a allowlist exata — nunca uma rota fora dela. */
	path: string
	/** Querystring filtrada pela allowlist de parâmetros, sem `?` líder. Vazia se nada sobreviver. */
	query: string
}

/**
 * Restringe `returnTo` a um destino interno conhecido. `returnTo` vem de um
 * parâmetro de URL (`path` ou `path?query`) e alimenta o redirecionamento em
 * `login-v2`/`cadastro-v2`/`confirmacao-email-v2` — nunca aceitar um valor
 * arbitrário aqui.
 *
 * Path e query seguem regras diferentes: o path é allowlist EXATA (rota
 * conhecida ou cai pra `/home`); a query é allowlist de PARÂMETROS (preserva só
 * os nomeados em `ALLOWED_RETURN_TO_PARAMS`, descarta o resto em silêncio — sem
 * erro, sem aviso, igual à intenção "perdida" do favoritar).
 */
export function sanitizeReturnTo(value: string | null): SanitizedReturnTo {
	if (!value) return { path: '/home', query: '' }

	const separatorIndex = value.indexOf('?')
	const rawPath = separatorIndex === -1 ? value : value.slice(0, separatorIndex)
	const rawQuery = separatorIndex === -1 ? '' : value.slice(separatorIndex + 1)

	if (!ALLOWED_RETURN_TO.includes(rawPath)) return { path: '/home', query: '' }

	const filtered = new URLSearchParams()
	for (const [key, val] of new URLSearchParams(rawQuery)) {
		if (FORBIDDEN_RETURN_TO_PARAMS.includes(key)) continue
		if (!ALLOWED_RETURN_TO_PARAMS.includes(key)) continue
		filtered.set(key, val)
	}

	return { path: rawPath, query: filtered.toString() }
}

/**
 * Recompõe `path` + `?query` (se houver) num único texto — pra quando o destino
 * sanitizado precisa virar valor de um campo (`?returnTo=`, hidden input) que a
 * outra ponta do fluxo vai reanalisar com `sanitizeReturnTo` de novo.
 *
 * NUNCA use isto como `action` de um `<form method="get">`: o navegador descarta
 * a querystring já presente no `action` ao montar a URL de submit — só os campos
 * do próprio form sobrevivem. Pra esse caso, use `path` como `action` e reinjete
 * `query` como hidden inputs nomeados (ver login-v2).
 */
export function serializeReturnTo(sanitized: SanitizedReturnTo): string {
	return sanitized.query ? `${sanitized.path}?${sanitized.query}` : sanitized.path
}

/**
 * Monta o href final de destino pós-auth, mesclando a query já preservada do
 * returnTo com os parâmetros que o próprio fluxo de auth precisa adicionar no
 * retorno (`logado=true`, `favoritar=`, `toast=`, etc — ver confirmacao-email-v2).
 */
export function buildReturnToHref(sanitized: SanitizedReturnTo, extra: Record<string, string> = {}): string {
	const params = new URLSearchParams(sanitized.query)
	for (const [key, val] of Object.entries(extra)) params.set(key, val)
	const query = params.toString()
	return query ? `${sanitized.path}?${query}` : sanitized.path
}
