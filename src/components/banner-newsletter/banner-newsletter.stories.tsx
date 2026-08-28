import type { Meta, StoryObj } from '@storybook/react-vite'
import { picsumSrc } from '~/mocks/articles'
import { NEWSLETTER_DO_PORTAL } from '~/mocks/dashboard-perfil'
import { BannerNewsletter } from '.'

const meta: Meta<typeof BannerNewsletter> = {
	title: 'Sections/BannerNewsletter',
	component: BannerNewsletter,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: {
		image: picsumSrc('banner-news-home', 600, 400),
		title: `Assine a newsletter ${NEWSLETTER_DO_PORTAL.title}`,
		description:
			'Tendências, entrevistas e novidades do setor de alimentos e bebidas, direto na sua caixa de entrada.',
		ctaLabel: 'Assine agora',
		ctaHref: '/dashboard-perfil-v4?tab=newsletter',
	},
}
export default meta

type Story = StoryObj<typeof BannerNewsletter>

function Destaque(args: Parameters<typeof BannerNewsletter>[0]) {
	return (
		<div className="w-[1280px]">
			<BannerNewsletter {...args} />
		</div>
	)
}

function Sidebar(args: Parameters<typeof BannerNewsletter>[0]) {
	return (
		<div className="w-[392px]">
			<BannerNewsletter {...args} variant="sidebar" />
		</div>
	)
}

/** Faixa larga da home. Deslogado o CTA leva ao formulário público; logado, assina em um clique. */
export const Default: Story = { render: Destaque }

/** Assinatura em voo — o mesmo selo do NewsletterCard, na altura do CTA. */
export const Pending: Story = { args: { state: 'pending' }, render: Destaque }

/**
 * Quem já assina continua vendo o banner (ele não some, para não mexer na estrutura da
 * página) — o CTA é que dá lugar ao selo e ao link de gerenciar, que leva à aba
 * Newsletter do perfil.
 */
export const Subscribed: Story = { args: { state: 'subscribed' }, render: Destaque }

/** Coluna lateral da página de conteúdo: nunca quebra em duas colunas, CTA sempre full width. */
export const SidebarIdle: Story = {
	name: 'Sidebar',
	args: {
		image: picsumSrc('newsletter', 600, 400),
		description:
			'Fique ligado nas inovações, estratégias e oportunidades do setor com conteúdos selecionados pelo Food Connection.',
	},
	render: Sidebar,
}

export const SidebarSubscribed: Story = {
	name: 'Sidebar · assinado',
	args: {
		image: picsumSrc('newsletter', 600, 400),
		description:
			'Fique ligado nas inovações, estratégias e oportunidades do setor com conteúdos selecionados pelo Food Connection.',
		state: 'subscribed',
	},
	render: Sidebar,
}
