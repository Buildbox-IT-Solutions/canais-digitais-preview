import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardTabs } from '.'

const meta: Meta<typeof DashboardTabs> = {
	title: 'Dashboard/DashboardTabs',
	component: DashboardTabs,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardTabs>

export const Perfil: Story = { args: { active: 'perfil' } }
export const Conta: Story = { args: { active: 'conta' } }
export const Ultimas: Story = { args: { active: 'ultimas' } }
export const Newsletter: Story = { args: { active: 'newsletter' } }
export const Downloads: Story = { args: { active: 'downloads' } }
