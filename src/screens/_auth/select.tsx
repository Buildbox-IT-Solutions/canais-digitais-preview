import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'

interface IAuthSelectProps {
	label: string
	name: string
	options: readonly string[]
	placeholder?: string
	defaultValue?: string
	required?: boolean
	error?: string
	autoComplete?: string
	className?: string
}

/**
 * Select das telas de auth — mesmo desenho de rótulo, altura e estado de erro do
 * `AuthInput`, com chevron sobreposto ao `<select>` nativo (appearance-none).
 * Tokens: --color-neutral-100, --color-neutral-500, --color-neutral-950, --color-primary-600
 */
export function AuthSelect({
	label,
	name,
	options,
	placeholder = 'Selecione',
	defaultValue = '',
	required = false,
	error,
	autoComplete,
	className,
}: IAuthSelectProps) {
	return (
		<label className={twMerge('flex flex-col w-full', className)}>
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
					'relative flex items-center h-10 px-3 rounded-sm border bg-white transition-colors',
					error ? 'border-red-600' : 'border-neutral-100 focus-within:border-secondary-950',
				)}
			>
				<select
					name={name}
					required={required}
					defaultValue={defaultValue}
					autoComplete={autoComplete}
					aria-invalid={error ? true : undefined}
					// Placeholder em cinza, valor escolhido em primary-600. O estado vem do
					// próprio `:invalid` (obrigatório + opção vazia selecionada), então um
					// `defaultValue` já nasce com cor de valor preenchido — sem estado em JS.
					className="flex-1 appearance-none bg-transparent font-body text-body-lg text-primary-600 invalid:text-neutral-500 focus:outline-none pr-7"
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				{/* Mesmo chevron do `FormSelect` do DS — o select nativo fica com appearance-none. */}
				<Icon
					name="expand-more"
					className="size-4 absolute right-3 text-neutral-900 pointer-events-none"
				/>
			</div>
			{/* Ver `AuthInput`: erro só com espaços marca o campo sem repetir a mensagem. */}
			{error && error.trim() ? (
				<p className="mt-1.5 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
					<Icon name="error" className="size-3.5 shrink-0" />
					{error}
				</p>
			) : null}
		</label>
	)
}
