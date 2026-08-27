export type ProfileBoxIcon = 'account-circle' | 'work' | 'location-on'

/**
 * Linha de preview do card. Texto puro segue a cor do card (ver `placeholder`);
 * a forma com `pending` marca campo a campo — o card pode ter valor preenchido e
 * campo pendente lado a lado, que é o normal depois do cadastro.
 */
export type ProfileBoxField = string | { label: string; pending: boolean }

export interface IProfileBoxProps {
	icon: ProfileBoxIcon
	title: string
	description: string
	fields: ProfileBoxField[]
	href?: string
	cta?: string
	incomplete?: boolean
	placeholder?: boolean
	chip?: string
	className?: string
}
