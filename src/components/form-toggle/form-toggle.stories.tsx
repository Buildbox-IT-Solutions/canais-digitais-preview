import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormToggle } from '.'

const meta: Meta<typeof FormToggle> = {
	title: 'Form/FormToggle',
	component: FormToggle,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: {
		id: 'toggle-newsletter',
		label: 'Receber newsletter segmentada por setor',
		hint: 'Você pode cancelar a qualquer momento.',
	},
	decorators: [(Story) => <div className="w-96"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FormToggle>

export const Off: Story = { args: { checked: false } }
export const On: Story = { args: { checked: true } }
export const Disabled: Story = { args: { checked: false, disabled: true } }
export const WithoutHint: Story = { args: { hint: undefined } }
