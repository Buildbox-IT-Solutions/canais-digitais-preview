import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentiveNewsletterDialog } from './index'

const meta: Meta<typeof IncentiveNewsletterDialog> = {
	title: 'Componentes/IncentiveNewsletterDialog',
	component: IncentiveNewsletterDialog,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		onCreateAccount: () => {},
		onLogin: () => {},
		onDismiss: () => {},
	},
}
export default meta

type Story = StoryObj<typeof IncentiveNewsletterDialog>

/** ≥1024px: modal centralizado. Reduza a viewport do navegador para abaixo de 1024px para ver o bottom sheet. */
export const Default: Story = {
	name: 'Desktop / Mobile (resize)',
}
