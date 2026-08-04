import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '.'

const meta: Meta<typeof Skeleton> = {
	title: 'Foundations/Skeleton',
	component: Skeleton,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Bar: Story = {
	args: { className: 'h-4 w-64' },
}

export const Block: Story = {
	args: { className: 'w-[208px] aspect-video' },
}

/** Composição livre — cada retângulo é um Skeleton dimensionado por className. */
export const Composicao: Story = {
	render: () => (
		<div className="flex items-start gap-4 w-[600px]">
			<Skeleton className="w-[208px] aspect-video shrink-0" />
			<div className="flex flex-1 flex-col gap-2 pt-0.5">
				<Skeleton className="h-3 w-24" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-3 w-20" />
			</div>
		</div>
	),
}
