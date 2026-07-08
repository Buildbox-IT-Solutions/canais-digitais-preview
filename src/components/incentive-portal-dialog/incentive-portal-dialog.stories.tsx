import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentivePortalDialog } from './index'

const meta: Meta<typeof IncentivePortalDialog> = {
	title: 'Componentes/IncentivePortalDialog',
	component: IncentivePortalDialog,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: {
		open: true,
		onCreateAccount: () => {},
		onLogin: () => {},
		onDismiss: () => {},
	},
}
export default meta

type Story = StoryObj<typeof IncentivePortalDialog>

export const Default: Story = {}
