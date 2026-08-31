import type { Meta, StoryObj } from '@storybook/react-vite'
import { DestaqueBiblioteca } from '.'
import { materialEmDestaque } from '~/lib/biblioteca'

const meta: Meta<typeof DestaqueBiblioteca> = {
	title: 'Biblioteca/Destaque',
	component: DestaqueBiblioteca,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Destaque do topo da Biblioteca (Figma 8424:109762): o material mais recente do acervo, um só e sem slide. O Figma pedia 3 em carrossel automático; simplificado por decisão do Pedro em 2026-08-31, e com o carrossel saíram o timer, os dots e a pausa por hover. O card é o `NewsCard` `boxed`/`xlarge`/`horizontal` — o mesmo split do destaque único da home —, acrescido do slot `badge`.',
			},
		},
	},
	tags: ['autodocs'],
	args: { material: materialEmDestaque()! },
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
