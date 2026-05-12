export type SearchBarState = 'compact' | 'opened'

export interface ISearchBarProps {
	placeholder?: string
	state?: SearchBarState
	value?: string
	onChange?: (value: string) => void
	onClear?: () => void
	className?: string
}
