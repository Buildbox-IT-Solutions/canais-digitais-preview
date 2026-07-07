import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccessInvite } from '.'

const meta: Meta<typeof AccessInvite> = {
	title: 'Componentes/AccessInvite',
	component: AccessInvite,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AccessInvite>

/** Largura do popover desktop (~300px) — título e botões compactos. */
export const NoPopover: Story = {
	name: 'No popover (desktop ~300px)',
	args: { variant: 'popover' },
	render: (args) => (
		<div className="w-[300px] rounded-lg border border-neutral-100 bg-white p-5 shadow-lg">
			<AccessInvite {...args} />
		</div>
	),
}

/** Largura cheia do bottom sheet mobile. */
export const NoBottomSheet: Story = {
	name: 'No bottom sheet (mobile full-width)',
	render: (args) => (
		<div className="w-[360px] rounded-t-2xl bg-white px-5 pt-3 pb-6 shadow-xl">
			<div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-neutral-200" />
			<AccessInvite {...args} />
		</div>
	),
}
