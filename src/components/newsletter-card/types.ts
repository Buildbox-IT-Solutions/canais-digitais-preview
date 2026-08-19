export type NewsletterState = 'idle' | 'pending' | 'subscribed' | 'error'

export interface INewsletterCardProps {
	id: string
	title: string
	description: string
	state?: NewsletterState
	onSubscribe?: () => void
	className?: string
}
