import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewsletterItem } from '.'

const meta: Meta<typeof NewsletterItem> = {
	title: 'List Items/NewsletterItem',
	component: NewsletterItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
	args: {
		id: 'nl-food-connection',
		title: 'Food Connection',
		desc: 'Canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia e mais.',
	},
}

export default meta
type Story = StoryObj<typeof NewsletterItem>

export const Off: Story = { args: { checked: false } }
export const On: Story = { args: { checked: true } }
