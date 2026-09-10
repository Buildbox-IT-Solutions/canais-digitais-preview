import { useId, useState, type ReactNode } from 'react'
import { twMerge } from '~/lib/tw-merge'
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
 * Passos, dots clicáveis, "Pular" (presente nos três passos) e navegação por setas —
 * no último passo a seta "avançar" dá lugar ao CTA "Criar conta".
 * Regra de quando exibir / cooldown / persistência fica fora deste componente — ver quem
 * o consome (ex.: tela da home).
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

export function WhatsNewDialog({ open, onClose, initialStep = 0, className }: IWhatsNewDialogProps) {
	const [current, setCurrent] = useState(initialStep)
	const titleId = useId()
	const isFirstStep = current === 0
	const isLastStep = current === STEPS.length - 1
	const step = STEPS[current]

	function handleClose() {
		onClose()
		setCurrent(0)
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			size="sm"
			padded={false}
			showClose={false}
			labelledById={titleId}
			className={twMerge('max-w-[420px]', className)}
		>
			<div className="flex w-full flex-col">
				{/*
				 * Ilustração exportada do Figma (o gradiente Sky→Arctic faz parte do PNG).
				 * Decorativa: título e descrição ao lado já dizem tudo que ela mostra.
				 */}
				<img
					src={step.image.src}
					srcSet={`${step.image.src} 1x, ${step.image.src2x} 2x`}
					width={420}
					height={180}
					alt=""
					className="h-[180px] w-full shrink-0 object-cover"
				/>

				<div className="flex justify-center gap-2 px-8 py-4" role="tablist" aria-label="Passos da novidade">
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

				<div className="flex flex-col gap-4 px-8 py-6">
					<h2 id={titleId} className="font-display font-normal text-title-xl text-primary-600">
						{step.title}
					</h2>
					<p className="font-body text-body-md text-neutral-700">{step.description}</p>
				</div>

				<div className="flex items-center justify-between p-6">
					<Button label="Pular" type="ghost" size="small" onClick={handleClose} />

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
							<Button label="Criar conta" type="filled" size="medium" href="/cadastro" />
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
			</div>

			<div className="absolute right-2 top-2 z-10">
				<IconButton icon="close" label="Fechar" type="ghost" size="medium" onClick={handleClose} />
			</div>
		</Modal>
	)
}
