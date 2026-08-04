import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from '~/lib/toast-store'
import { Toaster } from '.'

/**
 * Referência: shadcn/ui Toast (https://ui.shadcn.com/docs/components/base/toast) —
 * API imperativa (`toast.success(...)`, `toast.error(...)`) disparada por qualquer
 * interação, com `<Toaster />` renderizando a pilha. Clique nos botões abaixo para
 * disparar os toasts.
 */
const meta: Meta<typeof Toaster> = {
	title: 'Feedback/Toaster',
	component: Toaster,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toaster>

function DemoButton({ label, onClick }: { label: string; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="h-10 px-4 rounded-full border-2 border-primary-600 text-primary-600 font-body font-bold text-body-md hover:bg-neutral-50 transition-colors"
		>
			{label}
		</button>
	)
}

export const Playground: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<DemoButton label="Disparar sucesso" onClick={() => toast.success('Preferência salva.')} />
			<DemoButton
				label="Disparar erro"
				onClick={() => toast.error('Erro ao salvar. Tente novamente.')}
			/>
			<DemoButton
				label="Disparar aviso"
				onClick={() => toast.warning('Sessão expira em 1 minuto.')}
			/>
			<DemoButton label="Disparar info" onClick={() => toast.info('Dispositivo reconhecido.')} />
			<DemoButton
				label="Disparar com ação (Desfazer)"
				onClick={() =>
					toast.info('Removido de Últimas leituras.', {
						durationMs: 5000,
						action: { label: 'Desfazer', onClick: () => toast.success('Desfeito.') },
					})
				}
			/>
			<Toaster />
		</div>
	),
}
