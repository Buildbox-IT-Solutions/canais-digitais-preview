import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormCheckbox } from '.'

const meta: Meta<typeof FormCheckbox> = {
	title: 'Form/FormCheckbox',
	component: FormCheckbox,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { label: 'Sim, eu desejo receber informações sobre produtos e serviços.' },
	decorators: [(Story) => <div className="w-96"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FormCheckbox>

export const Unchecked: Story = { args: { checked: false } }
export const Checked: Story = { args: { checked: true } }
