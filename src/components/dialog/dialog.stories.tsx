import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog } from './index'

const meta: Meta<typeof Dialog> = {
	title: 'Componentes/Dialog',
	component: Dialog,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
	args: {
		closeHref: '#',
		icon: { name: 'download', tone: 'primary' },
		title: 'Título do dialog',
		description: 'Descrição curta explicando o que este dialog faz e o que se espera do usuário.',
		secondary: { label: 'Cancelar', href: '#' },
		primary: { label: 'Confirmar', href: '#' },
	},
}

export const Destructive: Story = {
	args: {
		closeHref: '#',
		size: 'lg',
		title: 'Excluir sua conta',
		description: 'A exclusão é imediata, permanente e não pode ser desfeita.',
		destructive: true,
		secondary: { label: 'Cancelar', href: '#' },
		primary: { label: 'Excluir permanentemente', href: '#' },
	},
}

/** Reduza a viewport do navegador para abaixo de 1024px para ver o dialog em tela cheia (sem cantos arredondados nem scrim visível). */
export const MobileFullScreen: Story = {
	args: {
		closeHref: '#',
		size: 'lg',
		mobileFullScreen: true,
		title: 'Excluir sua conta',
		description: 'A exclusão é imediata, permanente e não pode ser desfeita.',
		destructive: true,
		secondary: { label: 'Cancelar', href: '#' },
		primary: { label: 'Excluir permanentemente', href: '#' },
	},
}

export const SingleAction: Story = {
	args: {
		closeHref: '#',
		icon: { name: 'check', tone: 'success' },
		title: 'Conta excluída',
		description: 'Sua conta foi excluída permanentemente. Sentiremos sua falta!',
		primary: { label: 'Criar nova conta', href: '#' },
	},
}

export const WithBottomLink: Story = {
	args: {
		closeHref: '#',
		icon: { name: 'mail', tone: 'secondary' },
		title: 'Verifique seu e-mail',
		description: 'Enviamos um link para o seu e-mail. Clique nele para continuar.',
		primary: { label: 'Reenviar', href: '#' },
		bottomLink: (
			<span className="font-body text-body-md text-neutral-700">
				Já tem conta?{' '}
				<a href="#" className="font-bold text-secondary-950 hover:underline">
					Entrar
				</a>
			</span>
		),
	},
}

export const DangerTone: Story = {
	args: {
		closeHref: '#',
		icon: { name: 'delete', tone: 'danger' },
		title: 'Tom de ícone destrutivo',
		description: 'Badge de ícone no tom danger, para ações sensíveis.',
		primary: { label: 'Entendi', href: '#' },
	},
}
