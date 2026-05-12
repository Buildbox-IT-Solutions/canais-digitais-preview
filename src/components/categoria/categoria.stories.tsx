import type { Meta, StoryObj } from '@storybook/react-vite'
import { Categoria } from '.'

const meta: Meta<typeof Categoria> = {
	title: 'Chips/Categoria',
	component: Categoria,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { label: 'Inovação', color: 'mint' },
}

export default meta
type Story = StoryObj<typeof Categoria>

export const Mint: Story = { args: { color: 'mint', label: 'Vídeos' } }
export const Coral: Story = { args: { color: 'coral', label: 'Saúde' } }
export const Saffron: Story = { args: { color: 'saffron', label: 'Construção' } }
export const Lavander: Story = { args: { color: 'lavander', label: 'Lifestyle' } }
export const Ultramarine: Story = { args: { color: 'secondary-950', label: 'Tecnologia' } }
export const Sky: Story = { args: { color: 'secondary-500', label: 'Negócios' } }
export const Indigo: Story = { args: { color: 'primary-600', label: 'Política' } }
export const ChipMint: Story = { args: { color: 'mint', chip: true, label: 'Vídeos', href: '#' } }
export const ChipCoral: Story = { args: { color: 'coral', chip: true, label: 'Saúde', href: '#' } }
export const ChipSaffron: Story = { args: { color: 'saffron', chip: true, label: 'Construção', href: '#' } }
export const ChipLavander: Story = { args: { color: 'lavander', chip: true, label: 'Lifestyle', href: '#' } }
export const ChipUltramarine: Story = { args: { color: 'secondary-950', chip: true, label: 'Tecnologia', href: '#' } }
export const ChipSky: Story = { args: { color: 'secondary-500', chip: true, label: 'Negócios', href: '#' } }
export const ChipIndigo: Story = { args: { color: 'primary-600', chip: true, label: 'Política', href: '#' } }
export const ChipStatic: Story = {
	args: { color: 'mint', chip: true, label: 'Não-clicável (sem href)' },
}
