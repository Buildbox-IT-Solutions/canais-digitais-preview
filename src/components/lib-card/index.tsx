import type { ReactNode } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Badge } from '~/components/badge'
import { Categoria } from '~/components/categoria'
import { Icon } from '~/components/icon'
import { Image } from '~/components/image'
import { LibActionBar } from '~/components/lib-action-bar'
import { corDaCategoria, leadDoMaterial } from '~/lib/biblioteca'
import type { MaterialType } from '~/mocks/biblioteca'
import type { ILibCardProps } from './types'

/**
 * Componente: LibCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8296-91809
 * Variantes (Figma): State (Enabled | Hovered | Disabled) × Expanded (Off | On) — 4
 *            combinações desenhadas; não existe `Enabled + Expanded=On`.
 * Tokens: --color-primary-600, --color-secondary-50, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-100, --color-neutral-600, --color-neutral-900, --color-white,
 *         --text-title-md, --text-body-sm, --text-label-sm
 *
 * Card do acervo da Biblioteca exclusiva. Fechado mostra capa 16:9 + badge + categoria +
 * título; expandido revela o SidePanel abaixo, com o lead do post e a ActionBar.
 *
 * A ActionBar não vive mais aqui: virou `~/components/lib-action-bar` em 2026-08-31,
 * quando o destaque da aba passou a pedir as mesmas quatro ações (node 8480:3299). Este
 * card e o destaque consomem o MESMO componente — é o que faz "os mesmos recursos" ser
 * verdade em vez de promessa. O que muda entre os dois é só o `align` dos três ícones,
 * porque os dois nós do Figma discordam nesse ponto (ver types.ts da barra).
 *
 * ## Abre no CLIQUE, não no hover
 *
 * Não abre no hover: hover não existe em touch, e abrir no passe do mouse empurra o
 * conteúdo sem que ninguém tenha pedido. Como o gatilho é `<button>` de verdade, teclado
 * e leitor de tela ganham o mesmo comportamento de graça, e `aria-expanded` carrega o
 * estado.
 *
 * ## O card é UM alvo de clique, nos dois estados
 *
 * Fechado ele expande; expandido ele recolhe. Capa, categoria e título são o mesmo botão
 * sempre, e o hover leva o título a ultramarine nos dois casos (`State=Hovered` do Figma,
 * `Expanded=Off` e `On`).
 *
 * **O título NÃO é link, e isso foi decidido duas vezes.** Uma versão intermediária
 * tornou o título do expandido um link para o post (node `8458:116227`), e a decisão foi
 * revertida pelo Pedro em 2026-08-30: com o título clicável, a área que sobra para
 * FECHAR o card encolhe para a capa, e quem só queria recolher passa a acertar o post
 * sem querer. Recolher é a ação frequente, abrir o post é a ocasional. Quem abre o post é
 * o `open_in_new` da ActionBar, que existe exatamente para isso ("Abre o post", na
 * anotação).
 *
 * ## Abre para BAIXO, e a capa não se move
 *
 * O card expandido do Figma (262×411) é o card fechado (236px) mais 12px de padding de
 * cada lado, em COLUNA, com o SidePanel abaixo. A expansão **não muda a largura da célula**:
 * o card ocupa o mesmo espaço, só a altura cresce, e nenhum vizinho se move.
 *
 * A moldura (`p-3` + borda) cresce **para fora** — `-mx-3 -mt-3` mais 24px de largura —,
 * então a capa do card aberto continua exatamente onde estava e do mesmo tamanho. Sem isso
 * a moldura comprimiria o conteúdo: a capa ficaria 24px mais estreita e 12px à direita da
 * dos vizinhos, desalinhada também do título da seção quando o card aberto é o primeiro.
 * (Tentado em 2026-08-31 e revertido no mesmo dia, exatamente por isso.)
 *
 * **Quem precisa dar espaço para essa sangria é o container**, e é a parte fácil de
 * esquecer: numa grade, a calha de 24px já serve; num CARROSSEL, não — nas pontas o
 * scroller define a origem e o fim, e o que passa disso não é alcançável. O `LibCarousel`
 * reserva 12px de padding nas duas pontas por isso. Ver o bloco de doc dele.
 *
 * ## Largura é do consumidor, não do card
 *
 * O card não declara largura própria. No trilho o `<li>` usa a `--lib-card` derivada pelo
 * `LibCarousel`; na grade ele preenche a célula. Um `w-[236px]` interno brigaria com os
 * dois e foi o que deixou a grade filtrada desalinhada.
 *
 * ## Os três eixos que decidem a aparência — e que são independentes
 *
 * 1. **`material.disponivel`** — acervo. `false` = despublicado: badge cinza
 *    "Indisponível", categoria e título esmaecidos, sem badge de tipo, e o card **não é
 *    botão** (não há painel a abrir). É o "Materiais indisponíveis aparecem na lista
 *    'Disabled'" da anotação: o card CONTINUA na lista, não é filtrado fora.
 * 2. **`bloqueado`** — usuário. Cadeado no badge de tipo. Vem pronto de `estaBloqueado()`;
 *    o card não conhece o gate nem o cadastro. Bloqueado NÃO esmaece nada e NÃO impede
 *    abrir: a vitrine é navegável, o bloqueio acontece só na ação de baixar.
 * 3. **`aberto`** — interação. Ortogonal aos outros dois.
 *
 * Indisponível vence bloqueado: não faz sentido oferecer "complete o cadastro" para um
 * material que não existe mais.
 *
 * ## Sem selo "Baixado"
 *
 * O Figma não desenha selo de já-baixado, e ele saiu na revisão de 2026-08-30. O campo
 * `material.baixado` continua no mock mas não tem consumidor visual. Ver ds/achados.md.
 */

const TIPO_LABEL: Record<MaterialType, string> = {
	ebook: 'E-book',
	whitepaper: 'Whitepaper',
	infografico: 'Infográfico',
}

const TITULO_BASE = 'line-clamp-3 text-left font-display font-bold text-title-md transition-colors'

export function LibCard({
	material,
	aberto = false,
	onAbertoChange,
	bloqueado = false,
	onBloqueado,
	className,
}: ILibCardProps) {
	const { titulo, tipo, categoria, capaUrl, disponivel } = material

	// Indisponível nunca abre: não há ação possível no painel.
	const podeAbrir = disponivel
	const estaAberto = aberto && podeAbrir

	const midia = (
		<div className="relative">
			<Image src={capaUrl} alt="" ratio="video" className={disponivel ? undefined : 'opacity-60'} />

			{disponivel ? (
				<Badge
					label={TIPO_LABEL[tipo]}
					tone="secondary"
					// Cadeado é o ÚNICO sinal de bloqueado no card fechado — o material
					// bloqueado não é esmaecido nem escondido (vitrine livre).
					icon={bloqueado ? <Icon name="lock" className="size-4" /> : undefined}
					className="absolute top-2 left-2"
				/>
			) : (
				// #E9EAEC do Figma é `neutral-50`; o tone `neutral` do Badge é `neutral-100`.
				<Badge label="Indisponível" tone="neutral" className="absolute top-2 left-2 bg-neutral-50" />
			)}
		</div>
	)

	// `CategoriaColor` não tem tom neutro — o indisponível sobrescreve por className
	// (ver ds/achados.md).
	const categoriaNode = (
		<Categoria
			label={categoria}
			color={corDaCategoria(categoria)}
			className={disponivel ? undefined : 'text-neutral-600'}
		/>
	)

	if (!estaAberto) {
		const conteudo = (
			<>
				{midia}
				<div className="flex flex-col gap-2">
					{categoriaNode}
					{/* `State=Hovered, Expanded=Off`: o hover do card leva o título a ultramarine.
					    Grupo NOMEADO — o trilho tem um `group/trilho` para as setas, e com dois
					    grupos anônimos aninhados o hover em qualquer ponto do carrossel acendia
					    o título de TODOS os cards. */}
					<h3
						className={twMerge(
							TITULO_BASE,
							disponivel ? 'text-primary-600' : 'text-neutral-600',
							disponivel && 'group-hover/card:text-secondary-950',
						)}
					>
						{titulo}
					</h3>
				</div>
			</>
		)

		return (
			<article
				data-handoff="lib-card"
				data-estado={disponivel ? (bloqueado ? 'bloqueado' : 'enabled') : 'indisponivel'}
				className={twMerge('flex w-full min-w-0 flex-col', className)}
			>
				{podeAbrir ? (
					<button
						type="button"
						onClick={() => onAbertoChange?.(true)}
						aria-expanded={false}
						className="group/card flex w-full min-w-0 flex-col gap-3 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
					>
						{conteudo}
					</button>
				) : (
					<div className="flex w-full min-w-0 flex-col gap-3">{conteudo}</div>
				)}
			</article>
		)
	}

	return (
		<article
			data-handoff="lib-card"
			data-estado={bloqueado ? 'bloqueado' : 'enabled'}
			data-aberto="true"
			className={twMerge(
				// gap-2 = os 8px entre o card e o SidePanel no Figma. A moldura cresce para
				// FORA para a capa não se mover (ver o bloco de doc); quem reserva o espaço
				// dessa sangria é o container.
				'-mx-3 -mt-3 flex w-[calc(100%+1.5rem)] min-w-0 flex-col items-start gap-2 rounded-lg border border-neutral-100 bg-white p-3',
				className,
			)}
		>
			{/* O card inteiro recolhe — mesmo alvo do fechado, ação inversa. Manter a área
			    grande é o ponto: recolher é a ação frequente. */}
			<button
				type="button"
				onClick={() => onAbertoChange?.(false)}
				aria-expanded
				className="group/card flex w-full min-w-0 flex-col gap-3 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
			>
				{midia}
				<div className="flex flex-col gap-2">
					{categoriaNode}
					<h3
						className={twMerge(TITULO_BASE, 'text-primary-600 group-hover/card:text-secondary-950')}
					>
						{titulo}
					</h3>
				</div>
			</button>

			<SidePanel
				material={material}
				bloqueado={bloqueado}
				onBloqueado={onBloqueado}
			/>
		</article>
	)
}

function SidePanel({
	material,
	bloqueado,
	onBloqueado,
}: {
	material: ILibCardProps['material']
	bloqueado: boolean
	onBloqueado: ILibCardProps['onBloqueado']
}): ReactNode {
	return (
		<div className="flex w-full min-w-0 flex-col gap-4">
			{/* Lead do post; sem lead, primeiro parágrafo (anotação). 4 linhas é a altura que
			    o Figma reserva no card expandido. */}
			<p className="line-clamp-4 font-body text-body-sm text-neutral-900">
				{leadDoMaterial(material)}
			</p>

			<LibActionBar
				material={material}
				bloqueado={bloqueado}
				onBloqueado={onBloqueado}
			/>
		</div>
	)
}
