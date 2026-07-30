import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioVersionBlock } from '.'

const meta: Meta<typeof AudioVersionBlock> = {
	title: 'Cards/AudioVersionBlock',
	component: AudioVersionBlock,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof AudioVersionBlock>

export const Default: Story = {
	args: { durationSec: 260 },
}

export const DuracaoLonga: Story = {
	args: { durationSec: 912 },
}
