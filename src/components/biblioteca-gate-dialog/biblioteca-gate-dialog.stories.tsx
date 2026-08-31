import type { Meta, StoryObj } from '@storybook/react-vite'
import { BibliotecaGateDialog } from '.'

const meta: Meta<typeof BibliotecaGateDialog> = {
	title: 'Biblioteca/GateDialog',
	component: BibliotecaGateDialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'O `IncentiveDownloadDialog` com a copy do gate do acervo, para quem já tem conta e não completou o cadastro. Uma ação só ("Completar perfil"), palavra destacada no mesmo `font-bold text-secondary-500` dos outros incentivos do portal, e copy sem contagem de campos — número exato obriga a página a calcular e o back-end a manter o cálculo sincronizado com a régua de cadastro completo. Vive nas duas telas que travam download: a aba e o painel da home.',
			},
		},
	},
	tags: ['autodocs'],
	args: { open: true, onCompletarPerfil: () => {}, onDismiss: () => {} },
}

export default meta
type Story = StoryObj<typeof BibliotecaGateDialog>

export const Aberto: Story = {}
