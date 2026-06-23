import type { Meta, StoryObj } from '@storybook/react'
import { SponsorCard } from './index'

const meta: Meta<typeof SponsorCard> = {
  title: 'Components/SponsorCard',
  component: SponsorCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    name: 'Tetra Pak',
    logoSrc: 'https://placehold.co/200x80/e2e8f0/475569?text=Tetra+Pak',
    tagline: "Protecting what's good",
    description:
      'A Tetra Pak é líder global em soluções de processamento e envase de alimentos líquidos.',
    href: '#',
  },
}

export default meta
type Story = StoryObj<typeof SponsorCard>

export const Default: Story = {}

export const LongDescription: Story = {
  args: {
    description:
      'Descrição muito longa para verificar o comportamento do line-clamp. A Tetra Pak é líder global em soluções de processamento e envase de alimentos líquidos. Com décadas de experiência no setor de alimentos e bebidas, a empresa oferece tecnologia de ponta para garantir segurança alimentar e sustentabilidade.',
  },
}
