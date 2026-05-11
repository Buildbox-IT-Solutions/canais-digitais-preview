import type { Meta, StoryObj } from '@storybook/react-vite'
import { SocialButton } from '.'

const meta: Meta<typeof SocialButton> = {
	title: 'Buttons/SocialButton',
	component: SocialButton,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { href: '#' },
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof SocialButton>

export const LinkedIn: Story = { args: { provider: 'linkedin' } }
export const Google: Story = { args: { provider: 'google' } }
