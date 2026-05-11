import type { Meta, StoryObj } from '@storybook/react-vite'
import { Orbit } from '.'

const meta: Meta<typeof Orbit> = {
	title: 'Cards/Orbit',
	component: Orbit,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Orbit>

export const Default: Story = {
	render: () => (
		<div className="relative w-full h-[480px] bg-primary-600 overflow-hidden">
			<div className="absolute bottom-0 left-1/4 w-[912px] h-[240px] opacity-75">
				<Orbit className="w-full h-full" />
			</div>
		</div>
	),
}
