import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusRing } from '.'

const meta: Meta<typeof StatusRing> = {
	title: 'Componentes/StatusRing',
	component: StatusRing,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StatusRing>

export const Primary: Story = { args: { accent: 'primary', icon: 'mail', size: 'sm' } }
export const Mint: Story = { args: { accent: 'mint', icon: 'download', size: 'sm' } }
export const Neutral: Story = { args: { accent: 'neutral', icon: 'schedule', size: 'sm' } }
export const Danger: Story = { args: { accent: 'danger', icon: 'delete', size: 'sm' } }
export const LargeFullPage: Story = {
	name: 'Large (md, full page)',
	args: { accent: 'primary', icon: 'mail', size: 'md' },
}
