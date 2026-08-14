import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { HOME_HERO, HOME_HERO_BOTTOM, HOME_HERO_TEXT } from '~/mocks/articles'
import { DestaqueSection } from '.'

const meta: Meta<typeof DestaqueSection> = {
	title: 'Sections/DestaqueSection',
	component: DestaqueSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Feature Favoritos: todo card aqui virou NewsCard (ou, no patrocinado, chama
		// useFavoritoAuthModal direto) — ambos usam useSearchParams/useNavigate por
		// baixo, que exigem contexto de Router. Mesma convenção de news-card.stories.tsx:
		// `?logado=true` deixa os toggles clicáveis de verdade no canvas.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<Story />
			</MemoryRouter>
		),
	],
}
export default meta

type Story = StoryObj<typeof DestaqueSection>

const [hero, top2, top3] = HOME_HERO

export const Default: Story = {
	args: { hero, top2, top3, heroText: HOME_HERO_TEXT, heroBottom: HOME_HERO_BOTTOM },
	render: (args) => (
		<div className="w-[1280px]">
			<DestaqueSection {...(args as Parameters<typeof DestaqueSection>[0])} />
		</div>
	),
}
