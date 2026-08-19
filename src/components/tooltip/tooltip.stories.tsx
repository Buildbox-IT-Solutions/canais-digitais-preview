import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '~/components/icon-button'
import { Tooltip } from '.'

const meta: Meta<typeof Tooltip> = {
	title: 'Feedback/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: { label: 'Favoritar', delay: 0 },
	decorators: [
		(Story) => (
			<div className="p-16">
				<Story />
			</div>
		),
	],
}
export default meta

type Story = StoryObj<typeof Tooltip>

// delay: 0 nas stories só pra não exigir hover sustentado no Storybook — o padrão
// real do componente (Instagram-style) é 500ms, ver Toggle/index.tsx.
export const Top: Story = {
	args: { side: 'top' },
	render: (args) => (
		<Tooltip {...(args as Parameters<typeof Tooltip>[0])}>
			<IconButton icon="favorite-border" label="Favoritar" />
		</Tooltip>
	),
}

export const Right: Story = {
	args: { side: 'right' },
	render: (args) => (
		<Tooltip {...(args as Parameters<typeof Tooltip>[0])}>
			<IconButton icon="favorite-border" label="Favoritar" />
		</Tooltip>
	),
}

export const Bottom: Story = {
	args: { side: 'bottom' },
	render: (args) => (
		<Tooltip {...(args as Parameters<typeof Tooltip>[0])}>
			<IconButton icon="favorite-border" label="Favoritar" />
		</Tooltip>
	),
}

export const Left: Story = {
	args: { side: 'left' },
	render: (args) => (
		<Tooltip {...(args as Parameters<typeof Tooltip>[0])}>
			<IconButton icon="favorite-border" label="Favoritar" />
		</Tooltip>
	),
}
