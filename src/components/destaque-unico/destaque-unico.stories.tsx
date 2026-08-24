import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { HOME_DESTAQUE_UNICO, HOME_DESTAQUE_UNICO_SPONSOR } from '~/mocks/articles'
import { DestaqueUnico } from '.'

const meta: Meta<typeof DestaqueUnico> = {
	title: 'Sections/DestaqueUnico',
	component: DestaqueUnico,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Toggle de favoritar usa useSearchParams/useNavigate por baixo (mesma
		// convenção de destaque-section.stories.tsx) — `?logado=true` deixa o toggle
		// clicável de verdade no canvas.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<Story />
			</MemoryRouter>
		),
	],
	args: { article: HOME_DESTAQUE_UNICO },
}
export default meta

type Story = StoryObj<typeof DestaqueUnico>

/** RN05 — sem patrocinador cadastrado, a SponsorLine não existe. */
export const Default: Story = {}

/** RN05 — patrocinador preenchido no admin. */
export const Patrocinado: Story = {
	args: { sponsor: HOME_DESTAQUE_UNICO_SPONSOR, sponsorHref: '#' },
}

/** Lead vazio: o card cai pra categoria + título, sem buraco no layout. */
export const SemLead: Story = {
	args: { article: { ...HOME_DESTAQUE_UNICO, lead: undefined } },
}

/**
 * Pior caso: título e lead estourando os clamps (3 e 4) ao mesmo tempo, COM
 * patrocinador. É aqui que se vê se o texto ainda cabe na altura ditada pela imagem
 * (3:2 em 50%) — testar em 1024px, não só em 1280: é lá que o orçamento aperta.
 */
export const TextoLongo: Story = {
	args: {
		sponsor: HOME_DESTAQUE_UNICO_SPONSOR,
		sponsorHref: '#',
		article: {
			...HOME_DESTAQUE_UNICO,
			title:
				'Fispal Food Service 2026 terá ativações inéditas com chefs, executivos e lideranças de toda a cadeia de alimentação fora do lar do país',
			lead: 'Maior evento da América do Sul voltado ao setor de alimentação fora do lar, a Fispal Food Service 2026 reunirá, entre os dias 26 e 29 de maio no Distrito Anhembi, não apenas lançamentos e soluções em equipamentos, ingredientes e serviços, mas também uma agenda de conteúdo com nomes de peso da gastronomia nacional e internacional debatendo os rumos do setor.',
		},
	},
}
