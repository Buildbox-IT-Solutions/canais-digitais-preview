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

// ---------------------------------------------------------------------------
// Lembrete de login no formulário público de newsletter (/form-newsletter)
//
// Chave PRÓPRIA e sessionStorage — deliberadamente fora do cooldown de 7 dias acima.
// Os passivos da home/leitura aparecem sozinhos, sem o usuário pedir; este lembrete é
// CONTEXTUAL, disparado por uma ação dele (clicou em "Assine agora" e caiu no
// formulário). Compartilhar o storage faria quem dispensou o passivo da home nunca
// ver o lembrete no formulário — e vice-versa —, suprimindo por 7 dias uma ajuda que
// só aparece quando ela é relevante. Mesma exceção que os dialogs de incentivo já
// declaram ("sem cooldown/supressão/storage").
// ---------------------------------------------------------------------------

const NEWSLETTER_FORM_REMINDER_KEY = 'cd_incentive_newsletter_form_dismissed'

/** true se o lembrete já foi dispensado (X) ou descartado (primeiro foco) nesta aba. */
export function isNewsletterFormReminderDismissed(): boolean {
	return sessionStorage.getItem(NEWSLETTER_FORM_REMINDER_KEY) === '1'
}

/**
 * Encerra o lembrete pelo resto desta sessão de aba. Chamado tanto pelo X quanto pelo
 * primeiro foco em um campo: quem começou a preencher já escolheu o caminho, e
 * reexibir a barra depois disso é insistir em cima de um "não" que já foi dado.
 */
export function dismissNewsletterFormReminder(): void {
	sessionStorage.setItem(NEWSLETTER_FORM_REMINDER_KEY, '1')
}
