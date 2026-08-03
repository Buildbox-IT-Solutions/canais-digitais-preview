import type { Meta, StoryObj } from '@storybook/react-vite'
import { AiSummaryBlock } from '.'

const meta: Meta<typeof AiSummaryBlock> = {
	title: 'Cards/AiSummaryBlock',
	component: AiSummaryBlock,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: {
		bullets: [
			'Sensores digitais como e-nose e e-tongue já identificam aroma, sabor e textura em tempo real.',
			'Algoritmos de machine learning reduzem a subjetividade das avaliações sensoriais tradicionais.',
			'A tecnologia amplia a confiabilidade dos testes e acelera o desenvolvimento de novos produtos.',
		],
		// TODO(copy): disclaimer pendente de aprovação — Ana / jurídico
		disclaimer: 'Resumo gerado por inteligência artificial. Pode conter imprecisões.',
	},
}
export default meta

type Story = StoryObj<typeof AiSummaryBlock>

export const Fechado: Story = {
	render: (args) => (
		<div className="w-[704px]">
			<AiSummaryBlock {...(args as Parameters<typeof AiSummaryBlock>[0])} />
		</div>
	),
}
