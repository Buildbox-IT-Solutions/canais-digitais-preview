import type { Post } from '~/types/post'

// audioVersion propositalmente preenchido: serve para validar que o bloco
// "Ouça agora" fica escondido quando media.kind === 'podcast' (ver regras
// derivadas do briefing) mesmo com o dado presente.
export const POST_PODCAST: Post = {
	slug: 'post-podcast',
	kicker: 'Embalagens',
	title: 'Tendências sustentáveis na indústria de embalagens: inovações e oportunidades',
	subtitle:
		'Neste episódio, especialistas discutem materiais biodegradáveis, redução de plástico virgem e o que muda com a nova regulação de logística reversa.',
	publishedAt: '2026-07-25T07:00:00-03:00',
	readingTimeMin: 4,
	authors: [
		{ id: 'luiza-bertolaccini', name: 'Luiza Bertolaccini', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=25' },
	],
	media: {
		kind: 'podcast',
		episodeTitle: 'Embalagens sustentáveis: o que vem depois do plástico virgem',
		src: 'https://open.spotify.com/embed/episode/exemplo-embalagens-sustentaveis',
		durationSec: 2152,
	},
	audioVersion: {
		src: 'https://cdn.exemplo.com/audio/tts/tendencias-embalagens.mp3',
		durationSec: 260,
	},
	download: null,
	aiSummary: null,
	headings: [
		{ id: 'materiais-biodegradaveis-em-alta', text: 'Materiais biodegradáveis em alta', level: 2 },
		{ id: 'o-que-muda-na-logistica-reversa', text: 'O que muda na logística reversa', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'Ouça o episódio completo acima. Nesta conversa, o time de embalagens da Fispal Tecnologia comenta os principais lançamentos vistos na última edição da feira e o que já está sendo testado em escala industrial.',
		},
		{ type: 'heading', id: 'materiais-biodegradaveis-em-alta', text: 'Materiais biodegradáveis em alta', level: 2 },
		{
			type: 'paragraph',
			text: 'Embalagens à base de fibra de celulose e bioplásticos compostáveis ganharam espaço nas prateleiras em 2026, puxadas por marcas que buscam reduzir a pegada de carbono sem aumentar o custo final ao consumidor.',
		},
		{ type: 'heading', id: 'o-que-muda-na-logistica-reversa', text: 'O que muda na logística reversa', level: 2 },
		{
			type: 'paragraph',
			text: 'A nova regulação de logística reversa amplia a responsabilidade dos fabricantes sobre o pós-consumo da embalagem, o que já está reorganizando contratos entre indústria e cooperativas de reciclagem em todo o país.',
		},
	],
}
