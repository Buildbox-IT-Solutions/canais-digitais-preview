import type { Post } from '~/types/post'

export const POST_DOWNLOAD: Post = {
	slug: 'post-download',
	kicker: 'Pesquisa',
	title: 'O poder da IA no mercado de alimentos e bebidas: expansão e desafios do setor em 2025',
	subtitle:
		'Pesquisa realizada pela Fispal Tecnologia e Food Connection revela a expansão e os desafios da implementação da IA na indústria de alimentos e bebidas em 2025.',
	publishedAt: '2026-06-30T11:00:00-03:00',
	updatedAt: '2026-07-02T09:20:00-03:00',
	readingTimeMin: 8,
	authors: [
		{ id: 'joao-pedro-almeida', name: 'João Pedro Almeida', role: 'Editor de Logística', avatarUrl: 'https://i.pravatar.cc/80?img=33' },
		{ id: 'rafaela-costa', name: 'Rafaela Costa', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=47' },
	],
	media: null,
	audioVersion: null,
	download: {
		title: 'O poder da IA no mercado de alimentos e bebidas',
		description:
			'Pesquisa completa com 147 empresários do setor sobre grau de adoção, investimentos e barreiras para o uso de inteligência artificial na indústria de alimentos e bebidas.',
		fileType: 'PDF',
		fileSizeKb: 4200,
		ctaLabel: 'Baixar pesquisa completa',
		requiresAuth: true,
	},
	aiSummary: null,
	headings: [
		{ id: 'crescimento-do-mercado-global-de-ia', text: 'Crescimento do mercado global de IA na indústria alimentícia', level: 2 },
		{ id: 'grau-de-adocao-da-inteligencia-artificial', text: 'Grau de adoção da inteligência artificial', level: 2 },
		{ id: 'panorama-de-investimentos', text: 'Panorama de investimentos e perspectivas', level: 3 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'A aplicação da inteligência artificial (IA) na indústria de alimentos e bebidas está em plena expansão. Essa combinação tem desempenhado um papel cada vez mais importante na busca por eficiência e produtividade no setor.',
		},
		{ type: 'heading', id: 'crescimento-do-mercado-global-de-ia', text: 'Crescimento do mercado global de IA na indústria alimentícia', level: 2 },
		{
			type: 'paragraph',
			text: 'Em 2024, o mercado global de IA no setor alimentício foi avaliado em aproximadamente 10,529 bilhões de dólares, com projeções de alcançar 251,916 bilhões até 2033 — uma taxa de crescimento anual composta de 42,3% no período.',
		},
		{ type: 'heading', id: 'grau-de-adocao-da-inteligencia-artificial', text: 'Grau de adoção da inteligência artificial', level: 2 },
		{
			type: 'paragraph',
			text: 'Atualmente, apenas 29% das empresas utilizam estratégias de automação baseadas em IA ou robótica. Destas, 44% estão na fase inicial de exploração dos sistemas e 36% implementaram projetos-piloto em áreas específicas.',
		},
		{ type: 'heading', id: 'panorama-de-investimentos', text: 'Panorama de investimentos e perspectivas', level: 3 },
		{
			type: 'paragraph',
			text: 'A pesquisa completa revela o panorama de investimentos em IA, as áreas de maior foco para implementação e as principais tecnologias de automação utilizadas pelas empresas participantes. Baixe o material abaixo para acessar todos os dados.',
		},
	],
}
