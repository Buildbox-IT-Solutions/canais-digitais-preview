const PASSIVE_SHOWN_KEY = 'cd_incentive_passive_shown'
const PASSIVE_SUPPRESSED_UNTIL_KEY = 'cd_incentive_passive_suppressed_until'
const SUPPRESS_DURATION_MS = 7 * 24 * 60 * 60 * 1000

/**
 * true se nenhum modal passivo (Portal/Leitura) já apareceu nesta sessão de aba
 * e o usuário não dispensou/abriu um passivo nos últimos 7 dias.
 */
export function shouldShowPassiveIncentive(): boolean {
	if (sessionStorage.getItem(PASSIVE_SHOWN_KEY)) return false
	const suppressedUntil = Number(localStorage.getItem(PASSIVE_SUPPRESSED_UNTIL_KEY) ?? 0)
	return Date.now() >= suppressedUntil
}

/** Marca que um passivo já apareceu nesta aba — o outro passivo não deve mais aparecer na mesma sessão. */
export function markPassiveShown(): void {
	sessionStorage.setItem(PASSIVE_SHOWN_KEY, '1')
}

/** Suprime os dois passivos por 7 dias a partir de agora. */
export function suppressPassiveFor7Days(): void {
	localStorage.setItem(PASSIVE_SUPPRESSED_UNTIL_KEY, String(Date.now() + SUPPRESS_DURATION_MS))
}
