/**
 * Regra de negócio do "Assinar" nos banners de newsletter da home e da página de
 * conteúdo — único lugar que conhece `useLogado`, o toast e o desfecho da assinatura.
 * O componente BannerNewsletter é genérico e não sabe nada disto; ele só recebe
 * `state` e `onCtaClick`.
 *
 * Comportamento exato (o dev reimplementa isto em PHP — precisa bater 1:1):
 *
 * 1. Logado assina em UM clique, sem sair da página. O login já entregou e-mail e
 *    dados que o formulário público (/form-newsletter) pediria de novo — é o mesmo
 *    racional que já vale para o download, que para o logado baixa direto ("o login
 *    substitui o preenchimento repetido do formulário", figma-specs/
 *    _regras-de-negocio.md). Mandar o logado para outra tela para clicar um SEGUNDO
 *    "Assinar" repete o erro já corrigido no login com `intent=download`.
 * 2. O clique assina a newsletter DO PORTAL, nomeada no próprio banner — nunca uma
 *    "nossa newsletter" genérica. Um clique registra UM consentimento LGPD
 *    específico, e newsletter do portal × marketing da Informa são consentimentos
 *    distintos, que nunca entram no mesmo aceite. Se um dia um portal tiver mais de
 *    uma newsletter editorial, o clique único deixa de decidir sozinho e o banner
 *    passa a levar para a aba — hoje a grande maioria dos portais tem só a própria.
 * 3. Estados: idle → pending → subscribed. `subscribed` é terminal — não há caminho
 *    de volta nem cancelamento aqui. Mesmo contrato do NewsletterCard.
 * 4. Quem JÁ assina continua vendo o banner: ele não some, para não mexer na
 *    estrutura da página. O que muda é o CTA, que dá lugar à confirmação. O banner
 *    NÃO oferece link de gerenciar — quem quer gerenciar chega pela ação "Gerenciar"
 *    do toast de sucesso; repetir a oferta dentro do banner só disputa atenção com o
 *    conteúdo da página.
 * 5. Falha não é estado visual do banner: rollback para idle + toast de erro com ação
 *    "Repetir" — mesmo padrão do toggle de favoritos e do NewsletterPane.
 * 6. Deslogado este hook não age (`state` fica em idle e `assinar` é no-op). O banner
 *    leva ao formulário público, e o lembrete de "já tenho conta" mora lá, na
 *    /form-newsletter — não num modal sobre a home.
 * 7. Sem JS o `<a>` do banner ainda funciona: para o logado o href aponta para a aba
 *    Newsletter, onde a assinatura também é possível. O clique em um só passo é
 *    aprimoramento, não requisito.
 *
 * `?newsletter=` (eixo da ScenarioBar, ver src/screens/_newsletter/scenarios.ts) é
 * artifício de protótipo para revisar os três desfechos sem back-end: não existe no
 * produto real, onde o estado vem da conta do usuário.
 */
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import type { NewsletterState } from '~/components/newsletter-card/types'
import { toast } from './toast-store'
import { useLogado } from './use-logado'

export const NEWSLETTER_TAB_HREF = '/dashboard-perfil-v4?tab=newsletter'

/** Mesmo delay simulado do NewsletterPane — a espera precisa parecer a mesma operação. */
const SUBSCRIBE_DELAY_MS = 900

export const NEWSLETTER_SCENARIO_PARAM = 'newsletter'

export const NEWSLETTER_SCENARIO = {
	naoAssinante: 'nao-assinante',
	assinante: 'assinante',
	falha: 'falha',
} as const

export interface UseAssinarNewsletterResult {
	/** Estado do CTA do banner — alimenta `state` do BannerNewsletter. */
	state: NewsletterState
	/** Handler do CTA. No-op quando deslogado ou quando o estado não é `idle`. */
	assinar: () => void
	/**
	 * Aba Newsletter do perfil. Serve de href do CTA para o logado (fallback sem JS) e
	 * de destino da ação "Gerenciar" do toast de sucesso — o banner em si não expõe link
	 * de gerenciar.
	 */
	tabHref: string
}

export function useAssinarNewsletter(): UseAssinarNewsletterResult {
	const logado = useLogado()
	const [params] = useSearchParams()
	const navigate = useNavigate()

	const cenario = params.get(NEWSLETTER_SCENARIO_PARAM)
	const jaAssinante = cenario === NEWSLETTER_SCENARIO.assinante
	const forcarFalha = cenario === NEWSLETTER_SCENARIO.falha

	const [local, setLocal] = useState<NewsletterState>('idle')

	// `?newsletter=assinante` vence o estado local: é o cenário "cheguei aqui já
	// assinando", não um desfecho que este clique produziu.
	const state: NewsletterState = !logado ? 'idle' : jaAssinante ? 'subscribed' : local

	function assinar(): void {
		if (!logado) return // regra 6 — o banner leva ao formulário público
		if (state !== 'idle') return // regra 3 — `subscribed` é terminal, `pending` já está em voo

		setLocal('pending')

		setTimeout(() => {
			if (forcarFalha) {
				setLocal('idle')
				toast.error('Não foi possível confirmar a assinatura.', {
					action: { label: 'Repetir', onClick: assinar },
				})
				return
			}
			setLocal('subscribed')
			toast.success('Newsletter assinada.', {
				action: { label: 'Gerenciar', onClick: () => navigate(NEWSLETTER_TAB_HREF) },
			})
		}, SUBSCRIBE_DELAY_MS)
	}

	return { state, assinar, tabHref: NEWSLETTER_TAB_HREF }
}
