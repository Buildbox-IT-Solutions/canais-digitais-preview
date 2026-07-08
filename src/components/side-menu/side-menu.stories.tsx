import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SideMenu } from '.'

const meta: Meta<typeof SideMenu> = {
	title: 'Componentes/SideMenu',
	component: SideMenu,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SideMenu>

/**
 * Drawer lateral esquerdo, aberto/fechado por estado local — mesmo padrão do
 * BottomSheet. Feche por Esc, clique no backdrop, ou no botão de fechar.
 */
export const Deslogado: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<div className="min-h-[80vh] p-8">
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary-600 px-4 py-2 font-body font-bold text-body-lg text-primary-600"
				>
					Abrir menu
				</button>

				<SideMenu open={open} onClose={() => setOpen(false)} />
			</div>
		)
	},
}

export const Logado: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<div className="min-h-[80vh] p-8">
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary-600 px-4 py-2 font-body font-bold text-body-lg text-primary-600"
				>
					Abrir menu
				</button>

				<SideMenu
					open={open}
					onClose={() => setOpen(false)}
					logged
					userName="Mariana Albuquerque"
					userInitials="MA"
				/>
			</div>
		)
	},
}
