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
 * ## O trilho é recortado no padding do painel, NÃO na borda do box
 *
 * O card cortado morre na borda do container invisível — o padding do painel continua
 * visível depois dele. É o oposto do que esta seção fazia até 2026-08-31: o trilho
 * recebia margem negativa do tamanho do padding (`-mr-10`) para encostar na borda do box
 * azul, e o Pedro apontou que o resultado lia errado. A referência é
 * meclivros.mec.gov.br — "a sangria não se dá exatamente nas bordas do box e sim nas
 * bordas de container invisível (mostra o padding lateral)".
 *
 * Por isso o `LibCarousel` entra aqui **sem className de largura**. O recorte é assunto
 * dele (ver o bloco de doc do componente); alargá-lo por fora é justamente o bug.
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
				<div className="flex flex-col gap-10 rounded-lg bg-linear-[234deg,--alpha(var(--color-secondary-500)/40%),--alpha(var(--color-secondary-50)/40%)] px-6 pt-8 pb-10 lg:px-8">
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

					<LibCarousel ariaLabel="Biblioteca exclusiva">
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
