import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '~/components/form-field'
import { Drawer } from '.'

const meta: Meta<typeof Drawer> = {
	title: 'Feedback/Drawer',
	component: Drawer,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
	args: {
		open: true,
		title: 'Dados pessoais',
		children: (
			<>
				<FormField label="Nome" placeholder="Mariana Albuquerque" />
				<FormField label="E-mail" type="email" placeholder="mariana@exemplo.com" />
			</>
		),
	},
}

export const SaveDisabled: Story = {
	args: { ...Default.args, saveDisabled: true },
}
