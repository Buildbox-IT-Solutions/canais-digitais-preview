import { Link } from 'react-router'

/**
 * Tela: Central de navegação do protótipo
 * Não é uma tela do produto — serve apenas para listar e abrir todas as rotas
 * disponíveis no preview, agrupadas por contexto.
 */

interface RouteItem {
	path: string
	label: string
	description?: string
}

interface RouteGroup {
	title: string
	description: string
	color: 'primary' | 'mint' | 'coral' | 'neutral' | 'secondary'
	items: RouteItem[]
}

const GROUPS: RouteGroup[] = [
	{
		title: 'Acesso & Autenticação',
		description: 'Fluxos de entrada — na ordem do mapa: cadastro → login → recuperação → download.',
		color: 'secondary',
		items: [
			{ path: '/cadastro', label: 'Cadastro', description: 'Início · modal em 3 passos → termina na Confirmação de e-mail' },
			{ path: '/confirmacao-email', label: 'Confirmação de e-mail', description: 'Fim do cadastro · verificação do e-mail' },
			{ path: '/login', label: 'Login', description: 'Modal de login sobre o portal' },
			{ path: '/recupera-senha', label: 'Recuperar senha', description: 'Início · informa e-mail → link enviado' },
			{ path: '/redefine-senha', label: 'Redefinir senha', description: 'Fim · define nova senha pelo link' },
			{ path: '/gate-download', label: 'Gate de download', description: 'Cadastro acionado pelo clique em Download' },
		],
	},
	{
		title: 'Perfil & LGPD',
		description: 'Área logada do usuário e gestão de dados pessoais.',
		color: 'mint',
		items: [
			{ path: '/dashboard-perfil-v4', label: 'Perfil', description: 'Área logada · Meu Perfil + Downloads' },
			{ path: '/consentimentos', label: 'Consentimentos (LGPD)', description: 'Gestão de consentimentos' },
			{ path: '/meus-dados', label: 'Baixar dados', description: 'LGPD · modal de ação direta sobre o Perfil' },
			{ path: '/excluir-conta', label: 'Excluir conta', description: 'Modal de ação direta · 30 dias para cancelar' },
		],
	},
	{
		title: 'Editorial (templates)',
		description: 'Telas públicas de leitura e navegação — templates válidos mantidos.',
		color: 'primary',
		items: [
			{ path: '/home', label: 'Home', description: 'Página inicial — capa editorial completa' },
			{ path: '/categoria', label: 'Categoria', description: 'Listagem de conteúdos por categoria' },
			{ path: '/conteudo', label: 'Conteúdo', description: 'Página interna de matéria (Post)' },
			{ path: '/buscar', label: 'Buscar', description: 'Resultados de busca' },
			{ path: '/menu', label: 'Menu', description: 'Menu principal expandido' },
		],
	},
	{
		title: 'Institucionais & Forms',
		description: 'Páginas estáticas e formulários.',
		color: 'coral',
		items: [
			{ path: '/sobre', label: 'Sobre' },
			{ path: '/contato', label: 'Contato' },
			{ path: '/anuncie', label: 'Anuncie' },
		],
	},
	{
		title: 'E-mails',
		description: 'Templates de e-mail transacional (preview).',
		color: 'secondary',
		items: [
			{ path: '/email-confirmacao', label: 'Confirmação de e-mail', description: 'Pós-cadastro · ativar conta' },
			{ path: '/email-boas-vindas', label: 'Boas-vindas', description: 'Pós-confirmação · conta ativada' },
			{ path: '/email-recuperacao-senha', label: 'Recuperação de senha', description: 'Link de redefinição de senha' },
			{ path: '/email-exclusao-conta', label: 'Exclusão de conta', description: 'Confirmação · 30 dias p/ cancelar' },
		],
	},
	{
		title: 'Sistema',
		description: 'Páginas de exceção e fallback.',
		color: 'neutral',
		items: [
			{
				path: '/_rota-inexistente',
				label: '404 — Página não encontrada',
				description: 'Catch-all: qualquer rota não mapeada cai aqui',
			},
		],
	},
]

const COLOR_STYLES: Record<RouteGroup['color'], { dot: string; badge: string; hover: string }> = {
	primary: {
		dot: 'bg-primary-600',
		badge: 'bg-primary-100 text-primary-600',
		hover: 'hover:border-primary-600 hover:text-primary-600',
	},
	secondary: {
		dot: 'bg-secondary-950',
		badge: 'bg-secondary-50 text-secondary-950',
		hover: 'hover:border-secondary-950 hover:text-secondary-950',
	},
	mint: {
		dot: 'bg-mint',
		badge: 'bg-neutral-50 text-mint',
		hover: 'hover:border-mint hover:text-mint',
	},
	coral: {
		dot: 'bg-coral',
		badge: 'bg-neutral-50 text-coral',
		hover: 'hover:border-coral hover:text-coral',
	},
	neutral: {
		dot: 'bg-neutral-500',
		badge: 'bg-neutral-50 text-neutral-700',
		hover: 'hover:border-neutral-700 hover:text-neutral-900',
	},
}

const TOTAL_ROUTES = GROUPS.reduce((sum, g) => sum + g.items.length, 0)

export default function CentralScreen() {
	return (
		<main className="min-h-screen bg-neutral-50">
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-16">
				<header className="flex flex-col gap-4 pb-12 border-b border-neutral-100">
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center gap-2 bg-white border border-neutral-100 rounded-full px-3 py-1 font-body font-semibold text-label-sm text-neutral-700">
							<span className="size-2 rounded-full bg-primary-600" />
							Protótipo · Design as Code
						</span>
						{import.meta.env.PROD && (
							<a
								href="/storybook/index.html"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 bg-[#FF4785] text-white rounded-lg px-4 py-2 font-body font-semibold text-label-md hover:bg-[#e03070] transition-colors shadow-sm"
							>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
									<path d="M1.17 0 .04 12.597l6.96 1.403 6.96-1.403L12.83 0H1.17Z" fill="currentColor" opacity=".15"/>
									<path d="M7 10.977 2.773 9.894l-.287-3.21h1.8l.146 1.633L7 9.08l2.568-.764.34-3.8H3.47l-.176-1.97h7.411l-.587 6.572L7 10.977Z" fill="currentColor"/>
								</svg>
								Storybook →
							</a>
						)}
					</div>
					<h1 className="font-display font-bold text-display-md text-primary-600">
						Canais Digitais — Central de navegação
					</h1>
					<p className="font-body text-body-lg text-neutral-900 max-w-2xl">
						Esta página lista todas as <strong>{TOTAL_ROUTES} rotas</strong> disponíveis no preview,
						agrupadas por contexto. Clique em qualquer card para abrir a tela. A home do produto
						vive em <code className="bg-white border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">/home</code>.
					</p>
				</header>

				<div className="flex flex-col gap-12 pt-12">
					{GROUPS.map((group) => {
						const colors = COLOR_STYLES[group.color]
						return (
							<section key={group.title} className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-3">
										<span className={`size-2 rounded-full ${colors.dot}`} />
										<h2 className="font-display font-bold text-headline-sm text-primary-600">
											{group.title}
										</h2>
										<span className={`font-body font-semibold text-label-sm rounded-full px-2 py-0.5 ${colors.badge}`}>
											{group.items.length}
										</span>
									</div>
									<p className="font-body text-body-md text-neutral-700">{group.description}</p>
								</div>

								<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
									{group.items.map((item) => (
										<li key={item.path}>
											<Link
												to={item.path}
												className={`group flex flex-col gap-1 bg-white border border-neutral-100 rounded-lg p-4 transition-colors h-full ${colors.hover}`}
											>
												<div className="flex items-center justify-between gap-2">
													<span className="font-display font-bold text-title-md text-primary-600 group-hover:text-current transition-colors">
														{item.label}
													</span>
													<span
														aria-hidden="true"
														className="font-body text-label-md text-neutral-500 group-hover:translate-x-0.5 transition-transform"
													>
														→
													</span>
												</div>
												<code className="font-body text-label-sm text-neutral-700 break-all">
													{item.path}
												</code>
												{item.description ? (
													<p className="font-body text-body-sm text-neutral-700 mt-1">
														{item.description}
													</p>
												) : null}
											</Link>
										</li>
									))}
								</ul>
							</section>
						)
					})}
				</div>

				<footer className="mt-16 pt-8 border-t border-neutral-100 font-body text-body-sm text-neutral-700 flex flex-col gap-2">
					<span>
						Versões descontinuadas:{' '}
						<Link to="/archive" className="text-primary-600 hover:underline">
							/archive
						</Link>{' '}
						— referência, não implementar.
					</span>
					<span>
						Repositório:{' '}
						<a
							href="https://github.com/Buildbox-IT-Solutions/canais-digitais-preview"
							className="text-primary-600 hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							Buildbox-IT-Solutions/canais-digitais-preview
						</a>
					</span>
				</footer>
			</div>
		</main>
	)
}
