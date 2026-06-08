import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardTabsV4 } from '.'

const meta: Meta<typeof DashboardTabsV4> = {
	title: 'Dashboard/DashboardTabsV4',
	component: DashboardTabsV4,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardTabsV4>

export const Perfil: Story = { args: { active: 'perfil' } }
export const Conta: Story = { args: { active: 'conta' } }
export const Ultimas: Story = { args: { active: 'ultimas' } }
export const Newsletter: Story = { args: { active: 'newsletter' } }
export const Downloads: Story = { args: { active: 'downloads' } }
