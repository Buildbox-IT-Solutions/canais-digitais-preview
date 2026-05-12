import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadItem } from '.'

const meta: Meta<typeof DownloadItem> = {
	title: 'List Items/DownloadItem',
	component: DownloadItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
	args: {
		icon: 'pdf',
		title: 'Estado do varejo 2026 — relatório completo',
		date: '12 Mar 2026',
		size: '4.8 MB',
	},
}

export default meta
type Story = StoryObj<typeof DownloadItem>

export const Enabled: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Doc: Story = { args: { icon: 'doc', title: 'Política de privacidade — versão revisada' } }
export const ImageType: Story = { args: { icon: 'image', title: 'Infográfico — Cadeia de proteína animal' } }
