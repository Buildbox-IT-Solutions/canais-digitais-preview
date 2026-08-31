import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import { NewsCard } from '~/components/news-card'
import { corDaCategoria, estaBloqueado, leadDoMaterial } from '~/lib/biblioteca'
import { prefersReducedMotion } from '~/lib/prefers-reduced-motion'
import type { MaterialType } from '~/mocks/biblioteca'
import type { IDestaqueBibliotecaProps } from './types'

/**
 * Componente: Destaque da Biblioteca exclusiva
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8424-109762
 * Tokens: --color-primary-600, --color-neutral-100 (dots inativos), --text-headline-md
 *
 * Anotação do Figma: "1. Destaque com os 3 itens mais recentes. 2. Slide carrossel
 * automático."
 *
 * O card é o `NewsCard` `boxed` + `xlarge` + `horizontal` — o mesmo split 50/50 do
 * destaque único da home, não um card novo. O que a Biblioteca acrescenta é o `badge`
 * (tipo do material, com cadeado quando bloqueado) ao lado da categoria.
 *
 * ## O avanço automático e as três formas de pará-lo
 *
 * Avança sozinho a cada 6s e para de vez em qualquer uma destas situações:
 *
 * 1. **`prefers-reduced-motion`** — quem pediu menos movimento ao sistema não recebe
 *    carrossel automático. Não é pausa: nunca chega a começar.
 * 2. **Ponteiro sobre o destaque** — pausa enquanto o mouse está em cima, retoma ao sair.
 *    Ler uma chamada que troca sozinha no meio da leitura é a queixa clássica do padrão.
 * 3. **Foco de teclado dentro do destaque** — mesma pausa. Sem isso, quem navega por Tab
 *    perde o alvo quando o slide troca.
 *
 * Os dots são `<button>` de verdade, não enfeite: clicar leva ao slide. Um indicador de
 * posição que não é controle deixa o carrossel automático sem nenhuma saída manual.
 *
 * **Sem ação de baixar.** O Figma não desenha CTA no Destaque: o card inteiro leva ao
 * post, e o download acontece nos LibCards das seções. O cadeado no badge continua
 * aparecendo — ele informa o estado do material, não oferece ação.
 */

const TIPO_LABEL: Record<MaterialType, string> = {
	ebook: 'E-book',
	whitepaper: 'Whitepaper',
	infografico: 'Infográfico',
}

/** Intervalo do avanço automático. */
const INTERVALO_MS = 6000

export function DestaqueBiblioteca({ materiais, gate, className }: IDestaqueBibliotecaProps) {
	const [indice, setIndice] = useState(0)
	const [pausado, setPausado] = useState(false)
	const total = materiais.length

	// `prefersReducedMotion()` lê o media query na hora; guardado em estado pra o valor
	// não divergir entre render e efeito (e pra não quebrar no SSR, onde não há window).
	const [reduzMovimento, setReduzMovimento] = useState(false)
	useEffect(() => setReduzMovimento(prefersReducedMotion()), [])

	// `total` no deps: se o acervo encolher, o índice preso em 2 apontaria para o vazio.
	useEffect(() => {
		if (indice < total) return
		setIndice(0)
	}, [total, indice])

	const timerRef = useRef<number | null>(null)
	useEffect(() => {
		if (reduzMovimento || pausado || total <= 1) return
		timerRef.current = window.setInterval(
			() => setIndice((i) => (i + 1) % total),
			INTERVALO_MS,
		)
		return () => {
			if (timerRef.current !== null) window.clearInterval(timerRef.current)
		}
	}, [reduzMovimento, pausado, total])

	if (total === 0) return null

	const material = materiais[Math.min(indice, total - 1)]
	const bloqueado = estaBloqueado(material, gate)

	return (
		<section
			data-handoff="destaque-biblioteca"
			aria-roledescription="carrossel"
			aria-label="Materiais em destaque"
			onMouseEnter={() => setPausado(true)}
			onMouseLeave={() => setPausado(false)}
			onFocus={() => setPausado(true)}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPausado(false)
			}}
			className={twMerge('flex flex-col items-center gap-4', className)}
		>
			{/* `aria-live="polite"`: o avanço automático precisa ser anunciado, mas sem
			    interromper quem está lendo outra coisa. */}
			<div aria-live="polite" aria-atomic="false" className="w-full">
				<NewsCard
					key={material.id}
					size="xlarge"
					orientation="horizontal"
					boxed
					title={material.titulo}
					lead={leadDoMaterial(material)}
					leadClassName="line-clamp-3"
					image={material.capaUrl}
					href={material.arquivoUrl}
					categoria={{ label: material.categoria, color: corDaCategoria(material.categoria) }}
					badge={
						<Badge
							label={TIPO_LABEL[material.tipo]}
							tone="secondary"
							icon={bloqueado ? <Icon name="lock" className="size-4" /> : undefined}
						/>
					}
				/>
			</div>

			<div className="flex items-center gap-2">
				{materiais.map((m, i) => (
					<button
						key={m.id}
						type="button"
						onClick={() => setIndice(i)}
						aria-label={`Destaque ${i + 1} de ${total}`}
						aria-current={i === indice ? 'true' : undefined}
						className={twMerge(
							'size-1.5 rounded-full transition-colors',
							i === indice ? 'bg-primary-600' : 'bg-neutral-100 hover:bg-neutral-200',
						)}
					/>
				))}
			</div>
		</section>
	)
}
