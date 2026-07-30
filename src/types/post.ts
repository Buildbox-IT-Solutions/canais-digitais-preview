export type Author = {
	id: string
	name: string
	role?: string // ex: "Repórter", "Editor de Energia"
	avatarUrl: string
}

// Mutuamente exclusivo: um post tem vídeo OU podcast OU nenhum dos dois.
export type Media =
	| { kind: 'video'; provider: 'youtube' | 'vimeo'; id: string; title: string }
	| { kind: 'podcast'; episodeTitle: string; src: string; durationSec: number }
	| null

// Versão em áudio da MATÉRIA (TTS). Diferente de media.kind === 'podcast'.
export type AudioVersion = {
	src: string
	durationSec: number
} | null

export type Download = {
	title: string
	description: string
	fileType: 'PDF' | 'XLSX' | 'ZIP'
	fileSizeKb: number
	ctaLabel: string
	requiresAuth: boolean // integra com o gate de download já existente
} | null

export type AiSummary = {
	bullets: string[]
	disclaimer: string
} | null

export type Heading = {
	id: string // slug, usado como âncora do TOC
	text: string
	level: 2 | 3
}

export type ContentBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'heading'; id: string; text: string; level: 2 | 3 }
	| { type: 'image'; src: string; alt: string; caption?: string }
	| { type: 'highlight'; text: string }

export type Post = {
	slug: string
	kicker: string // editoria, ex: "Transmissão"
	title: string
	subtitle?: string
	publishedAt: string // ISO
	updatedAt?: string
	readingTimeMin: number
	authors: Author[] // 1 item OU vários — ver regras derivadas do briefing
	media: Media
	audioVersion: AudioVersion
	download: Download
	aiSummary: AiSummary
	headings: Heading[] // alimenta o TOC
	body: ContentBlock[]
}
