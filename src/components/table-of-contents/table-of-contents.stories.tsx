import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Heading } from '~/types/post'
import { TableOfContents } from '.'

const HEADINGS: Heading[] = [
	{ id: 'introducao', text: 'Introdução', level: 2 },
	{ id: 'como-funciona', text: 'Como funciona', level: 2 },
	{ id: 'detalhe-tecnico', text: 'Detalhe técnico', level: 3 },
	{ id: 'aplicacoes', text: 'Aplicações práticas', level: 2 },
	{ id: 'conclusao', text: 'Conclusão', level: 2 },
]

const meta: Meta<typeof TableOfContents> = {
	title: 'Cards/TableOfContents',
	component: TableOfContents,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof TableOfContents>

/**
 * Role a página: o bloco (Estado A) vira botão flutuante (Estado B) assim
 * que sai da viewport. Clique nos itens para ver o scrollspy em ação.
 */
export const RoleParaVerOsDoisEstados: Story = {
	args: { headings: HEADINGS },
	render: (args) => (
		<div className="max-w-[704px] mx-auto p-6 flex flex-col gap-8">
			<TableOfContents {...(args as Parameters<typeof TableOfContents>[0])} />
			{HEADINGS.map((h) => (
				<section key={h.id} className="flex flex-col gap-4">
					{h.level === 2 ? (
						<h2 id={h.id} className="font-display font-bold text-headline-lg text-primary-600 scroll-mt-24">
							{h.text}
						</h2>
					) : (
						<h3 id={h.id} className="font-display font-bold text-headline-md text-primary-600 scroll-mt-24">
							{h.text}
						</h3>
					)}
					<p className="font-body text-body-xl text-neutral-950">
						Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</p>
					<p className="font-body text-body-xl text-neutral-950">
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
				</section>
			))}
		</div>
	),
}

export const MenosDeTresHeadingsNaoRenderiza: Story = {
	args: { headings: HEADINGS.slice(0, 2) },
	render: (args) => (
		<div className="max-w-[704px] mx-auto p-6">
			<p className="font-body text-body-md text-neutral-600 mb-4">
				Com menos de 3 headings, o componente não renderiza nada (verifique: nada aparece abaixo).
			</p>
			<TableOfContents {...(args as Parameters<typeof TableOfContents>[0])} />
		</div>
	),
}
