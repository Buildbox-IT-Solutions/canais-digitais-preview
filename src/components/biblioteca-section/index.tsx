import { useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { LibCard } from '~/components/lib-card'
import { LibCarousel } from '~/components/lib-carousel'
import type { IBibliotecaSectionProps } from './types'

/**
 * Componente: Biblioteca Section — vitrine do acervo na home.
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8424-112623
 * Tokens: --color-primary-600, --color-secondary-50, --color-secondary-500,
 *         --text-headline-md, --text-body-md
 *
 * Anotação do Figma: "Proposta para substituição do banner de 'Material para Download'.
 * 1. Uma seção mostrando os 12 'Materiais de download' mais recentes. Objetivo: mostrar
 * valor para o leitor na home e incentivar ainda mais o cadastro. (Semelhante a
 * 'Reportagens especiais' do CE)".
 *
 * É PROPOSTA, e por isso **convive com o `DownloadSection`** na home em vez de
 * substituí-lo: as regras que a anotação sugere ainda vão para aprovação do cliente
 * (decisão do Pedro em 2026-08-30). Substituir antes disso apagaria o banner sem
 * decisão tomada. Ver ds/achados.md.
 *
 * O painel tem gradiente próprio (`secondary-500` → `secondary-50`, ambos a 40%) — é o
 * único recurso que separa a seção do resto da home, já que ela não tem o grafismo de
 * `Section Title / Style 1` das outras.
 *
 * Reusa `LibCarousel` + `LibCard` sem variante nova: o card se comporta aqui igual ao da
 * aba logada, expansão inclusa. A diferença é só o container. **Para o back-end: é a
 * mesma seção, não uma cópia com regras próprias.**
 *
 * ## O trilho sangra até a borda do painel
 *
 * O painel tem padding horizontal, e sem tratar isso o trilho era recortado ANTES do
 * fim do box azul: sobrava uma faixa de fundo à direita e o corte parecia acidental, não
 * um convite a rolar. O trilho recebe margem negativa à direita do tamanho exato do
 * padding (`-mr-6 lg:-mr-10`), então o card cortado encosta na borda do painel. À
 * esquerda o padding fica: é ele que alinha o primeiro card ao título.
 *
 * O gate NÃO é resolvido aqui. Na home o visitante pode nem estar logado, e o cadeado
 * exige saber o estado do cadastro — que é dado da área logada. Os cards entram sem
 * bloqueio, e a conversão acontece ao chegar na aba. 🔴 A confirmar: o cadeado deve
 * aparecer na home para quem já está logado com cadastro incompleto? Ver ds/achados.md.
 */
export function BibliotecaSection({
	materiais,
	href = '/biblioteca-exclusiva',
	className,
}: IBibliotecaSectionProps) {
	// Um card expandido por vez, como nas seções da aba logada.
	const [abertoId, setAbertoId] = useState<string | null>(null)

	if (materiais.length === 0) return null

	return (
		<section
			data-handoff="biblioteca-section-home"
			className={twMerge('w-full px-4 lg:px-6', className)}
		>
			<div className="mx-auto w-full max-w-screen-xl">
				<div className="flex flex-col gap-10 rounded-lg bg-linear-[234deg,--alpha(var(--color-secondary-500)/40%),--alpha(var(--color-secondary-50)/40%)] px-6 pt-8 pb-10 lg:px-10">
					<header className="flex flex-col gap-1">
						<h2 className="font-display font-bold text-headline-md text-primary-600">
							<a href={href} className="transition-colors hover:text-secondary-950">
								Biblioteca exclusiva
							</a>
						</h2>
						<p className="font-body text-body-md text-primary-600">
							Análises e tendências que o setor inteiro está lendo. Baixe e-books,
							whitepapers e infográficos sem pagar nada.
						</p>
					</header>

					<LibCarousel
						ariaLabel="Biblioteca exclusiva"
						className="-mr-6 w-[calc(100%+var(--spacing)*6)] lg:-mr-10 lg:w-[calc(100%+var(--spacing)*10)]"
					>
						{materiais.map((m) => (
							<li
								key={m.id}
								className="flex min-w-0 shrink-0 grow-0 basis-[var(--lib-card)] snap-start"
							>
								<LibCard
									material={m}
									aberto={abertoId === m.id}
									onAbertoChange={(next) => setAbertoId(next ? m.id : null)}
								/>
							</li>
						))}
					</LibCarousel>
				</div>
			</div>
		</section>
	)
}
