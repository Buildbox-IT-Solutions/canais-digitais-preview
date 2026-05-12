import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from '.'

const meta: Meta<typeof Toast> = {
	title: 'Feedback/Toast',
	component: Toast,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { message: 'Senha redefinida com sucesso.' },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = { args: { type: 'success' } }
export const Error: Story = { args: { type: 'error', message: 'Erro ao salvar. Tente novamente.' } }
export const Warning: Story = { args: { type: 'warning', message: 'Sessão expira em 1 minuto.' } }
export const Info: Story = { args: { type: 'info', message: 'Dispositivo reconhecido.' } }
