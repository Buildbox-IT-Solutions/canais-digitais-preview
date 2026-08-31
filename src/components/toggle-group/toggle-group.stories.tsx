import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup } from './index'
import type { ToggleGroupItem } from './types'
import { MOCK_FOTO_ESCURA } from '~/mocks/articles'

/**
 * Conjunto de `Toggle`s que se conhecem. Composição, não componente novo do Figma —
 * base de interação: shadcn/ui ToggleGroup.
 *
 * Dois modos, via `selection`:
 * · `single` (default) — um item por vez, `value: string | null`. Clicar no item já
 *   ativo desliga e devolve `null`, a menos que `allowDeselect={false}`.
 * · `multiple` — vários ao mesmo tempo, `value: string[]`.
 *
 * `selection` e não `type`, como no shadcn: `type` aqui já é a APARÊNCIA
 * (ghost/outlined/filled), a mesma prop e os mesmos nomes de Button, IconButton e
 * Toggle. Dois significados para o mesmo nome em componentes vizinhos é o começo da
 * divergência entre os 11 portais.
 *
 * Os itens não viram controle segmentado (cantos grudados): a geometria deste DS é
 * pílula, e cortar o raio das pontas internas exigiria um raio fora da tabela do DS.
 * Ficam pílulas com `gap-2`, e `flex-wrap` porque mobile está sempre em escopo.
 */
const meta: Meta<typeof ToggleGroup> = {
	title: 'Componentes/ToggleGroup',
	component: ToggleGroup,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

const FORMATOS: ToggleGroupItem[] = [
	{ value: 'noticias', text: 'Notícias', icon: 'description' },
	{ value: 'videos', text: 'Vídeos', icon: 'play-arrow' },
	{ value: 'podcasts', text: 'Podcasts', icon: 'mail' },
	{ value: 'downloads', text: 'Downloads', icon: 'download' },
]

const DISPOSITIVOS: ToggleGroupItem[] = [
	{ value: 'mobile', label: 'Celular', icon: 'smartphone', tooltip: 'Celular' },
	{ value: 'laptop', label: 'Notebook', icon: 'laptop', tooltip: 'Notebook' },
	{ value: 'desktop', label: 'Desktop', icon: 'desktop-windows', tooltip: 'Desktop' },
]

/** Seleção única — um formato por vez. Clique no item ativo pra desligar (volta a `null`). */
export const Unica: Story = {
	render: () => {
		const [value, setValue] = useState<string | null>('videos')
		return (
			<div className="flex flex-col gap-3">
				<ToggleGroup ariaLabel="Filtrar por formato" items={FORMATOS} value={value} onValueChange={setValue} type="outlined" />
				<p className="font-body text-body-sm text-neutral-700">value: {value ?? 'null'}</p>
			</div>
		)
	},
}

/** `allowDeselect={false}` — "nenhum" não é um estado válido, então clicar no item
 * ativo é no-op. Para filtros que sempre precisam de uma escolha. */
export const UnicaSemDesselecionar: Story = {
	render: () => {
		const [value, setValue] = useState<string | null>('noticias')
		return (
			<div className="flex flex-col gap-3">
				<ToggleGroup
					ariaLabel="Filtrar por formato"
					items={FORMATOS}
					value={value}
					onValueChange={setValue}
					allowDeselect={false}
					type="outlined"
				/>
				<p className="font-body text-body-sm text-neutral-700">value: {value ?? 'null'}</p>
			</div>
		)
	},
}

/** Seleção múltipla — `value` é um array. */
export const Multipla: Story = {
	render: () => {
		const [value, setValue] = useState<string[]>(['videos', 'podcasts'])
		return (
			<div className="flex flex-col gap-3">
				<ToggleGroup
					ariaLabel="Filtrar por formato"
					selection="multiple"
					items={FORMATOS}
					value={value}
					onValueChange={setValue}
					type="outlined"
				/>
				<p className="font-body text-body-sm text-neutral-700">value: [{value.join(', ')}]</p>
			</div>
		)
	},
}

/** Itens só-ícone: `label` (aria-label) é obrigatório pelo tipo, e o `tooltip` mostra
 * o mesmo texto no hover — o balão descreve o ITEM, não a ação; o estado vive no
 * `aria-pressed`. */
export const SoIcone: Story = {
	render: () => {
		const [value, setValue] = useState<string | null>('laptop')
		return <ToggleGroup ariaLabel="Pré-visualizar em" items={DISPOSITIVOS} value={value} onValueChange={setValue} type="filled" />
	},
}

/** As três aparências, no mesmo grupo de itens. */
export const Aparencias: Story = {
	render: () => {
		const [ghost, setGhost] = useState<string | null>('videos')
		const [outlined, setOutlined] = useState<string | null>('videos')
		const [filled, setFilled] = useState<string | null>('videos')
		return (
			<div className="flex flex-col gap-4">
				<ToggleGroup ariaLabel="Formato (ghost)" items={FORMATOS} value={ghost} onValueChange={setGhost} type="ghost" />
				<ToggleGroup ariaLabel="Formato (outlined)" items={FORMATOS} value={outlined} onValueChange={setOutlined} type="outlined" />
				<ToggleGroup ariaLabel="Formato (filled)" items={FORMATOS} value={filled} onValueChange={setFilled} type="filled" />
			</div>
		)
	},
}

/** Tamanhos — a mesma escala do `Toggle` (32/40/48). */
export const Tamanhos: Story = {
	render: () => {
		const [small, setSmall] = useState<string | null>('videos')
		const [medium, setMedium] = useState<string | null>('videos')
		const [large, setLarge] = useState<string | null>('videos')
		return (
			<div className="flex flex-col gap-4">
				<ToggleGroup ariaLabel="Formato (small)" items={FORMATOS} value={small} onValueChange={setSmall} type="outlined" size="small" />
				<ToggleGroup ariaLabel="Formato (medium)" items={FORMATOS} value={medium} onValueChange={setMedium} type="outlined" size="medium" />
				<ToggleGroup ariaLabel="Formato (large)" items={FORMATOS} value={large} onValueChange={setLarge} type="outlined" size="large" />
			</div>
		)
	},
}

/** `disabled` no grupo desabilita todos; `disabled` no item desabilita só ele — um
 * soma ao outro, não substitui. */
export const Desabilitado: Story = {
	render: () => {
		const [item, setItem] = useState<string | null>('videos')
		const [grupo, setGrupo] = useState<string | null>('videos')
		const comItemDesabilitado = FORMATOS.map((f) =>
			f.value === 'downloads' ? { ...f, disabled: true } : f,
		)
		return (
			<div className="flex flex-col gap-4">
				<ToggleGroup ariaLabel="Um item desabilitado" items={comItemDesabilitado} value={item} onValueChange={setItem} type="outlined" />
				<ToggleGroup ariaLabel="Grupo inteiro desabilitado" items={FORMATOS} value={grupo} onValueChange={setGrupo} type="outlined" disabled />
			</div>
		)
	},
}

/** Sobre mídia — `surface="onMedia"` repassado a todos os itens. */
export const OnMedia: Story = {
	render: () => {
		const [value, setValue] = useState<string | null>('videos')
		return (
			<div
				className="flex h-40 w-[34rem] items-center justify-center rounded-sm bg-cover bg-center p-4"
				style={{ backgroundImage: `url(${MOCK_FOTO_ESCURA})` }}
			>
				<ToggleGroup ariaLabel="Filtrar por formato" items={FORMATOS} value={value} onValueChange={setValue} surface="onMedia" />
			</div>
		)
	},
}
