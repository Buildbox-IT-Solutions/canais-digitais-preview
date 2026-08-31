import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './index'
import { MOCK_FOTO_CLARA, MOCK_FOTO_ESCURA } from '~/mocks/articles'
import type {
	IIconOnlyToggleProps,
	ILabeledToggleProps,
	ToggleSize,
	ToggleSurface,
	ToggleType,
} from './types'

/**
 * Botão de dois estados. Duas geometrias com origens diferentes:
 *
 * · **Só-ícone** é o componente do Figma "Toggle [1.0]" (node 7952:127473): Selected
 *   (Off/On) × State (Enabled/Hovered/Focused/Disabled) × Surface (Default/OnMedia) ×
 *   Size (Small/Medium/Large).
 * · **Com rótulo** é extensão dev-side (30/08/2026, baseada no shadcn/ui Toggle) — o
 *   Figma não desenhou toggle com texto. Herda a pílula do `Button [1.1]`: mesma
 *   altura, padding, gap e tipografia daquele botão, importados de lá.
 *
 * State NÃO é prop — Hovered e Focused são CSS puro (`:hover`/`:focus-visible`).
 * Passe o mouse ou dê Tab nos toggles abaixo pra ver esses dois estados de
 * verdade, em vez de uma variante estática fingindo o CSS.
 *
 * **A regra do preenchimento:** o estado `on` ganha fundo sempre que não estiver
 * legível de outra forma. Ele está legível de outra forma em exatamente um caso —
 * `type="ghost"` só-ícone com dois ícones diferentes (contorno → preenchido), que é o
 * set do Figma. Compare as stories `SoIcone` e `ComRotulo`: o mesmo `type="ghost"`
 * não preenche na primeira e preenche na segunda, e é de propósito.
 *
 * Três limitações conhecidas (documentadas, não corrigidas — ver `index.tsx`):
 * 1. Surface=OnMedia + disabled tem contraste baixo (conteúdo cinza sobre branco 80%).
 * 2. Size=Small é 32px, abaixo do alvo de toque recomendado (44px).
 * 3. O anel de foco não tem folga do ícone (sem `ring-offset`).
 */
const meta: Meta<typeof Toggle> = {
	title: 'Componentes/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toggle>

const favoriteProps = {
	iconOn: 'favorite' as const,
	iconOff: 'favorite-border' as const,
	labelOn: 'Remover dos favoritos',
	labelOff: 'Favoritar',
	tooltipOn: 'Remover',
	tooltipOff: 'Favoritar',
}

const SIZES: ToggleSize[] = ['small', 'medium', 'large']
const TYPES: ToggleType[] = ['ghost', 'outlined', 'filled']

/** Casca comum das grades: fundo claro pra `default`, escuro pra `onMedia`. */
function Row({ surface, label, children }: { surface: ToggleSurface; label: string; children: ReactNode }) {
	return (
		<div
			className={
				surface === 'onMedia'
					? 'flex items-center gap-6 rounded-sm bg-neutral-950 p-4'
					: 'flex items-center gap-6 rounded-sm bg-white p-4'
			}
		>
			<span
				className={
					'w-44 shrink-0 font-body text-body-sm ' +
					(surface === 'onMedia' ? 'text-white' : 'text-neutral-700')
				}
			>
				{label}
			</span>
			{children}
		</div>
	)
}

/**
 * Um par off/on que realmente alterna ao clique — as grades abaixo mostram sempre os
 * dois estados lado a lado, e ambos continuam clicáveis.
 */
type PairProps =
	| Omit<IIconOnlyToggleProps, 'pressed' | 'onPressedChange'>
	| Omit<ILabeledToggleProps, 'pressed' | 'onPressedChange'>

function Pair(props: PairProps) {
	const [off, setOff] = useState(false)
	const [on, setOn] = useState(true)
	return (
		<>
			<Toggle {...props} pressed={off} onPressedChange={setOff} />
			<Toggle {...props} pressed={on} onPressedChange={setOn} />
		</>
	)
}

// ---------------------------------------------------------------- só-ícone (Figma)

export const Desligado: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return <Toggle {...favoriteProps} pressed={pressed} onPressedChange={setPressed} />
	},
}

export const Ligado: Story = {
	render: () => {
		const [pressed, setPressed] = useState(true)
		return <Toggle {...favoriteProps} pressed={pressed} onPressedChange={setPressed} />
	},
}

/** O set do Figma: Selected × Surface × Size, `type="ghost"`. O estado se lê SÓ no
 * ícone (contorno → preenchido) — nenhum fundo muda, de propósito. Passe o mouse ou
 * dê Tab em qualquer célula pra ver Hovered/Focused ao vivo. */
export const SoIcone: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{SIZES.flatMap((size) =>
				(['default', 'onMedia'] as ToggleSurface[]).map((surface) => (
					<Row key={`${surface}-${size}`} surface={surface} label={`${surface} / ${size}`}>
						<Pair {...favoriteProps} surface={surface} size={size} />
					</Row>
				)),
			)}
		</div>
	),
}

// -------------------------------------------------------------- com rótulo (novo)

/** Rótulo visível. Aqui o `on` PREENCHE — sem isso um toggle de texto teria estado
 * invisível. Sem `aria-label`: o texto na tela já é o nome acessível (WCAG 2.5.3). */
export const ComRotulo: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{TYPES.map((type) => (
				<Row key={type} surface="default" label={`type="${type}"`}>
					<Pair icon="favorite" text="Favoritar" type={type} />
				</Row>
			))}
		</div>
	),
}

/** Só texto, sem ícone nenhum — o caso em que o preenchimento é o único sinal de estado. */
export const SoTexto: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{TYPES.map((type) => (
				<Row key={type} surface="default" label={`type="${type}"`}>
					<Pair text="Assinar" type={type} />
				</Row>
			))}
		</div>
	),
}

/** Texto que muda com o estado, via `textOn`/`textOff`. Use com parcimônia: o nome
 * acessível muda junto, e o `aria-pressed` já anuncia o estado. */
export const TextoPorEstado: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<Row surface="default" label="textOff / textOn">
				<Pair iconOn="check" iconOff="add" text="Seguir" textOn="Seguindo" type="outlined" />
			</Row>
		</div>
	),
}

/** Tamanhos com rótulo — a escala de altura do `Button [1.1]` (32/40/48), com o
 * padding, o gap e a tipografia daquele botão. */
export const TamanhosComRotulo: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{SIZES.map((size) => (
				<Row key={size} surface="default" label={`size="${size}"`}>
					<Pair icon="favorite" text="Favoritar" type="outlined" size={size} />
				</Row>
			))}
		</div>
	),
}

/** `iconPosition="trailing"` — ícone à direita do texto. */
export const IconePosicao: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<Row surface="default" label="leading (default)">
				<Pair icon="favorite" text="Favoritar" type="outlined" iconPosition="leading" />
			</Row>
			<Row surface="default" label="trailing">
				<Pair icon="favorite" text="Favoritar" type="outlined" iconPosition="trailing" />
			</Row>
		</div>
	),
}

/** Grade completa `type` × `surface`, com rótulo. Em `onMedia`, `ghost` e `filled`
 * partem do mesmo repouso (o branco 80% do Figma É o contêiner sobre foto) e só
 * divergem no `on`. */
export const GradeCompleta: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{(['default', 'onMedia'] as ToggleSurface[]).flatMap((surface) =>
				TYPES.map((type) => (
					<Row key={`${surface}-${type}`} surface={surface} label={`${surface} / ${type}`}>
						<Pair icon="favorite" text="Favoritar" type={type} surface={surface} />
					</Row>
				)),
			)}
		</div>
	),
}

// ------------------------------------------------------------------------ estados

/** State=Disabled — atributo nativo, não prop de "state". Em `onMedia` o branco 80%
 * PERMANECE e só o conteúdo apaga: é a limitação conhecida #1 (contraste baixo),
 * herdada do Figma e não corrigida aqui. */
export const Desabilitado: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			{(['default', 'onMedia'] as ToggleSurface[]).flatMap((surface) =>
				TYPES.map((type) => (
					<Row key={`${surface}-${type}`} surface={surface} label={`${surface} / ${type}`}>
						<Toggle
							icon="favorite"
							text="Favoritar"
							type={type}
							surface={surface}
							pressed={false}
							onPressedChange={() => {}}
							disabled
						/>
						<Toggle
							icon="favorite"
							text="Favoritar"
							type={type}
							surface={surface}
							pressed={true}
							onPressedChange={() => {}}
							disabled
						/>
						<Toggle
							{...favoriteProps}
							type={type}
							surface={surface}
							pressed={true}
							onPressedChange={() => {}}
							disabled
						/>
					</Row>
				)),
			)}
		</div>
	),
}

/** Surface=OnMedia sobre fundo CLARO — branco 80%/100% de propósito quase invisível
 * aqui; é o mesmo comportamento do Play Button 2.0 do Figma sobre foto clara. */
export const OnMediaFundoClaro: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return (
			<div
				className="relative flex h-40 w-64 items-start justify-end rounded-sm bg-cover bg-center p-3"
				style={{ backgroundImage: `url(${MOCK_FOTO_CLARA})` }}
			>
				<Toggle {...favoriteProps} surface="onMedia" pressed={pressed} onPressedChange={setPressed} />
			</div>
		)
	},
}

/** Surface=OnMedia sobre fundo ESCURO — o caso "de verdade" da superfície, contraste alto. */
export const OnMediaFundoEscuro: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return (
			<div
				className="relative flex h-40 w-64 items-start justify-end rounded-sm bg-cover bg-center p-3"
				style={{ backgroundImage: `url(${MOCK_FOTO_ESCURA})` }}
			>
				<Toggle {...favoriteProps} surface="onMedia" pressed={pressed} onPressedChange={setPressed} />
			</div>
		)
	},
}
