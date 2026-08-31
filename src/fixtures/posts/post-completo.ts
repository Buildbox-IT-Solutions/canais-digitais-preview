import type { Post } from '~/types/post'
import { picsumSrc } from '~/mocks/articles'

// Fixture "acúmulo de blocos": 2 autores + vídeo + download + aiSummary +
// audioVersion ao mesmo tempo — banco de testes do empilhamento de blocos
// no topo do artigo (ver Fase 3 do briefing).
export const POST_COMPLETO: Post = {
	slug: 'post-completo',
	kicker: 'Food Service',
	title: 'Análise sensorial com IA: como funciona, aplicações na indústria de alimentos',
	subtitle:
		'A análise sensorial com IA combina sensores digitais e algoritmos para avaliar sabor, aroma e textura em alimentos.',
	publishedAt: '2026-07-27T09:00:00-03:00',
	updatedAt: '2026-07-29T18:10:00-03:00',
	readingTimeMin: 9,
	authors: [
		{ id: 'marcelo-yamashita', name: 'Marcelo Yamashita', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=12' },
		{ id: 'rafaela-costa', name: 'Rafaela Costa', role: 'Editora de Ingredientes', avatarUrl: 'https://i.pravatar.cc/80?img=47' },
	],
	media: {
		kind: 'video',
		provider: 'youtube',
		id: 'analise-sensorial-ia-2026',
		title: 'Análise sensorial com IA: veja os sensores em ação',
	},
	audioVersion: {
		src: 'https://cdn.exemplo.com/audio/tts/analise-sensorial-ia.mp3',
		durationSec: 260,
	},
	download: {
		title: '10 tendências em Food Service para 2026',
		description:
			'Guia completo com as tendências que vão moldar o food service em 2026, da automação de cozinhas à personalização por IA.',
		fileType: 'PDF',
		fileSizeKb: 3150,
		ctaLabel: 'Baixar agora',
		requiresAuth: true,
	},
	aiSummary: {
		bullets: [
			'Sensores digitais como e-nose e e-tongue já identificam aroma, sabor e textura em tempo real.',
			'Algoritmos de machine learning reduzem a subjetividade das avaliações sensoriais tradicionais.',
			'A tecnologia amplia a confiabilidade dos testes e acelera o desenvolvimento de novos produtos.',
		],
		// TODO(copy): disclaimer pendente de aprovação — Ana / jurídico
		disclaimer: 'Resumo gerado por inteligência artificial. Pode conter imprecisões.',
	},
	headings: [
		{ id: 'como-funciona-a-analise-sensorial-com-ia', text: 'Como funciona a análise sensorial com IA', level: 2 },
		{ id: 'tipos-de-tecnologias-utilizadas', text: 'Tipos de tecnologias utilizadas', level: 3 },
		{ id: 'sensores-digitais-e-captura-de-dados-sensoriais', text: 'Sensores digitais e captura de dados sensoriais', level: 3 },
		{ id: 'algoritmos-de-machine-learning', text: 'Algoritmos de machine learning para reconhecimento de padrões', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'A análise sensorial com IA transforma o modo como a indústria de alimentos avalia sabor, aroma, textura e aparência. Sensores digitais e algoritmos de machine learning permitem processar grandes volumes de dados, identificar padrões de preferência e prever a aceitação de novos produtos.',
		},
		{
			type: 'paragraph',
			text: 'Além de reduzir o tempo de pesquisa e desenvolvimento, essa tecnologia amplia a confiabilidade dos testes e gera insights estratégicos para inovação e controle de qualidade.',
		},
		{
			type: 'image',
			src: picsumSrc('analise-sensorial-ia', 1200, 700),
			alt: 'Ingredientes e utensílios de laboratório usados em testes sensoriais de alimentos',
			caption: 'Sensores digitais avaliam aroma, sabor e textura com precisão comparável à de painéis humanos.',
		},
		{ type: 'heading', id: 'como-funciona-a-analise-sensorial-com-ia', text: 'Como funciona a análise sensorial com IA', level: 2 },
		{
			type: 'paragraph',
			text: 'A análise sensorial com inteligência artificial combina tecnologia e ciência de dados para avaliar atributos de alimentos com maior precisão e rapidez, transformando informações sensoriais em insights acionáveis para desenvolvimento e controle de qualidade.',
		},
		{ type: 'heading', id: 'tipos-de-tecnologias-utilizadas', text: 'Tipos de tecnologias utilizadas', level: 3 },
		{
			type: 'paragraph',
			text: 'Diversas tecnologias se unem para capturar e interpretar dados sensoriais, dos sensores de captura aos modelos de classificação treinados com milhares de amostras.',
		},
		{ type: 'heading', id: 'sensores-digitais-e-captura-de-dados-sensoriais', text: 'Sensores digitais e captura de dados sensoriais', level: 3 },
		{
			type: 'paragraph',
			text: 'A análise sensorial com IA combina sensores avançados como o e-nose (nariz eletrônico) e o e-tongue (língua eletrônica) para identificar aroma, sabor, textura e aparência dos alimentos em tempo real, com precisão comparável à de painéis humanos treinados.',
		},
		{
			type: 'highlight',
			text: 'A análise sensorial com IA combina sensores avançados como o e-nose (nariz eletrônico) e o e-tongue (língua eletrônica) para identificar aroma, sabor, textura e aparência dos alimentos em tempo real.',
		},
		{ type: 'heading', id: 'algoritmos-de-machine-learning', text: 'Algoritmos de machine learning para reconhecimento de padrões', level: 2 },
		{
			type: 'paragraph',
			text: 'Modelos como redes neurais artificiais, máquinas de vetor de suporte (SVM) e redes convolucionais processam dados de sensores, transformando sinais complexos em informações estruturadas para avaliação objetiva da qualidade — reduzindo a subjetividade em relação aos painéis humanos.',
		},
	],
}
