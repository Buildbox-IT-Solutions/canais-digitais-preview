import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '.'

const meta: Meta<typeof Modal> = {
	title: 'Overlays/Modal',
	component: Modal,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

const Demo = (
	<>
		<h2 id="modal-demo-title" className="font-display text-headline-md text-neutral-950">
			Título do modal
		</h2>
		<p className="mt-2 font-body text-body-lg text-neutral-700">
			Conteúdo de exemplo dentro do modal. O scrim escurece o fundo e o painel fica centralizado.
		</p>
		<button
			type="button"
			className="mt-6 inline-flex items-center justify-center w-full h-12 rounded-full bg-primary-600 text-white font-body font-bold text-body-lg"
		>
			Ação primária
		</button>
	</>
)

export const Small: Story = {
	args: { open: true, size: 'sm', labelledById: 'modal-demo-title', children: Demo },
}

export const Medium: Story = {
	args: { open: true, size: 'md', labelledById: 'modal-demo-title', children: Demo },
}

export const Large: Story = {
	args: { open: true, size: 'lg', labelledById: 'modal-demo-title', children: Demo },
}

export const SemBotaoFechar: Story = {
	args: {
		open: true,
		size: 'md',
		showClose: false,
		labelledById: 'modal-demo-title',
		children: Demo,
	},
}

export const Painel: Story = {
	args: {
		open: true,
		size: 'xl',
		padded: false,
		ariaLabel: 'Exemplo de painel em duas colunas',
		children: (
			<>
				<section className="flex flex-col w-full md:w-[470px] shrink-0 px-8 sm:px-12 py-12">
					<h2 className="font-display font-bold text-headline-md text-primary-600">Entrar</h2>
					<p className="mt-2 font-body text-body-lg text-neutral-700">
						Coluna esquerda: formulário. Direita: painel de prova preenchendo o restante.
					</p>
				</section>
				<aside className="hidden md:flex flex-1 items-center p-12 bg-primary-600 text-white">
					<p className="font-display text-display-md tracking-tight">Painel de prova</p>
				</aside>
			</>
		),
	},
}

export const PainelMobileFullScreen: Story = {
	name: 'Painel — Full Screen no Mobile',
	args: {
		open: true,
		size: 'xl',
		padded: false,
		mobileFullScreen: true,
		ariaLabel: 'Exemplo de painel full screen no mobile',
		children: (
			<>
				<section className="flex flex-col w-full md:w-[470px] shrink-0 px-8 sm:px-12 py-12">
					<h2 className="font-display font-bold text-headline-md text-primary-600">Entrar</h2>
					<p className="mt-2 font-body text-body-lg text-neutral-700">
						Reduza a viewport do navegador para abaixo de 1024px: o painel ocupa a tela cheia,
						sem cantos arredondados nem scrim visível. Acima de 1024px volta ao card centralizado.
					</p>
				</section>
				<aside className="hidden md:flex flex-1 items-center p-12 bg-primary-600 text-white">
					<p className="font-display text-display-md tracking-tight">Painel de prova</p>
				</aside>
			</>
		),
	},
}
