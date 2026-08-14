/**
 * Componente: DestaqueSection
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-24819
 * Mobile: pilha única reordenada (hero, top2, top3, patrocinado, bottom2, bottom3, ad,
 * text0-2) — ordem e conteúdo diferem do desktop, por isso duas árvores (lg:hidden /
 * hidden lg:flex) em vez de reflow por classe.
 * Tokens: --text-title-lg, --text-body-md, --color-primary-600, --color-neutral-100
 *
 * Feature Favoritos — consistência de card: todo card de notícia aqui agora é um
 * `NewsCard` de verdade (era markup à mão duplicando Thumbnail+Categoria+h3/a,
 * sem toggle). Conversão usa `size="small" orientation="vertical"` em toda
 * posição secundária — é o único par size×orientation vertical que o NewsCard
 * tem além de medium/large, então tanto o texto quanto o toggle vêm de graça.
 * Nas posições de DESKTOP (top2/top3, heroText, heroBottom), o markup manual
 * antigo usava `text-title-md`, que não corresponde a NENHUM par vertical do
 * NewsCard (só existe em `small-horizontal`) — ao padronizar no componente real,
 * o texto sobe para `text-title-lg` (small-vertical) e o lead de heroText some
 * de `text-body-sm` pra `text-body-md`. Diferença pequena e reportada, não uma
 * mudança de layout: é o preço de parar de duplicar a tipografia à mão.
 *
 * O card "patrocinado" do mobile é a ÚNICA posição que NÃO virou NewsCard: tem
 * moldura própria (border+rounded+overflow-hidden) e uma `SponsorLine` abaixo do
 * título — NewsCard não tem slot pra isso (mesmo caso do card "boxed" do
 * CategoryColumn, que também ficou fora do NewsCard por esse motivo). Seguindo
 * o MESMO precedente já usado lá, o toggle foi adicionado direto nesse card
 * (Toggle irmão do <a> da Thumbnail, dentro de wrapper `relative`), com seu
 * próprio par useFavoritoAuthModal/useFavoritoToggle — sem inventar um slot novo
 * no NewsCard só pra este caso único. No desktop essa posição (primeiro item de
 * `heroBottom`) NUNCA teve tratamento especial — já era um card comum ali, então
 * vira NewsCard como os demais, sem exceção.
 *
 * Título do card patrocinado sem `leading-tight`: mesmo título (`text-title-lg`)
 * do NewsCard small-vertical — o Figma usa `leading-[24px]`, não apertado (ver
 * figma-specs/news-card-patrocinado.md e auditoria de leading em news-card/index.tsx).
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { Thumbnail } from '~/components/thumbnail'
import { Categoria } from '~/components/categoria'
import { SponsorLine } from '~/components/sponsor-line'
import { Toggle } from '~/components/toggle'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { AdFrame } from '~/components/ad-frame'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import { picsumSrc } from '~/mocks/articles'
import type { IDestaqueSectionProps } from './types'

// Mesma regra de visibilidade do toggle nos outros cards (NewsCard/CategoryColumn) —
// ligado fica sempre visível, desligado só aparece no hover fino ou focus-within.
const TOGGLE_HIDDEN_UNTIL_HOVER = twMerge(
	'transition-opacity duration-150',
	'hover-fine:opacity-0',
	'hover-fine:pointer-events-none',
	'hover-fine:group-hover:opacity-100',
	'hover-fine:group-hover:pointer-events-auto',
	'hover-fine:group-focus-within:opacity-100',
	'hover-fine:group-focus-within:pointer-events-auto',
)

export function DestaqueSection({ hero, top2, top3, heroText, heroBottom, className }: IDestaqueSectionProps) {
	const [sponsored, bottom2, bottom3] = heroBottom

	// Só o card "patrocinado" do mobile precisa de hook próprio — os demais
	// ganham favoritar de graça por serem NewsCard de verdade (ver comentário do arquivo).
	const sponsoredAuthModal = useFavoritoAuthModal(sponsored.id)
	const sponsoredToggle = useFavoritoToggle(sponsored.id, sponsoredAuthModal.requestAuth)

	return (
		<section className={twMerge('w-full', className)}>
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
				{/* Mobile (<lg): pilha única reordenada */}
				<div className="flex flex-col gap-8 lg:hidden">
					<NewsCard
						contentId={hero.id}
						size="small"
						orientation="vertical"
						image={picsumSrc(hero.seed, 600, 338)}
						href="/conteudo"
						title={hero.title}
						categoria={{ label: hero.category, color: hero.categoryColor, href: '/categoria' }}
						lead={hero.lead}
					/>

					{[top2, top3].map((article) => (
						<NewsCard
							key={article.id}
							contentId={article.id}
							size="small"
							orientation="vertical"
							image={picsumSrc(article.seed, 600, 338)}
							href="/conteudo"
							title={article.title}
							categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
						/>
					))}

					<article className="group relative bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-col rounded-sm overflow-hidden w-full">
						<div className="relative">
							<Thumbnail src={picsumSrc(sponsored.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" radius={false} />
							<Toggle
								pressed={sponsoredToggle.pressed}
								onPressedChange={sponsoredToggle.onPressedChange}
								iconOn="bookmark"
								iconOff="bookmark-border"
								labelOn="Remover dos favoritos"
								labelOff="Favoritar"
								tooltipOn="Remover"
								tooltipOff="Favoritar"
								size="medium"
								surface="onMedia"
								className={twMerge(
									'absolute top-2 right-2',
									sponsoredToggle.pressed ? undefined : TOGGLE_HIDDEN_UNTIL_HOVER,
								)}
							/>
						</div>
						<div className="flex flex-col gap-2 px-4 py-3">
							<Categoria color={sponsored.categoryColor} label={sponsored.category} href="/categoria" />
							<h3 className="text-title-lg font-display font-bold text-primary-600">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{sponsored.title}
								</a>
							</h3>
							<SponsorLine company="Company Name" href="#" />
						</div>
					</article>

					{[bottom2, bottom3].map((article) => (
						<NewsCard
							key={article.id}
							contentId={article.id}
							size="small"
							orientation="vertical"
							image={picsumSrc(article.seed, 600, 338)}
							href="/conteudo"
							title={article.title}
							categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
						/>
					))}

					<div className="flex items-center justify-center">
						<AdFrame width={300} height={250} />
					</div>

					{heroText.map((article) => (
						<NewsCard
							key={article.id}
							contentId={article.id}
							size="small"
							href="/conteudo"
							title={article.title}
							categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
							lead={article.lead}
						/>
					))}
				</div>

				{/* Desktop (>=lg) */}
				<div className="hidden lg:flex lg:flex-col lg:gap-8">
					<div className="grid grid-cols-[600px_1fr_1fr] gap-6">
						<NewsCard
							contentId={hero.id}
							size="large"
							orientation="vertical"
							image={picsumSrc(hero.seed, 1200, 675)}
							href="/conteudo"
							title={hero.title}
							categoria={{ label: hero.category, color: hero.categoryColor, href: '/categoria' }}
							lead={hero.lead}
							author={hero.author}
							authorHref="/categoria"
						/>

						<div className="flex flex-col gap-8">
							{[top2, top3].map((article) => (
								<NewsCard
									key={article.id}
									contentId={article.id}
									size="small"
									orientation="vertical"
									image={picsumSrc(article.seed, 600, 338)}
									href="/conteudo"
									title={article.title}
									categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
								/>
							))}
						</div>

						<div className="flex flex-col gap-6">
							{heroText.map((article) => (
								<NewsCard
									key={article.id}
									contentId={article.id}
									size="small"
									href="/conteudo"
									title={article.title}
									categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
									lead={article.lead}
								/>
							))}
						</div>
					</div>

					<div className="grid grid-cols-4 gap-6">
						{heroBottom.map((article) => (
							<NewsCard
								key={article.id}
								contentId={article.id}
								size="small"
								orientation="vertical"
								image={picsumSrc(article.seed, 600, 338)}
								href="/conteudo"
								title={article.title}
								categoria={{ label: article.category, color: article.categoryColor, href: '/categoria' }}
							/>
						))}
						<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
							<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
						</div>
					</div>
				</div>
			</div>

			{/* Modal de auth do toggle do card patrocinado (mobile) — mesmo padrão do
			    NewsCard/CategoryColumn: IncentiveDownloadDialog reaproveitado, "Salve"
			    em destaque no título. */}
			<IncentiveDownloadDialog
				open={sponsoredAuthModal.open}
				onDismiss={sponsoredAuthModal.onDismiss}
				onCreateAccount={sponsoredAuthModal.onCreateAccount}
				onLogin={sponsoredAuthModal.onLogin}
				icon="bookmark"
				title={
					<>
						<span className="font-bold text-secondary-500">Salve</span> este conteúdo na sua biblioteca
					</>
				}
				body="Crie sua conta para guardar conteúdos e encontrá-los depois, e receber recomendações do seu setor."
			/>
		</section>
	)
}
