/**
 * Componente: CategoryColumn
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6780
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-34982
 * Coluna de categoria: link de título + card "boxed" + lista de Small H cards.
 * Card compacto é fluido no mobile (max-w-40/min-w-52), trava em w-[120px] a partir de lg:.
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
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import { picsumSrc } from '~/mocks/articles'
import type { ICategoryColumnProps, CategoryColumnColor } from './types'

// Mesma regra de visibilidade do toggle em NewsCard — ver comentário lá.
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

// Fluido no mobile (max-w-40/min-w-52), trava em w-[120px] a partir de lg: — mesma
// medida já usada nos outros cards desta coluna, preservada ao migrar pra NewsCard.
const LIST_THUMB_CLASSNAME = 'flex-1 max-w-40 shrink-0 lg:flex-none lg:w-[120px] lg:max-w-none'

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
			<div className="flex flex-col gap-4 mt-4">
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
							<h3 className="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
								{boxedTitle}
							</h3>
						</div>
					</a>
					<Toggle
						pressed={pressed}
						onPressedChange={onPressedChange}
						iconOn="bookmark"
						iconOff="bookmark-border"
						labelOn="Remover dos favoritos"
						labelOff="Favoritar"
						size="medium"
						surface="onMedia"
						className={twMerge(
							'absolute top-2 right-2 z-10',
							pressed ? undefined : TOGGLE_HIDDEN_UNTIL_HOVER,
						)}
					/>
				</div>

				{list.map((card) => (
					<NewsCard
						key={card.id}
						contentId={card.id}
						size="small"
						orientation="horizontal"
						image={picsumSrc(card.seed, 240, 135)}
						href="/conteudo"
						title={card.title}
						mediaClassName={LIST_THUMB_CLASSNAME}
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
				icon="bookmark"
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
