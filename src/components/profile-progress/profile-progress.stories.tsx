import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProfileProgress } from '.'

const meta: Meta<typeof ProfileProgress> = {
	title: 'Dashboard/ProfileProgress',
	component: ProfileProgress,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-96"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof ProfileProgress>

export const Starting: Story = { args: { filledFields: 2, totalFields: 14 } }
export const Good: Story = { args: { filledFields: 5, totalFields: 14 } }
export const Almost: Story = { args: { filledFields: 10, totalFields: 14 } }
export const Complete: Story = { args: { filledFields: 14, totalFields: 14 } }
