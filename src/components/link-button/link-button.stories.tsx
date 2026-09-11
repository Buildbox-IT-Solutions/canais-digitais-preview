import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkButton } from '.'

const meta: Meta<typeof LinkButton> = {
	title: 'Buttons/LinkButton',
	component: LinkButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { label: 'Ver mais', href: '#' },
}

export default meta
type Story = StoryObj<typeof LinkButton>

export const XL: Story = { args: { size: 'xl' } }
export const LG: Story = { args: { size: 'lg' } }
export const MD: Story = { args: { size: 'md' } }
export const SM: Story = { args: { size: 'sm' } }

/**
 * Sem `href` vira `<button>`: para ação na própria página, não navegação. Visualmente
 * idêntico — a diferença é semântica (foco, Enter, leitor de tela). Usado pelo "Pular"
 * do `WhatsNewDialog`, que dispensa o aviso em vez de levar a algum lugar.
 */
export const ComoAcao: Story = {
	name: 'Ação (sem href)',
	args: { size: 'sm', label: 'Pular', href: undefined, onClick: () => {} },
}
