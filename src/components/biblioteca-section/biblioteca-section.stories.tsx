import type { Meta, StoryObj } from '@storybook/react-vite'
import { BibliotecaSection } from '.'
import { materiaisMaisRecentes } from '~/lib/biblioteca'

const meta: Meta<typeof BibliotecaSection> = {
	title: 'Biblioteca/Seção na home',
	component: BibliotecaSection,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Vitrine do acervo na home (Figma 8424:112623). Anotação: "Proposta para substituição do banner de \'Material para Download\'. Uma seção mostrando os 12 \'Materiais de download\' mais recentes. Objetivo: mostrar valor para o leitor na home e incentivar ainda mais o cadastro." É proposta: na home vive atrás do eixo `?biblioteca=secao`, com o banner atual como default, para dar para comparar os dois. Reusa `LibCarousel` + `LibCard` sem variante nova — a diferença é só o painel com gradiente.',
			},
		},
	},
	tags: ['autodocs'],
	args: { materiais: materiaisMaisRecentes(12) },
}

export default meta
type Story = StoryObj<typeof BibliotecaSection>

export const Padrao: Story = {}
