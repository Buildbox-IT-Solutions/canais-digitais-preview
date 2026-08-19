import { useId } from 'react'
import { BottomSheet } from '~/components/bottom-sheet'
import { IconButton } from '~/components/icon-button'
import { Modal } from '~/components/modal'
import { StatusRing } from '~/components/status-ring'
import { useMediaQuery } from '~/lib/use-media-query'
import type { IIncentiveDownloadDialogProps } from './types'

/**
 * Componente: Incentive Download Dialog
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7469-34686
 * Exceção aos incentivos passivos (Portal/Leitura): sempre modal/dialog próprio, nunca
 * banner, sem cooldown/supressão/storage. Desktop: Modal centralizado. Mobile: BottomSheet
 * (ganha o swipe-to-dismiss de fábrica). Dispensa só pelo X (sem link "Agora não").
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-900, --color-neutral-50, --color-white
 *
 * Conteúdo generalizado (feature Favoritos) — reuso do MESMO modal pro gatilho de
 * favoritar deslogado, em vez de um componente novo. `icon`/`title`/`body`/
 * `primaryLabel`/`secondaryLabel` têm default que reproduz EXATAMENTE o texto de
 * download de sempre — os dois call sites de download (home, conteudo) não passam
 * nenhum desses props e continuam idênticos. Favoritos é visualmente IDÊNTICO ao
 * download (mesmo ícone/título/2 botões em forma, só o glifo e os textos de
 * título/corpo mudam) — os call sites de favoritos (NewsCard, CategoryColumn)
 * passam `onLogin` (então o botão secundário aparece) e não sobrescrevem
 * `primaryLabel`/`secondaryLabel`, herdando os mesmos rótulos do download.
 * `onLogin` é opcional só pra não quebrar um consumidor hipotético de um único
 * botão — hoje todo call site real (download e favoritos) usa os dois.
 */
export function IncentiveDownloadDialog({
	open,
	onCreateAccount,
	onLogin,
	onDismiss,
	icon = 'download',
	title = (
		<>
			Crie sua conta para <span className="font-bold text-secondary-500">baixar</span>
		</>
	),
	body = 'Baixe este material agora e tenha acesso a todos os outros com um clique, sem preencher formulários de novo.',
	primaryLabel = 'Criar conta grátis',
	secondaryLabel = 'Já tenho conta • Entrar',
}: IIncentiveDownloadDialogProps) {
	const titleId = useId()
	const isDesktop = useMediaQuery('(min-width: 1024px)')

	const content = (
		<DownloadDialogContent
			titleId={titleId}
			icon={icon}
			title={title}
			body={body}
			primaryLabel={primaryLabel}
			secondaryLabel={secondaryLabel}
			onCreateAccount={onCreateAccount}
			onLogin={onLogin}
		/>
	)

	if (isDesktop) {
		return (
			<Modal open={open} size="sm" onClose={onDismiss} labelledById={titleId}>
				{content}
			</Modal>
		)
	}

	return (
		<BottomSheet open={open} onClose={onDismiss} labelledById={titleId}>
			<IconButton
				icon="close"
				label="Fechar"
				size="small"
				type="ghost"
				onClick={onDismiss}
				className="absolute right-4 top-4"
			/>
			{content}
		</BottomSheet>
	)
}

interface IDownloadDialogContentProps
	extends Pick<IIncentiveDownloadDialogProps, 'onCreateAccount' | 'onLogin'>,
		Required<Pick<IIncentiveDownloadDialogProps, 'icon' | 'title' | 'body' | 'primaryLabel' | 'secondaryLabel'>> {
	titleId: string
}

function DownloadDialogContent({
	titleId,
	icon,
	title,
	body,
	primaryLabel,
	secondaryLabel,
	onCreateAccount,
	onLogin,
}: IDownloadDialogContentProps) {
	return (
		<div className="flex flex-col gap-6">
			<StatusRing accent="primary" icon={icon} size="sm" />

			<div className="flex flex-col gap-1">
				<p id={titleId} className="font-display font-normal text-headline-md text-primary-600">
					{title}
				</p>
				<p className="font-body text-body-lg text-neutral-900">{body}</p>
			</div>

			<div className="flex flex-col gap-3">
				<button
					type="button"
					onClick={onCreateAccount}
					className="w-full h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white font-body font-bold text-body-lg hover:bg-secondary-950 transition-colors"
				>
					{primaryLabel}
				</button>
				{onLogin ? (
					<button
						type="button"
						onClick={onLogin}
						className="w-full h-12 inline-flex items-center justify-center rounded-full border-2 border-primary-600 text-primary-600 font-body font-bold text-body-lg hover:bg-neutral-50 transition-colors"
					>
						{secondaryLabel}
					</button>
				) : null}
			</div>
		</div>
	)
}
