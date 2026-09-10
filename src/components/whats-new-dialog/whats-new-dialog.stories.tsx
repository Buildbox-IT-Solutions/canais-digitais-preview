import type { Meta, StoryObj } from '@storybook/react-vite'
import { WhatsNewDialog } from './index'

const meta: Meta<typeof WhatsNewDialog> = {
	title: 'Componentes/WhatsNewDialog',
	component: WhatsNewDialog,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		onClose: () => {},
	},
}
export default meta

type Story = StoryObj<typeof WhatsNewDialog>

/** Passo 1 de 3 — sem seta "voltar". Dots clicáveis navegam direto para qualquer passo. */
export const Passo1Login: Story = {
	name: 'Passo 1 — Login',
	args: { initialStep: 0 },
}

/** Passo 2 de 3 — download de materiais. Ambas as setas ativas. */
export const Passo2Download: Story = {
	name: 'Passo 2 — Download',
	args: { initialStep: 1 },
}

/** Passo 3 de 3 — a seta "avançar" dá lugar ao CTA "Criar conta"; "Pular" continua no lugar. */
export const Passo3Newsletter: Story = {
	name: 'Passo 3 — Newsletter',
	args: { initialStep: 2 },
}
