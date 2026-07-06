/**
 * Máscara parcial de e-mail para exibição — mantém a 1ª letra do local part e o domínio,
 * escondendo o meio (ex.: mariana.albuquerque@empresa.com.br → m***@empresa.com.br).
 * Protege contra shoulder-surf sem perder o sinal de "é o endereço certo".
 * Spec: figma-specs/confirmacao-email.md (decisões de design).
 */
export function maskEmail(email: string): string {
	const at = email.indexOf('@')
	if (at <= 0) return email
	return `${email[0]}***${email.slice(at)}`
}
