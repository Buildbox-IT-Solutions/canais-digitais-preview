/**
 * Componente: CategoryColumn
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6780
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-34982
 * Coluna de categoria: link de título + card "boxed" + lista de Small H cards.
 * Card compacto é fluido no mobile, trava em w-[160px] a partir de lg:.
 * Tokens: --text-headline-md, --text-title-md, --text-label-sm, --color-mint,
 *         --color-saffron, --color-primary-600, --color-secondary-950
 *
 * Correções (comparado ao node 973:6780, coluna "Food Service"):
 * - Cor do título: a coluna Food Service usa Terciário/Saffron (#B05223) no Figma,
 *   não Primary-600 (#002244, azul institucional) — `colorClass` agora mapeia os 3
 *   tons em vez do fallback binário mint/primary-600 anterior (que fazia toda
 *   coluna não-mint cair em azul, errado pra Food Service).
 * - Selo "Conteúdo Patrocinado" no card boxed: no Figma esse selo é uma variante do
 *   componente ("Sponsor"), não algo sempre presente — a instância de Ingredientes
 *   tem (node 973:6775, "Bridge & Co."), a de Food Service vem com esse frame
 *   OCULTO (node 973:6783). Virou `boxedSponsorName` opcional — sem essa prop, o
 *   card boxed não renderiza selo nenhum.
 * - Lista de Small H: os cards do Figma não têm badge de categoria (só título) —
 *   viraram `NewsCard size="small" orientation="horizontal"` (sem `categoria`, sem
 *   `lead`), que já cobre exatamente essa combinação e já traz Favoritos —
 *   substituindo os `<article>` bespoke sem toggle de antes.
 * - Imagem do Small H em proporção 3:2 (`mediaRatio="photo"`, node 973:6776 —
 *   aspect-[300/200]), não 16:9 (default do NewsCard) — acomoda melhor o título.
 * - Título do Small H em até 4 linhas (`titleClassName="line-clamp-4"`, escape
 *   hatch do NewsCard): sem categoria nesta variante, sobra altura vertical pro
 *   título ocupar mais uma linha do que o clamp padrão de outros usos do NewsCard.
 * - Largura da imagem do Small H: era `w-[120px]` a partir de lg: (medida copiada
 *   do `H_THUMB_WIDTH.small` do NewsCard), mas o node 973:6776 trava em 160px, não
 *   120px. Como a linha usa `items-center`, é a imagem (mais alta que 2-3 linhas de
 *   título) quem dita a altura de cada item — 120px deixava a coluna inteira mais
 *   baixa que a coluna "Em Alta" ao lado, sobrando espaço em branco embaixo. Com
 *   160px a altura de cada linha bate com o Figma (106.667px) e o espaço some.
 * - Título do boxed sem `leading-snug`: node 973:6775 mostra `leading-[24px]` pro
 *   título 16px (igual ao token `--text-title-md--line-height`), não uma entrelinha
 *   apertada — auditoria de leading (ver comentário em news-card/index.tsx).
 * - Gap entre boxed/itens da lista: era `gap-4` (16px), mas o frame "list" do Figma
 *   usa `gap-[24px]` — `gap-6`. Junto com a largura de imagem acima, fecha a maior
 *   parte da diferença de altura pro lado da coluna "Em Alta".
 *
 * Card "boxed" (patrocinado, selo no canto) — feature Favoritos: toggle no canto
 * superior direito da mídia, selo "Conteúdo Patrocinado" movido pro canto superior
 * ESQUERDO (era `top-2 right-2` no Figma). Mesmo problema de aninhamento do
 * NewsCard: o `<a>` do card cobre imagem inteira + barra do título, então o toggle
 * vira irmão desse `<a>` dentro de um wrapper `relative` (não dentro dele) — por
 * isso o `group` (usado pelo zoom da imagem) subiu pro wrapper, não fica mais só no
 * `<a>`, senão o toggle (irmão, fora do `<a>`) não reagiria ao hover/focus-within do
 * card. `boxedSeed` (já único por card) faz de contentId — não existe id de artigo
 * pra esse item hoje (só título/seed literais).
 * `useFavoritoToggle` importado direto (não é o ReadListItem/aba de Favoritos).
 * `size="small"` no Toggle (área de toque reduzida, ver comentário em
 * NewsCard/index.tsx) — favoritado ou não, some sem hover, igual aos outros cards.
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import { picsumSrc } from '~/mocks/articles'
import type { ICategoryColumnProps, CategoryColumnColor } from './types'

// Mesma regra de visibilidade do toggle em NewsCard (favoritado ou não, só aparece
// no hover) — ver comentário lá.
const TOGGLE_HIDDEN_UNTIL_HOVER = twMerge(
	'transition-opacity duration-150',
	'hover-fine:opacity-0',
	'hover-fine:pointer-events-none',
	'hover-fine:group-hover:opacity-100',
	'hover-fine:group-hover:pointer-events-auto',
	'hover-fine:group-focus-within:opacity-100',
	'hover-fine:group-focus-within:pointer-events-auto',
)

const COLOR_CLASS: Record<CategoryColumnColor, string> = {
	mint: 'text-mint',
	saffron: 'text-saffron',
	'primary-600': 'text-primary-600',
}

// Borda do card boxed acompanha a cor da coluna (Figma: mint em Ingredientes,
// saffron em Food Service) — antes hard-coded em `border-mint` pras duas.
const BOXED_BORDER_CLASS: Record<CategoryColumnColor, string> = {
	mint: 'border-mint',
	saffron: 'border-saffron',
	'primary-600': 'border-primary-600',
}

// Fluido no mobile, trava em w-[160px] a partir de lg: (node 973:6776 — Image tem
// max-w-[160px]/max-h-[106.667px], não 120px: a imagem MAIOR é o que dita a altura
// da linha via `items-center`; com 120px sobrava altura vazia na coluna inteira
// comparado à coluna "Em Alta" ao lado — ver comentário do componente).
const LIST_THUMB_CLASSNAME = 'flex-1 max-w-40 shrink-0 lg:flex-none lg:w-[160px] lg:max-w-none'

export function CategoryColumn({
	color,
	label,
	boxedTitle,
	boxedSeed,
	boxedSponsorName,
	list,
	className,
}: ICategoryColumnProps) {
	const colorClass = COLOR_CLASS[color]
	const authModal = useFavoritoAuthModal(boxedSeed)
	const { pressed, onPressedChange } = useFavoritoToggle(boxedSeed, authModal.requestAuth)

	return (
		<div className={twMerge('flex flex-col pt-10', className)}>
			<a
				href="/categoria"
				className={twMerge('group block no-underline hover:opacity-75 transition-opacity space-y-2', colorClass)}
			>
				<div className="flex items-center gap-1 h-1.5">
					<div className="flex items-center gap-1">
						<span className="block size-[5px] rounded-full bg-current" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
					</div>
					<div className="flex-1 h-px bg-current" />
				</div>
				<h2 className="text-headline-md font-display font-bold">{label}</h2>
			</a>
			<div className="flex flex-col gap-6 mt-4">
				<div className="group relative">
					<a
						href="/conteudo"
						className={twMerge(
							'relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 w-full aspect-[392/262]',
							BOXED_BORDER_CLASS[color],
						)}
					>
						<img
							src={picsumSrc(boxedSeed, 784, 524)}
							alt="Capa"
							className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						{boxedSponsorName ? (
							<div className="absolute top-2 left-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-start z-10">
								<p className="font-body font-semibold text-label-sm text-neutral-900">Conteúdo Patrocinado</p>
								<p className="font-display font-bold text-title-md text-secondary-950">{boxedSponsorName}</p>
							</div>
						) : null}
						<div className="relative bg-black/60 px-4 py-3 w-full z-10">
							<h3 className="font-display font-bold text-title-md text-white line-clamp-3">
								{boxedTitle}
							</h3>
						</div>
					</a>
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
						className={twMerge('absolute top-2 right-2 z-10', TOGGLE_HIDDEN_UNTIL_HOVER)}
					/>
				</div>

				{list.map((card) => (
					<NewsCard
						key={card.id}
						contentId={card.id}
						size="small"
						orientation="horizontal"
						image={picsumSrc(card.seed, 320, 213)}
						href="/conteudo"
						title={card.title}
						mediaClassName={LIST_THUMB_CLASSNAME}
						mediaRatio="photo"
						titleClassName="line-clamp-4"
					/>
				))}
			</div>

			{/* Visualmente idêntico ao modal de download — só ícone/título/corpo mudam,
			    os dois botões usam o rótulo default do componente (mesmo do download). */}
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
		</div>
	)
}
