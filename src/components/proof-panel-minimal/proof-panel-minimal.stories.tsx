import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProofPanelMinimal } from '.'

const meta: Meta<typeof ProofPanelMinimal> = {
	title: 'Feedback/ProofPanelMinimal',
	component: ProofPanelMinimal,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProofPanelMinimal>

export const Login: Story = { args: { variant: 'login' } }
export const Signup1: Story = { args: { variant: 'signup-1' } }
export const Signup2: Story = { args: { variant: 'signup-2' } }
export const Signup3: Story = { args: { variant: 'signup-3' } }
export const Welcome: Story = { args: { variant: 'welcome' } }
