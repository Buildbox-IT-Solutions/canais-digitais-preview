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
 * ## Quem trava o download é a TELA, por material
 *
 * A seção não resolve sessão nem gate: recebe `bloqueado(material)` e pergunta. São dois
 * motivos com alcances diferentes — sem conta trava tudo, cadastro incompleto trava só o
 * que exige cadastro completo — e os dois abrem modais diferentes, então quem decide é
 * quem conhece o usuário.
 *
 * Isso passou a existir quando o "Baixar" começou a baixar de verdade (âncora com
 * `download`, 2026-08-31): antes o botão era inerte e o problema não aparecia; depois,
 * deixar os cards livres aqui entregaria o arquivo a quem nem tem conta — o oposto do
 * objetivo declarado da seção no Figma, "incentivar ainda mais o cadastro".
 *
 * Consequência visual: **card travado mostra o cadeado no badge**, porque é o mesmo
 * `bloqueado` que o LibCard usa para os dois sinais. Fica de propósito; cadeado em vitrine
 * é convite a criar conta.
 */
export function BibliotecaSection({
	materiais,
	href = '/biblioteca-exclusiva',
	bloqueado,
	onBloqueado,
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
						{/* Termina na primeira sentença, por decisão do Pedro em 2026-08-31: a
						    segunda listava tipos de material (whitepaper, infográfico) que o acervo
						    ainda não tem. Nenhum texto da Biblioteca cita TIPO de material — hoje
						    são só e-books, e a lista voltaria a mentir a cada mudança do acervo. */}
						<p className="font-body text-body-md text-primary-600">
							Análises e tendências que o setor inteiro está lendo.
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
									bloqueado={bloqueado?.(m) ?? false}
									onBloqueado={onBloqueado}
								/>
							</li>
						))}
					</LibCarousel>
				</div>
			</div>
		</section>
	)
}
