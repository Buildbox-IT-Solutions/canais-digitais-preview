import type { Meta, StoryObj } from '@storybook/react-vite'
import { IncentiveDownloadDialog } from './index'

const meta: Meta<typeof IncentiveDownloadDialog> = {
	title: 'Componentes/IncentiveDownloadDialog',
	component: IncentiveDownloadDialog,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		open: true,
		onCreateAccount: () => {},
		onLogin: () => {},
		onDismiss: () => {},
	},
}
export default meta

type Story = StoryObj<typeof IncentiveDownloadDialog>

/** ≥1024px: modal centralizado. Reduza a viewport do navegador para abaixo de 1024px para ver o bottom sheet. */
export const Default: Story = {
	name: 'Desktop / Mobile (resize)',
}

/** Reuso pelo gatilho de favoritar deslogado (feature Favoritos) — visualmente
 * idêntico ao Default (mesmos 2 botões, mesmos rótulos), só ícone/título/corpo mudam.
 * "Salve" ganha o mesmo destaque (bold + secondary-500) que "baixar" tem no Default. */
export const Favoritos: Story = {
	args: {
		icon: 'bookmark',
		title: (
			<>
				<span className="font-bold text-secondary-500">Salve</span> este conteúdo na sua biblioteca
			</>
		),
		body: 'Crie sua conta para guardar conteúdos e encontrá-los depois, e receber recomendações do seu setor.',
	},
}
