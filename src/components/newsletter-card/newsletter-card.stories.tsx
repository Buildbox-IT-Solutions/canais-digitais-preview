import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewsletterCard } from '.'

const meta: Meta<typeof NewsletterCard> = {
	title: 'Cards/NewsletterCard',
	component: NewsletterCard,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: {
		id: 'nl-food-connection',
		title: 'Food Connection',
		description:
			'O canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service.',
	},
	decorators: [(Story) => <div className="w-[344px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof NewsletterCard>

export const Idle: Story = { args: { state: 'idle' } }
export const Pending: Story = { args: { state: 'pending' } }
export const Subscribed: Story = { args: { state: 'subscribed' } }
export const Error: Story = { args: { state: 'error' } }
