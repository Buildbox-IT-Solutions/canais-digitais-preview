import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthShell } from '.'

const meta: Meta<typeof AuthShell> = {
	title: 'Feedback/AuthShell',
	component: AuthShell,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AuthShell>

export const Login: Story = {
	args: {
		mode: 'login',
		children: (
			<div className="space-y-4">
				<h1 className="font-display font-bold text-display-sm text-primary-600">Entrar</h1>
				<p className="font-body text-body-lg text-neutral-700">
					Use sua conta Informa para acessar todos os portais editoriais.
				</p>
			</div>
		),
	},
}

export const HideProof: Story = {
	args: { ...Login.args, hideProof: true },
}
