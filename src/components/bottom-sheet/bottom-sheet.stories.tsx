import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomSheet } from '.'
import { AccessInvite } from '~/components/access-invite'

const meta: Meta<typeof BottomSheet> = {
	title: 'Componentes/BottomSheet',
	component: BottomSheet,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BottomSheet>

/**
 * Sheet com o convite "Acessar". Abra e feche por Esc, clique no backdrop ou
 * arraste o painel para baixo. Reduza a viewport para ver melhor o comportamento
 * mobile (o header real só usa o sheet abaixo de 1024px).
 */
export const ComConvite: Story = {
	name: 'Com AccessInvite',
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<div className="min-h-[80vh] p-8">
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary-600 px-4 py-2 font-body font-bold text-body-lg text-primary-600"
				>
					Abrir bottom sheet
				</button>

				<BottomSheet
					open={open}
					onClose={() => setOpen(false)}
					labelledById="sb-access-title"
				>
					<AccessInvite titleId="sb-access-title" />
				</BottomSheet>
			</div>
		)
	},
}
