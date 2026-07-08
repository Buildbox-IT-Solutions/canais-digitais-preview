export interface ISideMenuProps {
	open: boolean
	onClose: () => void
	logged?: boolean
	userName?: string
	userInitials?: string
	userAvatar?: string | null
	className?: string
}
