import type { BrandIconName } from '~/components/icon/paths'

export interface FooterLink {
	label: string
	href: string
}

export interface FooterSocial {
	provider: BrandIconName
	href: string
	label: string
}

export interface IFooterDesktopProps {
	categories?: FooterLink[]
	legalLinks?: FooterLink[]
	socials?: FooterSocial[]
	copyright?: string
	description?: string
	className?: string
}
