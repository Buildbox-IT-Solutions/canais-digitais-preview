import { twMerge } from 'tailwind-merge'

export interface DevNavRow {
	paramName: string
	label: string
	options: string[]
	current: string
	extraQuery?: string
}

type IAuthDevNavProps = DevNavRow | { rows: DevNavRow[] }

function DevNavRowEl({ paramName, label, options, current, extraQuery = '' }: DevNavRow) {
	return (
		<div className="flex flex-wrap gap-1.5 justify-center">
			<span className="text-neutral-500 self-center pr-1">{label}:</span>
			{options.map((opt) => {
				const href = `?${paramName}=${opt}${extraQuery}`
				return (
					<a
						key={opt}
						href={href}
						className={twMerge(
							'px-2.5 py-1 rounded-full transition-colors',
							opt === current
								? 'bg-primary-600 text-white'
								: 'text-neutral-700 hover:bg-neutral-50',
						)}
					>
						{opt}
					</a>
				)
			})}
		</div>
	)
}

/**
 * Floating dev navigator at the bottom of auth screens.
 * Single row (pass DevNavRow props directly) or multiple rows (pass `{ rows }`).
 */
export function AuthDevNav(props: IAuthDevNavProps) {
	if ('rows' in props) {
		return (
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 items-center bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-2xl px-4 py-2 shadow-md z-50 font-body text-label-md">
				{props.rows.map((r) => (
					<DevNavRowEl key={r.paramName + r.label} {...r} />
				))}
			</div>
		)
	}

	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full px-3 py-1.5 shadow-md z-50 font-body text-label-md">
			<DevNavRowEl {...props} />
		</div>
	)
}
