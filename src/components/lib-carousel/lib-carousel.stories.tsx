import type { Meta, StoryObj } from '@storybook/react-vite'
import { LibCarousel } from '.'
import { LibCard } from '~/components/lib-card'
import { MATERIAIS } from '~/mocks/biblioteca'

const meta: Meta<typeof LibCarousel> = {
	title: 'Biblioteca/LibCarousel',
	component: LibCarousel,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Trilho horizontal das seções da Biblioteca (Figma 8458:115867). As setas só existem onde há ponteiro fino (`hover-fine`, não breakpoint de largura) e aparecem no hover ou no foco de teclado; sem mouse vale o carrossel clássico por arrasto, que está sempre ligado. As setas somem nas pontas em vez de ficarem desabilitadas.',
			},
		},
	},
	tags: ['autodocs'],
	args: { ariaLabel: 'Novidades para você' },
}

export default meta
type Story = StoryObj<typeof LibCarousel>

export const Padrao: Story = {
	render: (args) => (
		<LibCarousel {...args}>
			{MATERIAIS.slice(0, 12).map((m) => (
				// A largura vem do <li>, como na tela — o card não declara a dele.
				<li key={m.id} className="flex w-[236px] shrink-0 snap-start">
					<LibCard material={m} bloqueado={m.requerCadastroCompleto} />
				</li>
			))}
		</LibCarousel>
	),
}
