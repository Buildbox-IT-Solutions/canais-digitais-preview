import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { IconButtonSize } from '~/components/icon-button/types'
import { Toggle } from './index'
import type { ToggleSurface } from './types'

/**
 * Espelha a folha de variantes do Figma "Toggle [1.0]" (node 7952:127473):
 * Selected (Off/On) × State (Enabled/Hovered/Focused/Disabled) × Surface
 * (Default/OnMedia) × Size (Small/Medium/Large).
 *
 * State NÃO é prop — Hovered e Focused são CSS puro (`:hover`/`:focus-visible`).
 * Passe o mouse ou dê Tab nos toggles abaixo pra ver esses dois estados de
 * verdade, em vez de uma variante estática fingindo o CSS.
 *
 * Três limitações conhecidas (documentadas, não corrigidas nesta versão — ver
 * comentário completo em `index.tsx`):
 * 1. Surface=OnMedia + disabled tem contraste baixo (ícone cinza sobre branco 80%).
 * 2. Size=Small é 32px, abaixo do alvo de toque recomendado (44px) — não usar em card.
 * 3. O anel de foco não tem folga do ícone (sem `ring-offset`, ver index.tsx).
 */
const meta: Meta<typeof Toggle> = {
	title: 'Componentes/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toggle>

const bookmarkProps = {
	iconOn: 'bookmark' as const,
	iconOff: 'bookmark-border' as const,
	labelOn: 'Remover dos favoritos',
	labelOff: 'Favoritar',
}

const SIZES: IconButtonSize[] = ['small', 'medium', 'large']

export const Desligado: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return <Toggle {...bookmarkProps} pressed={pressed} onPressedChange={setPressed} />
	},
}

export const Ligado: Story = {
	render: () => {
		const [pressed, setPressed] = useState(true)
		return <Toggle {...bookmarkProps} pressed={pressed} onPressedChange={setPressed} />
	},
}

/** Selected × Surface × Size — a grade completa de props reais (12 combinações).
 * Passe o mouse ou dê Tab em qualquer célula pra ver Hovered/Focused ao vivo. */
export const Grade: Story = {
	render: () => {
		const rows: { surface: ToggleSurface; size: IconButtonSize }[] = SIZES.flatMap((size) => [
			{ surface: 'default' as const, size },
			{ surface: 'onMedia' as const, size },
		])
		const initial: Record<string, boolean> = {}
		for (const { surface, size } of rows) {
			initial[`off-${surface}-${size}`] = false
			initial[`on-${surface}-${size}`] = true
		}
		const [pressed, setPressed] = useState(initial)
		const toggle = (key: string) => setPressed((prev) => ({ ...prev, [key]: !prev[key] }))
		return (
			<div className="flex flex-col gap-3">
				{rows.map(({ surface, size }) => (
					<div
						key={`${surface}-${size}`}
						className={
							surface === 'onMedia'
								? 'flex items-center gap-6 rounded-sm bg-neutral-950 p-4'
								: 'flex items-center gap-6 rounded-sm bg-white p-4'
						}
					>
						<span
							className={
								'w-40 shrink-0 font-body text-body-sm ' +
								(surface === 'onMedia' ? 'text-white' : 'text-neutral-700')
							}
						>
							{surface} / {size}
						</span>
						<Toggle
							{...bookmarkProps}
							surface={surface}
							size={size}
							pressed={pressed[`off-${surface}-${size}`]}
							onPressedChange={() => toggle(`off-${surface}-${size}`)}
						/>
						<Toggle
							{...bookmarkProps}
							surface={surface}
							size={size}
							pressed={pressed[`on-${surface}-${size}`]}
							onPressedChange={() => toggle(`on-${surface}-${size}`)}
						/>
					</div>
				))}
			</div>
		)
	},
}

/** State=Disabled — atributo nativo, não prop de "state". Cobre as duas superfícies;
 * OnMedia+disabled é a limitação conhecida #1 (contraste baixo, não corrigido). */
export const Desabilitado: Story = {
	render: () => (
		<div className="flex items-center gap-8">
			<div className="flex items-center gap-4 rounded-sm bg-white p-4">
				<Toggle {...bookmarkProps} surface="default" pressed={false} onPressedChange={() => {}} disabled />
				<Toggle {...bookmarkProps} surface="default" pressed={true} onPressedChange={() => {}} disabled />
			</div>
			<div className="flex items-center gap-4 rounded-sm bg-neutral-950 p-4">
				<Toggle {...bookmarkProps} surface="onMedia" pressed={false} onPressedChange={() => {}} disabled />
				<Toggle {...bookmarkProps} surface="onMedia" pressed={true} onPressedChange={() => {}} disabled />
			</div>
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
				style={{ backgroundImage: 'url(https://picsum.photos/seed/bright-sky-white/400/260)' }}
			>
				<Toggle {...bookmarkProps} surface="onMedia" pressed={pressed} onPressedChange={setPressed} />
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
				style={{ backgroundImage: 'url(https://picsum.photos/seed/black-storm-night2/400/260)' }}
			>
				<Toggle {...bookmarkProps} surface="onMedia" pressed={pressed} onPressedChange={setPressed} />
			</div>
		)
	},
}
