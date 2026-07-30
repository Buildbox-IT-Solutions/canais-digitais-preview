/**
 * Componente: AudioVersionBlock — "Ouça agora"
 * Figma: referência visual é uma imagem estática do widget Trinity Audio
 * (node 4179:32037), sem componente nativo no arquivo.
 * Variante implementada: pill inline na linha de metadados (mitigação da
 * Fase 3 do briefing pagina-conteudo-toc — reduz o empilhamento de caixas
 * no topo do artigo). Esconder quando `media.kind === 'podcast'`.
 * Tokens: --color-primary-100, --color-primary-600, --text-label-lg
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
		<button
			type="button"
			onClick={() => setPlaying((v) => !v)}
			aria-pressed={playing}
			className={twMerge(
				'inline-flex items-center gap-2 h-10 pl-1 pr-4 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-100/70 transition-colors font-body font-semibold text-label-lg shrink-0',
				className,
			)}
		>
			<PlayButton as="div" type={playing ? 'pause' : 'play'} size="xsmall" />
			Ouça agora
			<span className="font-normal text-neutral-600">{formatDuration(durationSec)}</span>
		</button>
	)
}
