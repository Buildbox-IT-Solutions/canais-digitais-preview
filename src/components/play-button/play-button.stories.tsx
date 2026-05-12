import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlayButton } from '.'

const meta: Meta<typeof PlayButton> = {
	title: 'Buttons/PlayButton',
	component: PlayButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PlayButton>

export const Medium: Story = { args: { size: 'medium', type: 'play' } }
export const Large: Story = { args: { size: 'large', type: 'play' } }
export const Small: Story = { args: { size: 'small', type: 'play' } }
export const Pause: Story = { args: { size: 'medium', type: 'pause' } }
export const AsDiv: Story = { args: { size: 'small', as: 'div', type: 'play' } }
export const Disabled: Story = { args: { size: 'medium', type: 'play', disabled: true } }
