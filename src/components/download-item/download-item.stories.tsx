import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadItem } from '.'
import { DownloadItemSkeleton } from './download-item-skeleton'

const meta: Meta<typeof DownloadItem> = {
	title: 'List Items/DownloadItem',
	component: DownloadItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
	args: {
		icon: 'picture-as-pdf',
		title: 'Estado do varejo 2026 — relatório completo',
		date: '12 Mar 2026',
		size: '4.8 MB',
	},
}

export default meta
type Story = StoryObj<typeof DownloadItem>

/** Reduza a viewport do navegador para abaixo de 1024px para ver o layout empilhado mobile (botão full-width com borda). */
export const Enabled: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Doc: Story = { args: { icon: 'docs', title: 'Política de privacidade — versão revisada' } }
export const ImageType: Story = { args: { icon: 'image', title: 'Infográfico — Cadeia de proteína animal' } }

/** Loading — skeleton com a métrica exata do item real, sem spinner. */
export const Loading: Story = {
	render: () => (
		<>
			{Array.from({ length: 5 }, (_, i) => (
				<DownloadItemSkeleton key={i} isLast={i === 4} />
			))}
		</>
	),
}
