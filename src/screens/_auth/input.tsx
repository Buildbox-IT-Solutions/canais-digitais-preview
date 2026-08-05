import type { InputHTMLAttributes } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'

interface IAuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> {
	label: string
	error?: string
	type?: 'text' | 'email' | 'tel'
	required?: boolean
	helperLink?: { label: string; href: string }
}

export function AuthInput({
	label,
	error,
	type = 'text',
	required = false,
	helperLink,
	...inputProps
}: IAuthInputProps) {
	return (
		<label className="flex flex-col w-full">
			<span
				className={twMerge(
					'flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg',
					error ? 'text-red-600' : 'text-neutral-950',
				)}
			>
				{label}
				{required ? <span aria-hidden="true">*</span> : null}
			</span>
			<div
				className={twMerge(
					'flex items-center h-10 px-3 rounded-sm border bg-white transition-colors',
					error ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950',
				)}
			>
				<input
					type={type}
					required={required}
					{...inputProps}
					className="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none"
				/>
			</div>
			{error ? (
				<p className="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
					<Icon name="error" className="size-3.5 shrink-0" />
					{error}
					{helperLink ? (
						<a
							href={helperLink.href}
							className="font-bold text-secondary-950 underline hover:no-underline ml-1"
						>
							{helperLink.label}
						</a>
					) : null}
				</p>
			) : null}
		</label>
	)
}
