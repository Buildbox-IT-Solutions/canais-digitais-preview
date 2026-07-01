import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoCard } from './index'

/** Larguras de design por variante (figma-specs/video-card.md).
 *  O componente é fluido; estas molduras só reproduzem a largura do slot no
 *  Storybook. xsmall-horizontal a confirmar contra o Figma. */
const WIDTHS: Record<string, string> = {
	'large-vertical': 'w-[600px]',
	'medium-vertical': 'w-[392px]',
	'small-vertical': 'w-[288px]',
	'large-horizontal': 'w-[912px]',
	'medium-horizontal': 'w-[600px]',
	'small-horizontal': 'w-[392px]',
	'xsmall-horizontal': 'w-[392px]',
}

const meta: Meta<typeof VideoCard> = {
	title: 'Cards/VideoCard',
	component: VideoCard,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story, ctx) => (
			<div
				className={
					WIDTHS[`${ctx.args.size ?? 'large'}-${ctx.args.orientation ?? 'vertical'}`]
				}
			>
				<Story />
			</div>
		),
	],
}
export default meta
type Story = StoryObj<typeof VideoCard>

const base = {
	title: 'Título do vídeo em destaque na home',
	image: 'https://picsum.photos/seed/video/600/338',
	href: '#',
	categoria: { label: 'Vídeos', color: 'mint' as const, chip: true, href: '#' },
}

export const LargeVertical: Story = { args: { ...base, size: 'large', orientation: 'vertical', lead: 'Descrição do vídeo.' } }
export const MediumHorizontal: Story = { args: { ...base, size: 'medium', orientation: 'horizontal' } }
export const XSmallHorizontal: Story = { args: { ...base, size: 'xsmall', orientation: 'horizontal' } }
