import { Skeleton } from '~/components/skeleton'

/** Mesma métrica do DownloadItem real (icon tile 48x48, título, meta, botão) — senão o loading mente sobre a altura. */
export function DownloadItemSkeleton({ isLast = false }: { isLast?: boolean }) {
	return (
		<div className={!isLast ? 'border-b border-neutral-100 px-1' : 'px-1'}>
			<div className="flex flex-col lg:flex-row lg:items-start gap-4 py-4">
				<Skeleton className="size-12 rounded-lg shrink-0" />

				<div className="flex-1 min-w-0 flex flex-col gap-2">
					<Skeleton className="h-6 w-full max-w-[26rem]" />
					<Skeleton className="h-5 w-32" />
				</div>

				<Skeleton className="h-10 w-full lg:w-28 rounded-full shrink-0" />
			</div>
		</div>
	)
}
