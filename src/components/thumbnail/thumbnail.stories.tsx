import type { Meta, StoryObj } from '@storybook/react-vite'
import { Thumbnail } from '.'

const SAMPLE_SRC = 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&q=80'

const PlayOverlayPlaceholder = (
	<div className="rounded-full bg-white/80 size-12 flex items-center justify-center">
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6 text-primary-600">
			<path d="M8 5v14l11-7z" />
		</svg>
	</div>
)

const meta: Meta<typeof Thumbnail> = {
	title: 'Foundations/Thumbnail',
	component: Thumbnail,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Wrapper "card-ready" sobre Image — hover-zoom + overlay opcional. O wrapper externo precisa ter classe `group` para acionar zoom e overlay. Aceita ratios `video` (16:9), `photo` (3:2) e `square` (1:1).',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		src: SAMPLE_SRC,
		alt: 'Thumbnail de exemplo',
		className: 'w-80',
	},
	decorators: [
		(Story) => (
			<div className="group">
				<Story />
			</div>
		),
	],
}

export default meta
type Story = StoryObj<typeof Thumbnail>

export const Video: Story = {
	args: { ratio: 'video', href: '#' },
}

export const Photo: Story = {
	args: { ratio: 'photo', href: '#' },
}

export const Square: Story = {
	args: { ratio: 'square', href: '#' },
}

export const WithoutLink: Story = {
	args: { ratio: 'video', href: undefined },
}

export const WithoutRadius: Story = {
	args: { ratio: 'video', radius: false, href: '#' },
}

export const WithPlayOverlay: Story = {
	args: { ratio: 'video', href: '#', overlay: PlayOverlayPlaceholder },
}
