import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { IconTile } from '~/components/icon-tile'
import type { IconName } from '~/components/icon/paths'
import type { ISessionRowProps } from './types'

/**
 * Componente: Session Row
 * Linha de sessão ativa para "Conta & segurança".
 * Tokens: --color-primary-600, --color-neutral-100, --color-neutral-600
 */

function pickIcon(device: string): IconName {
	const lower = device.toLowerCase()
	if (lower.includes('iphone') || lower.includes('android')) return 'smartphone'
	if (lower.includes('mac') || lower.includes('book')) return 'laptop'
	return 'desktop'
}

export function SessionRow({
	device,
	browser,
	location,
	last,
	current = false,
	isLast = false,
	onTerminate,
	className,
}: ISessionRowProps) {
	return (
		<div
			className={twMerge(
				'flex items-center gap-4 px-1 py-4',
				!isLast && 'border-b border-neutral-100',
				className,
			)}
		>
			<IconTile icon={pickIcon(device)} tone="neutral" />
			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<div className="flex items-center gap-2 flex-wrap">
					<span className="font-body font-bold text-label-lg text-primary-600">{device}</span>
					{current ? <Badge label="Este dispositivo" tone="mint" /> : null}
				</div>
				<div className="font-body font-semibold text-label-md text-neutral-600">
					{browser} · {location} · {last}
				</div>
			</div>
			{!current ? (
				<button
					type="button"
					onClick={onTerminate}
					className="font-body font-bold text-label-lg text-red-700 hover:underline shrink-0"
				>
					Encerrar
				</button>
			) : null}
		</div>
	)
}
