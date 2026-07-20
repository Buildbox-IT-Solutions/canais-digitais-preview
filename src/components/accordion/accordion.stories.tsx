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
			<Accordion type="single" defaultValue="dados">
				<AccordionItem value="dados">
					<AccordionTrigger>O que acontece com meus dados?</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col gap-1.5 list-disc pl-5">
							<li>
								<strong className="font-semibold text-neutral-900">Excluídos agora:</strong> perfil,
								preferências, conteúdo salvo
							</li>
							<li>
								<strong className="font-semibold text-neutral-900">Mantidos por prazo legal:</strong>{' '}
								registros de acesso e transações — eliminados depois
							</li>
							<li>
								<strong className="font-semibold text-neutral-900">Nunca usados</strong> para novas
								comunicações
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
			<Accordion type="single" defaultValue="prazo">
				<AccordionItem value="prazo">
					<AccordionTrigger>Como funciona o prazo legal de retenção?</AccordionTrigger>
					<AccordionContent>
						Alguns dados (registros de acesso e transações) precisam ser mantidos por um período
						mínimo exigido por lei antes de serem eliminados definitivamente.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="cancelar">
					<AccordionTrigger>Posso cancelar a exclusão?</AccordionTrigger>
					<AccordionContent>
						Não — a exclusão é imediata e definitiva assim que confirmada.
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
