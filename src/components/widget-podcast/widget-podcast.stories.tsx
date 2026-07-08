import type { Meta, StoryObj } from '@storybook/react-vite'
import { PODCASTS, picsumSrc } from '~/mocks/articles'
import { WidgetPodcast } from '.'

const meta: Meta<typeof WidgetPodcast> = {
	title: 'Sections/WidgetPodcast',
	component: WidgetPodcast,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof WidgetPodcast>

export const Default: Story = {
	args: {
		items: [
			{
				category: 'Food Service',
				title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
				image: picsumSrc('pod1', 208, 208),
				sponsor: 'Company Name',
				sponsorHref: '#',
			},
			...PODCASTS.map((pod) => ({ category: pod.category, title: pod.title, image: picsumSrc(pod.seed, 208, 208) })),
		],
	},
}
