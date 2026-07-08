import type { Meta, StoryObj } from '@storybook/react-vite'
import { LAST_SECTION } from '~/mocks/articles'
import { UltimaSecao } from '.'
import type { IUltimaSecaoProps } from './types'

const meta: Meta<typeof UltimaSecao> = {
	title: 'Sections/UltimaSecao',
	component: UltimaSecao,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof UltimaSecao>

export const Default: Story = {
	args: { title: 'Fispal Food Tecnologia', articles: LAST_SECTION },
	render: (args: IUltimaSecaoProps) => (
		<div className="w-[1280px]">
			<UltimaSecao {...args} />
		</div>
	),
}
