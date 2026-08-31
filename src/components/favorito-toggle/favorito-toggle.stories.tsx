import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FavoritoToggle } from './index'
import { MOCK_FOTO_ESCURA } from '~/mocks/articles'

/**
 * Instância pronta do `Toggle` com os textos e ícones de "favoritar" fixados — não é um
 * componente do Figma.
 *
 * Existe porque os mesmos seis props (`iconOn`, `iconOff`, `labelOn`, `labelOff`,
 * `tooltipOn`, `tooltipOff`) estavam repetidos palavra por palavra em cinco call sites:
 * NewsCard (dois), VideoCard, CategoryColumn, DestaqueSection e a tela de conteúdo.
 * Copiado seis vezes, o texto do aria-label diverge no primeiro ajuste.
 *
 * Não chama `useFavoritoToggle`: quem chama continua dono do hook (no NewsCard uma
 * única chamada alimenta DOIS toggles). Este componente só desenha.
 *
 * O rótulo visível é ESTÁVEL nos dois estados — "Favoritar" continua "Favoritar"
 * ligado. O estado vive no `aria-pressed`, no coração preenchido e no fundo.
 */
const meta: Meta<typeof FavoritoToggle> = {
	title: 'Componentes/FavoritoToggle',
	component: FavoritoToggle,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof FavoritoToggle>

/** O formato usado hoje nos cinco call sites: só-ícone, ghost, com tooltip no hover. */
export const SoIcone: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return <FavoritoToggle pressed={pressed} onPressedChange={setPressed} />
	},
}

/** Com rótulo. O tooltip some: um balão repetindo a palavra que já está na tela não
 * informa nada. */
export const ComRotulo: Story = {
	render: () => {
		const [ghost, setGhost] = useState(false)
		const [outlined, setOutlined] = useState(true)
		const [filled, setFilled] = useState(false)
		return (
			<div className="flex items-center gap-4">
				<FavoritoToggle pressed={ghost} onPressedChange={setGhost} showLabel />
				<FavoritoToggle pressed={outlined} onPressedChange={setOutlined} showLabel type="outlined" />
				<FavoritoToggle pressed={filled} onPressedChange={setFilled} showLabel type="filled" />
			</div>
		)
	},
}

/** Sobre mídia — o formato do canto do card (`size="small"`, `surface="onMedia"`). */
export const SobreMidia: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false)
		return (
			<div
				className="relative flex h-40 w-64 items-start justify-end rounded-sm bg-cover bg-center p-3"
				style={{ backgroundImage: `url(${MOCK_FOTO_ESCURA})` }}
			>
				<FavoritoToggle pressed={pressed} onPressedChange={setPressed} size="small" surface="onMedia" />
			</div>
		)
	},
}

/** Tamanhos, nos dois formatos. */
export const Tamanhos: Story = {
	render: () => {
		const [a, setA] = useState(false)
		const [b, setB] = useState(true)
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<FavoritoToggle pressed={a} onPressedChange={setA} size="small" />
					<FavoritoToggle pressed={a} onPressedChange={setA} size="medium" />
					<FavoritoToggle pressed={a} onPressedChange={setA} size="large" />
				</div>
				<div className="flex items-center gap-4">
					<FavoritoToggle pressed={b} onPressedChange={setB} showLabel type="outlined" size="small" />
					<FavoritoToggle pressed={b} onPressedChange={setB} showLabel type="outlined" size="medium" />
					<FavoritoToggle pressed={b} onPressedChange={setB} showLabel type="outlined" size="large" />
				</div>
			</div>
		)
	},
}
