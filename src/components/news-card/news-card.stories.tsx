import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { favoritar } from '~/lib/favoritos-store'
import { PlayButton } from '~/components/play-button'
import { NewsCard } from './index'

/** Molduras ILUSTRATIVAS para diferenciar os tamanhos no Storybook.
 *  Decisão (Opção B, provisória): o card é fluido e a largura real vem do
 *  col-span do grid da TELA, não do componente. Os px abaixo são só
 *  aproximação relativa (lg > md > sm), não spec de produção. */
const WIDTHS: Record<string, string> = {
	'large-vertical': 'w-[600px]',
	'medium-vertical': 'w-[392px]',
	'small-vertical': 'w-[288px]',
	'large-horizontal': 'w-[912px]',
	'medium-horizontal': 'w-[600px]',
	'small-horizontal': 'w-[392px]',
}

const meta: Meta<typeof NewsCard> = {
	title: 'Cards/NewsCard',
	component: NewsCard,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story, ctx) => (
			// MemoryRouter: NewsCard usa useFavoritoToggle por baixo (useSearchParams/
			// useLogado), que exige contexto de Router — sem ele o Storybook quebra
			// assim que qualquer story passa `contentId`. `?logado=true` deixa o toggle
			// clicável de verdade no canvas (mesma convenção usada no app).
			<MemoryRouter initialEntries={['/?logado=true']}>
				<div
					className={
						WIDTHS[`${ctx.args.size ?? 'large'}-${ctx.args.orientation ?? 'vertical'}`]
					}
				>
					<Story />
				</div>
			</MemoryRouter>
		),
	],
}
export default meta
type Story = StoryObj<typeof NewsCard>

const base = {
	title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
	image: 'https://picsum.photos/seed/news/600/338',
	href: '#',
	categoria: { label: 'Food Service', color: 'mint' as const, href: '#' },
	lead: 'Parágrafo de apoio que resume a matéria em uma ou duas linhas.',
	author: 'Ana Autora',
	authorHref: '#',
}

export const LargeVertical: Story = { args: { ...base, size: 'large', orientation: 'vertical' } }
export const MediumVertical: Story = { args: { ...base, size: 'medium', orientation: 'vertical' } }
export const SmallVertical: Story = { args: { ...base, size: 'small', orientation: 'vertical' } }
export const LargeHorizontal: Story = { args: { ...base, size: 'large', orientation: 'horizontal' } }
export const MediumHorizontal: Story = { args: { ...base, size: 'medium', orientation: 'horizontal', lead: undefined } }
export const SmallHorizontal: Story = { args: { ...base, size: 'small', orientation: 'horizontal', lead: undefined, author: undefined } }
export const SemCategoria: Story = { args: { ...base, categoria: undefined } }
export const SoHeadline: Story = { args: { ...base, categoria: undefined, lead: undefined, author: undefined } }

// Com toggle de favoritar (contentId) — as 6 combinações de size × orientation.
// `contentId` usa ids fictícios (não existem no ARTICLE_POOL) só pra exercitar a
// store isoladamente, sempre partindo de "não favoritado" nesta story.
export const ComFavoritarLargeVertical: Story = {
	args: { ...base, size: 'large', orientation: 'vertical', contentId: 'story-large-vertical' },
}
export const ComFavoritarMediumVertical: Story = {
	args: { ...base, size: 'medium', orientation: 'vertical', contentId: 'story-medium-vertical' },
}
export const ComFavoritarSmallVertical: Story = {
	args: { ...base, size: 'small', orientation: 'vertical', contentId: 'story-small-vertical' },
}
export const ComFavoritarLargeHorizontal: Story = {
	args: { ...base, size: 'large', orientation: 'horizontal', contentId: 'story-large-horizontal' },
}
/** Sem lead — linha da categoria/toggle mais apertada, sem parágrafo de apoio embaixo. */
export const ComFavoritarMediumHorizontal: Story = {
	args: {
		...base,
		size: 'medium',
		orientation: 'horizontal',
		lead: undefined,
		contentId: 'story-medium-horizontal',
	},
}
/** Sem lead nem autor — a linha mais apertada de todas pro toggle conviver com a categoria. */
export const ComFavoritarSmallHorizontal: Story = {
	args: {
		...base,
		size: 'small',
		orientation: 'horizontal',
		lead: undefined,
		author: undefined,
		contentId: 'story-small-horizontal',
	},
}

// Casos extras de ancoragem no título (correção de posição pós-Favoritos) — a nova
// âncora é o título, então precisa funcionar mesmo sem categoria e sem imagem.
export const ComFavoritarSemCategoria: Story = {
	args: { ...base, categoria: undefined, contentId: 'story-sem-categoria' },
}
export const ComFavoritarSemImagem: Story = {
	args: { ...base, image: undefined, contentId: 'story-sem-imagem' },
}
/** Sem imagem + título de 1 linha — o caso mais apertado pra âncora na linha do título. */
export const ComFavoritarSemImagemTituloCurto: Story = {
	args: {
		...base,
		title: 'Robôs no chão de fábrica',
		image: undefined,
		lead: undefined,
		author: undefined,
		contentId: 'story-sem-imagem-titulo-curto',
	},
}
/** Sem imagem + título de 4 linhas — confirma que o toggle não some nem sobrepõe em nenhuma linha do wrap. */
export const ComFavoritarSemImagemTituloLongo: Story = {
	args: {
		...base,
		title:
			'Meu colega robô: como WEG, Mitsubishi e uma dezena de outras fabricantes do setor de food service e food connection estão apostando pesado em robôs colaborativos para ajudar humanos em linhas de produção cada vez mais automatizadas e complexas',
		image: undefined,
		contentId: 'story-sem-imagem-titulo-longo',
	},
}
export const ComFavoritarTituloUmaLinha: Story = {
	args: {
		...base,
		title: 'Robôs no chão de fábrica',
		size: 'small',
		orientation: 'horizontal',
		lead: undefined,
		author: undefined,
		contentId: 'story-titulo-1-linha',
	},
}
export const ComFavoritarTituloQuatroLinhas: Story = {
	args: {
		...base,
		title:
			'Meu colega robô: como WEG, Mitsubishi e uma dezena de outras fabricantes do setor de food service e food connection estão apostando pesado em robôs colaborativos para ajudar humanos em linhas de produção cada vez mais automatizadas e complexas',
		size: 'large',
		orientation: 'vertical',
		contentId: 'story-titulo-4-linhas',
	},
}

/** Estado ligado (pressed) — favorita o contentId fictício antes de montar, pra
 * mostrar o card já salvo sem depender de clique manual no canvas. */
function ComFavoritarPressedRender() {
	useEffect(() => {
		favoritar('story-pressed-demo')
	}, [])
	return <NewsCard {...base} contentId="story-pressed-demo" />
}
export const ComFavoritarPressed: Story = {
	render: () => <ComFavoritarPressedRender />,
}

// Card de vídeo (mediaOverlay=PlayButton) — confirma que o PlayButton central e o
// toggle no canto coexistem sem colidir, nos dois tamanhos citados: destaque
// grande e os pequenos da lista lateral (o repo não tem VideoCard usando o
// NewsCard — VideoCard é outro componente — então cobrimos a própria capacidade
// mediaOverlay do NewsCard, que é o mecanismo compartilhado).
export const ComFavoritarVideoGrande: Story = {
	args: {
		...base,
		size: 'large',
		orientation: 'vertical',
		contentId: 'story-video-grande',
		mediaOverlay: <PlayButton size="large" as="div" />,
	},
}
export const ComFavoritarVideoPequeno: Story = {
	args: {
		...base,
		size: 'small',
		orientation: 'horizontal',
		lead: undefined,
		author: undefined,
		contentId: 'story-video-pequeno',
		mediaOverlay: <PlayButton size="xsmall" as="div" />,
	},
}

// Contraste da superfície onMedia nos dois extremos de foto.
export const ComFavoritarFotoClara: Story = {
	args: { ...base, image: 'https://picsum.photos/seed/bright-sky-white/600/338', contentId: 'story-foto-clara' },
}
export const ComFavoritarFotoEscura: Story = {
	args: { ...base, image: 'https://picsum.photos/seed/black-storm-night2/600/338', contentId: 'story-foto-escura' },
}
