import { Button } from '~/components/button'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { NOT_FOUND_CARDS, picsumSrc } from '~/mocks/articles'

/**
 * Tela: 404 — Página não encontrada
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3681-32583
 */
export default function NotFoundScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			<section className="flex flex-col items-center pb-14 pt-20">
				<div className="flex flex-col gap-8 items-center max-w-[704px] w-full px-6">
					<p className="font-display font-normal text-[105px] leading-[96px] tracking-[-0.25px] text-neutral-900 text-center w-full">
						404
					</p>
					<div className="flex flex-col gap-2 items-start text-neutral-900 text-center w-full">
						<h1 className="font-display font-bold text-headline-sm w-full">
							Página não encontrada
						</h1>
						<p className="font-body text-body-lg w-full">
							O link pode estar incorreto ou a página pode ter sido removida. Verifique o
							endereço ou volte para a página inicial.
						</p>
					</div>
					<Button label="Ir para Página Inicial" href="/home" type="outlined" size="medium" />
				</div>
			</section>

			<section className="pb-20">
				<SectionTitle label="Você também pode gostar" color="primary-600" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-8 grid grid-cols-4 gap-6">
					{NOT_FOUND_CARDS.map((c) => (
						<NewsCard
							key={c.id}
							size="small"
							orientation="vertical"
							title={c.title}
							image={picsumSrc(c.seed, 600, 400)}
							href="/conteudo"
							categoria={{ label: c.category, color: c.categoryColor }}
							author={c.author}
							authorHref="/categoria"
						/>
					))}
				</div>
			</section>

			<FooterDesktop />
		</main>
	)
}
