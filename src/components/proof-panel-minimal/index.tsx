import { twMerge } from '~/lib/tw-merge'
import type { IProofPanelMinimalProps, ProofPanelMinimalVariant } from './types'

/**
 * Componente: Proof Panel Minimal — coluna direita das telas de Login/Cadastro v3
 * Figma: 6271:20270
 * Gradient navy → ultramarine + headline display-md com palavra-chave + subtítulo.
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950
 */

const VARIANTS: Record<
	ProofPanelMinimalVariant,
	{ pre: string; mark: string; post: string; sub: string }
> = {
	login: {
		pre: 'Inteligência editorial para quem ',
		mark: 'move',
		post: ' indústrias.',
		sub: 'Do agronegócio à saúde, da logística ao varejo — dados, análises e materiais exclusivos do seu setor.',
	},
	'signup-1': {
		pre: 'Criar uma conta é ',
		mark: 'gratuito',
		post: ' — e continua sendo.',
		sub: 'Sem assinatura, sem cartão de crédito. Seu acesso aos materiais exclusivos não tem custo algum, agora nem depois.',
	},
	'signup-2': {
		pre: 'Conteúdo selecionado para o ',
		mark: 'seu setor',
		post: ', não para todo mundo.',
		sub: 'Com base no seu perfil e histórico de leitura, o portal entrega os artigos, dados e tendências que realmente importam para a sua área.',
	},
	'signup-3': {
		pre: 'Baixe qualquer ',
		mark: 'material exclusivo',
		post: ' sem preencher formulário.',
		sub: 'Whitepapers, e-books e relatórios exclusivos com um clique.',
	},
	welcome: {
		pre: 'Bem-vindo aos ',
		mark: 'Canais Digitais',
		post: '.',
		sub: 'Sua conta está ativa. Acesse materiais, relatórios e análises exclusivas do seu setor.',
	},
	'confirm-waiting': {
		pre: 'Seu acesso está a ',
		mark: 'um clique',
		post: '.',
		sub: 'Assim que confirmar, você entra direto. Sem mais etapas, sem formulários.',
	},
	'confirm-welcome': {
		pre: '',
		mark: 'Bem-vindo!',
		post: '\nSua conta está ativa.',
		sub: 'E-books, relatórios e análises exclusivas do seu setor.',
	},
}

const SIZE = {
	sm: { root: 'p-8', text: 'gap-4 max-w-none', heading: 'text-headline-md', sub: 'text-body-md text-white/90' },
	md: { root: 'p-16', text: 'gap-4 max-w-[600px]', heading: 'text-display-sm', sub: 'text-body-lg text-white/85' },
	lg: { root: 'flex-1 min-h-screen p-20', text: 'gap-6 max-w-[600px]', heading: 'text-display-md', sub: 'text-body-lg text-white/85' },
} as const

export function ProofPanelMinimal({
	variant = 'login',
	size = 'lg',
	className,
}: IProofPanelMinimalProps) {
	const v = VARIANTS[variant]
	const s = SIZE[size]

	return (
		<aside
			className={twMerge(
				'relative flex flex-col items-start justify-center overflow-hidden text-white',
				s.root,
				className,
			)}
		>
			<div aria-hidden="true" className="absolute inset-0 pointer-events-none">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							'linear-gradient(78deg, var(--color-primary-600) 0%, var(--color-secondary-950) 75%)',
					}}
				/>
				<img
					alt=""
					loading="lazy"
					src="https://informa.bynder.com/m/2f02df42ea5f4b58/original/Informa_Guidelines_BlueScape_Overview-png.png?_ts=1777503160376"
					className="absolute inset-0 w-full h-full object-cover opacity-50"
				/>
			</div>

			<div className={twMerge('relative flex flex-col w-full', s.text)}>
				<h2
					className={twMerge(
						'font-display tracking-tight whitespace-pre-line animate-fade-up',
						s.heading,
					)}
					style={{ animationDelay: '80ms' }}
				>
					{v.pre}
					<span className="font-bold text-secondary-500">{v.mark}</span>
					{v.post}
				</h2>
				<p
					className={twMerge('font-body animate-fade-up', s.sub)}
					style={{ animationDelay: '180ms' }}
				>
					{v.sub}
				</p>
			</div>
		</aside>
	)
}
