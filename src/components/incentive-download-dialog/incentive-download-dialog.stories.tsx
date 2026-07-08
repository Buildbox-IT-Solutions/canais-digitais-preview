import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentiveDownloadDialog } from './index'

const meta: Meta<typeof IncentiveDownloadDialog> = {
	title: 'Componentes/IncentiveDownloadDialog',
	component: IncentiveDownloadDialog,
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

type Story = StoryObj<typeof IncentiveDownloadDialog>

export const Default: Story = {}
