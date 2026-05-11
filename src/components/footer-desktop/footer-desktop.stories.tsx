import type { Meta, StoryObj } from '@storybook/react-vite'
import { FooterDesktop } from '.'

const meta: Meta<typeof FooterDesktop> = {
	title: 'Navigation/FooterDesktop',
	component: FooterDesktop,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FooterDesktop>

export const Default: Story = {}
