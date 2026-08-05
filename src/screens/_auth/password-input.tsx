import { useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'

interface IAuthPasswordInputProps {
	label: string
	name: string
	id?: string
	autoComplete?: string
	defaultValue?: string
	value?: string
	onChange?: (value: string) => void
	error?: string
	required?: boolean
}

export function AuthPasswordInput({
	label,
	name,
	id,
	autoComplete = 'current-password',
	defaultValue,
	value,
	onChange,
	error,
	required = true,
}: IAuthPasswordInputProps) {
	const [shown, setShown] = useState(false)

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
					type={shown ? 'text' : 'password'}
					name={name}
					id={id}
					autoComplete={autoComplete}
					required={required}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange ? (e) => onChange(e.target.value) : undefined}
					className="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none"
				/>
				<button
					type="button"
					aria-label={shown ? 'Ocultar senha' : 'Mostrar senha'}
					onClick={() => setShown((s) => !s)}
					className="inline-flex items-center justify-center size-7 -mr-1 text-neutral-500 hover:text-primary-600 transition-colors rounded-full"
				>
					<Icon name={shown ? 'visibility-off' : 'visibility'} className="size-4" />
				</button>
			</div>
			{error ? (
				<p className="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
					<Icon name="error" className="size-3.5 shrink-0" />
					{error}
				</p>
			) : null}
		</label>
	)
}
