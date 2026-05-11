import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordStrength } from '.'

const meta: Meta<typeof PasswordStrength> = {
	title: 'Form/PasswordStrength',
	component: PasswordStrength,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof PasswordStrength>

export const Empty: Story = { args: { value: '' } }
export const Weak: Story = { args: { value: 'abc123' } }
export const Medium: Story = { args: { value: 'abcd1234' } }
export const Strong: Story = { args: { value: 'Abcd1234!' } }
