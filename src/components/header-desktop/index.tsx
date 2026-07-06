import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { useMediaQuery } from '~/lib/use-media-query'
import { AccessInvite } from '~/components/access-invite'
import { BottomSheet } from '~/components/bottom-sheet'
import { Button } from '~/components/button'
import { DropdownMenu } from '~/components/dropdown-menu'
import { HeaderInforma } from '~/components/header-informa'
import { Icon } from '~/components/icon'
import { LoginButton } from '~/components/login-button'
import { MenuListItem } from '~/components/menu-list-item'
import { NavItem } from '~/components/nav-item'
import { SearchBar } from '~/components/search-bar'
import type { IHeaderDesktopProps, NavCategory } from './types'

/**
 * Componente: Header Desktop v3.0
 * Figma: 5754:7270 (Header 2.0) + estado logado v3 (figma-specs/header.md §v3.0)
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-200, --color-neutral-950, --color-white
 *
 * Sticky (`sticky top-0 z-40`) com transição Expanded → Compact ao rolar.
 * O threshold de 8px de scroll alterna o estado: no Expanded a barra Informa
 * fica visível, logo h-16, paddings folgados; no Compact a barra Informa
 * colapsa, logo encolhe para h-10, paddings ficam mais apertados.
 * Implementação: scroll listener + requestAnimationFrame (mesmo padrão do
 * header-sticky.js legado).
 */

const SCROLL_COMPACT_THRESHOLD = 8

function useCompactOnScroll() {
	const [compact, setCompact] = useState(false)
	useEffect(() => {
		let ticking = false
		function update() {
			setCompact(window.scrollY > SCROLL_COMPACT_THRESHOLD)
			ticking = false
		}
		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(update)
				ticking = true
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		update()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	return compact
}

const DEFAULT_CATEGORIES: NavCategory[] = [
	{ label: 'Eventos', href: '/categoria', slug: 'eventos', dropdown: true, dropdownItems: [
		{ label: 'Próximos', href: '/categoria' },
		{ label: 'Anteriores', href: '/categoria' },
	]},
	{ label: 'Ingredientes', href: '/categoria', slug: 'ingredientes' },
	{ label: 'Indústria A&B', href: '/categoria', slug: 'industria-ab', dropdown: true, dropdownItems: [
		{ label: 'Padaria', href: '/categoria' },
		{ label: 'Confeitaria', href: '/categoria' },
	]},
	{ label: 'Proteína Animal', href: '/categoria', slug: 'proteina-animal' },
	{ label: 'Food Service', href: '/categoria', slug: 'food-service' },
	{ label: 'Sorvetes', href: '/categoria', slug: 'sorvetes' },
	{ label: 'Tecnologia', href: '/categoria', slug: 'tecnologia' },
	{ label: 'Embalagens', href: '/categoria', slug: 'embalagens' },
	{ label: 'ESG', href: '/categoria', slug: 'esg', dropdown: true, dropdownItems: [
		{ label: 'Sustentabilidade', href: '/categoria' },
		{ label: 'Responsabilidade Social', href: '/categoria' },
	]},
	{ label: 'Especialistas', href: '/categoria', slug: 'especialistas' },
	{ label: 'E-books', href: '/categoria', slug: 'ebooks' },
]

export function HeaderDesktop({
	categories = DEFAULT_CATEGORIES,
	activeCategory,
	userLoggedIn = false,
	userName = 'Usuário',
	userEmail = '',
	userInitials = 'U',
	userAvatar = null,
	className,
}: IHeaderDesktopProps) {
	const compact = useCompactOnScroll()

	return (
		<header
			data-compact={compact}
			className={twMerge('w-full bg-white sticky top-0 z-40', className)}
		>
			{/* HeaderInforma — collapse no Compact */}
			<div
				aria-hidden={compact}
				className={twMerge(
					'overflow-hidden transition-[max-height] duration-300',
					compact ? 'max-h-0' : 'max-h-[600px]',
				)}
			>
				<HeaderInforma />
			</div>

			{/* Wrapper branco do header — pb-4 só no Expanded */}
			<div
				className={twMerge(
					'flex flex-col items-center transition-[padding] duration-300',
					compact ? 'pb-0' : 'pb-4',
				)}
			>
				<div className="max-w-screen-xl w-full flex items-center">
					{/* Hamburger — só aparece no Compact (animado) */}
					<div
						aria-hidden={!compact}
						className={twMerge(
							'overflow-hidden transition-[width,opacity] duration-300 shrink-0',
							compact ? 'w-12 opacity-100' : 'w-0 opacity-0',
						)}
					>
						<a
							href="/menu"
							aria-label="Abrir menu"
							tabIndex={compact ? 0 : -1}
							className="inline-flex items-center justify-center size-12 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="menu" className="size-8" />
						</a>
					</div>

					<div
						className={twMerge(
							'flex flex-col justify-center shrink-0 transition-all duration-300',
							compact ? 'h-20 p-3' : 'h-24 px-3 py-4',
						)}
					>
						<a href="/home" aria-label="Food Connection — ir para a home" className="inline-flex items-center">
							<img
								src="https://d2yghbees9788u.cloudfront.net/foodconnection/2025/12/cropped-cropped-Logo-FC-WP-300x104.png"
								alt="Food Connection"
								className={twMerge(
									'w-auto transition-all duration-300',
									compact ? 'max-h-14 max-w-[162px]' : 'max-h-16 max-w-[185px]',
								)}
							/>
						</a>
					</div>

					{/* Right row — py-6 constante (igual em ambos os estados) */}
					<div className="flex flex-1 items-center justify-end gap-3 px-3 py-6 self-stretch">
						<SearchBar placeholder="Buscar" />

						<div className="w-px self-stretch bg-neutral-200" aria-hidden="true" />

						{userLoggedIn ? (
							<UserMenu
								name={userName}
								email={userEmail}
								initials={userInitials}
								avatar={userAvatar}
							/>
						) : (
							<AccessMenu />
						)}

						<Button label="Anuncie" href="/anuncie" type="filled" size="medium" />
					</div>
				</div>

				{/* Nav-list pill — só Expanded; collapse animado no Compact */}
				<div
					aria-hidden={compact}
					className={twMerge(
						'w-full max-w-screen-xl overflow-hidden transition-[max-height,margin] duration-300',
						compact ? 'max-h-0 mt-0' : 'max-h-20 mt-4',
					)}
				>
					<nav className="w-full flex items-start justify-center bg-neutral-50 rounded-full px-6">
						{categories.map((cat) => (
							<NavItem
								key={cat.slug}
								label={cat.label}
								href={cat.href}
								dropdown={cat.dropdown}
								active={activeCategory === cat.slug}
								dropdownItems={cat.dropdownItems}
							/>
						))}
					</nav>
				</div>
			</div>

			{/* Bottom divider — só Compact */}
			<div
				aria-hidden={!compact}
				className={twMerge(
					'h-px bg-neutral-100 w-full transition-opacity duration-300',
					compact ? 'opacity-100' : 'opacity-0',
				)}
			/>
		</header>
	)
}

/**
 * Trigger "Acessar" (deslogado): abre um convite (título + benefícios + ações de
 * cadastro/login), em vez de ir direto ao modal (ACS-01/02). Apresentação por
 * viewport — popover ancorado no desktop (≥1024px) e bottom sheet no mobile.
 * O convite (AccessInvite) é o mesmo nos dois; só a casca muda. As ações levam
 * às páginas full-page de /cadastro e /login, onde ficam os campos.
 */
function AccessMenu() {
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const [open, setOpen] = useState(false)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const panelId = useId()
	const titleId = useId()

	// Ao cruzar o breakpoint, fecha para não deixar popover/sheet preso no modo errado.
	useEffect(() => {
		setOpen(false)
	}, [isDesktop])

	// Popover desktop (não-modal): fecha no Esc (devolve o foco ao trigger) e no clique fora.
	// No mobile quem cuida de Esc/backdrop/focus trap/scroll lock é o próprio BottomSheet.
	useEffect(() => {
		if (!open || !isDesktop) return
		function handleClickOutside(e: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				setOpen(false)
				triggerRef.current?.focus()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [open, isDesktop])

	// Setas ↑/↓ movem o foco entre as ações do popover (Tab também funciona nativamente).
	function handlePanelArrows(e: ReactKeyboardEvent<HTMLDivElement>) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
		const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button'))
		if (items.length === 0) return
		e.preventDefault()
		const current = items.indexOf(document.activeElement as HTMLElement)
		const next =
			e.key === 'ArrowDown'
				? (current + 1) % items.length
				: (current <= 0 ? items.length : current) - 1
		items[next]?.focus()
	}

	return (
		<div
			ref={wrapperRef}
			className="relative"
			onMouseEnter={isDesktop ? () => setOpen(true) : undefined}
			onMouseLeave={isDesktop ? () => setOpen(false) : undefined}
			onFocus={isDesktop ? () => setOpen(true) : undefined}
			onBlur={
				isDesktop
					? (e) => {
							if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
						}
					: undefined
			}
		>
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={open ? panelId : undefined}
				onClick={() => setOpen(true)}
				className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary-600 pl-3 pr-3 py-2 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg whitespace-nowrap"
			>
				<Icon name="account-circle" className="size-6 shrink-0" />
				Acessar
				<Icon name="arrow-drop-down" className="size-5 shrink-0" />
			</button>

			{isDesktop ? (
				open ? (
					<div
						id={panelId}
						role="dialog"
						aria-labelledby={titleId}
						onKeyDown={handlePanelArrows}
						className="absolute right-0 top-full pt-2 origin-top-right animate-fade-up-sm z-50"
					>
						<div className="w-[300px] rounded-lg border border-neutral-100 bg-white p-5 shadow-lg">
							<AccessInvite titleId={titleId} variant="popover" />
						</div>
					</div>
				) : null
			) : (
				<BottomSheet open={open} onClose={() => setOpen(false)} id={panelId} labelledById={titleId}>
					<AccessInvite titleId={titleId} />
				</BottomSheet>
			)}
		</div>
	)
}

/**
 * Trigger (LoginButton logged) + dropdown 264px com cabeçalho de usuário,
 * link "Meu Perfil" e "Sair". Spec: figma-specs/header.md §v3.0.
 */
interface IUserMenuProps {
	name: string
	email: string
	initials: string
	avatar: string | null
}

function UserMenu({ name, email, initials, avatar }: IUserMenuProps) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [open])

	const avatarLarge = avatar ? (
		<img src={avatar} alt="" className="size-10 rounded-full object-cover shrink-0" />
	) : (
		<span
			className="size-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-body font-semibold text-body-lg"
			aria-hidden="true"
		>
			{initials}
		</span>
	)

	return (
		<div ref={ref} className="relative">
			<LoginButton
				logged
				name={name}
				initials={initials}
				avatar={avatar}
				onClick={() => setOpen((v) => !v)}
			/>

			{open ? (
				<div className="absolute right-0 top-full mt-2 origin-top-right animate-fade-up-sm z-50">
					<DropdownMenu tone="white" width="w-[264px]" className="py-0">
						<div className="flex items-center gap-3 p-4 w-full">
							{avatarLarge}
							<div className="flex flex-1 flex-col gap-0.5 min-w-0">
								<p className="font-body font-semibold text-body-md text-primary-600 truncate">
									{name}
								</p>
								{email ? (
									<p className="font-body text-label-md text-neutral-700 truncate">{email}</p>
								) : null}
							</div>
						</div>

						<MenuListItem
							label="Meu Perfil"
							href="/dashboard-perfil-v4"
							density="compact"
							leading={<Icon name="account-circle" className="size-5" />}
						/>

						<div className="bg-neutral-100 h-px mx-4 w-[calc(100%-2rem)]" />

						<MenuListItem
							label="Sair"
							href="/home"
							density="compact"
							leading={<Icon name="logout" className="size-5" />}
						/>
					</DropdownMenu>
				</div>
			) : null}
		</div>
	)
}
