export type NewsletterState = 'idle' | 'pending' | 'subscribed'

export interface INewsletterCardProps {
	id: string
	title: string
	description: string
	state?: NewsletterState
	onSubscribe?: () => void
	className?: string
}
