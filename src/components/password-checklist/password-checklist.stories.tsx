import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordChecklist } from '.'

const meta: Meta<typeof PasswordChecklist> = {
	title: 'Form/PasswordChecklist',
	component: PasswordChecklist,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof PasswordChecklist>

export const Empty: Story = { args: { value: '' } }
export const Partial: Story = { args: { value: 'abc123' } }
export const AllMet: Story = { args: { value: 'Abcd1234!' } }
