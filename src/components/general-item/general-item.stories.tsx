import type { Meta, StoryObj } from '@storybook/react-vite'
import { GeneralItem } from '.'

const meta: Meta<typeof GeneralItem> = {
	title: 'List Items/GeneralItem',
	component: GeneralItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof GeneralItem>

export const SolicitarDados: Story = {
	args: {
		icon: 'download',
		title: 'Solicitar meus dados',
		desc: 'Receba uma cópia de tudo que armazenamos sobre você.',
	},
}
export const Historico: Story = {
	args: {
		icon: 'history',
		title: 'Histórico de consentimentos',
		desc: 'Veja todos os termos aceitos e revogados.',
	},
}
export const ExcluirConta: Story = {
	args: {
		icon: 'delete',
		title: 'Excluir conta',
		desc: 'Removemos seus dados permanentemente após 30 dias.',
		danger: true,
	},
}
