/**
 * Componente: AudioVersionBlock — "Ouça agora"
 * Figma: referência visual é uma imagem estática do widget Trinity Audio
 * (node 4179:32037), sem componente nativo no arquivo.
 * Feedback do cliente (2026-07-30): não fica inline com a autoria — vira uma
 * caixa própria full-width, acima do AiSummaryBlock. O fornecedor real
 * (Audima ou Trinity Audio) ainda não foi decidido; este componente é um
 * marcador de espaço visual para "um player de terceiro entra aqui",
 * modelado a partir do widget Trinity Audio só por ser a referência que
 * existe no Figma. Esconder quando `media.kind === 'podcast'`.
 * Tokens: --color-neutral-100, --text-body-lg, --text-label-sm, rounded-sm
 */
import { useState } from 'react'
import { PlayButton } from '~/components/play-button'
import { twMerge } from '~/lib/tw-merge'
import type { IAudioVersionBlockProps } from './types'

function formatDuration(durationSec: number): string {
	const minutes = Math.floor(durationSec / 60)
	const seconds = String(Math.round(durationSec % 60)).padStart(2, '0')
	return `${minutes}:${seconds}`
}

export function AudioVersionBlock({ durationSec, className }: IAudioVersionBlockProps) {
	const [playing, setPlaying] = useState(false)

	return (
		<div className={twMerge('w-full border border-neutral-100 rounded-sm p-4 flex flex-col gap-3', className)}>
			<div className="flex items-center gap-3">
				<PlayButton
					as="button"
					type={playing ? 'pause' : 'play'}
					size="medium"
					onClick={() => setPlaying((v) => !v)}
					className="bg-neutral-50 text-primary-600 hover:text-secondary-950 shrink-0"
				/>
				<div className="min-w-0">
					<p className="font-body font-bold text-body-lg text-neutral-950">Ouça agora</p>
					<p className="font-body text-body-sm text-neutral-600">
						Powered by <strong className="font-bold text-neutral-900">Trinity Audio</strong>
					</p>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<span className="font-body text-label-sm text-neutral-500 tabular-nums">00:00</span>
				<div className="flex-1 h-1 rounded-full bg-neutral-100" aria-hidden="true" />
				<span className="font-body text-label-sm text-neutral-500 tabular-nums">
					{formatDuration(durationSec)}
				</span>
			</div>
		</div>
	)
}
