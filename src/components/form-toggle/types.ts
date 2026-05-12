export interface IFormToggleProps {
	id: string
	label: string
	hint?: string
	checked?: boolean
	disabled?: boolean
	onChange?: (checked: boolean) => void
	className?: string
}
