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

export const FirstPage: Story = { args: { current: 1, total: 5 } }
export const MiddlePage: Story = { args: { current: 3, total: 5 } }
export const LastPage: Story = { args: { current: 5, total: 5 } }
