import { useEffect, useRef } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { Divider } from '~/components/divider'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { MENU_ITEMS } from '~/mocks/articles'
import InformaLogo from '~/assets/images/OneLine_Solid_Indigo.svg'
import type { ISideMenuProps } from './types'

/**
 * Componente: Side Menu — drawer lateral esquerdo (hambúrguer)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-9198
 * Variantes: device (Desktop|Mobile) × logged (Off|On)
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950,
 *         --color-neutral-*, --animate-slide-in-left, --animate-fade-in
 *
 * Overlay controlado (open/onClose) sobre a página atual — mesmo padrão do
 * BottomSheet: focus trap, Esc, scroll lock do body e retorno de foco ao trigger.
 */

const FOCUSABLE =
	'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function SideMenu({
	open,
	onClose,
	logged = false,
	userName = 'Usuário',
	userInitials = 'U',
	userAvatar = null,
	className,
}: ISideMenuProps) {
	const panelRef = useRef<HTMLDivElement>(null)
	const previouslyFocused = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (!open) return
		previouslyFocused.current = document.activeElement as HTMLElement | null

		const panel = panelRef.current
		panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose()
				return
			}
			if (e.key !== 'Tab' || !panel) return
			const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
				(el) => el.offsetParent !== null,
			)
			if (items.length === 0) return
			const first = items[0]
			const last = items[items.length - 1]
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = prevOverflow
			previouslyFocused.current?.focus()
		}
	}, [open, onClose])

	if (!open) return null

	const avatarNode = userAvatar ? (
		<img src={userAvatar} alt="" className="size-10 rounded-full object-cover shrink-0" />
	) : (
		<span
			className="size-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-lg"
			aria-hidden="true"
		>
			{userInitials}
		</span>
	)

	return (
		<div className={twMerge('fixed inset-0 z-50', className)} role="dialog" aria-modal="true" aria-label="Menu">
			<button
				type="button"
				aria-label="Fechar menu"
				onClick={onClose}
				className="absolute inset-0 h-full w-full cursor-pointer bg-primary-950/[.32] animate-fade-in"
			/>

			<aside
				ref={panelRef}
				className="absolute inset-y-0 left-0 bg-white border-r border-primary-100 flex flex-col h-full w-[280px] min-w-[240px] max-w-[280px] py-2 animate-slide-in-left will-change-transform"
			>
				<div className="flex items-center px-3 py-2 w-full shrink-0">
					<IconButton icon="close" type="ghost" size="large" label="Fechar menu" onClick={onClose} />
				</div>

				<div className="flex-1 min-h-0 overflow-y-auto w-full">
					{/*
						min-h-full + mt-auto no rodapé = sticky footer clássico: quando a lista (nav)
						não preenche a área de rolagem, o rodapé (Anuncie + logo) é empurrado para o
						fim do painel. Quando a lista é maior que a área visível, o wrapper cresce
						além de min-h-full e o rodapé passa a fluir imediatamente após o último item,
						rolando junto com o conteúdo.
					*/}
					<div className="flex flex-col min-h-full w-full">
						<a
							href={logged ? '/dashboard-perfil-v4' : '/login'}
							className="flex items-center gap-3 px-5 py-3 w-full hover:bg-black/8 transition-colors"
						>
							{logged ? (
								avatarNode
							) : (
								<Icon name="account-circle" className="size-8 text-primary-600 shrink-0" />
							)}

							<div className="flex flex-1 flex-col gap-0.5 min-w-0">
								<p className="font-body font-bold text-label-lg text-primary-600 truncate">
									{logged ? userName : 'Acesse sua conta'}
								</p>
								<p
									className={
										logged
											? 'font-body font-bold text-body-sm text-secondary-950 truncate'
											: 'font-body font-normal text-body-md text-primary-600 truncate'
									}
								>
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

						<div className="mt-auto flex flex-col gap-4 items-start px-5 py-4 w-full shrink-0">
							<Button label="Anuncie" href="/anuncie" type="filled" size="medium" className="w-full" />

							<Divider />

							<InformaLogo className="h-8 w-auto shrink-0" role="img" aria-label="Informa" />
						</div>
					</div>
				</div>
			</aside>
		</div>
	)
}
