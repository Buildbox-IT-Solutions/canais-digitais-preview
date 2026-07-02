import { Link } from 'react-router'

/**
 * Tela: Arquivo — versões descontinuadas
 * Não é uma tela do produto. Lista apenas as versões OBSOLETAS do protótipo,
 * mantidas como referência histórica (resgatáveis). NÃO implementar — a versão
 * vigente de cada fluxo vive no índice principal (/).
 */

interface ArchiveItem {
	path: string
	label: string
	reason: string
}

interface ArchiveGroup {
	title: string
	items: ArchiveItem[]
}

const GROUPS: ArchiveGroup[] = [
	{
		title: 'Autenticação — full page (substituídas pelos modais)',
		items: [
			{ path: '/login-full', label: 'Login (full page)', reason: 'Substituída pelo modal em /login' },
			{ path: '/cadastro-full', label: 'Cadastro (full page)', reason: 'Substituída pelo modal em /cadastro' },
			{
				path: '/recupera-senha-full',
				label: 'Recuperar senha (full page)',
				reason: 'Substituída pelo modal em /recupera-senha',
			},
			{
				path: '/redefine-senha-full',
				label: 'Redefinir senha (full page)',
				reason: 'Substituída pelo modal em /redefine-senha',
			},
		],
	},
	{
		title: 'Home — proposta anterior',
		items: [
			{ path: '/home-v2', label: 'Home v2', reason: 'Descartada; a home vigente é /home' },
		],
	},
	{
		title: 'Perfil — iterações anteriores',
		items: [
			{ path: '/dashboard', label: 'Dashboard (por seções)', reason: 'Consolidado em /dashboard-perfil-v4' },
			{ path: '/dashboard-perfil-v3', label: 'Perfil — v3', reason: 'Consolidado em /dashboard-perfil-v4' },
		],
	},
	{
		title: 'Institucionais & Forms — descontinuadas',
		items: [
			{ path: '/patrocinadores', label: 'Patrocinadores', reason: 'Fora do escopo da versão enxuta' },
			{
				path: '/patrocinador?id=tetrapak',
				label: 'Patrocinador (individual)',
				reason: 'Fora do escopo da versão enxuta',
			},
			{
				path: '/form-newsletter',
				label: 'Form — Newsletter',
				reason: 'Fora do escopo da versão enxuta (Newsletter fica "Em breve" no perfil)',
			},
		],
	},
]

const TOTAL = GROUPS.reduce((sum, g) => sum + g.items.length, 0)

export default function ArchiveScreen() {
	return (
		<main className="min-h-screen bg-neutral-50">
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-16">
				<header className="flex flex-col gap-4 pb-12 border-b border-neutral-100">
					<Link
						to="/"
						className="font-body font-semibold text-label-md text-neutral-700 hover:text-primary-600 transition-colors w-fit"
					>
						← Índice principal
					</Link>
					<h1 className="font-display font-bold text-display-md text-primary-600">
						Arquivo — versões descontinuadas
					</h1>
					<div className="flex items-start gap-3 bg-coral/10 border border-coral/30 rounded-lg p-4">
						<span className="size-2 rounded-full bg-coral mt-2 shrink-0" />
						<p className="font-body text-body-md text-neutral-900 max-w-2xl">
							<strong className="text-coral">Referência histórica — não implementar.</strong>{' '}
							Estas {TOTAL} telas foram substituídas. A versão vigente de cada fluxo está no{' '}
							<Link to="/" className="font-bold text-primary-600 hover:underline">
								índice principal
							</Link>
							.
						</p>
					</div>
				</header>

				<div className="flex flex-col gap-12 pt-12">
					{GROUPS.map((group) => (
						<section key={group.title} className="flex flex-col gap-6">
							<h2 className="font-display font-bold text-headline-sm text-primary-600">
								{group.title}
							</h2>
							<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
								{group.items.map((item) => (
									<li key={item.path}>
										<Link
											to={item.path}
											className="group flex flex-col gap-1 bg-white border border-neutral-100 rounded-lg p-4 transition-colors h-full hover:border-neutral-300"
										>
											<div className="flex items-center justify-between gap-2">
												<span className="font-display font-bold text-title-md text-neutral-700 group-hover:text-neutral-900 transition-colors">
													{item.label}
												</span>
												<span
													aria-hidden="true"
													className="font-body text-label-md text-neutral-400 group-hover:translate-x-0.5 transition-transform"
												>
													→
												</span>
											</div>
											<code className="font-body text-label-sm text-neutral-500 break-all">
												{item.path}
											</code>
											<p className="font-body text-body-sm text-neutral-500 mt-1">{item.reason}</p>
										</Link>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			</div>
		</main>
	)
}
