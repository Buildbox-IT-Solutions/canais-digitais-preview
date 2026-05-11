import { twMerge } from 'tailwind-merge'
import type { ICompletionCardProps } from './types'

/**
 * Componente: Completion Card
 * Card gamificado com gauge circular SVG + CTA.
 * Tokens: --color-primary-600, --color-primary-800, --color-coral, --color-neutral-50,
 *         --color-white
 */

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function CompletionCard({
	filled,
	total = 14,
	nextFields = [],
	href = '#',
	className,
}: ICompletionCardProps) {
	const totalSafe = Math.max(1, total)
	const filledSafe = Math.min(Math.max(0, filled), totalSafe)
	const pct = Math.round((filledSafe / totalSafe) * 100)
	const arcLength = (pct / 100) * CIRCUMFERENCE
	const remainingFields = totalSafe - filledSafe

	return (
		<div
			className={twMerge('relative overflow-hidden rounded-xl shadow-lg p-9 text-white', className)}
			style={{
				background:
					'linear-gradient(120deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
			}}
		>
			<div
				className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(255,84,124,.25), transparent 65%)',
					filter: 'blur(4px)',
				}}
			/>

			<div className="relative flex items-center gap-9 flex-wrap">
				<div className="relative size-32 shrink-0">
					<svg width={128} height={128} viewBox="0 0 124 124" aria-hidden="true">
						<circle cx={62} cy={62} r={RADIUS} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={8} />
						<circle
							cx={62}
							cy={62}
							r={RADIUS}
							fill="none"
							stroke="var(--color-coral)"
							strokeWidth={8}
							strokeLinecap="round"
							strokeDasharray={`${arcLength.toFixed(2)} 999`}
							transform="rotate(-90 62 62)"
							style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.2,0,0,1)' }}
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<div className="font-display font-bold text-display-sm text-white leading-none">
							{pct}
							<span className="text-body-lg text-white/60">%</span>
						</div>
						<div className="font-body font-semibold text-label-sm uppercase tracking-wider text-white/60 mt-1">
							{filledSafe}/{totalSafe}
						</div>
					</div>
				</div>

				<div className="flex-1 min-w-[260px] flex flex-col gap-3">
					<span className="inline-flex w-fit items-center rounded-xs bg-coral text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
						Complete seu perfil
					</span>
					<h3 className="font-display font-bold text-headline-md text-white leading-tight">
						{remainingFields > 0 ? (
							<>
								Faltam {remainingFields} campos para 100%<span className="text-coral">.</span>
							</>
						) : (
							<>
								Perfil 100% completo<span className="text-coral">.</span>
							</>
						)}
					</h3>
					{remainingFields > 0 && nextFields.length > 0 ? (
						<p className="font-body text-body-md text-white/75 max-w-md">
							Próximos campos:{' '}
							<strong className="text-white font-bold">
								{nextFields.slice(0, 3).join(', ')}
							</strong>
							. Perfis completos recebem indicações mais precisas e destaque nos nossos eventos.
						</p>
					) : (
						<p className="font-body text-body-md text-white/75 max-w-md">
							Você tem acesso às recomendações mais precisas e ao destaque nos nossos eventos.
						</p>
					)}
					<div className="mt-2">
						<a
							href={href}
							className="inline-flex items-center justify-center gap-2 h-10 pl-5 pr-4 rounded-full bg-white text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors"
						>
							{remainingFields > 0 ? 'Completar agora' : 'Revisar perfil'}
							<svg
								className="size-6"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<path d="M5 12h14M13 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
