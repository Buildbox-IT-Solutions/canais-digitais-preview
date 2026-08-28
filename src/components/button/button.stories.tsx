import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '.'

const meta: Meta<typeof Button> = {
	title: 'Buttons/Button',
	component: Button,
	parameters: { layout: 'centered', docs: { description: { component: 'Button [1.1] — pill rounded-full. 3 types × 3 sizes × icones built-in (arrow-forward, add) ou custom (ReactNode).' } } },
	tags: ['autodocs'],
	args: { label: 'Ver mais' },
}

export default meta
type Story = StoryObj<typeof Button>

export const FilledMedium: Story = { args: { type: 'filled', size: 'medium' } }
export const FilledMediumIcon: Story = { args: { type: 'filled', size: 'medium', icon: 'arrow-forward' } }
export const Outlined: Story = { args: { type: 'outlined', size: 'medium' } }
export const Ghost: Story = { args: { type: 'ghost', size: 'medium' } }
export const Large: Story = { args: { type: 'filled', size: 'large', icon: 'arrow-forward' } }
export const Small: Story = { args: { type: 'filled', size: 'small' } }
export const Disabled: Story = { args: { type: 'filled', size: 'medium', disabled: true } }
export const AsLink: Story = { args: { type: 'filled', size: 'medium', href: '#' } }

/**
 * `loading` — spinner à esquerda, label preservado, `disabled` + `aria-busy`.
 * Substitui o `Loading Button [1.0]` (Figma 71:6026), que era um componente separado
 * sem texto: aqui o botão não troca de elemento no meio da interação, então mantém
 * type, tone, tamanho e largura enquanto a ação está em voo.
 */
export const Loading: Story = { args: { type: 'filled', size: 'medium', label: 'Enviando', loading: true } }

/** O tipo é preservado enquanto carrega — outlined que carrega continua outlined. */
export const LoadingOutlined: Story = {
	args: { type: 'outlined', size: 'medium', label: 'Enviando', loading: true },
}
export const LoadingLarge: Story = {
	args: { type: 'filled', size: 'large', label: 'Enviando', loading: true },
}

const onDark: Story['decorators'] = [
	(Story) => (
		<div className="bg-gradient-to-br from-primary-600 to-secondary-950 p-8 rounded-lg">
			<Story />
		</div>
	),
]

export const InverseFilled: Story = {
	args: { type: 'filled', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
export const InverseOutlined: Story = {
	args: { type: 'outlined', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
export const InverseGhost: Story = {
	args: { type: 'ghost', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
