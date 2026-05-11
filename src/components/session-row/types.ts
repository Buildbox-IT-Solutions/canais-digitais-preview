export interface ISessionRowProps {
	device: string
	browser: string
	location: string
	last: string
	current?: boolean
	isLast?: boolean
	onTerminate?: () => void
	className?: string
}
