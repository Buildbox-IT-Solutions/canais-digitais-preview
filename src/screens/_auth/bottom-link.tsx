interface IAuthBottomLinkProps {
	label: string
	linkLabel: string
	linkHref: string
}

export function AuthBottomLink({ label, linkLabel, linkHref }: IAuthBottomLinkProps) {
	return (
		<div className="flex justify-center items-center gap-1 w-full font-body text-body-md">
			<span className="text-neutral-700">{label}</span>
			<a href={linkHref} className="font-bold text-secondary-950 hover:underline">
				{linkLabel}
			</a>
		</div>
	)
}
