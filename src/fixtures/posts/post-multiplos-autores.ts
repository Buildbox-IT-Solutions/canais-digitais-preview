import type { Post } from '~/types/post'

export const POST_MULTIPLOS_AUTORES: Post = {
	slug: 'post-multiplos-autores',
	kicker: 'Logística',
	title: 'Rastreabilidade e blockchain: como a cadeia de frio ganha transparência',
	subtitle:
		'Registros distribuídos prometem reduzir fraudes e agilizar recalls em produtos perecíveis — mas a adoção ainda esbarra em custo e integração de sistemas legados.',
	publishedAt: '2026-07-21T08:15:00-03:00',
	updatedAt: '2026-07-22T14:40:00-03:00',
	readingTimeMin: 7,
	authors: [
		{ id: 'rafaela-costa', name: 'Rafaela Costa', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=47' },
		{ id: 'joao-pedro-almeida', name: 'João Pedro Almeida', role: 'Editor de Logística', avatarUrl: 'https://i.pravatar.cc/80?img=33' },
		{ id: 'luiza-bertolaccini', name: 'Luiza Bertolaccini', role: 'Repórter', avatarUrl: 'https://i.pravatar.cc/80?img=25' },
	],
	media: null,
	audioVersion: null,
	download: null,
	aiSummary: null,
	headings: [
		{ id: 'o-problema-da-cadeia-de-frio', text: 'O problema da cadeia de frio hoje', level: 2 },
		{ id: 'como-o-blockchain-ajuda', text: 'Como o blockchain ajuda na prática', level: 2 },
		{ id: 'barreiras-para-adocao', text: 'Barreiras para adoção em larga escala', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'Um lote de carne congelada pode passar por mais de seis mãos diferentes entre o frigorífico e a gôndola do supermercado. Em cada etapa, a temperatura registrada em papel ou em planilhas isoladas cria brechas para erro — e para fraude.',
		},
		{ type: 'heading', id: 'o-problema-da-cadeia-de-frio', text: 'O problema da cadeia de frio hoje', level: 2 },
		{
			type: 'paragraph',
			text: 'Reportagens recentes do setor mostram que falhas de rastreabilidade respondem por boa parte dos recalls de produtos perecíveis no Brasil. Sem um registro único e auditável, identificar em qual elo da cadeia a ruptura de frio aconteceu pode levar dias.',
		},
		{ type: 'heading', id: 'como-o-blockchain-ajuda', text: 'Como o blockchain ajuda na prática', level: 2 },
		{
			type: 'paragraph',
			text: 'Sensores IoT registram temperatura e umidade em tempo real e gravam esses dados em um livro-razão distribuído, imutável e compartilhado entre todos os elos — transportadora, armazém e varejista. Qualquer alteração fora do padrão fica visível e datada.',
		},
		{
			type: 'highlight',
			text: 'Com blockchain, o tempo médio para localizar a origem de uma ruptura de temperatura cai de dias para minutos, segundo pilotos já rodados no setor de proteína animal.',
		},
		{ type: 'heading', id: 'barreiras-para-adocao', text: 'Barreiras para adoção em larga escala', level: 2 },
		{
			type: 'paragraph',
			text: 'O maior obstáculo não é tecnológico, mas de integração: cada transportadora e armazém usa um sistema de gestão diferente, e nem todos têm orçamento para instalar sensores em toda a frota. Especialistas apontam que a adoção deve começar pelos elos de maior risco.',
		},
	],
}
