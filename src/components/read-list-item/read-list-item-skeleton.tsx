import { Divider } from '~/components/divider'
import { Skeleton } from '~/components/skeleton'

/** Mesma métrica do ReadListItem real nas duas colunas — senão o loading mente sobre a altura. */
export function ReadListItemSkeleton({ isLast = false }: { isLast?: boolean }) {
	return (
		<li className="list-none">
			<div className="flex flex-col gap-3 py-4 md:hidden">
				<Skeleton className="aspect-video w-full" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-3 w-20" />
					<Skeleton className="h-4 w-full max-w-[26rem]" />
					<Skeleton className="h-4 w-2/3 max-w-[16rem]" />
				</div>
				<div className="flex items-center justify-between">
					<Skeleton className="h-3.5 w-16" />
					<Skeleton className="size-10 rounded-full" />
				</div>
			</div>

			<div className="hidden items-start gap-4 py-4 md:flex">
				<Skeleton className="aspect-video w-[208px] shrink-0" />
				<div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5">
					<Skeleton className="h-3 w-20" />
					<Skeleton className="h-4 w-full max-w-[26rem]" />
					<Skeleton className="h-4 w-2/3 max-w-[16rem]" />
					<Skeleton className="h-3.5 w-16" />
				</div>
				<div className="w-10 shrink-0" />
			</div>

			{!isLast ? <Divider /> : null}
		</li>
	)
}
