import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import { ProofPanel } from '~/components/proof-panel'
import type { IAuthShellProps } from './types'

/**
 * Componente: Auth Shell — wrapper 2 colunas para Login/Cadastro
 * Coluna esquerda: header (logo + voltar) + slot central + footer legal.
 * Coluna direita: proof-panel (default) ou customizado via `proofPanel`.
 * Tokens: --color-primary-600, --color-neutral-500, --color-neutral-700, --color-white, --color-coral
 */
export function AuthShell({
	children,
	mode = 'login',
	narrow = false,
	hideProof = false,
	proofPanel,
	className,
}: IAuthShellProps) {
	const maxWidth = narrow ? 'max-w-[380px]' : 'max-w-[440px]'
	const gridCols = hideProof ? '1fr' : 'minmax(520px,1fr) minmax(520px,1.05fr)'

	return (
		<div
			className={twMerge('grid min-h-screen bg-white', className)}
			style={{ gridTemplateColumns: gridCols }}
		>
			<div className="flex flex-col min-h-screen">
				<div className="flex items-center justify-between px-12 py-8">
					<a
						href="#"
						className="font-display font-bold text-title-xl text-primary-600 tracking-tight"
					>
						canaisdigitais<span className="text-coral">.</span>
					</a>
					<a
						href="#"
						className="inline-flex items-center gap-1.5 font-body font-bold text-label-lg uppercase tracking-wider text-neutral-700 hover:text-primary-600 transition-colors"
					>
						<Icon name="arrow-left" className="size-4" />
						Voltar ao portal
					</a>
				</div>

				<div className="flex-1 flex items-center justify-center px-12 pb-12">
					<div className={twMerge('w-full', maxWidth)}>{children}</div>
				</div>

				<div className="flex items-center justify-between px-12 py-5 font-body text-body-sm text-neutral-500">
					<div className="inline-flex items-center gap-2 font-body font-bold text-label-sm uppercase tracking-wider">
						<span className="font-normal">Uma publicação</span>
						<span className="font-display text-title-sm">Informa Markets</span>
					</div>
					<div className="flex items-center gap-5">
						<a href="#" className="hover:text-primary-600 transition-colors">Termos</a>
						<a href="#" className="hover:text-primary-600 transition-colors">Privacidade</a>
						<a href="#" className="hover:text-primary-600 transition-colors">Ajuda</a>
					</div>
				</div>
			</div>

			{!hideProof ? proofPanel ?? <ProofPanel mode={mode} /> : null}
		</div>
	)
}
