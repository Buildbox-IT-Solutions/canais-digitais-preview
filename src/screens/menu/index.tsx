import { useSearchParams } from 'react-router'
import { Button } from '~/components/button'
import { Divider } from '~/components/divider'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { MENU_ITEMS } from '~/mocks/articles'

/**
 * Tela: Menu — Side menu overlay (hambúrguer)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-9198
 * Variante mobile L1 (280px): close + bloco de conta (logado) + lista de editorias
 * + footer (Anuncie + social + divider + brand informa).
 *
 * `?logged=1` (setado pelo hambúrguer do header quando userLoggedIn) mostra o
 * bloco de conta no topo — o header mobile não tem UserMenu, então as ações
 * "Meu Perfil" / "Sair" vivem aqui.
 */

const USER_NAME = 'Mariana Albuquerque'
const USER_INITIALS = 'MA'

export default function MenuScreen() {
	const [params] = useSearchParams()
	const logged = params.get('logged') === '1'
	const closeHref = logged ? '/dashboard-perfil-v4' : '/home'

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="absolute inset-0 bg-primary-950 opacity-[.32] z-40" />

			<aside className="absolute top-0 left-0 z-50 bg-white border-r border-primary-100 flex flex-col h-full w-[280px] min-w-[240px] max-w-[280px] py-2">
				<div className="flex items-center px-3 py-2 w-full shrink-0">
					<IconButton
						icon="close"
						type="ghost"
						size="large"
						label="Fechar menu"
						href={closeHref}
					/>
				</div>

				<div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full">
					<a
						href={logged ? '/dashboard-perfil-v4' : '/login'}
						className="flex items-center gap-3 px-5 py-3 w-full hover:bg-black/8 transition-colors"
					>
						{logged ? (
							<span
								className="size-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-lg"
								aria-hidden="true"
							>
								{USER_INITIALS}
							</span>
						) : (
							<span
								className="size-10 rounded-full bg-neutral-50 text-primary-600 flex items-center justify-center shrink-0"
								aria-hidden="true"
							>
								<Icon name="account-circle" className="size-6" />
							</span>
						)}

						<div className="flex flex-1 flex-col gap-0.5 min-w-0">
							<p className="font-body font-bold text-label-lg text-primary-600 truncate">
								{logged ? USER_NAME : 'Acesse sua conta'}
							</p>
							<p className="font-body font-bold text-body-sm text-secondary-950 truncate">
								{logged ? 'Minha conta' : 'ou cadastra-se grátis'}
							</p>
						</div>

						<Icon name="chevron-right" className="size-6 text-primary-600 shrink-0" />
					</a>

					<div className="px-5 py-2 w-full">
						<Divider />
					</div>

					<nav className="flex flex-col items-start w-full">
						{MENU_ITEMS.map((item) => (
							<a
								key={item.label}
								href="/categoria"
								className="flex gap-3 h-14 items-center pl-6 pr-4 py-2 w-full hover:bg-neutral-50 transition-colors"
							>
								<span className="flex-1 font-body font-bold text-label-lg text-primary-600">
									{item.label}
								</span>
								{item.dropdown ? (
									<Icon name="chevron-right" className="size-6 text-primary-600" />
								) : null}
							</a>
						))}
					</nav>

					{logged ? (
						<a
							href="/home"
							className="flex gap-3 h-14 items-center pl-6 pr-4 py-2 w-full hover:bg-neutral-50 transition-colors"
						>
							<Icon name="logout" className="size-5 text-primary-600" />
							<span className="flex-1 font-body font-bold text-label-lg text-primary-600">Sair</span>
						</a>
					) : null}
				</div>

				<div className="flex flex-col gap-4 items-start px-5 py-2 w-full shrink-0">
					<Button label="Anuncie" href="/anuncie" type="filled" size="medium" className="w-full" />

					<Divider />

					<div className="h-[34px] flex items-center">
						<span className="font-display font-bold text-title-lg text-primary-600">
							informa
						</span>
					</div>
				</div>
			</aside>

			<div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
				<div className="opacity-50">
					<HeaderDesktop userLoggedIn={logged} />
				</div>
			</div>
		</div>
	)
}
