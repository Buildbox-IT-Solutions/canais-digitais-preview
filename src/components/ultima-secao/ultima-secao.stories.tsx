import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { LAST_SECTION } from '~/mocks/articles'
import { UltimaSecao } from '.'
import type { IUltimaSecaoProps } from './types'

const meta: Meta<typeof UltimaSecao> = {
	title: 'Sections/UltimaSecao',
	component: UltimaSecao,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Feature Favoritos: todo card aqui virou NewsCard, que usa useSearchParams/
		// useNavigate por baixo — exige contexto de Router. Mesma convenção de
		// news-card.stories.tsx: `?logado=true` deixa os toggles clicáveis no canvas.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<Story />
			</MemoryRouter>
		),
	],
}
export default meta

type Story = StoryObj<typeof UltimaSecao>

export const Default: Story = {
	args: { title: 'Fispal Food Tecnologia', articles: LAST_SECTION },
	render: (args: IUltimaSecaoProps) => (
		<div className="w-[1280px]">
			<UltimaSecao {...args} />
		</div>
	),
}
