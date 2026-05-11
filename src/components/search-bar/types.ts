export interface ISearchBarProps {
	placeholder?: string
	expanded?: boolean
	value?: string
	onChange?: (value: string) => void
	onClear?: () => void
	className?: string
}
