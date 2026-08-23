/**
 * Componente: NewsCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090
 * Variantes: size (xlarge|large|medium|small) × orientation (vertical|horizontal) ·
 * boxed · inverse · sponsor · categoria/lead/author on-off · mediaRatio (video 16:9 default |
 * photo 3:2 | square) · titleClassName/leadClassName (escape hatches, ex. line-clamp)
 * Tokens: --text-headline-lg/sm/md, --text-title-xl/lg/md, --text-body-lg/md, --color-primary-600,
 *         --color-neutral-100, --color-neutral-900, --color-secondary-950
 *
 * `boxed` — "News Card 2.0 / Boxed" do Figma: moldura própria (borda + rounded-lg),
 * conteúdo com padding e mídia sangrando até a borda do card. Combinado com
 * `orientation="horizontal"` vira o split 50/50 do destaque único da home
 * (`size="xlarge"`, node 6775:18688), que empilha abaixo de `lg:` com a imagem em cima.
 * `inverse` põe a mídia do lado oposto ao padrão (à direita no horizontal) — mesmo
 * conceito já nomeado no arquivo como "Video Card 2.0 / Inverse". `sponsor` é o
 * "News Card 2.0 / Patrocinado": SponsorLine ancorada no rodapé da coluna de texto.
 *
 * Por que `boxed` NÃO usa `overflow-hidden` no <article> pra recortar a imagem nos
 * cantos arredondados (o caminho óbvio, e o que os cards boxed de CategoryColumn e
 * DestaqueSection fazem hoje): esse clip pega TAMBÉM o tooltip do toggle de
 * favoritar, que é posicionado fora dos limites da mídia e aparece cortado. Aqui o
 * raio vai canto a canto na própria Thumbnail — que já tem `overflow-hidden` dela
 * pro zoom da imagem — e o <article> fica sem clip nenhum. Ver docs/_achados.md: os
 * outros dois cards boxed do repo têm o mesmo bug, ainda não corrigido.
 *
 * Toggle de favoritar (feature Favoritos) — âncora principal é a MÍDIA (canto
 * superior direito, `top-2 right-2`, mesmo inset do selo "Conteúdo Patrocinado" em
 * CategoryColumn); sem imagem, cai para a linha do título (única âncora presente em
 * toda variante). Ligado e desligado seguem a MESMA regra: só aparece no hover do
 * card ou no focus-within, e só em dispositivos com hover fino (mouse) — `@media
 * (hover: hover) and (pointer: fine)`, nunca por breakpoint de largura. Onde não há
 * hover fino, fica sempre visível (os dois estados, incluindo mobile/touch — lá
 * não existe hover, então o botão sempre aparece fixo, favoritado ou não).
 * Renderiza sempre que `contentId` existir, logado ou não — autenticação vive só
 * dentro de useFavoritoToggle (clique deslogado é no-op até o modal entrar,
 * próximo passo).
 *
 * `size="small"` no Toggle (não `medium`) — pedido de produto pra reduzir a área
 * de toque do favoritar nos cards (32px de caixa, ícone 16px, ambos um step
 * abaixo do Toggle [1.0] no Figma). Vale nos 5 lugares que usam este Toggle
 * (NewsCard/CategoryColumn/VideoCard/DestaqueSection); a barra de ações da
 * página de conteúdo é a única exceção e continua `medium`, por convívio com os
 * ícones de WhatsApp/compartilhar ali.
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
 * é 32px (`size="small"` do Toggle) — a área de toque real não muda com o texto. O
 * que muda é o quanto ele CONTA pra altura da linha: `-my-2.5` (margin vertical
 * negativa de 10px) reduz a caixa-de-margem do toggle pra 32-10=22px, menor que a
 * altura de qualquer título (mesmo o menor, 24px) — quem manda na altura da linha é
 * sempre o título. Esse -10px também desloca o botão pra cima o suficiente pra que o TOPO do
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
import { SponsorLine } from '~/components/sponsor-line'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import type { INewsCardProps, NewsCardSize } from './types'

// Aplica-se sempre, favoritado ou não (ver JSX) — nenhum dos dois estados fica fixo
// sem hover. `transition-opacity` deixa a entrada/saída suave em vez de instantânea.
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
	// xlarge só existe em horizontal (destaque único da home) — "Headline/Large/
	// Emphasized" (Aleo Bold 32/40) no Figma. No mobile desce um degrau: 32px em
	// 360px de largura quebra a manchete em 5-6 linhas (ver docs/_achados.md).
	'xlarge-horizontal': 'text-headline-sm lg:text-headline-lg',
	'large-vertical': 'text-headline-md',
	'medium-vertical': 'text-title-xl',
	'small-vertical': 'text-title-lg',
	'large-horizontal': 'text-title-xl',
	'medium-horizontal': 'text-title-lg',
	'small-horizontal': 'text-title-md',
}

const LEAD: Record<string, string | null> = {
	'xlarge-horizontal': 'text-body-lg',
	'large-vertical': 'text-body-lg',
	'medium-vertical': 'text-body-md',
	'small-vertical': 'text-body-md',
	'large-horizontal': 'text-body-md',
	'medium-horizontal': null,
	'small-horizontal': null,
}

const H_THUMB_WIDTH: Record<NewsCardSize, string> = {
	// xlarge é sempre `boxed` (split 50/50) — nunca cai nesta tabela, mas o Record
	// exige a chave. Mesma medida do large pra não mentir se alguém usar solto.
	xlarge: 'w-[240px]',
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
	leadClassName,
	boxed,
	inverse,
	sponsor,
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

	// Sobre a mídia: canto superior direito, irmão do <a> da Thumbnail (nunca dentro
	// de mediaOverlay — ver comentário do arquivo). Só existe quando há imagem.
	const mediaToggle =
		showToggle && image ? (
			<Toggle
				pressed={pressed}
				onPressedChange={onPressedChange}
				iconOn="favorite"
				iconOff="favorite-border"
				labelOn="Remover dos favoritos"
				labelOff="Favoritar"
				tooltipOn="Remover"
				tooltipOff="Favoritar"
				size="small"
				surface="onMedia"
				className={twMerge('absolute top-2 right-2', TOGGLE_HIDDEN_UNTIL_HOVER)}
			/>
		) : null

	// Sem mídia: linha do título, alinhado à direita (ver comentário do arquivo).
	const titleRowToggle =
		showToggle && !image ? (
			<Toggle
				pressed={pressed}
				onPressedChange={onPressedChange}
				iconOn="favorite"
				iconOff="favorite-border"
				labelOn="Remover dos favoritos"
				labelOff="Favoritar"
				tooltipOn="Remover"
				tooltipOff="Favoritar"
				size="small"
				surface="default"
				className={twMerge('shrink-0 -my-2.5', TOGGLE_HIDDEN_UNTIL_HOVER)}
			/>
		) : null

	// No `boxed` a mídia sangra até a borda do card: em vez de `overflow-hidden` no
	// <article> (que recortaria o TOOLTIP do toggle — ver comentário do arquivo), o
	// raio vai canto a canto na própria Thumbnail, que já tem o `overflow-hidden`
	// dela pro zoom da imagem. Classes por canto (não `rounded-t`/`rounded-r`) pra
	// não colidirem entre si no twMerge.
	const boxedMediaRadius = inverse
		? 'rounded-tl-lg rounded-tr-lg lg:rounded-tl-none lg:rounded-br-lg'
		: 'rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg'

	const mediaStack = image ? (
		<div className="relative">
			<Thumbnail
				src={image}
				alt={title}
				href={href}
				ratio={mediaRatio}
				overlay={mediaOverlay}
				radius={!boxed}
				className={boxed ? boxedMediaRadius : undefined}
			/>
			{mediaToggle}
		</div>
	) : null

	const content = (
		// `flex-1` só fora do boxed: lá quem distribui a altura da coluna é o painel
		// de texto (justify-between/center), e um filho que cresce anularia isso.
		<div className={twMerge('flex flex-col gap-2 min-w-0', !boxed && 'flex-1')}>
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
						leadClassName,
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
			icon="favorite"
			title={
				<>
					<span className="font-bold text-secondary-500">Salve</span> este conteúdo na sua biblioteca
				</>
			}
			body="Crie sua conta para guardar conteúdos e encontrá-los depois, e receber recomendações do seu setor."
		/>
	) : null

	const sponsorLine = sponsor ? <SponsorLine company={sponsor.company} href={sponsor.href} /> : null

	// "News Card 2.0 / Boxed": moldura própria, mídia sangrando, conteúdo com padding.
	// Em horizontal vira o split 50/50 do destaque único da home, que empilha abaixo
	// de `lg:` (imagem em cima). A ordem no DOM é sempre texto → mídia, pra manchete
	// vir antes da imagem na leitura assistiva; quem inverte visualmente é `order-*`.
	if (boxed) {
		const split = orientation === 'horizontal'

		// Empilhado (< lg) a mídia vem sempre em cima; a partir de lg: `inverse` a
		// joga pra direita (texto na esquerda) e o padrão a mantém na esquerda.
		const textOrder = split ? (inverse ? 'lg:order-1' : 'lg:order-2') : ''
		const mediaOrder = split ? (inverse ? 'lg:order-2' : 'lg:order-1') : ''

		const textPane = (
			<div
				className={twMerge(
					'order-2 flex flex-col gap-6 p-4 lg:p-8',
					split && 'lg:w-1/2',
					textOrder,
					// Com patrocinador a SponsorLine ancora no rodapé (único estado que o
					// Figma desenha). Sem ela, `justify-between` deixaria o vazio da altura
					// ditada pela imagem embaixo do texto — lê como bug, não como respiro.
					sponsorLine ? 'justify-between' : 'justify-center',
				)}
			>
				{content}
				{sponsorLine}
			</div>
		)

		// Painel de mídia próprio (não reusa `mediaStack`): aqui a foto precisa
		// ACOMPANHAR a altura do card quando o texto é mais alto que ela — com
		// título e lead nos 4 clamps isso acontece, e sem esticar sobraria uma faixa
		// branca embaixo da foto, quebrando o "mídia sangra até a borda".
		// `lg:grow` (flex-grow com basis auto, NÃO `flex-1`, que zeraria a base e
		// colapsaria o painel) deixa a Thumbnail crescer sem perder a altura
		// intrínseca do aspect-ratio — então no caso normal a proporção 3:2 segue
		// sendo quem dita a altura do card. O `relative` do painel é o mesmo que o
		// `mediaStack` daria, e continua ancorando o toggle.
		const mediaPane = image ? (
			<div
				className={twMerge(
					'order-1 relative flex flex-col',
					split && 'lg:w-1/2',
					mediaOrder,
					mediaClassName,
				)}
			>
				<Thumbnail
					src={image}
					alt={title}
					href={href}
					ratio={mediaRatio}
					overlay={mediaOverlay}
					radius={false}
					className={twMerge(boxedMediaRadius, split && 'lg:grow')}
				/>
				{mediaToggle}
			</div>
		) : null

		return (
			<>
				<article
					className={twMerge(
						'group flex flex-col w-full bg-white rounded-lg border border-neutral-100 hover:border-secondary-950 transition-colors',
						split && 'lg:flex-row',
						className,
					)}
				>
					{textPane}
					{mediaPane}
				</article>
				{authDialog}
			</>
		)
	}

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
