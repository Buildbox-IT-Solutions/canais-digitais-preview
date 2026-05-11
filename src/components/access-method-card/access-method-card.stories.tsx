import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccessMethodCard } from '.'

const meta: Meta<typeof AccessMethodCard> = {
	title: 'List Items/AccessMethodCard',
	component: AccessMethodCard,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof AccessMethodCard>

export const Email: Story = {
	args: {
		icon: 'mail',
		name: 'E-mail e senha',
		chip: 'Atual',
		detail: 'mariana.albuquerque@empresa.com.br',
		cta: 'Alterar',
	},
}

export const LinkedIn: Story = {
	args: { icon: 'linkedin', name: 'LinkedIn', detail: 'Conecte seu LinkedIn', cta: 'Conectar' },
}

export const Google: Story = {
	args: { icon: 'google', name: 'Google', detail: 'Conecte sua conta Google', cta: 'Conectar' },
}
