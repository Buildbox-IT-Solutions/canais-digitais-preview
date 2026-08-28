import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SubscribeButton } from '.'
import type { SubscribeStatus } from './types'

const meta: Meta<typeof SubscribeButton> = {
	title: 'Buttons/SubscribeButton',
	component: SubscribeButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Ação com desfecho persistente — a pessoa aperta uma vez e o sistema passa a lembrar. Estende o eixo `type` do Button [1.1] com o eixo `status` (idle | pending | subscribed). O `label` é livre: serve "Assine agora", "Inscrever-se", "Seguir". `subscribed` é terminal e NÃO é clicável — renderiza um `role="status"` com as medidas do botão que substitui, para o layout não pular ao assinar.',
			},
		},
	},
	args: { label: 'Assine agora', size: 'medium' },
}

export default meta
type Story = StoryObj<typeof SubscribeButton>

const STATUSES: SubscribeStatus[] = ['idle', 'pending', 'subscribed']

/** Os três status lado a lado — repare que a altura não muda entre eles. */
function StatusRow(args: Parameters<typeof SubscribeButton>[0]) {
	return (
		<div className="flex items-center gap-4">
			{STATUSES.map((status) => (
				<SubscribeButton key={status} {...args} status={status} />
			))}
		</div>
	)
}

export const Filled: Story = { args: { type: 'filled' }, render: StatusRow }

/** O tipo é preservado em `pending`: outlined que carrega continua outlined. */
export const Outlined: Story = { args: { type: 'outlined' }, render: StatusRow }

export const Ghost: Story = { args: { type: 'ghost' }, render: StatusRow }

export const Large: Story = { args: { type: 'filled', size: 'large' }, render: StatusRow }

export const Small: Story = { args: { type: 'filled', size: 'small' }, render: StatusRow }

/** Sobre fundo escuro (banners com gradiente) — `tone="inverse"` do Button. */
export const Inverse: Story = {
	args: { type: 'filled', tone: 'inverse' },
	render: StatusRow,
	decorators: [
		(Story) => (
			<div className="bg-gradient-to-br from-primary-600 to-secondary-950 p-8 rounded-lg">
				<Story />
			</div>
		),
	],
}

/** Label genérico: o componente é nomeado pelo comportamento, não pelo conteúdo. */
export const OutraLabel: Story = {
	args: { type: 'outlined', label: 'Inscrever-se', subscribedLabel: 'Inscrito', pendingLabel: 'Inscrevendo...' },
	render: StatusRow,
}

/** A transição completa. Clique para percorrer idle → pending → subscribed. */
export const Interativo: Story = {
	args: { type: 'filled' },
	render: (args) => {
		const [status, setStatus] = useState<SubscribeStatus>('idle')
		return (
			<SubscribeButton
				{...args}
				status={status}
				onSubscribe={() => {
					setStatus('pending')
					setTimeout(() => setStatus('subscribed'), 900)
				}}
			/>
		)
	},
}
