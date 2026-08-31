import type { Meta, StoryObj } from '@storybook/react-vite'
import { DestaqueBiblioteca } from '.'
import { materiaisEmDestaque } from '~/lib/biblioteca'

const meta: Meta<typeof DestaqueBiblioteca> = {
	title: 'Biblioteca/Destaque',
	component: DestaqueBiblioteca,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Destaque do topo da Biblioteca (Figma 8424:109762): os 3 materiais mais recentes em carrossel automático de 6s. O card é o `NewsCard` `boxed`/`xlarge`/`horizontal` — o mesmo split do destaque único da home —, acrescido do slot `badge`. O avanço automático para de vez com `prefers-reduced-motion` e pausa no hover ou no foco de teclado. Os dots são botões de verdade.',
			},
		},
	},
	tags: ['autodocs'],
	args: { materiais: materiaisEmDestaque() },
}

export default meta
type Story = StoryObj<typeof DestaqueBiblioteca>

export const PerfilCompleto: Story = {
	name: 'Perfil completo (sem cadeado)',
	args: { gate: { camposFaltantes: [], desbloqueado: true } },
}

export const PerfilIncompleto: Story = {
	name: 'Perfil incompleto (cadeado no badge)',
	args: { gate: { camposFaltantes: ['CPF / CNPJ', 'Cidade', 'Endereço'], desbloqueado: false } },
}
