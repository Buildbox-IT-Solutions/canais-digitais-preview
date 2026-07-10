import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentiveBanner } from './index'

const meta: Meta<typeof IncentiveBanner> = {
	title: 'Componentes/IncentiveBanner',
	component: IncentiveBanner,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		onCreateAccount: () => {},
		onLogin: () => {},
		onDismiss: () => {},
	},
}
export default meta

type Story = StoryObj<typeof IncentiveBanner>

/** Reduza a viewport do navegador para abaixo de 1024px para ver a versão mobile (sem ícone, CTAs empilhados). */
export const Portal: Story = {
	args: {
		icon: 'account-circle',
		title: 'Crie sua conta',
		titleHighlight: 'gratuita',
		description: 'Acesse materiais exclusivos e assine nossas newsletters sem custo.',
	},
}

export const Leitura: Story = {
	args: {
		icon: 'description',
		title: 'Gostando da',
		titleHighlight: 'leitura?',
		description:
			'Crie uma conta gratuita para acessar mais conteúdos como este e receber nossas newsletters.',
	},
}
