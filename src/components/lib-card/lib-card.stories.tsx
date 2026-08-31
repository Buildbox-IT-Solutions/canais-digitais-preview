import type { Meta, StoryObj } from '@storybook/react-vite'
import { LibCard } from '.'
import { MATERIAIS } from '~/mocks/biblioteca'

/**
 * Todas as stories usam material REAL do acervo (src/mocks/biblioteca.ts), extraído de
 * foodconnection.com.br — a fidelidade dos títulos é o que testa o clamp de 3 linhas.
 * Nenhum título de exemplo foi inventado.
 */
const comum = MATERIAIS.find((m) => m.disponivel && !m.requerCadastroCompleto)!
const bloqueado = MATERIAIS.find((m) => m.disponivel && m.requerCadastroCompleto)!
const indisponivel = MATERIAIS.find((m) => !m.disponivel)!
const semLead = MATERIAIS.find((m) => m.sinopse === '')!
const tituloLongo = [...MATERIAIS].sort((a, b) => b.titulo.length - a.titulo.length)[0]

const meta: Meta<typeof LibCard> = {
	title: 'Biblioteca/LibCard',
	component: LibCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Card do acervo da Biblioteca exclusiva (Figma 8296:91809). Abre no CLIQUE (o card fechado é um `<button>`), revelando o SidePanel com o lead do post e a ActionBar — o título não é link, ir para o post é a ação do `open_in_new`. A largura vem do consumidor: 236px/519px no trilho, célula da grade (2 colunas quando aberto) na grade. Três eixos independentes decidem a aparência: `disponivel` (acervo), `bloqueado` (usuário) e `aberto` (interação). Material bloqueado NÃO é esmaecido nem escondido — o cadeado no badge é o único sinal.',
			},
		},
	},
	tags: ['autodocs'],
	// O card não declara largura própria — nas stories quem dá é o decorator, como o
	// `<li>` do trilho e a célula da grade fazem na tela. A largura é a MESMA aberto ou
	// fechado (o expandido só cresce em altura, sangrando 12px para cada calha), então o
	// decorator reserva a folga da sangria em vez de mudar de tamanho.
	decorators: [
		(Story) => (
			<div className="px-3">
				<div style={{ width: 270 }}>
					<Story />
				</div>
			</div>
		),
	],
	args: { bloqueado: false, aberto: false },
}

export default meta
type Story = StoryObj<typeof LibCard>

export const Enabled: Story = {
	args: { material: comum },
}

export const Bloqueado: Story = {
	name: 'Bloqueado (cadeado no badge)',
	args: { material: bloqueado, bloqueado: true },
}

export const Indisponivel: Story = {
	name: 'Indisponível (Disabled)',
	args: { material: indisponivel },
}

export const TituloLongo: Story = {
	name: `Título longo — ${tituloLongo.titulo.length} caracteres`,
	args: { material: tituloLongo },
}

export const Expandido: Story = {
	name: 'Expandido (Expanded=On)',
	args: { material: comum, aberto: true },
	parameters: {
		docs: {
			description: {
				story:
					'Mesma largura do fechado: a célula não muda de tamanho, só a altura cresce, e nenhum vizinho é tocado. A moldura cresce PARA DENTRO, então a capa do card aberto fica 24px mais estreita e 12px à direita da dos vizinhos — deslocamento pequeno e local. A versão anterior crescia para fora para a capa não se mover, mas quebrava nas duas pontas do carrossel (ver o bloco de doc do componente). O card inteiro continua sendo UM alvo: aqui ele recolhe. O título não é link; quem abre o post é o `open_in_new` da ActionBar.',
			},
		},
	},
}

export const ExpandidoBloqueado: Story = {
	name: 'Expandido + bloqueado',
	args: { material: bloqueado, bloqueado: true, aberto: true },
}

export const ExpandidoSemLead: Story = {
	name: 'Expandido, material sem lead (cai no 1º parágrafo)',
	args: { material: semLead, aberto: true },
}

export const Hovered: Story = {
	name: 'Hovered, fechado (título em ultramarine)',
	args: { material: comum },
	parameters: {
		pseudo: { hover: true },
		docs: {
			description: {
				story:
					'`State=Hovered, Expanded=Off` do Figma: o hover do card leva o título a ultramarine. No expandido o título VOLTA para `primary-600` — lá a moldura já destaca o card, e manter o azul competiria com ela.',
			},
		},
	},
}
