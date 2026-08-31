import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Heading } from '~/types/post'
import { TableOfContentsHybrid } from '.'

const HEADINGS: Heading[] = [
	{ id: 'introducao', text: 'Introdução', level: 2 },
	{ id: 'como-funciona', text: 'Como funciona', level: 2 },
	{ id: 'detalhe-tecnico', text: 'Detalhe técnico', level: 3 },
	{ id: 'aplicacoes', text: 'Aplicações práticas', level: 2 },
	{ id: 'conclusao', text: 'Conclusão', level: 2 },
]

const meta: Meta<typeof TableOfContentsHybrid> = {
	title: 'Cards/TableOfContentsHybrid (arquivado)',
	component: TableOfContentsHybrid,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof TableOfContentsHybrid>

/**
 * ARQUIVADO em 2026-08-31 — snapshot da versão anterior do TOC, mantida
 * como referência resgatável. A versão vigente é TableOfContentsIcon
 * (botão flutuante em todos os breakpoints).
 *
 * Comportamento: abaixo de 1400px, botão flutuante com texto "Neste
 * artigo" fixo top-right desde o carregamento, clique abre/fecha o painel
 * (clique fora ou Escape também fecham). A partir de 1400px o botão some e
 * entra a régua na margem esquerda, que abre no hover — no viewport padrão
 * do Storybook (menor que 1400px), só o botão é visível; alargue a janela
 * pra ver a régua. O painel, nos dois estados, mostra o título "Neste
 * artigo" e itens com espaçamento compacto.
 */
export const ReguaEBotao: Story = {
	args: { headings: HEADINGS },
	render: (args) => (
		<div className="max-w-[704px] mx-auto p-6 flex flex-col gap-8">
			<TableOfContentsHybrid {...(args as Parameters<typeof TableOfContentsHybrid>[0])} />
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
			<TableOfContentsHybrid {...(args as Parameters<typeof TableOfContentsHybrid>[0])} />
		</div>
	),
}
