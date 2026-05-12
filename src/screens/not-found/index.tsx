import { Button } from '~/components/button'
import { Byline } from '~/components/byline'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { SectionTitle } from '~/components/section-title'
import { Thumbnail } from '~/components/thumbnail'
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
					<Button label="Ir para Página Inicial" href="/" type="outlined" size="medium" />
				</div>
			</section>

			<section className="pb-20">
				<SectionTitle label="Você também pode gostar" color="primary-600" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-8 grid grid-cols-4 gap-6">
					{NOT_FOUND_CARDS.map((c) => (
						<article key={c.id} className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc(c.seed, 600, 400)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-2">
								<Categoria color={c.categoryColor} label={c.category} />
								<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
									<a href="/conteudo" className="group-hover:underline">
										{c.title}
									</a>
								</h3>
								<Byline author={c.author} href="#" size="sm" />
							</div>
						</article>
					))}
				</div>
			</section>

			<FooterDesktop />
		</main>
	)
}
