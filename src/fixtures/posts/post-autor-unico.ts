import type { Post } from '~/types/post'

export const POST_AUTOR_UNICO: Post = {
	slug: 'post-autor-unico',
	kicker: 'Indústria A&B',
	title: 'Design higiênico: pilar estratégico para o futuro da indústria alimentícia',
	subtitle:
		'Equipamentos seguros, higiênicos e eficientes reduzem contaminação cruzada e ganham espaço nos projetos de novas plantas fabris.',
	publishedAt: '2026-07-18T09:00:00-03:00',
	readingTimeMin: 5,
	authors: [
		{ id: 'marcelo-yamashita', name: 'Marcelo Yamashita', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=12' },
	],
	media: null,
	audioVersion: null,
	download: null,
	aiSummary: null,
	headings: [
		{ id: 'o-que-e-design-higienico', text: 'O que é design higiênico', level: 2 },
		{ id: 'onde-o-conceito-se-aplica', text: 'Onde o conceito se aplica na planta fabril', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'Cada vez mais indústrias de alimentos revisam o desenho de suas linhas de produção com um critério que já é padrão na Europa: o design higiênico. A ideia é simples — projetar equipamentos e ambientes para que a limpeza seja rápida, completa e verificável.',
		},
		{ type: 'heading', id: 'o-que-e-design-higienico', text: 'O que é design higiênico', level: 2 },
		{
			type: 'paragraph',
			text: 'Na prática, significa eliminar cantos vivos, frestas e pontos de acúmulo de resíduos em máquinas e estruturas. Superfícies lisas, soldas contínuas e materiais resistentes à corrosão reduzem drasticamente o risco de contaminação cruzada entre lotes de produção.',
		},
		{
			type: 'highlight',
			text: 'Uma auditoria mal feita em design higiênico custa caro: recall, perda de lote e, em casos graves, suspensão de licença sanitária.',
		},
		{ type: 'heading', id: 'onde-o-conceito-se-aplica', text: 'Onde o conceito se aplica na planta fabril', level: 2 },
		{
			type: 'paragraph',
			text: 'O conceito vai além dos equipamentos: abrange o piso com caimento correto para escoamento de água, o posicionamento de tubulações fora do alcance de respingos e até a escolha de lâmpadas com proteção contra estilhaços em áreas expostas ao produto.',
		},
		{
			type: 'paragraph',
			text: 'Fabricantes de equipamentos já oferecem linhas certificadas por normas internacionais de design sanitário, o que facilita a decisão de compra para plantas que exportam e precisam atender múltiplas exigências regulatórias ao mesmo tempo.',
		},
	],
}
