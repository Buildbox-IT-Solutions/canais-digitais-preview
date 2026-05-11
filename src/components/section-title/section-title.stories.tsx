import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionTitle } from '.'

const meta: Meta<typeof SectionTitle> = {
	title: 'Cards/SectionTitle',
	component: SectionTitle,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
	args: { label: 'Notícias' },
}

export default meta
type Story = StoryObj<typeof SectionTitle>

export const Default: Story = { args: { color: 'primary-600' } }
export const Mint: Story = { args: { color: 'mint' } }
export const Saffron: Story = { args: { color: 'saffron' } }
export const Uppercase: Story = { args: { color: 'secondary-950', uppercase: true } }
export const AsLink: Story = { args: { color: 'primary-600', href: '#' } }
