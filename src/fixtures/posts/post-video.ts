import type { Post } from '~/types/post'

export const POST_VIDEO: Post = {
	slug: 'post-video',
	kicker: 'Logística',
	title: 'Como fazer um plano de logística integrada na indústria de alimentos',
	subtitle:
		'Planejamento, análise de rotas, integração de sistemas e ações de contingência: o passo a passo que reduz perdas no transporte de perecíveis.',
	publishedAt: '2026-07-24T10:00:00-03:00',
	readingTimeMin: 6,
	authors: [
		{ id: 'bruno-tavares', name: 'Bruno Tavares', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=53' },
	],
	media: {
		kind: 'video',
		provider: 'youtube',
		id: 'lg-integrada-2026',
		title: 'Plano de logística integrada: como estruturar em 4 etapas',
	},
	audioVersion: null,
	download: null,
	aiSummary: null,
	headings: [
		{ id: 'diagnostico-antes-do-plano', text: 'Diagnóstico antes do plano', level: 2 },
		{ id: 'integracao-de-sistemas', text: 'Integração de sistemas entre elos da cadeia', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'O vídeo acima resume os quatro pilares de um plano de logística integrada: diagnóstico da operação atual, desenho de rotas, integração de sistemas entre fornecedores e transportadoras, e um plano de contingência para picos de demanda ou falhas de frota.',
		},
		{ type: 'heading', id: 'diagnostico-antes-do-plano', text: 'Diagnóstico antes do plano', level: 2 },
		{
			type: 'paragraph',
			text: 'Antes de redesenhar qualquer rota, é preciso mapear onde estão as maiores perdas hoje: tempo parado em docas, janelas de entrega descumpridas ou custo de frete acima da média do setor. Sem esse diagnóstico, qualquer plano novo repete os mesmos erros com outra roupagem.',
		},
		{ type: 'heading', id: 'integracao-de-sistemas', text: 'Integração de sistemas entre elos da cadeia', level: 2 },
		{
			type: 'paragraph',
			text: 'A maior parte do ganho de eficiência não vem de um único sistema novo, mas da integração entre os que já existem — WMS do armazém, TMS da transportadora e ERP do fabricante conversando em tempo real evitam retrabalho manual de conferência.',
		},
	],
}
