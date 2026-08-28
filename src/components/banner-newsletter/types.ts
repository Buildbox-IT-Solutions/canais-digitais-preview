import type { NewsletterState } from '~/components/newsletter-card/types'

export type BannerNewsletterVariant = 'destaque' | 'sidebar'

export interface IBannerNewsletterProps {
	image: string
	title: string
	description: string
	ctaLabel: string
	ctaHref: string
	onCtaClick?: () => void
	/**
	 * `destaque` é a faixa larga da home — imagem ao lado do texto a partir de `lg`.
	 * `sidebar` é o card estreito da coluna lateral da página de conteúdo, que nunca
	 * quebra em duas colunas porque não tem largura para isso.
	 */
	variant?: BannerNewsletterVariant
	/**
	 * `idle → pending → subscribed` — o MESMO contrato do NewsletterCard (ver
	 * `src/components/newsletter-card/types.ts`), de propósito: "assinar" tem um único
	 * modelo de estados no produto inteiro. `subscribed` é terminal — o banner não
	 * expõe cancelamento nem link de gerenciar: quem quer gerenciar chega pela ação
	 * "Gerenciar" do toast de sucesso, que é onde a oferta cabe sem competir com o
	 * conteúdo da página.
	 */
	state?: NewsletterState
	className?: string
}
