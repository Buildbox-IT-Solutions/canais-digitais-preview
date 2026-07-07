import type { Meta, StoryObj } from '@storybook/react-vite'
import { picsumSrc } from '~/mocks/articles'
import { DownloadSection } from '.'

const meta: Meta<typeof DownloadSection> = {
	title: 'Sections/DownloadSection',
	component: DownloadSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof DownloadSection>

export const Default: Story = {
	args: {
		eyebrow: 'E-book gratuito',
		title: 'Como a rastreabilidade reduz custos e aumenta a margem de lucro',
		description:
			'Saiba como a cadeia de produção está sendo otimizada até o atacarejo com rastreabilidade e as tecnologias envolvidas nesse processo.',
		ctaLabel: 'Baixar agora',
		ctaHref: '/gate-download',
		image: picsumSrc('download-bg', 1920, 460),
	},
	render: (args) => (
		<div className="w-[1280px]">
			<DownloadSection {...(args as Parameters<typeof DownloadSection>[0])} />
		</div>
	),
}
