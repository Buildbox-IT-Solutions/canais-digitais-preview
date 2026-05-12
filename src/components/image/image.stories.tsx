import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from '.'

const SAMPLE_SRC = 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&q=80'

const meta: Meta<typeof Image> = {
	title: 'Foundations/Image',
	component: Image,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Wrapper passivo de imagem com `aspect-ratio`, `rounded-sm` e placeholder `bg-neutral-100`. 9 razões: 5 landscape (1:1, 4:3, 3:2, 16:9, 21:9) + 4 portrait (3:4, 2:3, 9:16, 9:21). Não tem props de state — qualquer reação fica por conta do componente que envolve.',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		src: SAMPLE_SRC,
		alt: 'Imagem de exemplo',
		className: 'w-64',
	},
}

export default meta
type Story = StoryObj<typeof Image>

export const Square: Story = { args: { ratio: 'square' } }
export const FourThree: Story = { name: '4:3', args: { ratio: '4-3' } }
export const ThreeTwo: Story = { name: '3:2', args: { ratio: '3-2' } }
export const Video: Story = { name: '16:9', args: { ratio: 'video' } }
export const TwentyOneNine: Story = { name: '21:9', args: { ratio: '21-9' } }
export const ThreeFour: Story = { name: '3:4', args: { ratio: '3-4' } }
export const TwoThree: Story = { name: '2:3', args: { ratio: '2-3' } }
export const NineSixteen: Story = { name: '9:16', args: { ratio: '9-16' } }
export const NineTwentyOne: Story = { name: '9:21', args: { ratio: '9-21' } }
