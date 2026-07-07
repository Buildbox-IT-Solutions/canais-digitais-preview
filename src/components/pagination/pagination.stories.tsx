import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from '.'

const meta: Meta<typeof Pagination> = {
	title: 'List Items/Pagination',
	component: Pagination,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

// Poucas páginas: mostra todas (sem reticências). A atual fica em contorno navy.
export const FirstPage: Story = { args: { current: 1, total: 5 } }
export const MiddlePage: Story = { args: { current: 3, total: 5 } }
export const LastPage: Story = { args: { current: 5, total: 5 } }

// Muitas páginas: truncamento com reticências (referência Atlassian).
export const TruncadoInicio: Story = {
	name: 'Truncado — início (1 2 3 4 … 99)',
	args: { current: 1, total: 99 },
}
export const TruncadoMeio: Story = {
	name: 'Truncado — meio (1 … 49 50 51 … 99)',
	args: { current: 50, total: 99 },
}
export const TruncadoFim: Story = {
	name: 'Truncado — fim (1 … 96 97 98 99)',
	args: { current: 99, total: 99 },
}

// A variante mobile (‹ "atual de total" ›) aparece abaixo de 1024px — reduza a
// viewport do preview para vê-la.
