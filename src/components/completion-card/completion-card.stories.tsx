import type { Meta, StoryObj } from '@storybook/react-vite'
import { CompletionCard } from '.'

const meta: Meta<typeof CompletionCard> = {
	title: 'Dashboard/CompletionCard',
	component: CompletionCard,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof CompletionCard>

export const Partial: Story = {
	args: { filled: 7, total: 14, nextFields: ['CPF / CNPJ', 'País', 'Estado'] },
}
export const Almost: Story = {
	args: { filled: 12, total: 14, nextFields: ['Cargo', 'Setor'] },
}
export const Complete: Story = { args: { filled: 14, total: 14 } }
