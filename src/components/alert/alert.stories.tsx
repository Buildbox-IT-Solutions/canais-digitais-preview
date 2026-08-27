import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '.'

const meta: Meta<typeof Alert> = {
	title: 'Feedback/Alert',
	component: Alert,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { message: 'Preencha todos os campos obrigatórios.' },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Error: Story = { args: { type: 'error' } }
export const Success: Story = { args: { type: 'success', message: 'Cadastro salvo com sucesso.' } }
export const Warning: Story = { args: { type: 'warning', message: 'Sua sessão expira em 1 minuto.' } }
export const Info: Story = { args: { type: 'info', message: 'Seus dados são usados só para personalizar o conteúdo.' } }

/** Com título — mesmo padrão do Toast: title em negrito, message menor abaixo. */
export const ComTitulo: Story = {
	args: {
		type: 'error',
		title: 'Não foi possível salvar',
		message: 'Verifique os campos destacados e tente novamente.',
	},
}
