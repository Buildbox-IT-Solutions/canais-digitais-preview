/**
 * Mock: Biblioteca exclusiva — acervo de materiais para download.
 *
 * EXTRAÍDO DA FONTE REAL em 2026-08-30, das 3 primeiras páginas de
 * https://www.foodconnection.com.br/materiais-de-download/ (+ /pagina/2/ e /pagina/3/).
 * 30 materiais. Títulos, leads, capas e datas são os reais do portal — a fidelidade dos
 * títulos é o ponto da extração: são eles que testam o clamp de 3 linhas do LibCard.
 *
 * O que veio da fonte: `titulo`, `sinopse` (o lead da listagem), `primeiroParagrafo`,
 * `capaUrl` e `publicadoEm` (do `datePublished` da página de cada material — a listagem
 * não traz data).
 *
 * O que NÃO existe na fonte e está SIMULADO (cada ocorrência comentada no item):
 *  - `baixado` — 5 itens. Sem consumidor visual (ver o campo).
 *  - `disponivel` — 2 itens em false, para o estado "Indisponível" do LibCard. Ambos em
 *    categorias que NÃO aparecem entre os 12 mais recentes (Sorvetes e ESG): material
 *    indisponível não pode ser novidade, então o estado só é alcançável filtrando por
 *    categoria. Ver `materiaisMaisRecentes()` em src/lib/biblioteca.ts.
 *  - `requerCadastroCompleto` — 15 itens. A anotação do Figma diz "ALGUNS materiais são
 *    bloqueados", então o gate é POR MATERIAL, não global.
 *  - `arquivoUrl` — nenhuma página do portal expõe link direto pro arquivo; o download
 *    fica atrás de formulário. Aponta pra página pública do material, não pro PDF.
 *  - `tipo` de 8 itens sem sufixo no título (default 'ebook', comentado item a item).
 *  - `categoria` de 24 dos 30 itens (ver TAXONOMIA abaixo).
 *
 * Capas: servidas direto do CloudFront do portal. Hotlink testado (com e sem Referer):
 * HTTP 200, sem bloqueio — por isso as URLs são remotas, nenhuma imagem foi copiada
 * pra /public.
 */
import type { CategoriaColor } from '~/components/categoria/types'

export type MaterialType = 'ebook' | 'whitepaper' | 'infografico'

export interface Material {
	id: string
	/** Íntegro, como vem da fonte, incluindo o sufixo de tipo entre colchetes. */
	titulo: string
	/** O LEAD do post. Vazio em 9 dos 30 — ver `primeiroParagrafo`. */
	sinopse: string
	/**
	 * Primeiro parágrafo do post, extraído da página real.
	 *
	 * Existe por causa da anotação do SidePanel no Figma: "1. Lead do post / 2. Se não
	 * tiver Lead, mostra o primeiro parágrafo do post". É por isso que a Biblioteca NÃO
	 * tem estado de "sinopse ausente": a fonte sempre tem o que mostrar, só nem sempre
	 * no mesmo campo. Ver `leadDoMaterial()` em src/lib/biblioteca.ts.
	 */
	primeiroParagrafo: string
	tipo: MaterialType
	/** Categoria editorial do portal. */
	categoria: string
	/** ISO 8601. */
	publicadoEm: string
	/** Imagem destacada do post. */
	capaUrl: string
	arquivoUrl: string
	/**
	 * SIMULADO. 🔴 **SEM CONSUMIDOR VISUAL desde 2026-08-30**: o selo "Baixado" no card
	 * saiu na revisão (o Figma não o desenha). O campo fica porque faz parte do contrato
	 * de `Material` definido no briefing e alimenta o histórico. Ver ds/achados.md.
	 */
	baixado: boolean
	/** SIMULADO. `false` = material despublicado/expirado → LibCard em "Indisponível". */
	disponivel: boolean
	/**
	 * SIMULADO. `true` = só baixa com cadastro 100% completo.
	 *
	 * Anotação do Figma: "Alguns materiais são bloqueados para usuários que não tenham
	 * perfil completo (100%)". O "alguns" é literal — o bloqueio é por material, não uma
	 * chave global da aba. Material com `false` baixa mesmo com cadastro incompleto.
	 */
	requerCadastroCompleto: boolean
}

export interface LibraryGate {
	camposFaltantes: string[]
	/** Uma vez true, nunca volta a false. Ver src/lib/biblioteca-gate-store.ts. */
	desbloqueado: boolean
}

/**
 * TAXONOMIA — lida do menu real de https://www.foodconnection.com.br/ (slug do caminho
 * → rótulo exibido no site).
 *
 * 🔴 Achado para a discussão com o tech lead: **24 dos 30 materiais (80%) tiveram a
 * categoria INFERIDA pelo tema do título**, porque a URL deles não carrega categoria
 * editorial nenhuma. Só 6 vivem sob um caminho editorial (/proteina-animal/,
 * /ingredientes/, /sustentabilidade/). Os outros vivem sob /materiais-de-download/ (o
 * container do acervo) ou /eventos/<feira>/ — e o cabeçalho da própria página exibe
 * "Materiais de Download" no lugar da categoria. Na fonte, o container VIROU a
 * categoria. Cada item inferido está comentado.
 *
 * `Embalagens` entra na lista mesmo sem nenhum material nas 3 primeiras páginas — é
 * categoria real do portal, só ainda sem acervo. Fica de fora da FilterBar
 * (`categoriasComAcervo`) até ter material publicado.
 */
export interface CategoriaPortal {
	slug: string
	label: string
	color: CategoriaColor
}

export const CATEGORIAS_PORTAL: CategoriaPortal[] = [
	{ slug: 'industria-ab', label: 'Indústria A&B', color: 'primary-600' },
	{ slug: 'ingredientes', label: 'Ingredientes', color: 'mint' },
	{ slug: 'proteina-animal', label: 'Proteína Animal', color: 'coral' },
	{ slug: 'food-service', label: 'Food Service', color: 'saffron' },
	{ slug: 'sorvetes', label: 'Sorvetes', color: 'secondary-500' },
	{ slug: 'tecnologia', label: 'Tecnologia', color: 'lavander' },
	{ slug: 'esg', label: 'ESG', color: 'secondary-950' },
	// 🔴 Cor repetida com "Indústria A&B": `CategoriaColor` tem 7 cores e o portal tem 8
	// categorias. Ver ds/achados.md — não inventamos uma oitava cor fora do DS.
	{ slug: 'embalagens', label: 'Embalagens', color: 'primary-600' },
]

/** Ordem do arquivo: cronológica decrescente por `publicadoEm`. */
export const MATERIAIS: Material[] = [
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'tendencias-em-ingredientes-ebook',
		titulo: 'Tendências em ingredientes: GLP-1, proteínas e saúde cognitiva [Ebook]',
		sinopse: 'Veja como a nova cultura estética e de saúde pública – impulsionada pelo GLP-1 – impacta a produção de ingredientes, além de outros fatores que devem movimentar a indústria de A&B',
		primeiroParagrafo: 'Veja como a nova cultura estética e de saúde pública – impulsionada pelo GLP-1 – impacta a produção de ingredientes, além de outros fatores que devem movimentar a indústria de A&B',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2026-06-01T09:59:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/05/FISA-2026-Ebook-Tendencias2026-TH-1024x423.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/tendencias-em-ingredientes-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	// SIMULADO (não existe na fonte): baixado, requerCadastroCompleto
	{
		id: 'alimentacao-na-era-do-glp-1-ebook',
		titulo: 'Alimentação na era do GLP-1 [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Saiba como preparar sua empresa, com estratégias de portfólio, tecnologias, embalagens e comunicação eficaz com esse novo consumidor.',
		tipo: 'ebook',
		categoria: 'Indústria A&B',
		publicadoEm: '2026-05-18T15:15:14+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/05/FispalTecnologia-2026-Ebook-GLP1-TH-1024x423.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/alimentacao-na-era-do-glp-1-ebook/',
		baixado: true,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	{
		id: 'era-da-ia-na-industria-alimenticia',
		titulo: 'Era da IA: Revolução Digital na Indústria Alimentícia [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Inteligência artificial transforma processos, impulsiona inovação e redefine o futuro do setor',
		tipo: 'ebook',
		categoria: 'Tecnologia',
		publicadoEm: '2026-05-13T16:51:33+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/05/FispalTecnologia-2026-Ebook-IA-TH-1024x423.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/era-da-ia-na-industria-alimenticia/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'do-pasto-ao-prato-eficiencia-produtiva-frigorifico',
		titulo: 'Brasil lidera produção e exportação de carne bovina, mas enfrenta desafios de sustentabilidade [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Pesquisa mostra como a bovinocultura brasileira destaca-se globalmente em produção e exportação, mas precisa superar questões como rastreabilidade, desmatamento e eficiência produtiva para atender à crescente demanda de forma sustentável.',
		tipo: 'ebook',
		categoria: 'Proteína Animal',
		publicadoEm: '2026-05-04T09:31:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/04/Tecnocarne-2026-DoPastoAoPrato-TH-1024x423.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/do-pasto-ao-prato-eficiencia-produtiva-frigorifico/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'geopolitica-da-comida',
		titulo: 'Geopolítica da comida: Tendências, riscos e oportunidades para a indústria alimentícia [Ebook]',
		sinopse: 'Saiba quais os impactos dos conflitos globais na indústria de alimentos, com foco no Brasil',
		primeiroParagrafo: 'Saiba quais os impactos dos conflitos globais na indústria de alimentos, com foco no Brasil',
		tipo: 'ebook',
		categoria: 'Indústria A&B',
		publicadoEm: '2026-05-01T14:35:56+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/05/Geopolitica-da-comida-Tendencias-riscos-e-oportunidades-1024x576.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/geopolitica-da-comida/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	{
		id: 'tendencias-para-o-food-service-em-2026',
		titulo: 'Ozempic, 6×1 e custo da mão de obra: como esses e outros assuntos moldam as tendências para o Food Service em 2026',
		sinopse: 'A estratégia é ser menos dependente de volume e mais ancorado em produtividade, inteligência de preço e proposta de valor clara para um consumidor mais seletivo.',
		primeiroParagrafo: 'A estratégia é ser menos dependente de volume e mais ancorado em produtividade, inteligência de preço e proposta de valor clara para um consumidor mais seletivo.',
		tipo: 'ebook',
		categoria: 'Food Service',
		publicadoEm: '2026-04-01T09:59:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/03/FFS-2026-Ebook-Tendencias-capa-1024x423.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/tendencias-para-o-food-service-em-2026/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// SIMULADO (não existe na fonte): baixado, requerCadastroCompleto
	{
		id: 'como-montar-um-acougue-do-planejamento-ao-marketing-ebook',
		titulo: 'Como montar um açougue: do planejamento ao marketing [Ebook]',
		sinopse: 'Montar um ponto de venda de carne exige uma combinação de planejamento estratégico, respeito às normas sanitárias e a adoção de boas práticas de gestão.',
		primeiroParagrafo: 'Montar um ponto de venda de carne exige uma combinação de planejamento estratégico, respeito às normas sanitárias e a adoção de boas práticas de gestão.',
		tipo: 'ebook',
		categoria: 'Proteína Animal',
		publicadoEm: '2026-03-13T09:31:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/03/Ebook-Tecnocarne-2026-ComoAbrirAcougue-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/proteina-animal/como-montar-um-acougue-do-planejamento-ao-marketing-ebook/',
		baixado: true,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	{
		id: 'proteina-de-inseto-producao-e-regulacao-no-brasil',
		titulo: 'Proteína de inseto: produção e regulação desse alimento no Brasil',
		sinopse: 'Insetos compõem a estratégia de aumento da disponibilidade de proteína diante do aumento global da demanda por alimentos – veja o que está sendo feito nesse sentido',
		primeiroParagrafo: 'Insetos compõem a estratégia de aumento da disponibilidade de proteína diante do aumento global da demanda por alimentos – veja o que está sendo feito nesse sentido',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2026-02-23T09:29:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/02/FISA-2026-Ebook_Proteina_de_Insetos-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/proteina-de-inseto-producao-e-regulacao-no-brasil/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'tendencias-na-industria-de-proteina-animal-ebook',
		titulo: 'Tendências na indústria de proteína animal para 2026 [Ebook]',
		sinopse: 'Dados, análises, tecnologias e estratégias que podem servir de base para que frigoríficos e outros agentes da cadeia de proteína animal melhorem a performance em 2026',
		primeiroParagrafo: 'Dados, análises, tecnologias e estratégias que podem servir de base para que frigoríficos e outros agentes da cadeia de proteína animal melhorem a performance em 2026',
		tipo: 'ebook',
		categoria: 'Proteína Animal',
		publicadoEm: '2026-02-04T09:53:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2026/01/Ebook-Tecnocarne-2026-Tendencias-Proteina-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/proteina-animal/tendencias-na-industria-de-proteina-animal-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	{
		id: 'e-book-manual-do-empreendedor-do-food-service',
		titulo: 'Como abrir um restaurante: passo a passo para o empreendedor [Ebook]',
		sinopse: 'O Food Connection traz um guia para micro e pequenos empreendedores do food service, com dicas práticas e insights valiosos',
		primeiroParagrafo: 'O Food Connection traz um guia para micro e pequenos empreendedores do food service, com dicas práticas e insights valiosos',
		tipo: 'ebook',
		categoria: 'Food Service',
		publicadoEm: '2025-11-26T13:17:11+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2020/11/FFS_2025_GuiaParaEmpreender-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/e-book-manual-do-empreendedor-do-food-service/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'mercado-de-ingredientes-solucoes-em-saudabilidade-e-sustenta',
		titulo: 'Mercado de ingredientes: soluções em saudabilidade e sustentabilidade [Ebook]',
		sinopse: 'O que mercados de referência, como Japão e Estados Unidos, estão lançando e como essas novidades podem fazer eco na indústria de ingredientes do Brasil',
		primeiroParagrafo: 'O que mercados de referência, como Japão e Estados Unidos, estão lançando e como essas novidades podem fazer eco na indústria de ingredientes do Brasil',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-10-30T09:35:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/10/FISA-2025-TendenciasNoMercado-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/mercado-de-ingredientes-solucoes-em-saudabilidade-e-sustentabilidade/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	{
		id: 'rastreabilidade-na-indstria-de-alimentos-e-bebidas',
		titulo: 'Como a rastreabilidade reduz custos e aumenta a margem de lucro [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Saiba como a cadeia de produção está sendo otimizada via iniciativas em rastreabilidade e as tecnologias envolvidas nesse processo',
		tipo: 'ebook',
		categoria: 'Tecnologia',
		publicadoEm: '2025-10-21T13:16:45+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/10/FispalTecnologia-2025-RastreabilidadeDeAlimentos-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/rastreabilidade-na-indstria-de-alimentos-e-bebidas/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	// SIMULADO (não existe na fonte): baixado, requerCadastroCompleto
	{
		id: '10-principais-insights-sobre-ingredientes-alimenticios-da-fi',
		titulo: '10 Principais insights sobre ingredientes alimentícios da FiSA 2025 [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Veja o que o evento trouxe em termos de inovação, mercado, regulação e aspectos essenciais do setor de ingredientes para alimentos e bebidas',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-09-30T09:42:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/10/FiSA-2025-Report-FiSA2025-capa-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/eventos/fisa-food-ingredients-south-america/10-principais-insights-sobre-ingredientes-alimenticios-da-fisa-2025/',
		baixado: true,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	{
		id: '7-tendencias-do-setor-de-alimentos-e-bebidas-em-2025',
		titulo: '7 tendências do setor de alimentos e bebidas',
		sinopse: '',
		primeiroParagrafo: 'Veja as inovações em produção, tecnologia, sustentabilidade, comportamento e mercado de trabalho no setor de A&B',
		tipo: 'ebook',
		categoria: 'Indústria A&B',
		publicadoEm: '2025-09-01T09:19:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/09/INF_Ebook_FT_Tendencias-MAI25-THUMB-1024x532.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/7-tendencias-do-setor-de-alimentos-e-bebidas-em-2025/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'revista-fib-especial-fi-south-america-2025',
		titulo: 'Revista FiB: Especial Fi South America 2025',
		sinopse: 'Leia a edição 69 da revista Food ingredients Brasil e veja as novidades do principal evento de ingredientes alimentícios da América do Sul',
		primeiroParagrafo: 'Leia a edição 69 da revista Food ingredients Brasil e veja as novidades do principal evento de ingredientes alimentícios da América do Sul',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-08-20T13:58:16+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/09/Revista-FiB-Especial-Fi-South-America-2025-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/ingredientes/revista-fib-especial-fi-south-america-2025/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	{
		id: 'vitafoods-europe-2025-um-olhar-privilegiado-para-o-futuro-do',
		titulo: 'Vitafoods Europe 2025: Um olhar privilegiado para o futuro dos nutracêuticos',
		sinopse: 'Após mais de duas décadas em Genebra, a Vitafoods Europe 2025 escreveu um novo capítulo em sua estreia no Fira Barcelona Gran Via, na Espanha. A área de exposição chegou a 75 mil m² e recebeu 1.300 expositores, um crescimento de 25% em relação ao ano anterior. No total, mais de 25.000 pessoas passaram pelos […]',
		primeiroParagrafo: 'Mônica Santos, Head de Conteúdo da Informa Markets Latam, e Luiza Zanatta, CEO na NutraLíder Consultoria Regulatória e Treinamentos, estiveram presentes no evento. As especialistas puderam conferir as palestras e painéis em quatro arenas de conteúdo, e explorar os lançamentos e inovações em destaque nos estandes da feira, com o olhar para o nosso mercado.',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-08-20T10:09:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/08/W5777-FISA-Ebook-VitaFoodsEuro25-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/vitafoods-europe-2025-um-olhar-privilegiado-para-o-futuro-dos-nutraceuticos/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'revista-fib-aborda-os-essenciais-de-sempre-ingredientes-que-',
		titulo: 'Revista FiB aborda os essenciais de sempre: ingredientes que mantêm sua relevância',
		sinopse: 'Leia a edição 68 da revista Food ingredients Brasil; confira as novidades em vitaminas e minerais, extratos naturais e os carotenoides na indústria.',
		primeiroParagrafo: 'Leia a edição 68 da revista Food ingredients Brasil; confira as novidades em vitaminas e minerais, extratos naturais e os carotenoides na indústria.',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-07-28T21:08:11+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/07/Revista-FiB-aborda-os-essenciais-de-sempre-ingredientes-que-mantem-sua-relevancia-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/ingredientes/revista-fib-aborda-os-essenciais-de-sempre-ingredientes-que-mantem-sua-relevancia/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	{
		id: 'fispal-tecnologia-2025-industria-mostra-como-esta-enfrentand',
		titulo: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA [Ebook]',
		sinopse: 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante',
		primeiroParagrafo: 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante',
		tipo: 'ebook',
		categoria: 'Tecnologia',
		publicadoEm: '2025-07-25T09:53:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/08/INF-FispalTecnologia-Ebook_FT2025-TH-1024x423.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/fispal-tecnologia-2025-industria-mostra-como-esta-enfrentando-a-era-da-ia/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): baixado, requerCadastroCompleto
	{
		id: 'tendencias-do-mercado-de-food-service-para-2025-ebook',
		titulo: 'Tendências do mercado de food service para 2025 [Ebook]',
		sinopse: 'Saiba o que esperar do setor de food service em 2025 pensando em tendências de negócios, comportamento de compra, preços e outras variáveis',
		primeiroParagrafo: 'Saiba o que esperar do setor de food service em 2025 pensando em tendências de negócios, comportamento de compra, preços e outras variáveis',
		tipo: 'ebook',
		categoria: 'Food Service',
		publicadoEm: '2025-07-16T10:07:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/INF_Ebook_FFS-Tendencias-MAR25-THUMB-1024x532.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/tendencias-do-mercado-de-food-service-para-2025-ebook/',
		baixado: true,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	{
		id: 'mercado-de-sorvetes-o-que-esperar-para-2025-ebook',
		titulo: 'Mercado de sorvetes: o que esperar para 2025? [Ebook]',
		sinopse: 'Novos sabores, novas máquinas e um consumidor mais receoso, mas, ao mesmo tempo, contando com novidades. Veja o que esperar para o setor de sorvetes e como se preparar',
		primeiroParagrafo: 'Novos sabores, novas máquinas e um consumidor mais receoso, mas, ao mesmo tempo, contando com novidades. Veja o que esperar para o setor de sorvetes e como se preparar',
		tipo: 'ebook',
		categoria: 'Sorvetes',
		publicadoEm: '2025-07-08T10:00:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/INF-Ebook-FS-Tendencias2025-ABR25-THUMB-1024x532.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/mercado-de-sorvetes-o-que-esperar-para-2025-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	{
		id: 'fispal-food-service-automacao-reduz-escassez-de-mao-de-obra-',
		titulo: 'Fispal Food Service: automação reduz escassez de mão de obra e aumenta lucro [Ebook]',
		sinopse: 'Fispal Food Service 2025 mostrou como iniciativas em automação e outras tecnologias têm contribuído para contornar alguns dos problemas do setor e aumentar a rentabilidade',
		primeiroParagrafo: 'Fispal Food Service 2025 mostrou como iniciativas em automação e outras tecnologias têm contribuído para contornar alguns dos problemas do setor e aumentar a rentabilidade',
		tipo: 'ebook',
		categoria: 'Food Service',
		publicadoEm: '2025-06-30T09:44:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/W5777-FispalFoodService-Ebook_FFS2025-TH-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/eventos/fispal-food-service-feira-de-food-service/fispal-food-service-automacao-reduz-escassez-de-mao-de-obra-e-aumenta-lucro-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sufixo [Pesquisa] não existe em MaterialType — mapeado pra 'whitepaper' (ver ds/achados.md)
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'o-poder-da-ia-no-mercado-de-alimentos-e-bebidas-a-expansao-e',
		titulo: 'O poder da IA no mercado de alimentos e bebidas: expansão e desafios do setor em 2025 [Pesquisa]',
		sinopse: '',
		primeiroParagrafo: 'Pesquisa realizada pela Fispal Tecnologia e Food Connection revela a expansão e os desafios da implementação da IA na indústria de alimentos e bebidas em 2025',
		tipo: 'whitepaper',
		categoria: 'Tecnologia',
		publicadoEm: '2025-06-24T19:38:21+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/O-poder-da-IA-no-mercado-de-alimentos-e-bebidas-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/o-poder-da-ia-no-mercado-de-alimentos-e-bebidas-a-expansao-e-os-desafios-do-setor-em-2025/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	// SIMULADO (não existe na fonte): disponivel:false
	{
		id: 'fispal-sorvetes-2025-novidades-em-sabores-maquinas-gestao-e-',
		titulo: 'Fispal Sorvetes 2025: novidades em sabores, máquinas, gestão e regulação [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Veja sabores que prometem impulsionar a demanda ao longo dos próximos meses no mercado de sorvetes, além de soluções e dicas no geral para o setor',
		tipo: 'ebook',
		categoria: 'Sorvetes',
		publicadoEm: '2025-06-18T20:11:42+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/Ebook_FispalSorvetes2025-TH-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/eventos/fispal-sorvetes-feira-da-industria-de-sorvetes/fispal-sorvetes-2025-novidades-em-sabores-maquinas-gestao-e-regulacao-ebook/',
		baixado: false,
		disponivel: false,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// sem lead na fonte — o SidePanel cai no primeiroParagrafo (anotação do Figma)
	{
		id: 'solucoes-para-gestao-de-energia-na-industria-de-alimentos-e-',
		titulo: 'Soluções para gestão de energia na indústria de alimentos e bebidas [Ebook]',
		sinopse: '',
		primeiroParagrafo: 'Veja ferramentas e processos de gestão energética que podem ajudar a aumentar a eficiência do sistema e reduzir o valor pago por quilowatt e os custos totais da operação',
		tipo: 'ebook',
		categoria: 'Indústria A&B',
		publicadoEm: '2025-06-11T09:59:00+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/06/INF-Ebook-FT-GestaoDeEnergia-JAN25-THUMB-1024x532.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/solucoes-para-gestao-de-energia-na-industria-de-alimentos-e-bebidas-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'tendencias-em-ingredientes-principais-insights-da-hi-japan',
		titulo: 'Tendências em ingredientes: principais insights da Hi Japan',
		sinopse: 'Veja o que o Japão tem produzido em tendências para o mercado de ingredientes, alimentos e bebidas que pode ser reproduzido aqui, no Brasil',
		primeiroParagrafo: 'Veja o que o Japão tem produzido em tendências para o mercado de ingredientes, alimentos e bebidas que pode ser reproduzido aqui, no Brasil',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-03-10T21:10:45+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/03/INF_Ebook_Fisa_HIJapan_FEV25-Final-THUMB-1024x532.png',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/tendencias-em-ingredientes-principais-insights-da-hi-japan/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// tipo INFERIDO — título sem sufixo e página não declara o formato; default 'ebook'
	// SIMULADO (não existe na fonte): baixado
	{
		id: 'revista-fib-traz-as-tendencias-de-2025-um-ano-de-novos-rumos',
		titulo: 'Revista FiB traz as tendências de 2025, um ano de novos rumos',
		sinopse: 'Leia a edição 67 da revista Food ingredients Brasil; saiba quais são as principais tendências que moldarão o mercado de aditivos e ingredientes alimentares em 2025',
		primeiroParagrafo: 'Leia a edição 67 da revista Food ingredients Brasil; saiba quais são as principais tendências que moldarão o mercado de aditivos e ingredientes alimentares em 2025',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2025-02-03T11:17:20+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2025/07/Revista-FiB-traz-as-tendencias-de-2025-um-ano-de-novos-rumos-1024x546.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/ingredientes/revista-fib-traz-as-tendencias-de-2025-um-ano-de-novos-rumos/',
		baixado: true,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	{
		id: 'clean-label-os-efeitos-das-novas-regras-de-rotulagem',
		titulo: 'Clean label: os efeitos das novas regras de rotulagem [Ebook]',
		sinopse: 'Veja como empresas e consumidores são afetados pelas mudanças, o nível de adequação da indústria e cases importantes de rótulos limpos',
		primeiroParagrafo: 'Veja como empresas e consumidores são afetados pelas mudanças, o nível de adequação da indústria e cases importantes de rótulos limpos',
		tipo: 'ebook',
		categoria: 'Ingredientes',
		publicadoEm: '2024-10-22T17:38:23+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2024/10/INF_Ebook_Fisa_CleanLabel_OUT24_THUMB.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/clean-label-os-efeitos-das-novas-regras-de-rotulagem/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'cargos-e-salarios-em-atividades-esg-na-industria-de-alimento',
		titulo: 'Cargos e salários em atividades ESG na indústria de alimentos e bebidas [Ebook]',
		sinopse: 'Veja quais as condições do mercado de A&B para contratação de profissionais que atendam as demandas ESG, e quanto estão pagando por isso. O crescimento das pautas ESG (Environmental, Social, Governance) nas empresas tem promovido a criação de funções e atividades específicas, refletindo a necessidade de progresso em questões ambientais, sociais e de governança. Especialistas […]',
		primeiroParagrafo: 'Os especialistas ressaltam que não há uma profissão específica para atender às demandas ESG, mas uma confluência de fatores que diversas visões profissionais podem contribuir. Esta abordagem multidisciplinar permite que especialistas de áreas como Administração, Engenharia e Recursos Humanos se envolvam em projetos ESG, adaptando suas habilidades para fomentar governança, meio ambiente e sociedade. As formações em ESG capacitam os profissionais a atuarem nesses campos emergentes.',
		tipo: 'ebook',
		categoria: 'ESG',
		publicadoEm: '2024-10-11T15:03:02+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2024/10/INF-Ebook-FT-Profissoes-ESG-OUT24THUMB.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/cargos-e-salarios-em-atividades-esg-na-industria-de-alimentos-e-bebidas-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
	// SIMULADO (não existe na fonte): disponivel:false
	{
		id: 'certificacoes-de-proteina-animal-organica-exigencias-frigori',
		titulo: 'Certificações de proteína animal orgânica: exigências a frigoríficos e produtores [Ebook]',
		sinopse: 'Entenda os procedimentos para passar a ser um produtor ou vendedor certificado de proteína animal orgânica; conheça desafios, benefícios e cases relevantes. A carne orgânica tem ganhado crescente atenção tanto por seus benefícios ambientais quanto por suas exigências rigorosas de produção. De acordo com a WWF, a carne orgânica certificada se distingue por um sistema […]',
		primeiroParagrafo: 'Ao contrário da produção convencional, que frequentemente utiliza químicos e aditivos, a carne orgânica é produzida de maneira mais natural e sustentável, isenta de resíduos químicos e baseada no bem-estar dos animais e na preservação ambiental.',
		tipo: 'ebook',
		categoria: 'ESG',
		publicadoEm: '2024-09-27T15:44:14+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2024/09/INF_Ebook_TC_Proteina-Organica-SET24-THUMB.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/sustentabilidade/certificacoes-de-proteina-animal-organica-exigencias-frigorificos-e-produtores/',
		baixado: false,
		disponivel: false,
		requerCadastroCompleto: false,
	},
	// categoria INFERIDA pelo tema do título — a URL só diz /materiais-de-download/ ou /eventos/, que não são categoria editorial
	// SIMULADO (não existe na fonte): requerCadastroCompleto
	{
		id: 'marketing-digital-para-delivery-no-food-service-ebook',
		titulo: 'Marketing digital para delivery no Food Service [Ebook]',
		sinopse: 'Conheça estratégias, tecnologias e como operar soluções em marketing digital para melhorar o desempenho do estabelecimento nos serviços de delivery de alimentos  No contexto contemporâneo do food service, o delivery emergiu como um elemento vital não apenas para atender à demanda dos consumidores por conveniência, mas também como uma ferramenta estratégica para os estabelecimentos. Impulsionado […]',
		primeiroParagrafo: 'Impulsionado pela digitalização, acelerada durante a pandemia, o delivery ajudou a resolver algumas necessidades intrínsecas do ser humano desde o início da espécie: a fome, em primeiro lugar, e a poupança de energia para obter comida, em seguida.',
		tipo: 'ebook',
		categoria: 'Food Service',
		publicadoEm: '2024-09-27T15:04:06+00:00',
		capaUrl: 'https://d2yghbees9788u.cloudfront.net/foodconnection/2024/09/INF_Ebook_FFS-MarketingDelivery-SET24-THUMB.jpg',
		arquivoUrl: 'https://www.foodconnection.com.br/materiais-de-download/marketing-digital-para-delivery-no-food-service-ebook/',
		baixado: false,
		disponivel: true,
		requerCadastroCompleto: true,
	},
]

/**
 * SIMULADO — "mais acessados do portal" não é exposto pela fonte (nem na listagem, nem
 * na página de cada material). Ordem arbitrária de popularidade, fixada aqui pra a
 * seção "Mais acessados do portal" e o fallback (c) terem resultado estável na revisão.
 */
export const MAIS_ACESSADOS_IDS: string[] = [
	'tendencias-para-o-food-service-em-2026',
	'era-da-ia-na-industria-alimenticia',
	'geopolitica-da-comida',
	'tendencias-em-ingredientes-ebook',
	'mercado-de-sorvetes-o-que-esperar-para-2025-ebook',
	'como-montar-um-acougue-do-planejamento-ao-marketing-ebook',
	'clean-label-os-efeitos-das-novas-regras-de-rotulagem',
	'do-pasto-ao-prato-eficiencia-produtiva-frigorifico',
	'cargos-e-salarios-em-atividades-esg-na-industria-de-alimento',
	'marketing-digital-para-delivery-no-food-service-ebook',
	'alimentacao-na-era-do-glp-1-ebook',
	'rastreabilidade-na-indstria-de-alimentos-e-bebidas',
	'e-book-manual-do-empreendedor-do-food-service',
	'proteina-de-inseto-producao-e-regulacao-no-brasil',
]

/**
 * SIMULADO — o histórico de download com data não existe na fonte. Alimenta o fallback
 * (b) da seção "Para o seu setor": categorias dos materiais baixados nos últimos 90 dias.
 *
 * Datas ancoradas em 2026-08-30 (data da extração): as três primeiras caem DENTRO da
 * janela de 90 dias, as duas últimas caem FORA de propósito — sem um item fora, a regra
 * dos 90 dias não fica demonstrável na revisão. Reancorar se o protótipo for revisado
 * muito depois.
 */
export interface DownloadRegistrado {
	materialId: string
	/** ISO 8601. */
	baixadoEm: string
}

export const HISTORICO_DOWNLOADS: DownloadRegistrado[] = [
	{ materialId: 'alimentacao-na-era-do-glp-1-ebook', baixadoEm: '2026-08-12T14:02:00+00:00' },
	{ materialId: 'como-montar-um-acougue-do-planejamento-ao-marketing-ebook', baixadoEm: '2026-07-22T09:15:00+00:00' },
	{ materialId: '10-principais-insights-sobre-ingredientes-alimenticios-da-fi', baixadoEm: '2026-06-30T18:40:00+00:00' },
	// Fora da janela de 90 dias — a categoria destes NÃO deve entrar na recomendação.
	{ materialId: 'tendencias-do-mercado-de-food-service-para-2025-ebook', baixadoEm: '2026-01-12T11:00:00+00:00' },
	{ materialId: 'revista-fib-traz-as-tendencias-de-2025-um-ano-de-novos-rumos', baixadoEm: '2025-11-05T08:30:00+00:00' },
]

/**
 * Perfil do usuário no recorte que a Biblioteca precisa.
 *
 * 🔴 `subsetor` NÃO EXISTE no modelo de perfil de hoje (`PerfilCampos` em
 * src/mocks/dashboard-perfil.ts só tem `setor`, e "Proteína animal" não é um dos valores
 * de `OPCOES_SETOR` — aquela lista é de setores macro: Agro, Alimentos & Bebidas,
 * Embalagens…). O campo foi declarado aqui, e não adicionado a `PerfilCampos`, de
 * propósito: a tela de Perfil calcula completude com `Object.keys(PERFIL_CAMPOS).length`,
 * então acrescentar um campo lá mudaria a matemática de uma tela fora do escopo desta
 * fase. Ver ds/achados.md.
 *
 * `subsetor` casa com `CategoriaPortal.slug` — é o que liga o perfil à taxonomia
 * editorial. 'outro' é o valor de escape que dispara a cadeia de fallback.
 */
export interface PerfilBiblioteca {
	/** Slug de CATEGORIAS_PORTAL, ou 'outro'. */
	subsetor: string
	/** Rótulo exibido ("Baseado em X, que você indicou no perfil"). */
	subsetorLabel: string
	/** Nomes legíveis dos campos obrigatórios ainda em branco. */
	camposFaltantes: string[]
}

export const PERFIL_BIBLIOTECA: PerfilBiblioteca = {
	subsetor: 'proteina-animal',
	subsetorLabel: 'Proteína animal',
	camposFaltantes: ['CPF / CNPJ', 'Cidade', 'Endereço'],
}
