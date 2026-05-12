import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '.'

const meta: Meta<typeof FormField> = {
	title: 'Form/FormField',
	component: FormField,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { label: 'Nome', placeholder: 'Digite seu nome' },
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const Email: Story = { args: { label: 'E-mail', type: 'email', placeholder: 'voce@exemplo.com' } }
export const Phone: Story = { args: { label: 'Telefone', type: 'tel', placeholder: '(11) 99999-0000' } }
