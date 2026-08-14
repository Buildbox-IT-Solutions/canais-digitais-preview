// Feature Favoritos: /buscar e /categoria entraram porque o toggle de favoritar
// (e o gatilho de auth que ele abre) agora existe nessas duas telas, além de
// /home. Só o path exato — sem querystring (ex.: perde `?q=` de uma busca) — é
// aceito, mesma limitação de antes, agora só abrangendo mais destinos.
const ALLOWED_RETURN_TO = ['/home', '/conteudo', '/buscar', '/categoria']

/**
 * Restringe `returnTo` a um destino interno conhecido. `returnTo` vem de um
 * parâmetro de URL e é usado como `action` de formulário/href de redirecionamento
 * em `login-v2`/`cadastro-v2`/`confirmacao-email-v2` — nunca aceitar um valor arbitrário aqui.
 */
export function sanitizeReturnTo(value: string | null): string {
	return value && ALLOWED_RETURN_TO.includes(value) ? value : '/home'
}
