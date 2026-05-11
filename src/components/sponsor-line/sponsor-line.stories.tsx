import type { Meta, StoryObj } from '@storybook/react-vite'
import { SponsorLine } from '.'

const meta: Meta<typeof SponsorLine> = {
	title: 'Cards/SponsorLine',
	component: SponsorLine,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { company: 'Tetra Pak', href: '#' },
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof SponsorLine>

export const Default: Story = {}
export const Plain: Story = { args: { href: undefined } }
