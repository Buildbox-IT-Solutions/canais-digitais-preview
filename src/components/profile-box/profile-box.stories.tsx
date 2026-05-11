import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProfileBox } from '.'

const meta: Meta<typeof ProfileBox> = {
	title: 'Dashboard/ProfileBox',
	component: ProfileBox,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: {
		icon: 'account-circle',
		title: 'Dados pessoais',
		description: 'Informações de identificação da sua conta',
		fields: ['Mariana Albuquerque', 'mariana@empresa.com.br', '+55 11 98786-9879'],
		href: '#',
		cta: 'Atualizar',
	},
}

export default meta
type Story = StoryObj<typeof ProfileBox>

export const Complete: Story = {}
export const Incomplete: Story = {
	args: {
		icon: 'business-center',
		title: 'Dados profissionais',
		description: 'Empresa, cargo e setor',
		fields: ['Empresa', 'Cargo', 'Setor'],
		incomplete: true,
		placeholder: true,
		cta: 'Preencher',
	},
}
