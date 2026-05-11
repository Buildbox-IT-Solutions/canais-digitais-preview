import type { Meta, StoryObj } from '@storybook/react-vite'
import { CadastroStepper } from '.'

const meta: Meta<typeof CadastroStepper> = {
	title: 'Auth/CadastroStepper',
	component: CadastroStepper,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof CadastroStepper>

export const Step1: Story = { args: { current: 1 } }
export const Step2: Story = { args: { current: 2 } }
export const Step3: Story = { args: { current: 3 } }
