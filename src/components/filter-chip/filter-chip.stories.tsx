import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterChip } from '.'

const meta: Meta<typeof FilterChip> = {
	title: 'Foundations/Filter chip',
	component: FilterChip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Chip de filtro do MD3 (Figma 1859:18460). Controle canônico de "filtrar conteúdo por categoria" deste DS — usado na barra de refino da busca e no filtro da Biblioteca exclusiva. Selecionar empilha três sinais, e os três vêm do Figma: **check de 20px à esquerda**, **borda some e o fundo entra** (`secondary-50`), **texto vira `primary-600`**. O padding também muda (`px-4` → `pl-2 pr-4`) para o check não empurrar o rótulo.',
			},
		},
	},
	tags: ['autodocs'],
	args: { label: 'Categoria' },
}

export default meta
type Story = StoryObj<typeof FilterChip>

export const NaoSelecionado: Story = {
	args: { selected: false },
}

export const Selecionado: Story = {
	name: 'Selecionado (check à esquerda)',
	args: { selected: true },
}

export const ComIconeALeft: Story = {
	name: 'Com ícone à esquerda',
	args: { selected: false, leadingIcon: 'star' },
}

export const ComIconeALeftSelecionado: Story = {
	name: 'Com ícone à esquerda, selecionado (o check substitui)',
	args: { selected: true, leadingIcon: 'star' },
}

export const AbreMenu: Story = {
	name: 'Abre menu (como na busca)',
	args: { trailingIcon: 'expand-more', ariaHasPopup: 'menu' },
}

export const Desabilitado: Story = {
	args: { disabled: true },
}
