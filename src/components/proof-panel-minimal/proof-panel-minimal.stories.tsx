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

/** Tamanho sm — coluna dos modais compactos de Login/Cadastro v2 (912×600). */
export const Compact: Story = {
	args: { variant: 'login', size: 'sm' },
	parameters: { layout: 'centered' },
	render: (args) => (
		<div className="w-[456px] h-[600px] flex rounded-lg overflow-hidden">
			<ProofPanelMinimal {...args} className="grow basis-0" />
		</div>
	),
}

/** Tamanho md — coluna direita das telas fullpage v2 (split 50/50, headline 36px). */
export const Fullpage: Story = {
	args: { variant: 'login', size: 'md' },
	parameters: { layout: 'fullscreen' },
	render: (args) => (
		<div className="h-screen flex">
			<ProofPanelMinimal {...args} className="flex-1" />
		</div>
	),
}
