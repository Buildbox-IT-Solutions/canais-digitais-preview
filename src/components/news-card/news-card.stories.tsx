import { useEffect, type ReactNode } from 'react'
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
				{/* `parameters.fullWidth`: opt-out da moldura de largura, para as stories
				    compostas — elas renderizam vários tamanhos de card e aplicam a
				    largura por caso (ver `Caso`), então uma moldura única aqui usaria a
				    largura errada pra todos. O default lê os args porque as stories de
				    variante têm size/orientation fixos. */}
				{ctx.parameters.fullWidth ? (
					<Story />
				) : (
					<div className={WIDTHS[`${ctx.args.size ?? 'large'}-${ctx.args.orientation ?? 'vertical'}`]}>
						<Story />
					</div>
				)}
			</MemoryRouter>
		),
	],
}
export default meta
type Story = StoryObj<typeof NewsCard>

// Favoritar NÃO é uma variante do card: é feature assumida (decisão do Pedro em
// 2026-08-23). Todo story passa `contentId` — não existe mais o par
// "com favoritar"/"sem favoritar" pra cada combinação. O id é próprio de cada card
// porque o autodocs renderiza todos na MESMA página: com id compartilhado,
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

const TITULO_CURTO = 'Robôs no chão de fábrica'
const TITULO_LONGO =
	'Meu colega robô: como WEG, Mitsubishi e uma dezena de outras fabricantes do setor de food service e food connection estão apostando pesado em robôs colaborativos para ajudar humanos em linhas de produção cada vez mais automatizadas e complexas'

// ─── Stories compostas ───────────────────────────────────────────────────────
// Três tipos de story convivem aqui e não pesam igual: VARIANTE (o que o DS
// oferece: size × orientation, boxed, patrocinado) merece uma story cada, porque é
// o que o consumidor escolhe. SLOT desligado e FIXTURE DE REGRESSÃO (o que quebrou
// uma vez e não pode voltar) não — agrupadas por O QUE PROVAM, provam melhor:
// contraste e caso-limite só se avaliam comparando, e separadas obrigam o revisor
// a alternar de aba. Cada caso carrega o rótulo do que ele prova, visível no
// canvas — antes isso existia só no comentário do código, que quem revisa no
// Storybook não lê. Custo assumido: a story composta não tem controls por caso no
// autodocs nem URL isolada de um caso só; as 6 da matriz continuam tendo.

function Casos({ children }: { children: ReactNode }) {
	return <div className="flex flex-col gap-10">{children}</div>
}

/** Um caso rotulado dentro de uma story composta. `width` recebe a moldura
 *  ilustrativa do par size×orientation daquele card (as compostas dispensam o
 *  decorator de largura via `parameters.fullWidth`). */
function Caso({ label, width, children }: { label: string; width?: string; children: ReactNode }) {
	return (
		<div className="flex flex-col gap-2">
			<p className="font-body text-label-sm text-neutral-500">{label}</p>
			<div className={width}>{children}</div>
		</div>
	)
}

// ─── Variantes: a matriz size × orientation ──────────────────────────────────
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

// ─── Slots que o editor pode não preencher ───────────────────────────────────
/** Progressão de slots desligados: completo → sem categoria → só headline. Junto,
 *  mostra o que cada slot ausente tira da altura do card e como o que sobra se
 *  reacomoda; separado, cada passo parecia uma variante do DS, e não é. */
export const SlotsDesligados: Story = {
	parameters: { fullWidth: true },
	render: () => (
		<Casos>
			<Caso label="Completo — categoria, título, lead e autor" width={WIDTHS['large-vertical']}>
				<NewsCard {...base} contentId="story-slots-completo" />
			</Caso>
			<Caso label="Sem categoria" width={WIDTHS['large-vertical']}>
				<NewsCard {...base} categoria={undefined} contentId="story-sem-categoria" />
			</Caso>
			<Caso label="Só headline — sem categoria, sem lead, sem autor" width={WIDTHS['large-vertical']}>
				<NewsCard
					{...base}
					categoria={undefined}
					lead={undefined}
					author={undefined}
					contentId="story-so-headline"
				/>
			</Caso>
		</Casos>
	),
}

// ─── Fixtures de regressão ───────────────────────────────────────────────────
/** Âncora do toggle de favoritar. Regra: com foto o toggle fica sobre a mídia
 *  (canto superior direito); SEM foto ele desce pra linha do título, a única
 *  âncora presente em toda variante. Os quatro casos-limite provam que ele não
 *  some nem sobrepõe o texto em nenhuma das duas âncoras, de 1 a 4 linhas de
 *  título. Passe o mouse em cada card: o toggle só aparece no hover (ou no
 *  focus-within) onde há hover fino. */
export const AncoraDoToggle: Story = {
	parameters: { fullWidth: true },
	render: () => (
		<Casos>
			<Caso label="Referência: com foto — toggle sobre a mídia" width={WIDTHS['large-vertical']}>
				<NewsCard {...base} contentId="story-ancora-com-foto" />
			</Caso>
			<Caso label="Sem foto — toggle desce pra linha do título" width={WIDTHS['large-vertical']}>
				<NewsCard {...base} image={undefined} contentId="story-sem-imagem" />
			</Caso>
			<Caso
				label="Sem foto + título de 1 linha — o caso mais apertado da âncora no título"
				width={WIDTHS['large-vertical']}
			>
				<NewsCard
					{...base}
					title={TITULO_CURTO}
					image={undefined}
					lead={undefined}
					author={undefined}
					contentId="story-sem-imagem-titulo-curto"
				/>
			</Caso>
			<Caso
				label="Sem foto + título de 4 linhas — o toggle acompanha a primeira linha, sem sobrepor o wrap"
				width={WIDTHS['large-vertical']}
			>
				<NewsCard
					{...base}
					title={TITULO_LONGO}
					image={undefined}
					contentId="story-sem-imagem-titulo-longo"
				/>
			</Caso>
			<Caso
				label="Com foto + título de 1 linha (Small H) — a linha mais curta com a âncora na mídia"
				width={WIDTHS['small-horizontal']}
			>
				<NewsCard
					{...base}
					title={TITULO_CURTO}
					size="small"
					orientation="horizontal"
					lead={undefined}
					author={undefined}
					contentId="story-titulo-1-linha"
				/>
			</Caso>
			<Caso
				label="Com foto + título de 4 linhas (Large V) — o texto cresce e a âncora na mídia não se mexe"
				width={WIDTHS['large-vertical']}
			>
				<NewsCard
					{...base}
					title={TITULO_LONGO}
					size="large"
					orientation="vertical"
					contentId="story-titulo-4-linhas"
				/>
			</Caso>
		</Casos>
	),
}

/** Contraste da superfície `onMedia` do toggle nos dois extremos de foto — só se
 *  avalia comparando, por isso as duas no mesmo canvas. Passe o mouse em cada
 *  card: o toggle tem que continuar legível sobre a foto clara E sobre a escura. */
export const ContrasteOnMedia: Story = {
	parameters: { fullWidth: true },
	render: () => (
		<Casos>
			<Caso label="Foto clara" width={WIDTHS['large-vertical']}>
				<NewsCard
					{...base}
					image="https://picsum.photos/seed/bright-sky-white/600/338"
					contentId="story-foto-clara"
				/>
			</Caso>
			<Caso label="Foto escura" width={WIDTHS['large-vertical']}>
				<NewsCard
					{...base}
					image="https://picsum.photos/seed/black-storm-night2/600/338"
					contentId="story-foto-escura"
				/>
			</Caso>
		</Casos>
	),
}

/** `mediaOverlay` com PlayButton: confirma que o botão central e o toggle no canto
 *  coexistem sem colidir, no destaque grande e no card pequeno da lista lateral.
 *  (O repo não tem VideoCard usando o NewsCard — VideoCard é outro componente —
 *  então o que se cobre aqui é a capacidade `mediaOverlay` do próprio NewsCard,
 *  que é o mecanismo compartilhado.) */
export const ComPlayButton: Story = {
	parameters: { fullWidth: true },
	render: () => (
		<Casos>
			<Caso label="Destaque grande (Large V) — PlayButton large" width={WIDTHS['large-vertical']}>
				<NewsCard
					{...base}
					size="large"
					orientation="vertical"
					contentId="story-video-grande"
					mediaOverlay={<PlayButton size="large" as="div" />}
				/>
			</Caso>
			<Caso label="Lista lateral (Small H) — PlayButton xsmall" width={WIDTHS['small-horizontal']}>
				<NewsCard
					{...base}
					size="small"
					orientation="horizontal"
					lead={undefined}
					author={undefined}
					contentId="story-video-pequeno"
					mediaOverlay={<PlayButton size="xsmall" as="div" />}
				/>
			</Caso>
		</Casos>
	),
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

// ─── "News Card 2.0 / Boxed" — o destaque único da home ──────────────────────
// Node 6775:18688. Moldura própria, split 50/50 com a imagem à direita (3:2)
// sangrando até a borda, SponsorLine no rodapé. Empilha (imagem em cima) abaixo de
// lg:. A foto à direita é FIXA no split do NewsCard — não existe versão com a foto
// à esquerda (decisão do Pedro em 2026-08-23) e desde 2026-08-24 isso não é nem
// prop: por isso não há story do lado invertido. Clamps 3 (título) e 4 (lead)
// espelham o DestaqueUnico, onde a conta que justifica esse par está documentada.
const destaque = {
	title: 'Fispal Food Service terá ativações com chefs e executivos do setor',
	image: 'https://picsum.photos/seed/home-destaque-unico/1224/816',
	href: '#',
	categoria: { label: 'Food Service', color: 'mint' as const, href: '#' },
	lead: 'Maior evento da América do Sul voltado ao setor de alimentação fora do lar, a Fispal Food Service 2026 reunirá, entre os dias 26 e 29 de maio no Distrito Anhembi, não apenas lançamentos e soluções, mas também uma agenda de conteúdo com nomes de peso da gastronomia.',
	size: 'xlarge' as const,
	orientation: 'horizontal' as const,
	boxed: true,
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
