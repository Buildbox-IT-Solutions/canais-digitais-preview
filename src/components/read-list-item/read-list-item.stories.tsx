import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReadListItem } from '.'
import { ReadListItemSkeleton } from './read-list-item-skeleton'
import { picsumSrc } from '~/mocks/articles'

const ACTIONS_ULTIMAS = [
	{ label: 'Compartilhar', icon: 'share' as const, onClick: () => {} },
	{ label: 'Salvar como favorito', icon: 'favorite-border' as const, onClick: () => {} },
	{ label: 'Remover de últimas leituras', icon: 'delete-outline' as const, onClick: () => {} },
]

const ACTIONS_FAVORITOS = [
	{ label: 'Compartilhar', icon: 'share' as const, onClick: () => {} },
	{ label: 'Remover dos favoritos', icon: 'delete-outline' as const, onClick: () => {} },
]

const ACTIONS_INDISPONIVEL = [
	{ label: 'Remover dos favoritos', icon: 'delete-outline' as const, onClick: () => {} },
]

const meta: Meta<typeof ReadListItem> = {
	title: 'List Items/ReadListItem',
	component: ReadListItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<ul className="w-[720px]">
				<Story />
			</ul>
		),
	],
	args: {
		category: 'Proteína Animal',
		categoryColor: 'coral',
		title: 'Como fazer o transporte de pescados frescos corretamente',
		href: '/conteudo',
		readAt: new Date().toISOString(),
		image: picsumSrc('read-list-item', 416, 234),
		isLast: true,
		menuActions: ACTIONS_ULTIMAS,
	},
}

export default meta
type Story = StoryObj<typeof ReadListItem>

export const LidoHoje: Story = {}

export const LidoOntem: Story = {
	args: { readAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString() },
}

export const LidoHaDias: Story = {
	args: { readAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
}

export const LidoHaSemanas: Story = {
	args: { readAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
}

export const LidoDataAbsoluta: Story = {
	args: { readAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
}

export const LidoAnoAnterior: Story = {
	args: { readAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() },
}

/** Sem imagem destacada: fallback usa a inicial da categoria, mesma cor, mesmo espaço. */
export const SemImagem: Story = {
	args: { image: undefined },
}

/** Título longo — 2 linhas no desktop, 3 no mobile (reduza a viewport para conferir). */
export const TituloLongo: Story = {
	args: {
		title:
			'Como fazer o transporte de pescados frescos corretamente: normas sanitárias, temperatura ideal e cuidados logísticos para preservar a qualidade do produto',
	},
}

export const OutraCategoria: Story = {
	args: { category: 'Ingredientes', categoryColor: 'mint', image: undefined },
}

/** Favoritos: verbo "Salvo" no rótulo de data, menu com Compartilhar + Remover dos favoritos. */
export const Favoritos: Story = {
	args: { verbo: 'Salvo', menuActions: ACTIONS_FAVORITOS },
}

/**
 * Indisponível: imagem mantida com opacidade reduzida (não some), título perde o link
 * e vai para tom apagado, data vira Badge "Indisponível", menu só com "Remover dos
 * favoritos" (sem "Compartilhar" — link morto é pior que não oferecer a ação).
 */
export const Indisponivel: Story = {
	args: { verbo: 'Salvo', indisponivel: true, menuActions: ACTIONS_INDISPONIVEL },
}

/** Loading — 10 linhas de skeleton com a métrica exata do item real, sem spinner. */
export const Loading: Story = {
	render: () => (
		<>
			{Array.from({ length: 10 }, (_, i) => (
				<ReadListItemSkeleton key={i} isLast={i === 9} />
			))}
		</>
	),
}

/** Lista com múltiplos itens — mostra o Divider entre linhas (ausente na última). */
export const Lista: Story = {
	decorators: [
		(Story, ctx) => (
			<>
				<ReadListItem
					category="Proteína Animal"
					categoryColor="coral"
					title="Como fazer o transporte de pescados frescos corretamente"
					href="/conteudo"
					readAt={new Date(Date.now() - 5 * 60 * 1000).toISOString()}
					image={picsumSrc('lista-1', 416, 234)}
					menuActions={ACTIONS_ULTIMAS}
				/>
				<ReadListItem
					category="Ingredientes"
					categoryColor="mint"
					title="Creatina além da musculação: benefícios comprovados para saúde e cognição"
					href="/conteudo"
					readAt={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()}
					menuActions={ACTIONS_ULTIMAS}
				/>
				<Story {...ctx} />
			</>
		),
	],
	args: {
		category: 'Food Service',
		categoryColor: 'primary-600',
		title: 'Tendência de fermentados exóticos: kimchi, missô e kombucha',
		readAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
		image: picsumSrc('lista-3', 416, 234),
		isLast: true,
	},
}
