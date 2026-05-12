import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { IProofPanelProps } from './types'

/**
 * Componente: Proof Panel — coluna direita das telas de Login/Cadastro v1
 * Slide fixo: BIBLIOTECA (whitepapers + e-books).
 * Tokens: --color-primary-600, --color-coral, --color-mint, --color-secondary-500, --color-white
 */

const CARDS = [
	{ type: 'Whitepaper', title: 'Estado do varejo 2026', accent: 'mint' as const },
	{ type: 'Relatório', title: 'ESG no B2B — pesquisa', accent: 'secondary' as const },
	{ type: 'Guia', title: 'Embalagens inteligentes', accent: 'coral' as const },
]

const PEOPLE = ['AS', 'LP', 'MR', 'RC']

const ACCENT_CLASSES = {
	mint: { stripe: 'bg-mint', text: 'text-mint' },
	secondary: { stripe: 'bg-secondary-500', text: 'text-secondary-500' },
	coral: { stripe: 'bg-coral', text: 'text-coral' },
} as const

export function ProofPanel({ mode = 'login', className }: IProofPanelProps) {
	const topLabel =
		mode === 'signup' ? 'Ao criar sua conta, você desbloqueia' : 'Bem-vindo de volta'

	return (
		<aside
			className={twMerge(
				'relative overflow-hidden bg-primary-600 text-white flex flex-col min-h-screen px-14 py-12 gap-10',
				className,
			)}
		>
			<div
				className="pointer-events-none absolute -left-44 -bottom-44 size-[480px] rounded-full"
				style={{
					background: 'radial-gradient(circle at center, rgba(255,84,124,.30), transparent 65%)',
					filter: 'blur(10px)',
				}}
			/>
			<div
				className="pointer-events-none absolute -right-48 -top-32 size-[500px] rounded-full"
				style={{
					background: 'radial-gradient(circle at center, rgba(0,120,110,.22), transparent 60%)',
					filter: 'blur(6px)',
				}}
			/>

			<div className="relative z-10 flex items-center justify-between">
				<span className="font-display font-bold text-title-xl tracking-tight">
					canaisdigitais<span className="text-coral">.</span>
				</span>
				<div className="flex items-center gap-2 font-body text-label-sm uppercase tracking-wider text-white/70">
					<span>Uma publicação</span>
					<span className="font-display font-bold text-title-sm">Informa Markets</span>
				</div>
			</div>

			<div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
				<div className="font-body font-semibold text-label-md uppercase tracking-wider text-white/55">
					{topLabel}
				</div>

				<div className="flex flex-col gap-6">
					<span className="inline-flex w-fit items-center rounded-xs bg-mint text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
						Biblioteca
					</span>

					<h2 className="font-display font-bold text-display-sm leading-tight tracking-tight max-w-xl">
						Whitepapers e e-books sem preencher formulário de novo
						<span className="text-coral">.</span>
					</h2>

					<p className="font-body text-body-lg text-white/80 max-w-md">
						Baixe estudos, relatórios e guias da Informa Markets com um clique. Os materiais
						baixados ficam salvos no seu perfil e disponíveis mesmo offline.
					</p>

					<div className="grid grid-cols-3 gap-3 max-w-xl mt-2">
						{CARDS.map((c) => {
							const accent = ACCENT_CLASSES[c.accent]
							return (
								<div
									key={c.title}
									className="flex flex-col gap-2.5 p-3.5 rounded-lg bg-white/[0.08] border border-white/10"
								>
									<div className={twMerge('h-[3px] w-7 rounded-full', accent.stripe)} />
									<div className="font-body font-bold text-label-sm uppercase tracking-wider text-white/60">
										{c.type}
									</div>
									<div className="font-display font-bold text-title-sm leading-tight text-white min-h-[2.4em]">
										{c.title}
									</div>
									<div
										className={twMerge(
											'mt-auto inline-flex items-center gap-1.5 font-body font-bold text-label-sm uppercase tracking-wider',
											accent.text,
										)}
									>
										<Icon name="download" className="size-3.5" />
										Baixar
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			<div className="relative z-10 border-t border-white/15 pt-6 flex items-center gap-5 flex-wrap">
				<div className="flex items-center">
					{PEOPLE.map((initials, i) => (
						<span
							key={initials}
							className={twMerge(
								'inline-flex items-center justify-center size-9 rounded-full border-2 border-primary-600 bg-gradient-to-br from-secondary-500 to-coral font-display font-bold text-label-sm text-white',
								i > 0 && '-ml-2.5',
							)}
						>
							{initials}
						</span>
					))}
				</div>
				<p className="font-body text-body-md text-white/75 flex-1 min-w-[240px]">
					<strong className="text-white font-bold">+38.000 profissionais B2B</strong> já leem os
					Canais Digitais logados.
				</p>
			</div>
		</aside>
	)
}
