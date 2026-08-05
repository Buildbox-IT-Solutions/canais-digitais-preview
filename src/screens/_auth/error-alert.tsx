import { Icon } from '~/components/icon'

interface IAuthErrorAlertProps {
	message: string
}

export function AuthErrorAlert({ message }: IAuthErrorAlertProps) {
	return (
		<div
			role="alert"
			className="flex gap-2.5 items-start px-3 py-2.5 rounded-sm border border-red-600/30 bg-red-600/10 text-red-600"
		>
			<Icon name="error" className="size-5 shrink-0 mt-0.5" />
			<div className="font-body font-semibold text-body-md">{message}</div>
		</div>
	)
}
