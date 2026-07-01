import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewsCard } from './index'

const meta: Meta<typeof NewsCard> = {
	title: 'Cards/NewsCard',
	component: NewsCard,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof NewsCard>

const base = {
	title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
	image: 'https://picsum.photos/seed/news/600/338',
	href: '#',
	categoria: { label: 'Food Service', color: 'mint' as const, href: '#' },
	lead: 'Parágrafo de apoio que resume a matéria em uma ou duas linhas.',
	author: 'Ana Autora',
	authorHref: '#',
}

export const LargeVertical: Story = { args: { ...base, size: 'large', orientation: 'vertical' } }
export const MediumVertical: Story = { args: { ...base, size: 'medium', orientation: 'vertical' } }
export const SmallVertical: Story = { args: { ...base, size: 'small', orientation: 'vertical' } }
export const LargeHorizontal: Story = { args: { ...base, size: 'large', orientation: 'horizontal' } }
export const MediumHorizontal: Story = { args: { ...base, size: 'medium', orientation: 'horizontal', lead: undefined } }
export const SmallHorizontal: Story = { args: { ...base, size: 'small', orientation: 'horizontal', lead: undefined, author: undefined } }
export const SemCategoria: Story = { args: { ...base, categoria: undefined } }
export const SoHeadline: Story = { args: { ...base, categoria: undefined, lead: undefined, author: undefined } }
