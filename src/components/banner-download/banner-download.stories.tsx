import type { Meta, StoryObj } from '@storybook/react-vite'
import { picsumSrc } from '~/mocks/articles'
import { BannerDownload } from '.'

const meta: Meta<typeof BannerDownload> = {
	title: 'Cards/BannerDownload',
	component: BannerDownload,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: {
		title: 'Lorem ipsum dolor sit amet consectetur.',
		description: 'Lorem ipsum dolor sit amet consectetur. Risus eget nulla est sem eget sem integer facilisi tellus.',
		ctaLabel: 'Acessar material',
		ctaHref: '#',
	},
}
export default meta

type Story = StoryObj<typeof BannerDownload>

export const HorizontalSemPhoto: Story = {
	args: { orientation: 'horizontal' },
	render: (args) => (
		<div className="w-[704px]">
			<BannerDownload {...(args as Parameters<typeof BannerDownload>[0])} />
		</div>
	),
}

export const HorizontalComPhoto: Story = {
	args: { orientation: 'horizontal', photoSrc: picsumSrc('banner-download-h', 400, 400) },
	render: (args) => (
		<div className="w-[704px]">
			<BannerDownload {...(args as Parameters<typeof BannerDownload>[0])} />
		</div>
	),
}

export const VerticalSemPhoto: Story = {
	args: { orientation: 'vertical' },
}

export const VerticalComPhoto: Story = {
	args: { orientation: 'vertical', photoSrc: picsumSrc('banner-download-v', 600, 450) },
}
