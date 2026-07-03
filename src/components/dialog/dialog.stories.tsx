import type { Meta, StoryObj } from '@storybook/react'
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
		eyebrow: (
			<span className="font-body font-semibold text-label-md tracking-wider text-red-700 uppercase">
				LGPD · Art. 18 IX
			</span>
		),
		title: 'Excluir sua conta',
		description: 'Esta ação não pode ser desfeita após 30 dias. Parte dos dados pode ser mantida por obrigação legal.',
		destructive: true,
		secondary: { label: 'Cancelar', href: '#' },
		primary: { label: 'Confirmar exclusão', href: '#' },
	},
}

export const SingleAction: Story = {
	args: {
		closeHref: '#',
		icon: { name: 'schedule', tone: 'warning' },
		title: 'Conta marcada para exclusão',
		description: 'Sua conta será excluída em 30 dias. Você pode cancelar a qualquer momento até lá.',
		primary: { label: 'Voltar ao Perfil', href: '#' },
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
