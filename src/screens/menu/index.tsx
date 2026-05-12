import { Divider } from '~/components/divider'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { MENU_ITEMS } from '~/mocks/articles'

/**
 * Tela: Menu — Side menu overlay (hamburger)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-21416
 */
export default function MenuScreen() {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="absolute inset-0 bg-primary-950 opacity-[.32] z-40" />

			<aside className="absolute top-0 left-0 z-50 bg-white border-r border-neutral-100 flex h-full w-[280px] min-w-[240px] max-w-[280px] py-2">
				<div className="flex flex-col flex-1 h-full items-start">
					<div className="flex items-center px-3 py-2 w-full">
						<IconButton
							icon="close"
							type="ghost"
							size="large"
							label="Fechar menu"
							href="/home"
						/>
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

					<div className="flex flex-1 flex-col gap-4 items-start justify-end px-5 py-2 w-full">
						<Divider />
						<div className="h-[34px] flex items-center">
							<span className="font-display font-bold text-title-lg text-primary-600">
								informa
							</span>
						</div>
					</div>
				</div>
			</aside>

			<div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
				<div className="opacity-50">
					<HeaderDesktop />
				</div>
			</div>
		</div>
	)
}
