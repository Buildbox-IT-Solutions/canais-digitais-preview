import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { useMediaQuery } from '~/lib/use-media-query'
import { BottomSheet } from '~/components/bottom-sheet'
import { Button } from '~/components/button'
import { IconButton } from '~/components/icon-button'
import { Modal } from '~/components/modal'
import downloadImage from '~/assets/images/whats-new/download.png'
import downloadImage2x from '~/assets/images/whats-new/download@2x.png'
import loginImage from '~/assets/images/whats-new/login.png'
import loginImage2x from '~/assets/images/whats-new/login@2x.png'
import newsletterImage from '~/assets/images/whats-new/newsletter.png'
import newsletterImage2x from '~/assets/images/whats-new/newsletter@2x.png'
import type { IWhatsNewDialogProps } from './types'

/**
 * Componente: Whats New Dialog — carrossel de novidades sobre a home (feature de login)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8564-2255
 *   (Step 1 — 8571:152 · Step 2 — 8572:152 · Step 3 — 8573:158)
 * Apresentação: modal centralizado de 420px a partir de `lg`; bottom sheet de largura
 * total abaixo disso (item 8 das regras).
 * Passos, dots clicáveis, "Pular" nos três passos e navegação por setas — no último a
 * seta de avançar dá lugar ao CTA "Criar conta".
 *
 * Quando exibir, para quem e quantas vezes NÃO mora aqui: ver
 * `src/lib/whats-new-campanha.ts` e `notas/2026-09-10-regras-exibicao-whats-new.md`.
 * Este componente só informa o que aconteceu, via `onEvento`.
 *
 * Tokens: --color-primary-600, --color-secondary-500, --color-neutral-700, --color-neutral-200,
 *         --text-title-xl, --text-body-md, --font-display, --font-body
 */

interface IWhatsNewStep {
	/** Aleo 22/28 em primary-600, com um trecho em `Accent` (bold, secondary-500). */
	title: ReactNode
	/** Mesmo texto do título, sem marcação — vira o `aria-label` do diálogo. */
	titleText: string
	description: string
	image: { src: string; src2x: string }
}

/** Trecho em destaque do título. Cor decorativa, não ênfase semântica — por isso `span`. */
function Accent({ children }: { children: string }) {
	return <span className="font-bold text-secondary-500">{children}</span>
}

const STEPS: IWhatsNewStep[] = [
	{
		title: (
			<>
				Agora você pode fazer <Accent>login</Accent>
			</>
		),
		titleText: 'Agora você pode fazer login',
		description: 'Sua conta é gratuita e leva menos de um minuto. Depois disso, seus dados ficam salvos por aqui.',
		image: { src: loginImage, src2x: loginImage2x },
	},
	{
		title: (
			<>
				<Accent>Baixe</Accent> materiais em um clique
			</>
		),
		titleText: 'Baixe materiais em um clique',
		description: 'Seus dados já ficam salvos, então o download de e-books e whitepapers acontece na hora.',
		image: { src: downloadImage, src2x: downloadImage2x },
	},
	{
		title: (
			<>
				<Accent>Assine</Accent> newsletter sem preencher formulário
			</>
		),
		titleText: 'Assine newsletter sem preencher formulário',
		description: 'Gerencie todas as suas inscrições em um só lugar, direto pelo seu perfil.',
		image: { src: newsletterImage, src2x: newsletterImage2x },
	},
]

export function WhatsNewDialog({
	open,
	onEvento,
	initialStep = 0,
	apresentacao = 'auto',
	className,
}: IWhatsNewDialogProps) {
	const [current, setCurrent] = useState(initialStep)
	const titleId = useId()
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const comoSheet = apresentacao === 'sheet' || (apresentacao === 'auto' && !isDesktop)

	const isFirstStep = current === 0
	const isLastStep = current === STEPS.length - 1
	const step = STEPS[current]

	// Item 4 — chegar ao último passo encerra a campanha, mas não fecha nada: a pessoa
	// continua lendo. Avisa uma vez só por abertura, venha ela por seta ou por dot.
	const ultimoPassoAvisado = useRef(false)
	useEffect(() => {
		if (!open || !isLastStep || ultimoPassoAvisado.current) return
		ultimoPassoAvisado.current = true
		onEvento('ultimo-passo')
	}, [open, isLastStep, onEvento])

	// Fechado, volta ao começo: quem reabrir daqui a 4 dias (a segunda e última
	// impressão) recomeça do passo 1, não de onde parou.
	useEffect(() => {
		if (open) return
		setCurrent(initialStep)
		ultimoPassoAvisado.current = false
	}, [open, initialStep])

	const conteudo = (
		<div className="relative flex w-full flex-col">
			{/*
			 * Ilustração exportada do Figma (o gradiente Sky→Arctic faz parte do PNG).
			 * Decorativa: título e descrição ao lado já dizem tudo que ela mostra.
			 * 🔴 A CONFIRMAR — arte própria para mobile. Estas são recortes de tela
			 * desktop; abaixo de 420px o conteúdo dentro delas encolhe junto.
			 */}
			<img
				src={step.image.src}
				srcSet={`${step.image.src} 1x, ${step.image.src2x} 2x`}
				width={420}
				height={180}
				alt=""
				className="h-[150px] w-full shrink-0 object-cover lg:h-[180px]"
			/>

			<div className="flex justify-center gap-2 px-5 py-4 lg:px-8" role="tablist" aria-label="Passos da novidade">
				{STEPS.map((s, i) => (
					<button
						key={s.titleText}
						type="button"
						role="tab"
						aria-selected={i === current}
						aria-label={`Ir para o passo ${i + 1} de ${STEPS.length}`}
						onClick={() => setCurrent(i)}
						className={twMerge(
							'size-2 rounded-full transition-colors',
							i === current ? 'bg-primary-600' : 'bg-neutral-200 hover:bg-neutral-300',
						)}
					/>
				))}
			</div>

			<div className="flex flex-col gap-4 px-5 py-5 lg:px-8 lg:py-6">
				<h2 id={titleId} className="font-display font-normal text-title-xl text-primary-600">
					{step.title}
				</h2>
				<p className="font-body text-body-md text-neutral-700">{step.description}</p>
			</div>

			<div className="flex items-center justify-between px-5 pb-2 pt-2 lg:p-6">
				<Button label="Pular" type="ghost" size="small" onClick={() => onEvento('pular')} />

				<div className="flex items-center gap-4">
					{/* No passo 1 a seta some em vez de aparecer desabilitada — nada para onde voltar. */}
					{!isFirstStep ? (
						<IconButton
							icon="arrow-back"
							label="Passo anterior"
							type="ghost"
							size="medium"
							onClick={() => setCurrent((c) => c - 1)}
						/>
					) : null}
					{isLastStep ? (
						<Button label="Criar conta" type="filled" size="medium" onClick={() => onEvento('criar-conta')} />
					) : (
						<IconButton
							icon="arrow-forward"
							label="Próximo passo"
							type="ghost"
							size="medium"
							onClick={() => setCurrent((c) => c + 1)}
						/>
					)}
				</div>
			</div>

			<div className="absolute right-2 top-2 z-10">
				<IconButton icon="close" label="Fechar" type="ghost" size="medium" onClick={() => onEvento('adiar')} />
			</div>
		</div>
	)

	if (comoSheet) {
		return (
			<BottomSheet
				open={open}
				onClose={() => onEvento('adiar')}
				labelledById={titleId}
				// `px-0` porque a ilustração sangra até a borda do sheet; o padding passa
				// a ser de cada bloco do conteúdo. O `pt-3` do componente fica, é o que dá
				// respiro ao handle de arrastar.
				className={twMerge('overflow-hidden px-0', className)}
			>
				{conteudo}
			</BottomSheet>
		)
	}

	return (
		<Modal
			open={open}
			onClose={() => onEvento('adiar')}
			size="sm"
			padded={false}
			showClose={false}
			labelledById={titleId}
			className={twMerge('max-w-[420px]', className)}
		>
			{conteudo}
		</Modal>
	)
}
