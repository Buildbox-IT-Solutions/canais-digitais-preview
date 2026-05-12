import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormDisclaimer } from '.'

const meta: Meta<typeof FormDisclaimer> = {
	title: 'Form/FormDisclaimer',
	component: FormDisclaimer,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FormDisclaimer>

export const Default: Story = {}
