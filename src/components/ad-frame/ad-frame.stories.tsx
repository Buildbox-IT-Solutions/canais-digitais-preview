import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdFrame } from '.'

const meta: Meta<typeof AdFrame> = {
	title: 'Cards/AdFrame',
	component: AdFrame,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AdFrame>

export const Leaderboard: Story = { args: { width: 970, height: 90 } }
export const Billboard: Story = { args: { width: 970, height: 250 } }
export const Rectangle: Story = { args: { width: 300, height: 250 } }
export const Skyscraper: Story = { args: { width: 300, height: 600 } }
