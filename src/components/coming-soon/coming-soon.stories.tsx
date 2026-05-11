import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComingSoon } from '.'

const meta: Meta<typeof ComingSoon> = {
	title: 'Dashboard/ComingSoon',
	component: ComingSoon,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ComingSoon>

export const Biblioteca: Story = {
	args: {
		chip: 'Biblioteca premium',
		icon: 'book',
		title: 'Biblioteca em breve',
		description: 'Estamos finalizando a curadoria de whitepapers e e-books exclusivos para você.',
	},
}

export const Favoritos: Story = {
	args: {
		chip: 'Favoritos premium',
		icon: 'bookmark',
		title: 'Favoritos em breve',
		description: 'Em breve você poderá salvar artigos para ler depois.',
	},
}
