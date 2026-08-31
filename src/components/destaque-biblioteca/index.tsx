import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Icon } from '~/components/icon'
import { LibActionBar } from '~/components/lib-action-bar'
import { NewsCard } from '~/components/news-card'
import { corDaCategoria, estaBloqueado, leadDoMaterial } from '~/lib/biblioteca'
import type { MaterialType } from '~/mocks/biblioteca'
import type { IDestaqueBibliotecaProps } from './types'

/**
 * Componente: Destaque da Biblioteca exclusiva
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8480-3299
 * Tokens: --color-primary-600, --color-secondary-50, --color-neutral-100,
 *         --text-headline-md, --text-body-lg
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
 * ## Os mesmos recursos dos cards listados (node 8480:3299)
 *
 * O destaque ganhou a `LibActionBar` — baixar, abrir o post, compartilhar, favoritar —
 * exatamente a mesma dos LibCards, não uma cópia: a barra foi EXTRAÍDA do LibCard para
 * isso. Duas cópias divergiriam no primeiro ajuste, e "os mesmos recursos" é justamente o
 * que o Figma passou a pedir.
 *
 * O badge de tipo (com cadeado quando bloqueado) saiu de perto da categoria e foi para o
 * canto superior direito da IMAGEM, inset de 16px. 🔴 A confirmar: no LibCard o mesmo
 * badge fica em cima da capa à ESQUERDA (`top-2 left-2`, node 8296:91809) — os dois nós do
 * Figma discordam, e aqui cada um segue o seu.
 *
 * ## O que é derivado do Figma, medido
 *
 * Card 1080×303,75 → split 50/50 com a imagem em 16:9 (540×303,75). Coluna de texto com
 * `px-32/pt-32`, bloco de texto no topo e ActionBar na base (`justify-between`).
 * Título Aleo Bold 28/36 = `--text-headline-md`, **um degrau abaixo** do destaque único da
 * home (`headline-lg`, 32/40) que o `NewsCard` `xlarge` entrega por default — daí o
 * override no `titleClassName`. Clamps vêm das alturas dos nós: título 72px = 2 linhas de
 * 36, lead 72px = 3 linhas de 24.
 *
 * **Sem CTA próprio no card.** O download é o "Baixar" da ActionBar, o mesmo botão dos
 * cards listados; o cadeado no badge informa o estado, não oferece ação.
 */

const TIPO_LABEL: Record<MaterialType, string> = {
	ebook: 'E-book',
	whitepaper: 'Whitepaper',
	infografico: 'Infográfico',
}

export function DestaqueBiblioteca({
	material,
	gate,
	onBloqueado,
	className,
}: IDestaqueBibliotecaProps) {
	const bloqueado = estaBloqueado(material, gate)

	return (
		<section data-handoff="destaque-biblioteca" className={twMerge('w-full', className)}>
			<NewsCard
				size="xlarge"
				orientation="horizontal"
				boxed
				title={material.titulo}
				// 2 linhas + headline-md: as duas medidas saem do nó do Figma (título de 72px de
				// altura, Headline/Medium/Emphasized). O `lg:` é obrigatório — o que existe para
				// sobrescrever é o `lg:text-headline-lg` do NewsCard, e classe sem variante não
				// vence classe com variante no twMerge.
				titleClassName="line-clamp-2 lg:text-headline-md"
				lead={leadDoMaterial(material)}
				leadClassName="line-clamp-3"
				image={material.capaUrl}
				href={material.arquivoUrl}
				categoria={{ label: material.categoria, color: corDaCategoria(material.categoria) }}
				mediaBadge={
					<Badge
						label={TIPO_LABEL[material.tipo]}
						tone="secondary"
						icon={bloqueado ? <Icon name="lock" className="size-4" /> : undefined}
					/>
				}
				actions={
					<LibActionBar
						material={material}
						bloqueado={bloqueado}
						// Node 8480:3308: os três ícones colados no "Baixar", não na borda do card.
						// É o que este nó pede, e discorda do card listado — ver ds/achados.md.
						align="start"
						onBloqueado={onBloqueado}
					/>
				}
			/>
		</section>
	)
}
