import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecentNewsItem } from '.'

const meta: Meta<typeof RecentNewsItem> = {
	title: 'List Items/RecentNewsItem',
	component: RecentNewsItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof RecentNewsItem>

export const Default: Story = {
	args: {
		category: 'Proteína Animal',
		title: 'Como fazer o transporte de pescados frescos corretamente',
		when: 'há poucos segundos',
	},
}
