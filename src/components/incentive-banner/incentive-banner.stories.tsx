import type { Meta, StoryObj } from '@storybook/react-vite'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { IncentiveBanner } from './index'

const meta: Meta<typeof IncentiveBanner> = {
	title: 'Componentes/IncentiveBanner',
	component: IncentiveBanner,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		backgroundImage: incentiveBannerTexture,
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

/**
 * Lembrete de login no formulário público de newsletter (`/form-newsletter`). Mesma
 * casca das outras duas, com uma diferença de propósito: as outras convidam quem não
 * tem conta; esta lembra quem JÁ TEM de que dá para entrar em vez de preencher o
 * formulário longo. Os dois CTAs continuam — "Criar conta" também é desfecho válido.
 * As regras de aparição (entra na carga da tela, sai no primeiro foco de campo, sem
 * cooldown de 7 dias) vivem na tela, não aqui — ver `src/screens/form-newsletter`.
 */
export const LembreteNewsletter: Story = {
	args: {
		icon: 'account-circle',
		title: 'Já tem uma conta?',
		titleHighlight: 'Entre e assine em um clique.',
		description: 'Com a sua conta você assina sem preencher este formulário de novo.',
	},
}
