import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProofPanel } from '.'

const meta: Meta<typeof ProofPanel> = {
	title: 'Feedback/ProofPanel',
	component: ProofPanel,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProofPanel>

export const Login: Story = { args: { mode: 'login' } }
export const Signup: Story = { args: { mode: 'signup' } }
