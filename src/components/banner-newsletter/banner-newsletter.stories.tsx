import type { Meta, StoryObj } from '@storybook/react-vite'
import { picsumSrc } from '~/mocks/articles'
import { BannerNewsletter } from '.'

const meta: Meta<typeof BannerNewsletter> = {
	title: 'Sections/BannerNewsletter',
	component: BannerNewsletter,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof BannerNewsletter>

export const Default: Story = {
	args: {
		image: picsumSrc('banner-news-home', 600, 400),
		title: 'O melhor conteúdo do setor alimentício, direto na sua caixa de entrada.',
		description: 'Junte-se a milhares de construtores que já assinam nossa newsletter gratuita.',
		ctaLabel: 'Assine agora',
		ctaHref: '/form-newsletter',
	},
	render: (args) => (
		<div className="w-[1280px]">
			<BannerNewsletter {...(args as Parameters<typeof BannerNewsletter>[0])} />
		</div>
	),
}
