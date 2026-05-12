import { Icon } from '~/components/icon'

interface IAuthBackLinkProps {
	href: string
	label: string
}

export function AuthBackLink({ href, label }: IAuthBackLinkProps) {
	return (
		<a
			href={href}
			className="inline-flex items-center gap-2 -ml-3 px-3 py-2.5 rounded-full font-body font-bold text-label-lg text-primary-600 hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
		>
			<Icon name="arrow-left" className="size-5" />
			{label}
		</a>
	)
}
