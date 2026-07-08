import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentiveLeituraDialog } from './index'

const meta: Meta<typeof IncentiveLeituraDialog> = {
	title: 'Componentes/IncentiveLeituraDialog',
	component: IncentiveLeituraDialog,
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

type Story = StoryObj<typeof IncentiveLeituraDialog>

export const Default: Story = {}
