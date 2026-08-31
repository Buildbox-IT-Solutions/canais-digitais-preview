import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import { NewsCard } from '~/components/news-card'
import { corDaCategoria, estaBloqueado, leadDoMaterial } from '~/lib/biblioteca'
import type { MaterialType } from '~/mocks/biblioteca'
import type { IDestaqueBibliotecaProps } from './types'

/**
 * Componente: Destaque da Biblioteca exclusiva
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8424-109762
 * Tokens: --color-primary-600, --color-secondary-50, --text-headline-md
 *
 * O material mais recente do acervo, em destaque no topo da aba. **Um só, sem slide.**
 *
 * O Figma pedia 3 itens em carrossel automático de 6s, com dots e pausa no hover — estava
 * implementado assim e foi simplificado por decisão do Pedro em 2026-08-31. Sumiram com
 * ele o timer, o estado de índice, os dots, a pausa por hover/foco, o respeito a
 * `prefers-reduced-motion` e o `aria-live`: nada disso tem razão de existir sem o
 * movimento que os justificava. **Para o back-end: a anotação do Figma sobre o carrossel
 * do destaque está vencida.**
 *
 * O card é o `NewsCard` `boxed` + `xlarge` + `horizontal` — o mesmo split 50/50 do
 * destaque único da home, não um card novo. O que a Biblioteca acrescenta é o `badge`
 * (tipo do material, com cadeado quando bloqueado) ao lado da categoria.
 *
 * **Sem ação de baixar.** O Figma não desenha CTA aqui: o card inteiro leva ao post, e o
 * download acontece nos LibCards das seções. O cadeado no badge continua aparecendo — ele
 * informa o estado do material, não oferece ação.
 */

const TIPO_LABEL: Record<MaterialType, string> = {
	ebook: 'E-book',
	whitepaper: 'Whitepaper',
	infografico: 'Infográfico',
}

export function DestaqueBiblioteca({ material, gate, className }: IDestaqueBibliotecaProps) {
	const bloqueado = estaBloqueado(material, gate)

	return (
		<section data-handoff="destaque-biblioteca" className={twMerge('w-full', className)}>
			<NewsCard
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
		</section>
	)
}
