import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { picsumSrc } from '~/mocks/articles'
import { VideoCard } from '.'

const meta: Meta<typeof VideoCard> = {
	title: 'Cards/VideoCard',
	component: VideoCard,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Feature Favoritos: VideoCard usa useFavoritoAuthModal/useFavoritoToggle por
		// baixo (useSearchParams/useNavigate), incondicional mesmo sem `contentId` —
		// exige contexto de Router, senão quebra assim que qualquer story renderiza
		// (mesma convenção de news-card.stories.tsx). `?logado=true` deixa o toggle
		// clicável de verdade no canvas.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<div className="bg-primary-600 p-8">
					<Story />
				</div>
			</MemoryRouter>
		),
	],
}
export default meta

type Story = StoryObj<typeof VideoCard>

const base = {
	title: 'Como fazer um plano de logística integrada na indústria de alimentos',
	image: picsumSrc('vid-story', 1200, 675),
	href: '/conteudo',
	categoria: { label: 'Categoria', color: 'mint' as const, href: '/categoria' },
	lead: 'Entenda os métodos da logística de alimentos com planejamento e análise.',
}

export const Large: Story = {
	args: { ...base, contentId: 'story-video-large', size: 'lg' },
	render: (args) => <div className="w-[600px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div>,
}
export const Small: Story = {
	args: { ...base, contentId: 'story-video-small', size: 'sm' },
	render: (args) => <div className="w-[328px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div>,
}
/** Lista compacta de 3 do desktop (node 2835-49276) — thumb flexível até 288px, título 18px. */
export const SmallHorizontal: Story = {
	args: { title: base.title, image: base.image, href: base.href, contentId: 'story-video-sm-h', size: 'sm', orientation: 'horizontal', categoria: base.categoria },
	render: (args) => <div className="w-[600px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div>,
}
export const ExtraSmall: Story = {
	args: { title: base.title, image: base.image, href: base.href, contentId: 'story-video-xs', size: 'xs', orientation: 'horizontal', categoria: base.categoria },
	render: (args) => <div className="w-[400px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div>,
}
