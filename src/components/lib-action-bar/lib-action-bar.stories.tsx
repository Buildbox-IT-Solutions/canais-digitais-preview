import type { Meta, StoryObj } from '@storybook/react-vite'
import { LibActionBar } from '.'
import { MATERIAIS } from '~/mocks/biblioteca'

const meta: Meta<typeof LibActionBar> = {
	title: 'Biblioteca/LibActionBar',
	component: LibActionBar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'As quatro ações de um material do acervo (Figma 8480:3308): baixar, abrir o post, compartilhar e favoritar. Extraída do `LibCard` em 2026-08-31, quando o Figma passou a pedir a mesma barra no destaque da aba — os dois consomem esta, não uma cópia cada. O estado `bloqueado` não muda nada na aparência, só o destino do clique em "Baixar": liberado é uma âncora com `download` e o navegador baixa o arquivo de exemplo; bloqueado é um `<button>` que abre o modal de incentivo. Quem sinaliza o bloqueio é o cadeado no badge do card.',
			},
		},
	},
	tags: ['autodocs'],
	args: { material: MATERIAIS[0], onBloqueado: () => {} },
	decorators: [
		(Story) => (
			<div className="w-[476px]">
				<Story />
			</div>
		),
	],
}

export default meta
type Story = StoryObj<typeof LibActionBar>

export const Liberado: Story = {
	name: 'Material liberado',
	args: { bloqueado: false },
}

export const Bloqueado: Story = {
	name: 'Material bloqueado (mesma barra, outro destino)',
	args: { bloqueado: true },
}

export const Colada: Story = {
	name: 'align=start (destaque) — ícones colados no Baixar',
	args: { align: 'start' },
}
