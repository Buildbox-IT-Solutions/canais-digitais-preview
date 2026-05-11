import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormSelect } from '.'

const meta: Meta<typeof FormSelect> = {
	title: 'Form/FormSelect',
	component: FormSelect,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { label: 'Cargo' },
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FormSelect>

export const Empty: Story = {}
export const WithValue: Story = { args: { value: 'Designer' } }
export const Required: Story = { args: { required: true } }
