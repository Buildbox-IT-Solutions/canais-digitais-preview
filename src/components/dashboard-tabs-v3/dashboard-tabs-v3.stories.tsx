import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardTabsV3 } from '.'

const meta: Meta<typeof DashboardTabsV3> = {
	title: 'Dashboard/DashboardTabsV3',
	component: DashboardTabsV3,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardTabsV3>

export const Geral: Story = { args: { active: 'geral' } }
export const Perfil: Story = { args: { active: 'perfil' } }
export const Conta: Story = { args: { active: 'conta' } }
