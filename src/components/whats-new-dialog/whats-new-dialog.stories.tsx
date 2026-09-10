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
	args: { initialStep: 0, apresentacao: 'modal' },
}

/** Passo 2 de 3 — download de materiais. Ambas as setas ativas. */
export const Passo2Download: Story = {
	name: 'Passo 2 — Download',
	args: { initialStep: 1, apresentacao: 'modal' },
}

/** Passo 3 de 3 — a seta "avançar" dá lugar ao CTA "Criar conta"; "Pular" continua no lugar. */
export const Passo3Newsletter: Story = {
	name: 'Passo 3 — Newsletter',
	args: { initialStep: 2, apresentacao: 'modal' },
}

/**
 * Abaixo de `lg` o card de 420px vira bottom sheet de largura total, com handle de
 * arrastar (arrastar para baixo = mesma semântica do X, "agora não"). Forçado por
 * `apresentacao` para não depender do tamanho da janela de quem está revisando — no
 * produto quem decide é a viewport.
 */
export const MobileSheet: Story = {
	name: 'Mobile — bottom sheet',
	args: { initialStep: 0, apresentacao: 'sheet' },
}

/** O mesmo sheet no último passo, com o CTA "Criar conta" na largura do mobile. */
export const MobileSheetUltimoPasso: Story = {
	name: 'Mobile — bottom sheet, passo 3',
	args: { initialStep: 2, apresentacao: 'sheet' },
}
