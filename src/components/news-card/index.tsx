/**
 * Componente: NewsCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090
 * Variantes: size (large|medium|small) × orientation (vertical|horizontal) · categoria/lead/author on-off
 * · mediaRatio (video 16:9 default | photo 3:2 | square) · titleClassName (escape hatch, ex. line-clamp)
 * Tokens: --text-headline-md, --text-title-xl/lg/md, --text-body-lg/md, --color-primary-600, --color-neutral-900
 *
 * Toggle de favoritar (feature Favoritos) — âncora principal é a MÍDIA (canto
 * superior direito, `top-2 right-2`, mesmo inset do selo "Conteúdo Patrocinado" em
 * CategoryColumn); sem imagem, cai para a linha do título (única âncora presente em
 * toda variante). Ligado fica sempre visível; desligado só aparece no hover do card
 * ou no focus-within, e só em dispositivos com hover fino (mouse) — `@media (hover:
 * hover) and (pointer: fine)`, nunca por breakpoint de largura. Onde não há hover
 * fino, fica sempre visível. Espaço reservado por opacidade (nunca por
 * display/mount). Renderiza sempre que `contentId` existir, logado ou não —
 * autenticação vive só dentro de useFavoritoToggle (clique deslogado é no-op até o
 * modal entrar, próximo passo).
 *
 * Problema técnico resolvido: `Thumbnail` renderiza `overlay` (usado pelo
 * PlayButton) DENTRO do próprio `<a>` da imagem — um `<button>` (o Toggle) não pode
 * aninhar num `<a>` (HTML inválido, clique conflita). Por isso o Toggle NUNCA vai em
 * `mediaOverlay`: ele é irmão do `<a>` da Thumbnail, dentro de um wrapper
 * `relative` próprio (`mediaStack`), absolutamente posicionado — o PlayButton
 * (centralizado, dentro do `<a>`) e o Toggle (canto, fora do `<a>`) convivem sem
 * colidir e sem `z-index` manual: sendo irmãos de stacking `auto`, quem vem depois
 * no DOM (o Toggle) pinta por cima.
 *
 * Sem imagem, a linha do título vira flex (align-items: flex-start): título ocupa
 * o espaço restante (flex-1 min-w-0), toggle é item de largura fixa (shrink-0),
 * gap-2 (8px) garante a folga mínima entre a caixa do título e a área de toque —
 * como são irmãos de flex (não overlay), a não-sobreposição é garantida pelo
 * próprio layout, em qualquer breakpoint e em título de 1 a 4 linhas. O botão em si
 * continua 40px (md do IconButton) — a área de toque real não muda. O que muda é o
 * quanto ele CONTA pra altura da linha: `-my-2.5` (margin vertical negativa de
 * 10px) reduz a caixa-de-margem do toggle pra 40-10-10=20px, menor que a altura de
 * qualquer título (mesmo o menor, 24px) — quem manda na altura da linha é sempre o
 * título. Esse -10px também desloca o botão pra cima o suficiente pra que o TOPO do
 * ícone (não do botão) coincida com o topo da primeira linha do título.
 *
 * `surface`: `onMedia` sobre foto, `default` no card sem imagem — tamanho e cor do
 * ícone já vêm corretos do próprio Toggle (reconciliado com o Figma "Toggle [1.0]",
 * node 7952:127473), não precisa mais de override aqui.
 *
 * Auditoria de leading (entrelinhas apertadas em cards "small"): o `size ===
 * 'small' && 'leading-tight'` do headline foi removido — conferido direto no Figma
 * (node 1709:7109, "Size=Small, Orientation=Vertical": título 18px tem
 * `leading-[24px]`; instância 973:6776, small-horizontal, 16px tem `leading-[24px]`
 * também) e em nenhum dos dois casos o Figma usa leading apertado. `text-title-lg`/
 * `text-title-md` já carregam esse 24px via `--text-title-*--line-height` (token do
 * Tailwind v4) — o `leading-tight` (1.25×fonte) sobrescrevia isso pra 22.5px/20px,
 * mais apertado que o desenho. Não confundir com o `xs` do VideoCard, que É
 * intencional (documentado em figma-specs/video-card.md — empacota 16px em 96px de
 * altura total do card XSmall) — esse não foi tocado.
 */
import { twMerge } from '~/lib/tw-merge'
import { Thumbnail } from '~/components/thumbnail'
import { Categoria } from '~/components/categoria'
import { Byline } from '~/components/byline'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import type { INewsCardProps, NewsCardSize } from './types'

// Só se aplica quando NÃO está pressed — ligado ignora hover e fica sempre visível
// (ver JSX). `transition-opacity` deixa a entrada/saída suave em vez de instantânea.
const TOGGLE_HIDDEN_UNTIL_HOVER = twMerge(
	'transition-opacity duration-150',
	'hover-fine:opacity-0',
	'hover-fine:pointer-events-none',
	'hover-fine:group-hover:opacity-100',
	'hover-fine:group-hover:pointer-events-auto',
	'hover-fine:group-focus-within:opacity-100',
	'hover-fine:group-focus-within:pointer-events-auto',
)

const HEADLINE: Record<string, string> = {
	'large-vertical': 'text-headline-md',
	'medium-vertical': 'text-title-xl',
	'small-vertical': 'text-title-lg',
	'large-horizontal': 'text-title-xl',
	'medium-horizontal': 'text-title-lg',
	'small-horizontal': 'text-title-md',
}

const LEAD: Record<string, string | null> = {
	'large-vertical': 'text-body-lg',
	'medium-vertical': 'text-body-md',
	'small-vertical': 'text-body-md',
	'large-horizontal': 'text-body-md',
	'medium-horizontal': null,
	'small-horizontal': null,
}

const H_THUMB_WIDTH: Record<NewsCardSize, string> = {
	large: 'w-[240px]',
	medium: 'w-[180px]',
	small: 'w-[120px]',
}

export function NewsCard({
	title,
	image,
	href,
	contentId,
	size = 'large',
	orientation = 'vertical',
	categoria,
	lead,
	author,
	authorHref,
	mediaOverlay,
	mediaClassName,
	mediaRatio = 'video',
	titleClassName,
	className,
}: INewsCardProps) {
	const key = `${size}-${orientation}`
	const headlineClass = HEADLINE[key]
	const leadClass = LEAD[key]
	const bylineSize = size === 'small' ? 'sm' : 'md'

	// Hooks chamados incondicionalmente (regra do React) — `contentId ?? ''` é
	// inofensivo quando a prop não vem: os guards internos nunca consultam a store
	// nem abrem nada nesse caso.
	const authModal = useFavoritoAuthModal(contentId ?? '')
	const { pressed, onPressedChange } = useFavoritoToggle(contentId ?? '', authModal.requestAuth)
	const showToggle = Boolean(contentId)

	const toggleVisibilityClass = pressed ? undefined : TOGGLE_HIDDEN_UNTIL_HOVER

	// Sobre a mídia: canto superior direito, irmão do <a> da Thumbnail (nunca dentro
	// de mediaOverlay — ver comentário do arquivo). Só existe quando há imagem.
	const mediaToggle =
		showToggle && image ? (
			<Toggle
				pressed={pressed}
				onPressedChange={onPressedChange}
				iconOn="bookmark"
				iconOff="bookmark-border"
				labelOn="Remover dos favoritos"
				labelOff="Favoritar"
				tooltipOn="Remover"
				tooltipOff="Favoritar"
				size="medium"
				surface="onMedia"
				className={twMerge('absolute top-2 right-2', toggleVisibilityClass)}
			/>
		) : null

	// Sem mídia: linha do título, alinhado à direita (ver comentário do arquivo).
	const titleRowToggle =
		showToggle && !image ? (
			<Toggle
				pressed={pressed}
				onPressedChange={onPressedChange}
				iconOn="bookmark"
				iconOff="bookmark-border"
				labelOn="Remover dos favoritos"
				labelOff="Favoritar"
				tooltipOn="Remover"
				tooltipOff="Favoritar"
				size="medium"
				surface="default"
				className={twMerge('shrink-0 -my-2.5', toggleVisibilityClass)}
			/>
		) : null

	const mediaStack = image ? (
		<div className="relative">
			<Thumbnail src={image} alt={title} href={href} ratio={mediaRatio} overlay={mediaOverlay} />
			{mediaToggle}
		</div>
	) : null

	const content = (
		<div className="flex flex-col gap-2 min-w-0 flex-1">
			{categoria ? <Categoria {...categoria} /> : null}
			<div className="flex items-start gap-2">
				<h3
					className={twMerge(
						'min-w-0 flex-1 font-display font-bold text-primary-600',
						headlineClass,
						titleClassName,
					)}
				>
					<a href={href} className="group-hover:text-secondary-950 transition-colors">
						{title}
					</a>
				</h3>
				{titleRowToggle}
			</div>
			{lead && leadClass ? (
				<p
					className={twMerge(
						'font-body text-neutral-900 group-hover:text-neutral-950 transition-colors',
						leadClass,
					)}
				>
					{lead}
				</p>
			) : null}
			{author ? <Byline author={author} href={authorHref} size={bylineSize} /> : null}
		</div>
	)

	// Modal de auth (feature Favoritos) — mesmo IncentiveDownloadDialog do gatilho de
	// download, visualmente idêntico (só ícone/título/corpo mudam — os rótulos dos
	// dois botões são os mesmos do download, por isso não sobrescrevemos
	// primaryLabel/secondaryLabel aqui, só herdamos o default do componente).
	// Só existe quando o card tem toggle (senão `requestAuth` nunca é chamado).
	const authDialog = showToggle ? (
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
	) : null

	if (orientation === 'horizontal') {
		return (
			<>
				<article className={twMerge('group flex flex-row items-center gap-4 w-full', className)}>
					{mediaStack ? (
						<div className={mediaClassName ?? twMerge('shrink-0', H_THUMB_WIDTH[size])}>{mediaStack}</div>
					) : null}
					{content}
				</article>
				{authDialog}
			</>
		)
	}

	return (
		<>
			<article className={twMerge('group flex flex-col gap-3', className)}>
				{mediaStack}
				{content}
			</article>
			{authDialog}
		</>
	)
}
