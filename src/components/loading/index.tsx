import { twMerge } from 'tailwind-merge'
import type { ILoadingProps } from './types'
import LoadingIcon from '~/assets/icons/loading.svg'

export function Loading({ className }: ILoadingProps) {
	return (
		<div
			className={twMerge(
				'flex aspect-square h-8 w-8 items-center justify-center text-white',
				className,
			)}
		>
			<LoadingIcon className="h-full w-full animate-spin" />
		</div>
	)
}
