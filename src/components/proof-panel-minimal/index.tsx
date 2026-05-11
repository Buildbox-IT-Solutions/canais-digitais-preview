import { twMerge } from 'tailwind-merge'
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
		sub: 'Do agronegócio à saúde, da logística ao varejo — acesse todos os onze portais editoriais da Informa Markets com o mesmo login.',
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
		sub: 'Sua conta está ativa em todos os 11 portais editoriais da Informa Markets com o mesmo login.',
	},
}

export function ProofPanelMinimal({ variant = 'login', className }: IProofPanelMinimalProps) {
	const v = VARIANTS[variant]

	return (
		<aside
			className={twMerge(
				'relative flex-1 flex flex-col items-start justify-center min-h-screen overflow-hidden p-20 text-white',
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

			<div className="relative flex flex-col gap-6 w-full max-w-[600px]">
				<h2
					className="font-display text-display-md tracking-tight animate-fade-up"
					style={{ animationDelay: '80ms' }}
				>
					{v.pre}
					<span className="font-bold text-secondary-500">{v.mark}</span>
					{v.post}
				</h2>
				<p
					className="font-body text-body-lg text-white/85 animate-fade-up"
					style={{ animationDelay: '180ms' }}
				>
					{v.sub}
				</p>
			</div>
		</aside>
	)
}
