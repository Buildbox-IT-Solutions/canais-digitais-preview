/**
 * Componente: Video Card 2.0 / Inverse
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2803-26398
 * Videos Section (uso real, 4 itens): https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2835-49276
 * Variante dark (texto branco) do Video Card 2.0 — sem container proprio; a section pai
 * (sempre fundo escuro) define o background.
 * Sizes: lg = headline-md 28 / body-lg lead, vertical (hero desktop) · sm = title-lg 18 /
 * body-md lead se houver, vertical OU horizontal (mobile empilhado e a lista compacta
 * de 3 do desktop, node 2803:44490) · xs = title-md 16, sem lead, horizontal w-160 fixo
 * (variante "XSmall H" do spec, sem uso ao vivo hoje).
 * Tokens: --color-white, --color-primary-100, --color-neutral-50, --text-headline-md,
 *         --text-title-lg, --text-title-md, --text-body-lg, --text-body-md
 *
 * Feature Favoritos:
 * - Correção de tamanho (node 2803:44490): a lista compacta do desktop usava
 *   `size="xs"` (16px/title-md, thumb fixo 160px) — o node real mostra `text-[18px]`
 *   (title-lg) e a imagem com `flex-1 max-w-[288px] min-w-[184px]`, não um thumb
 *   fixo. Ou seja, essa posição é `size="sm" orientation="horizontal"` — uma
 *   variante que o componente já sabia produzir tipograficamente (`sm` já gerava
 *   title-lg pro vertical), só faltava a orientação horizontal ganhar a largura
 *   certa em vez do `w-[160px]` herdado do "XSmall H" (variante sem uso ao vivo,
 *   mantida como estava).
 * - Toggle: mesmo mecanismo do NewsCard — irmão do <a> da Thumbnail (nunca dentro
 *   do overlay do play button), dentro de wrapper `relative`, surface="onMedia",
 *   sempre visível se marcado, oculto até hover fino quando desmarcado. Card sem
 *   `contentId` renderiza exatamente como antes (sem toggle).
 */
import { twMerge } from '~/lib/tw-merge'
import { Categoria } from '~/components/categoria'
import { PlayButton } from '~/components/play-button'
import type { PlayButtonSize } from '~/components/play-button/types'
import { Thumbnail } from '~/components/thumbnail'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import type { IVideoCardProps, VideoCardSize } from './types'

const HEADLINE: Record<VideoCardSize, string> = {
	lg: 'text-headline-md',
	sm: 'text-title-lg',
	xs: 'text-title-md leading-tight',
}

const LEAD: Record<VideoCardSize, string | null> = {
	lg: 'text-body-lg',
	sm: 'text-body-md',
	xs: null,
}

const PLAY_SIZE: Record<VideoCardSize, PlayButtonSize> = {
	lg: 'small',
	sm: 'small',
	xs: 'xsmall',
}

// Mesma regra de visibilidade do toggle no NewsCard/CategoryColumn — ligado fica
// sempre visível, desligado só aparece no hover fino ou focus-within.
const TOGGLE_HIDDEN_UNTIL_HOVER = twMerge(
	'transition-opacity duration-150',
	'hover-fine:opacity-0',
	'hover-fine:pointer-events-none',
	'hover-fine:group-hover:opacity-100',
	'hover-fine:group-hover:pointer-events-auto',
	'hover-fine:group-focus-within:opacity-100',
	'hover-fine:group-focus-within:pointer-events-auto',
)

export function VideoCard({
	title,
	image,
	href,
	contentId,
	size = 'lg',
	orientation = 'vertical',
	categoria,
	lead,
	className,
}: IVideoCardProps) {
	const headlineClass = HEADLINE[size]
	const leadClass = LEAD[size]

	// Hooks incondicionais (regra do React) — `contentId ?? ''` é inofensivo sem a
	// prop: os guards internos de useFavoritoToggle nunca consultam a store.
	const authModal = useFavoritoAuthModal(contentId ?? '')
	const { pressed, onPressedChange } = useFavoritoToggle(contentId ?? '', authModal.requestAuth)
	const showToggle = Boolean(contentId)
	const toggleVisibilityClass = pressed ? undefined : TOGGLE_HIDDEN_UNTIL_HOVER

	const thumb = (
		<div className="relative">
			<Thumbnail
				src={image}
				alt="Capa do vídeo"
				href={href}
				ratio="video"
				overlay={<PlayButton size={PLAY_SIZE[size]} as="div" />}
				className={orientation === 'horizontal' ? 'flex-1 max-w-[288px] min-w-[184px]' : undefined}
			/>
			{showToggle ? (
				<Toggle
					pressed={pressed}
					onPressedChange={onPressedChange}
					iconOn="bookmark"
					iconOff="bookmark-border"
					labelOn="Remover dos favoritos"
					labelOff="Favoritar"
					size="medium"
					surface="onMedia"
					className={twMerge('absolute top-2 right-2', toggleVisibilityClass)}
				/>
			) : null}
		</div>
	)

	const content = (
		<div className={twMerge('flex flex-col items-start', orientation === 'horizontal' ? 'gap-1 flex-1 min-w-0 justify-center' : 'gap-2')}>
			{categoria ? <Categoria {...categoria} chip /> : null}
			<h3 className={twMerge('font-display font-bold text-white group-hover:text-primary-100', headlineClass)}>
				<a href={href}>{title}</a>
			</h3>
			{lead && leadClass ? <p className={twMerge('font-body text-neutral-50', leadClass)}>{lead}</p> : null}
		</div>
	)

	const card =
		orientation === 'horizontal' ? (
			<article className={twMerge('group flex flex-row gap-4 items-center w-full', className)}>
				{thumb}
				{content}
			</article>
		) : (
			<article className={twMerge('group flex flex-col gap-3 w-full', className)}>
				{thumb}
				{content}
			</article>
		)

	if (!showToggle) return card

	return (
		<>
			{card}
			<IncentiveDownloadDialog
				open={authModal.open}
				onDismiss={authModal.onDismiss}
				onCreateAccount={authModal.onCreateAccount}
				onLogin={authModal.onLogin}
				icon="bookmark"
				title={
					<>
						<span className="font-bold text-secondary-500">Salve</span> este conteúdo na sua biblioteca
					</>
				}
				body="Crie sua conta para guardar conteúdos e encontrá-los depois, e receber recomendações do seu setor."
			/>
		</>
	)
}
