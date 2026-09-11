import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { IconButton } from '~/components/icon-button'
import { LinkButton } from '~/components/link-button'
import { Modal } from '~/components/modal'
import downloadImage from '~/assets/images/whats-new/download-16-9.png'
import downloadImage2x from '~/assets/images/whats-new/download-16-9@2x.png'
import loginImage from '~/assets/images/whats-new/login-16-9.png'
import loginImage2x from '~/assets/images/whats-new/login-16-9@2x.png'
import newsletterImage from '~/assets/images/whats-new/newsletter-16-9.png'
import newsletterImage2x from '~/assets/images/whats-new/newsletter-16-9@2x.png'
import type { IWhatsNewDialogProps } from './types'

/**
 * Componente: Whats New Dialog — carrossel de novidades sobre a home (feature de login)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8564-2255
 *   Desktop 8598:32489 (Step 1 — 8571:152 · Step 2 — 8572:152 · Step 3 — 8573:158)
 *   Mobile  8617:32898 (Step 1 — 8617:32574 · Step 2 — 8617:32690 · Step 3 — 8617:32709)
 *
 * Mesmo modal centralizado nos dois tamanhos — 420px a partir de `lg`, 342px com
 * margem de 24px abaixo disso. Só mudam largura e paddings; não há troca de
 * apresentação. A ilustração é 16:9 em ambos, então a altura sai da proporção.
 *
 * Quando exibir, para quem e quantas vezes NÃO mora aqui: ver
 * `src/lib/whats-new-campanha.ts` e `notas/2026-09-10-regras-exibicao-whats-new.md`.
 * Este componente só informa o que aconteceu, via `onEvento`.
 *
 * Tokens: --color-primary-600, --color-secondary-500, --color-neutral-900, --color-neutral-700,
 *         --color-neutral-200, --text-title-xl, --text-body-md, --font-display, --font-body
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

export function WhatsNewDialog({ open, onEvento, initialStep = 0, className }: IWhatsNewDialogProps) {
	const [current, setCurrent] = useState(initialStep)
	const titleId = useId()

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

	return (
		<Modal
			open={open}
			onClose={() => onEvento('adiar')}
			size="sm"
			padded={false}
			showClose={false}
			labelledById={titleId}
			// `mx-2` soma aos 16px do wrapper do Modal e fecha os 24px de margem lateral
			// que o mobile pede, em qualquer largura de tela.
			className={twMerge('mx-2 max-w-[342px] lg:mx-0 lg:max-w-[420px]', className)}
		>
			<div className="relative flex w-full flex-col">
				{/*
				 * Ilustração exportada do Figma (o gradiente Sky→Arctic faz parte do PNG).
				 * Decorativa: título e descrição abaixo já dizem tudo que ela mostra.
				 * A proporção vem do próprio asset (420×236), então a altura acompanha a
				 * largura do card sem precisar de altura fixa por breakpoint.
				 */}
				<img
					src={step.image.src}
					srcSet={`${step.image.src} 1x, ${step.image.src2x} 2x`}
					width={420}
					height={236}
					alt=""
					className="aspect-[420/236] w-full shrink-0 object-cover"
				/>

				<div className="flex justify-center gap-2 px-6 py-4 lg:px-8" role="tablist" aria-label="Passos da novidade">
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

				<div className="flex flex-col gap-2 px-6 py-3 lg:px-8">
					<h2 id={titleId} className="font-display font-normal text-title-xl text-primary-600">
						{step.title}
					</h2>
					<p className="font-body text-body-md text-neutral-700">{step.description}</p>
				</div>

				<div className="flex items-center gap-8 px-6 py-6 lg:px-8">
					{/*
					 * Link, não pílula: "Pular" é a saída discreta ao lado da ação principal.
					 * Cor do Figma (neutral-900) em vez do azul padrão do LinkButton — aqui
					 * ele não compete com o CTA. 🔴 A CONFIRMAR se vira variante do componente.
					 */}
					<LinkButton
						label="Pular"
						size="sm"
						onClick={() => onEvento('pular')}
						className="shrink-0 text-neutral-900 hover:text-neutral-700"
					/>

					{/* `flex-1` para o CTA do último passo poder esticar no mobile; nos demais
					    passos só empurra as setas para a direita. */}
					<div className="flex flex-1 items-center justify-end gap-5">
						{/*
						 * A seta de voltar só existe no passo do meio: no primeiro não há para
						 * onde voltar, e no último ela sairia disputando espaço com o CTA.
						 */}
						{!isFirstStep && !isLastStep ? (
							<IconButton
								icon="arrow-back"
								label="Passo anterior"
								type="ghost"
								size="medium"
								onClick={() => setCurrent((c) => c - 1)}
							/>
						) : null}
						{isLastStep ? (
							// No mobile o CTA ocupa a largura que sobra; no desktop fica no tamanho dele.
							<Button
								label="Criar conta"
								type="filled"
								size="medium"
								onClick={() => onEvento('criar-conta')}
								className="flex-1 lg:flex-none"
							/>
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
		</Modal>
	)
}
