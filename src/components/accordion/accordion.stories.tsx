import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './index'

const meta: Meta<typeof Accordion> = {
	title: 'Componentes/Accordion',
	component: Accordion,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Accordion>

export const SingleItem: Story = {
	render: () => (
		<div className="w-[420px]">
			<Accordion type="single" defaultValue="newsletter">
				<AccordionItem value="newsletter">
					<AccordionTrigger>O que vem na newsletter?</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col gap-1.5 list-disc pl-5">
							<li>
								<strong className="font-semibold text-neutral-900">Toda terça:</strong> a seleção da
								semana
							</li>
							<li>
								<strong className="font-semibold text-neutral-900">Uma vez por mês:</strong> o
								especial da editoria que você escolher
							</li>
							<li>
								<strong className="font-semibold text-neutral-900">Nunca</strong> mais de dois
								e-mails por semana
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

export const MultipleItemsSingleType: Story = {
	render: () => (
		<div className="w-[420px]">
			<Accordion type="single" defaultValue="frequencia">
				<AccordionItem value="frequencia">
					<AccordionTrigger>Com que frequência recebo?</AccordionTrigger>
					<AccordionContent>
						Uma edição por semana, sempre na terça de manhã, mais um especial mensal da editoria
						que você escolher.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="cancelar">
					<AccordionTrigger>Posso cancelar depois?</AccordionTrigger>
					<AccordionContent>
						Sim — todo e-mail traz um link de cancelamento, e a baixa vale a partir do próximo
						envio.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

export const Disabled: Story = {
	render: () => (
		<div className="w-[420px]">
			<Accordion type="single">
				<AccordionItem value="a">
					<AccordionTrigger disabled>Item desabilitado</AccordionTrigger>
					<AccordionContent>Este conteúdo não pode ser aberto.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}
