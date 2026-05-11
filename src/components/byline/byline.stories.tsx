import type { Meta, StoryObj } from '@storybook/react-vite'
import { Byline } from '.'

const meta: Meta<typeof Byline> = {
	title: 'Chips/Byline',
	component: Byline,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { author: 'Mariana Albuquerque', href: '#' },
}

export default meta
type Story = StoryObj<typeof Byline>

export const Md: Story = { args: { size: 'md' } }
export const Sm: Story = { args: { size: 'sm' } }
export const Plain: Story = { args: { href: undefined } }
