import type { Meta, StoryObj } from '@storybook/react-vite'
import { picsumSrc } from '~/mocks/articles'
import { VideoCard } from '.'

const meta: Meta<typeof VideoCard> = {
	title: 'Cards/VideoCard',
	component: VideoCard,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [(Story) => <div className="bg-primary-600 p-8"><Story /></div>],
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

export const Large: Story = { args: { ...base, size: 'lg' }, render: (args) => <div className="w-[600px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div> }
export const Small: Story = { args: { ...base, size: 'sm' }, render: (args) => <div className="w-[328px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div> }
export const ExtraSmall: Story = {
	args: { title: base.title, image: base.image, href: base.href, size: 'xs', orientation: 'horizontal', categoria: base.categoria },
	render: (args) => <div className="w-[400px]"><VideoCard {...(args as Parameters<typeof VideoCard>[0])} /></div>,
}
