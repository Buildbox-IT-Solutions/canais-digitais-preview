import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconTile } from '~/components/icon-tile'
import { Switch } from '~/components/switch'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index'

const meta: Meta<typeof Card> = {
	title: 'Componentes/Card',
	component: Card,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Basico: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardHeader>
				<CardTitle>Título do card</CardTitle>
				<CardDescription>Descrição curta explicando o conteúdo do card.</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-body text-body-md text-neutral-600">Conteúdo livre do card.</p>
			</CardContent>
			<CardFooter className="border-t border-neutral-100 justify-end">
				<button
					type="button"
					className="font-body font-bold text-body-md text-secondary-950 hover:underline"
				>
					Ação
				</button>
			</CardFooter>
		</Card>
	),
}

export const NewsletterAssinado: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardHeader className="flex-row items-start gap-4">
				<IconTile icon="mail" />
				<div className="flex flex-col gap-1 min-w-0">
					<CardTitle>Food Connection</CardTitle>
					<CardDescription className="truncate">
						Novidades, receitas e lançamentos do setor de food service.
					</CardDescription>
				</div>
			</CardHeader>
			<CardFooter className="border-t border-neutral-100 justify-between">
				<span className="font-body font-semibold text-label-lg text-neutral-950">Assinado</span>
				<Switch defaultChecked />
			</CardFooter>
		</Card>
	),
}

export const NewsletterNaoAssinado: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardHeader className="flex-row items-start gap-4">
				<IconTile icon="mail" />
				<div className="flex flex-col gap-1 min-w-0">
					<CardTitle>FiSA</CardTitle>
					<CardDescription className="truncate">
						Conteúdo exclusivo sobre a feira Food Service Ingredients South America.
					</CardDescription>
				</div>
			</CardHeader>
			<CardFooter className="border-t border-neutral-100 justify-between">
				<span className="font-body font-semibold text-label-lg text-neutral-950">Assinar</span>
				<Switch />
			</CardFooter>
		</Card>
	),
}
