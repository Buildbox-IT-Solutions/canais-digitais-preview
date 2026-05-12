interface IAuthErrorAlertProps {
	message: string
}

export function AuthErrorAlert({ message }: IAuthErrorAlertProps) {
	return (
		<div
			role="alert"
			className="flex gap-2.5 items-start px-3 py-2.5 rounded-sm border border-red-600/30 bg-red-600/10 text-red-600"
		>
			<svg className="size-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
			</svg>
			<div className="font-body font-semibold text-body-md">{message}</div>
		</div>
	)
}
