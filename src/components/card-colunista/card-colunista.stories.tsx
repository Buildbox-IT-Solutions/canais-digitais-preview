import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardColunista } from '.'

const meta: Meta<typeof CardColunista> = {
	title: 'Cards/CardColunista',
	component: CardColunista,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: {
		image: 'https://i.pravatar.cc/208?img=14',
		name: 'Augusto Zarpon',
		role: 'Especialista em melhoria contínua',
		quote: 'A embalagem que protege seu alimento e a eficiência da sua fábrica',
	},
}

export default meta
type Story = StoryObj<typeof CardColunista>

export const Default: Story = {}

export const CargoEmDuasLinhas: Story = {
	args: { role: 'Gerente de Assuntos Regulatórios para América Latina na EAS Strategies' },
}

export const CitacaoEmTresLinhas: Story = {
	args: {
		quote: 'A busca por "comida de verdade" está moldando a relação entre consumidores e marcas',
	},
}
