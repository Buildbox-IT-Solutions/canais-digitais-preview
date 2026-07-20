import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './index'

const meta: Meta<typeof Switch> = {
	title: 'Componentes/Switch',
	component: Switch,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Switch>

export const Unchecked: Story = {
	args: {},
}

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const DisabledChecked: Story = {
	args: {
		disabled: true,
		defaultChecked: true,
	},
}

export const ComLabel: Story = {
	render: () => (
		<label className="flex items-center gap-3 cursor-pointer">
			<span className="font-body text-label-lg text-neutral-950">Assinado</span>
			<Switch defaultChecked />
		</label>
	),
}
