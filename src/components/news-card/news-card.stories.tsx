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
	'xlarge-horizontal': 'w-[1224px]',
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

// Favoritar NÃO é uma variante do card: é feature assumida (decisão do Pedro em
// 2026-08-23). Todo story passa `contentId` — não existe mais o par
// "com favoritar"/"sem favoritar" pra cada combinação. O id é próprio de cada story
// porque o autodocs renderiza todas na MESMA página: com id compartilhado,
// favoritar um card acenderia o toggle de todos os outros. Os ids são fictícios
// (não existem no ARTICLE_POOL), só pra exercitar a store isoladamente.
const base = {
	title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
	image: 'https://picsum.photos/seed/news/600/338',
	href: '#',
	categoria: { label: 'Food Service', color: 'mint' as const, href: '#' },
	lead: 'Parágrafo de apoio que resume a matéria em uma ou duas linhas.',
	author: 'Ana Autora',
	authorHref: '#',
}

// Matriz size × orientation — as variantes de fato do componente.
export const LargeVertical: Story = {
	args: { ...base, size: 'large', orientation: 'vertical', contentId: 'story-large-vertical' },
}
export const MediumVertical: Story = {
	args: { ...base, size: 'medium', orientation: 'vertical', contentId: 'story-medium-vertical' },
}
export const SmallVertical: Story = {
	args: { ...base, size: 'small', orientation: 'vertical', contentId: 'story-small-vertical' },
}
export const LargeHorizontal: Story = {
	args: { ...base, size: 'large', orientation: 'horizontal', contentId: 'story-large-horizontal' },
}
/** Sem lead — a linha do título/toggle mais apertada, sem parágrafo de apoio embaixo. */
export const MediumHorizontal: Story = {
	args: {
		...base,
		size: 'medium',
		orientation: 'horizontal',
		lead: undefined,
		contentId: 'story-medium-horizontal',
	},
}
/** Sem lead nem autor — a linha mais apertada de todas pro toggle conviver com a categoria. */
export const SmallHorizontal: Story = {
	args: {
		...base,
		size: 'small',
		orientation: 'horizontal',
		lead: undefined,
		author: undefined,
		contentId: 'story-small-horizontal',
	},
}

// Slots de conteúdo desligados.
export const SemCategoria: Story = {
	args: { ...base, categoria: undefined, contentId: 'story-sem-categoria' },
}
export const SoHeadline: Story = {
	args: {
		...base,
		categoria: undefined,
		lead: undefined,
		author: undefined,
		contentId: 'story-so-headline',
	},
}
/** Sem imagem: o toggle troca de âncora — sai da mídia e vai pra linha do título. */
export const SemImagem: Story = {
	args: { ...base, image: undefined, contentId: 'story-sem-imagem' },
}
/** Sem imagem + título de 1 linha — o caso mais apertado pra âncora na linha do título. */
export const SemImagemTituloCurto: Story = {
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
export const SemImagemTituloLongo: Story = {
	args: {
		...base,
		title:
			'Meu colega robô: como WEG, Mitsubishi e uma dezena de outras fabricantes do setor de food service e food connection estão apostando pesado em robôs colaborativos para ajudar humanos em linhas de produção cada vez mais automatizadas e complexas',
		image: undefined,
		contentId: 'story-sem-imagem-titulo-longo',
	},
}
export const TituloUmaLinha: Story = {
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
export const TituloQuatroLinhas: Story = {
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
function FavoritadoRender() {
	useEffect(() => {
		favoritar('story-pressed-demo')
	}, [])
	return <NewsCard {...base} contentId="story-pressed-demo" />
}
export const Favoritado: Story = {
	render: () => <FavoritadoRender />,
}

// Card de vídeo (mediaOverlay=PlayButton) — confirma que o PlayButton central e o
// toggle no canto coexistem sem colidir, nos dois tamanhos citados: destaque
// grande e os pequenos da lista lateral (o repo não tem VideoCard usando o
// NewsCard — VideoCard é outro componente — então cobrimos a própria capacidade
// mediaOverlay do NewsCard, que é o mecanismo compartilhado).
export const VideoGrande: Story = {
	args: {
		...base,
		size: 'large',
		orientation: 'vertical',
		contentId: 'story-video-grande',
		mediaOverlay: <PlayButton size="large" as="div" />,
	},
}
export const VideoPequeno: Story = {
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
export const FotoClara: Story = {
	args: {
		...base,
		image: 'https://picsum.photos/seed/bright-sky-white/600/338',
		contentId: 'story-foto-clara',
	},
}
export const FotoEscura: Story = {
	args: {
		...base,
		image: 'https://picsum.photos/seed/black-storm-night2/600/338',
		contentId: 'story-foto-escura',
	},
}

// "News Card 2.0 / Boxed" + Inverse + Patrocinado — o destaque único da home
// (node 6775:18688). Moldura própria, split 50/50 com a imagem à direita (3:2)
// sangrando até a borda, SponsorLine no rodapé. Empilha (imagem em cima) abaixo de lg:.
// `inverse` é fixo nesta variante: a foto é sempre à direita, não existe versão com
// a foto à esquerda (decisão do Pedro em 2026-08-23) — por isso não há story dela.
// Clamps 3 (título) e 4 (lead) espelham o DestaqueUnico, onde a conta que justifica
// esse par está documentada.
const destaque = {
	title: 'Fispal Food Service terá ativações com chefs e executivos do setor',
	image: 'https://picsum.photos/seed/home-destaque-unico/1224/816',
	href: '#',
	categoria: { label: 'Food Service', color: 'mint' as const, href: '#' },
	lead: 'Maior evento da América do Sul voltado ao setor de alimentação fora do lar, a Fispal Food Service 2026 reunirá, entre os dias 26 e 29 de maio no Distrito Anhembi, não apenas lançamentos e soluções, mas também uma agenda de conteúdo com nomes de peso da gastronomia.',
	size: 'xlarge' as const,
	orientation: 'horizontal' as const,
	boxed: true,
	inverse: true,
	mediaRatio: 'photo' as const,
	titleClassName: 'line-clamp-3',
	leadClassName: 'line-clamp-4',
}

export const XLargeBoxed: Story = {
	args: { ...destaque, contentId: 'story-destaque-unico' },
}

/** Com patrocinador (RN05) — SponsorLine ancorada no rodapé da coluna de texto. */
export const XLargeBoxedPatrocinado: Story = {
	args: {
		...destaque,
		contentId: 'story-destaque-unico-sponsor',
		sponsor: { company: 'Company Name', href: '#' },
	},
}
