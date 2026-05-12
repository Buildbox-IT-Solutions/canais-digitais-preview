export interface INewsletterItemProps {
	id: string
	title: string
	desc?: string
	checked?: boolean
	isLast?: boolean
	onChange?: (checked: boolean) => void
	className?: string
}
