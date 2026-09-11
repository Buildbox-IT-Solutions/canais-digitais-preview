import type { Meta, StoryObj } from '@storybook/react-vite'
import { WhatsNewDialog } from './index'

const meta: Meta<typeof WhatsNewDialog> = {
	title: 'Componentes/WhatsNewDialog',
	component: WhatsNewDialog,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		onEvento: () => {},
	},
}
export default meta

type Story = StoryObj<typeof WhatsNewDialog>

/** Passo 1 de 3 — sem seta "voltar". Dots clicáveis navegam direto para qualquer passo. */
export const Passo1Login: Story = {
	name: 'Passo 1 — Login',
	args: { initialStep: 0 },
}

/** Passo 2 de 3 — o único com as duas setas: é o único que tem passo anterior e próximo. */
export const Passo2Download: Story = {
	name: 'Passo 2 — Download',
	args: { initialStep: 1 },
}

/** Passo 3 de 3 — as setas saem de cena e fica só "Pular" ao lado do CTA "Criar conta". */
export const Passo3Newsletter: Story = {
	name: 'Passo 3 — Newsletter',
	args: { initialStep: 2 },
}

/**
 * Mesmo modal, 342px com margem de 24px. Não há troca de apresentação entre mobile e
 * desktop — mudam largura e paddings, e a ilustração 16:9 acompanha. No último passo o
 * CTA ocupa a largura que sobra ao lado do "Pular".
 */
export const Mobile: Story = {
	name: 'Mobile — passo 1',
	globals: { viewport: { value: 'mobile1' } },
	args: { initialStep: 0 },
}

/** O mesmo no passo 3, onde o CTA estica. */
export const MobileUltimoPasso: Story = {
	name: 'Mobile — passo 3',
	globals: { viewport: { value: 'mobile1' } },
	args: { initialStep: 2 },
}
