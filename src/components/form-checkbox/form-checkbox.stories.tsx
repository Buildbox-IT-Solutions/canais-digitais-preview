import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormCheckbox } from './index'

const meta: Meta<typeof FormCheckbox> = {
	title: 'Componentes/FormCheckbox',
	component: FormCheckbox,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof FormCheckbox>

export const Unselected: Story = {
	args: {
		label: 'Entendo que esta ação não pode ser desfeita.',
	},
}

export const Checked: Story = {
	args: {
		label: 'Entendo que esta ação não pode ser desfeita.',
		defaultChecked: true,
	},
}

export const Indeterminate: Story = {
	args: {
		label: 'Selecionar todos',
		indeterminate: true,
	},
}

export const Disabled: Story = {
	args: {
		label: 'Sim, eu desejo receber informações da Informa Markets e seus parceiros',
		disabled: true,
	},
}

export const DisabledChecked: Story = {
	args: {
		label: 'Sim, eu desejo receber informações da Informa Markets e seus parceiros',
		disabled: true,
		defaultChecked: true,
	},
}
