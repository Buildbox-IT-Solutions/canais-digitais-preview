import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { ISearchBarProps } from './types'

/**
 * Componente: Search Bar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1776-19053
 * Variantes: default | expanded (com botão de clear)
 * Tokens: --color-neutral-100, --color-neutral-900, --color-primary-600, --color-secondary-950, --color-white
 */
export function SearchBar({
	placeholder = 'Buscar',
	expanded = false,
	value,
	onChange,
	onClear,
	className,
}: ISearchBarProps) {
	const hasValue = Boolean(value)

	return (
		<div className={twMerge('relative w-full', className)}>
			<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-900">
				<Icon name="search" className="size-6" />
			</div>
			<input
				type="search"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				className="w-full h-10 pl-10 pr-3 rounded-full border border-neutral-100 bg-white text-body-lg font-body text-primary-600 placeholder:text-neutral-900 focus:outline-none focus:border-secondary-950 transition-colors"
			/>
			{expanded && hasValue ? (
				<button
					type="button"
					aria-label="Limpar busca"
					onClick={onClear}
					className="absolute inset-y-0 right-1 flex items-center justify-center p-2 text-neutral-900 hover:text-primary-600"
				>
					<Icon name="close" className="size-4" />
				</button>
			) : null}
		</div>
	)
}
