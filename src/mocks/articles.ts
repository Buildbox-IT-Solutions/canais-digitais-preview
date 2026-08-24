import type { CategoriaColor } from '~/components/categoria/types'

export interface Article {
	id: string
	seed: string
	category: string
	categoryColor: CategoriaColor
	title: string
	lead?: string
	author?: string
	href?: string
}

/**
 * Destaque único (super-highlight) — seção opcional no topo da home, ligada/desligada
 * no admin do WP. Conteúdo escolhido manualmente pelo editor (RN04); a categoria vem
 * do próprio artigo (RN06). Ver src/components/destaque-unico.
 */
export const HOME_DESTAQUE_UNICO: Article = {
	id: 'home-destaque-unico',
	seed: 'home-destaque-unico',
	category: 'Food Service',
	categoryColor: 'mint',
	title: 'Fispal Food Service terá ativações com chefs e executivos do setor',
	lead: 'Maior evento da América do Sul voltado ao setor de alimentação fora do lar, a Fispal Food Service 2026 reunirá, entre os dias 26 e 29 de maio no Distrito Anhembi, não apenas lançamentos e soluções, mas também uma agenda de conteúdo com nomes de peso da gastronomia.',
}

/** Patrocinador do destaque único — opcional no admin (RN05). */
export const HOME_DESTAQUE_UNICO_SPONSOR = 'Company Name'

export const HOME_HERO: Article[] = [
	{
		id: 'home-hero',
		seed: 'home-hero',
		category: 'Food ingredients South America',
		categoryColor: 'saffron',
		title: 'FiSA 2026 começa com agenda voltada a inovação, saudabilidade e novos ingredientes',
		lead: 'Com mais de 290 expositores de 15 países, feira reúne lançamentos, experiências e 27 horas de conteúdo técnico sobre tendências que impactam alimentos, bebidas e suplementos.',
		author: 'Food Connection',
	},
	{
		id: 'home-h2',
		seed: 'home-h2',
		category: 'Sorvetes',
		categoryColor: 'lavander',
		title: 'Mercado de sorvetes projeta crescimento de até 50% até 2033 e aposta em saudabilidade',
	},
	{
		id: 'home-h3',
		seed: 'home-h3',
		category: 'ESG',
		categoryColor: 'mint',
		title: 'Governança de IA: quem está controlando a conta na indústria de alimentos?',
	},
]

export const HOME_HERO_TEXT: Article[] = [
	{
		id: 'home-text1',
		seed: 'home-text1',
		category: 'Ingredientes',
		categoryColor: 'mint',
		title: 'Secreção do Ozempic: conheça o suplemento usado como parceiro do GLP-1',
	},
	{
		id: 'home-text2',
		seed: 'home-text2',
		category: 'Indústria A&B',
		categoryColor: 'saffron',
		title: 'Embalagens menores na indústria de alimentos: como se adaptar ao efeito Ozempic',
		lead: 'O avanço dos medicamentos para emagrecimento está mudando o tamanho do que as pessoas colocam no carrinho.',
	},
	{
		id: 'home-text3',
		seed: 'home-text3',
		category: 'Food Service',
		categoryColor: 'primary-600',
		title: 'Por que cada vez mais cafeterias estão investindo em torradores próprios',
		lead: 'Com tecnologia mais acessível e consumidores em busca de experiências autênticas, a torra virou diferencial competitivo.',
	},
]

export const HOME_HERO_BOTTOM: Article[] = [
	{
		id: 'home-hp1',
		seed: 'home-hp1',
		category: 'Especialistas',
		categoryColor: 'secondary-950',
		title: 'O restaurante virou refém do algoritmo?',
	},
	{
		id: 'home-h5',
		seed: 'home-h5',
		category: 'Food ingredients South America',
		categoryColor: 'saffron',
		title: 'Fi South America 2026 debate liderança feminina na indústria',
	},
	{
		id: 'home-h6',
		seed: 'home-h6',
		category: 'Tecnologia',
		categoryColor: 'secondary-950',
		title: 'Tecnologia para o fim da linha transforma a operação industrial',
	},
]

export const INGREDIENTES_LIST: Article[] = [
	{ id: 'ing1', seed: 'ing1', category: 'Ingredientes', categoryColor: 'mint', title: 'Como desenvolver produtos com ingredientes botânicos funcionais' },
	{ id: 'ing2', seed: 'ing2', category: 'Ingredientes', categoryColor: 'mint', title: 'Regulamentação de suplementos alimentares: as leis da ANVISA que regem o mercado' },
	{ id: 'ing3', seed: 'ing3', category: 'Ingredientes', categoryColor: 'mint', title: 'Tendências em ingredientes: GLP-1, proteínas e saúde cognitiva' },
	{ id: 'ing4', seed: 'ing4', category: 'Ingredientes', categoryColor: 'mint', title: 'Secreção do Ozempic: conheça o suplemento usado como parceiro do GLP-1' },
]

export const FOOD_SERVICE_LIST: Article[] = [
	{ id: 'fs1', seed: 'fs1', category: 'Food Service', categoryColor: 'primary-600', title: 'Custo x valor real: desvendando o mito da economia em equipamentos de limpeza' },
	{ id: 'fs2', seed: 'fs2', category: 'Food Service', categoryColor: 'primary-600', title: 'A nova geração de cafeterias: mais automação, menos desperdício e vitrines de alto valor agregado' },
	{ id: 'fs3', seed: 'fs3', category: 'Food Service', categoryColor: 'primary-600', title: 'Como se preparar para a reforma tributária nos restaurantes' },
	{ id: 'fs4', seed: 'fs4', category: 'Food Service', categoryColor: 'primary-600', title: 'O Pavilhão de Tecnologia da Fispal cresceu e trouxe novas tendências em gestão' },
]

export const EM_ALTA: string[] = [
	'FiSA 2026 começa com agenda voltada a inovação, saudabilidade e novos ingredientes',
	'Mercado de sorvetes projeta crescimento de até 50% até 2033 e aposta em saudabilidade',
	'Governança de IA: quem está controlando a conta na indústria de alimentos?',
	'Linhas inteligentes de embalagem elevam eficiência e reduzem perdas na indústria de proteína animal',
	'Custo x valor real: desvendando o mito da economia em equipamentos de limpeza',
]

export const PROTEINA_ANIMAL: Article[] = [
	{ id: 'prot1', seed: 'prot1', category: 'Proteína Animal', categoryColor: 'coral', title: 'Linhas inteligentes de embalagem elevam eficiência e reduzem perdas na indústria de proteína animal' },
	{ id: 'prot2', seed: 'prot2', category: 'Proteína Animal', categoryColor: 'coral', title: 'Como obter certificação de carne baixo carbono no Brasil' },
	{ id: 'prot3', seed: 'prot3', category: 'Proteína Animal', categoryColor: 'coral', title: 'Mercado brasileiro de proteína animal atrai empresas internacionais' },
	{ id: 'prot4', seed: 'prot4', category: 'Proteína Animal', categoryColor: 'coral', title: 'Oferta restrita e demanda externa histórica elevam a arroba do boi' },
]

export const WEBSTORIES = [
	{ seed: 'ws-h1', color: 'mint' as CategoriaColor, label: 'Ingredientes', title: 'Como desenvolver produtos com ingredientes botânicos funcionais' },
	{ seed: 'ws-h2', color: 'lavander' as CategoriaColor, label: 'Sorvetes', title: 'Automação na produção de sorvetes: da linha ao sabor perfeito' },
	{ seed: 'ws-h3', color: 'saffron' as CategoriaColor, label: 'Indústria A&B', title: 'Inovação e tecnologia impulsionam logística da indústria de alimentos e bebidas' },
	{ seed: 'ws-h4', color: 'coral' as CategoriaColor, label: 'Proteína Animal', title: 'Saudabilidade e padronização impulsionam inovações na cadeia da carne' },
]

export const VIDEOS_LIST: Article[] = [
	{ id: 'vid1', seed: 'vid1', category: 'Proteína Animal', categoryColor: 'mint', title: 'Inovações tecnológicas modernizam a indústria de proteína animal' },
	{ id: 'vid2', seed: 'vid2', category: 'Sorvetes', categoryColor: 'mint', title: 'Automação na produção de sorvetes: da linha ao sabor perfeito' },
	{ id: 'vid3', seed: 'vid3', category: 'Embalagens', categoryColor: 'mint', title: 'Do leite ao drink: a inovação em uma categoria já madura' },
]

export interface VideoArticle extends Article {
	image: string
}

export const VIDEOS_SECTION: VideoArticle[] = [
	{
		id: 'vid-hero',
		seed: 'vid-hero',
		image: picsumSrc('vid-hero', 1200, 675),
		category: 'ESG',
		categoryColor: 'mint',
		title: 'Tendências de foodtech para 2026: inovações e exemplos na indústria alimentar',
		lead: 'Automação, IA, proteínas alternativas, rastreabilidade, embalagens inteligentes e personalização definem as tendências.',
	},
	...VIDEOS_LIST.map((vid) => ({
		...vid,
		image: picsumSrc(vid.seed, 640, 360),
		categoryColor: 'mint' as const,
	})),
]

export const FISPAL_LIST: Article[] = [
	{
		id: 'fispal1',
		seed: 'fispal1',
		category: 'Fispal Tecnologia',
		categoryColor: 'saffron',
		title: 'Fispal Tecnologia e TecnoCarne encerram edição histórica com avanço em negócios, inovação e internacionalização',
		lead: 'Maior edição simultânea das feiras reuniu mais de 48 mil visitantes e mais de 500 expositores de 16 países.',
		author: 'Food Connection',
	},
	{
		id: 'fispal2',
		seed: 'fispal2',
		category: 'Embalagens',
		categoryColor: 'secondary-500',
		title: 'Setor de embalagens acelera transformação tecnológica e encara novos desafios e oportunidades',
		lead: 'Com R$ 165,7 bilhões em valor bruto de produção em 2025, o setor chega à Fispal Tecnologia com novos materiais.',
	},
	{
		id: 'fispal3',
		seed: 'fispal3',
		category: 'Tecnologia',
		categoryColor: 'secondary-950',
		title: 'Detalhes que se traduzem em eficiência na indústria',
		lead: 'Ser eficiente também envolve previsibilidade, disponibilidade e inteligência na gestão operacional.',
	},
]

export const NEWS_PODCAST: Article[] = [
	{
		id: 'nwp-hero',
		seed: 'nwp-s1',
		category: 'Indústria A&B',
		categoryColor: 'saffron',
		title: 'Congresso Fispal Tec reúne especialistas para discutir as transformações da indústria de alimentos e bebidas',
		author: 'Food Connection',
	},
	{ id: 'nwp1', seed: 'nwp1', category: 'Proteína Animal', categoryColor: 'coral', title: 'Linhas inteligentes de embalagem elevam eficiência e reduzem perdas na indústria de proteína animal' },
	{ id: 'nwp2', seed: 'nwp2', category: 'Ingredientes', categoryColor: 'mint', title: 'Como desenvolver produtos com ingredientes botânicos funcionais' },
	{ id: 'nwp3', seed: 'nwp3', category: 'Food Service', categoryColor: 'primary-600', title: 'Por que cada vez mais cafeterias estão investindo em torradores próprios' },
]

export const PODCASTS = [
	{ seed: 'pod2', category: 'Ingredientes', title: 'Tendências em ingredientes: GLP-1, proteínas e saúde cognitiva' },
	{ seed: 'pod3', category: 'Food Service', title: 'A nova geração de cafeterias: mais automação, menos desperdício e vitrines de alto valor agregado' },
	{ seed: 'pod4', category: 'Tecnologia', title: 'Fornecedores globais de tecnologias para as indústrias de alimentos e bebidas apostam no mercado brasileiro' },
]

export const ESPECIALISTAS = [
	{ img: '14', name: 'Augusto Zarpon', role: 'Especialista em melhoria contínua', quote: 'A embalagem que protege seu alimento e a eficiência da sua fábrica' },
	{ img: '33', name: 'Alessandra Gaidargi', role: 'Jornalista especialista em alimentação', quote: 'Desafio do food service: Cardápios Kids saudáveis' },
	{ img: '52', name: 'Luis Fernando Nardi', role: 'Especialista em franchising de food service', quote: 'Guerra pela atenção: como os restaurantes estão vencendo com criatividade, tecnologia e parcerias inéditas' },
	{ img: '44', name: 'Bethânia Vargas', role: 'Head de Projetos e Regulatórios na Pronutrition', quote: 'Por que o consumidor passou a investir mais em prevenção do que em tratamento' },
	{ img: '68', name: 'Ricardo Longa', role: 'CEO da voa.delivery', quote: 'O restaurante virou refém do algoritmo?' },
	{ img: '26', name: 'Eugenia Muinelo', role: 'Gerente de Assuntos Regulatórios para América Latina na EAS Strategies', quote: 'A busca por "comida de verdade" está moldando a relação entre consumidores e marcas' },
]

export const LAST_SECTION: Article[] = [
	{ id: 'last-hero', seed: 'last-hero', category: 'Indústria A&B', categoryColor: 'saffron', title: 'Fispal Tecnologia e TecnoCarne encerram edição histórica com avanço em negócios, inovação e internacionalização', lead: 'Maior edição simultânea das feiras reuniu mais de 48 mil visitantes e mais de 500 expositores de 16 países.', author: 'Food Connection' },
	{ id: 'last2', seed: 'last2', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Setor de embalagens acelera transformação tecnológica e encara novos desafios e oportunidades' },
	{ id: 'last3', seed: 'last3', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Detalhes que se traduzem em eficiência na indústria' },
	{ id: 'last4', seed: 'last4', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Acelere sua produção sem perder o controle' },
]

export const CATEGORIA_FEATURED: Article[] = [
	{ id: 'cat-hero', seed: 'cat-hero', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Klabin avança em cartões brancos para embalagens de alimentos', lead: 'Gerente de desenvolvimento da Klabin detalha a estratégia da companhia para avançar em cartões brancos.' },
	{ id: 'cat-f2', seed: 'cat-f2', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Embalagens inteligentes unem sustentabilidade, automação e eficiência na indústria de alimentos e bebidas' },
	{ id: 'cat-f3', seed: 'cat-f3', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Do leite ao drink: a inovação em uma categoria já madura' },
	{ id: 'cat-f4', seed: 'cat-f4', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Lamiex investe em inovação, personalização e sustentabilidade para ampliar aplicações de chapas em PEAD e PP na indústria' },
]

export const CATEGORIA_LIST: Article[] = [
	{ id: 'cat-a1', seed: 'cat-a1', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Setor de embalagens acelera transformação tecnológica e encara novos desafios e oportunidades', lead: 'Com R$ 165,7 bilhões em valor bruto de produção em 2025, o setor chega à Fispal Tecnologia com novos materiais.' },
	{ id: 'cat-a2', seed: 'cat-a2', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Embalagens sustentáveis: o desafio de unir conservação de alimentos e responsabilidade ambiental' },
	{ id: 'cat-a3', seed: 'cat-a3', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Embalagens sustentáveis seguem ganhando espaço no food service', lead: 'Expositores da Fispal Food Service trazem embalagens biodegradáveis e compostáveis.' },
	{ id: 'cat-a4', seed: 'cat-a4', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Klabin avança em cartões brancos para embalagens de alimentos' },
	{ id: 'cat-a5', seed: 'cat-a5', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Lamiex investe em inovação, personalização e sustentabilidade para ampliar aplicações de chapas em PEAD e PP na indústria' },
	{ id: 'cat-a6', seed: 'cat-a6', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Do leite ao drink: a inovação em uma categoria já madura' },
	{ id: 'cat-a7', seed: 'cat-a7', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Embalagens inteligentes unem sustentabilidade, automação e eficiência na indústria de alimentos e bebidas' },
	{ id: 'cat-a8', seed: 'cat-a8', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Inovação e tecnologia como aliadas da segurança alimentar' },
]

export const SEARCH_RESULTS: Article[] = [
	{ id: 'bus-1', seed: 'bus-1', category: 'Indústria A&B', categoryColor: 'saffron', title: 'Fispal Tecnologia e TecnoCarne encerram edição histórica com avanço em negócios, inovação e internacionalização' },
	{ id: 'bus-2', seed: 'bus-2', category: 'Sorvetes', categoryColor: 'lavander', title: 'Mercado de sorvetes projeta crescimento de até 50% até 2033 e aposta em saudabilidade' },
	{ id: 'bus-3', seed: 'bus-3', category: 'ESG', categoryColor: 'mint', title: 'Governança de IA: quem está controlando a conta na indústria de alimentos?' },
	{ id: 'bus-4', seed: 'bus-4', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Setor de embalagens acelera transformação tecnológica e encara novos desafios e oportunidades' },
	{ id: 'bus-5', seed: 'bus-5', category: 'Food Service', categoryColor: 'primary-600', title: 'O restaurante virou refém do algoritmo?' },
	{ id: 'bus-6', seed: 'bus-6', category: 'Ingredientes', categoryColor: 'mint', title: 'Tendências em ingredientes: GLP-1, proteínas e saúde cognitiva' },
	{ id: 'bus-7', seed: 'bus-7', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Do leite ao drink: a inovação em uma categoria já madura' },
	{ id: 'bus-8', seed: 'bus-8', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Detalhes que se traduzem em eficiência na indústria' },
]

export const VEJA_TAMBEM: Article[] = [
	{ id: 'vt1', seed: 'vt1', category: 'Food Service', categoryColor: 'primary-600', title: 'Como se preparar para a reforma tributária nos restaurantes' },
	{ id: 'vt2', seed: 'vt2', category: 'Indústria A&B', categoryColor: 'saffron', title: 'Fispal Tecnologia e TecnoCarne encerram edição histórica com avanço em negócios, inovação e internacionalização' },
	{ id: 'vt3', seed: 'vt3', category: 'Bebidas', categoryColor: 'lavander', title: 'Sucos prensados a frio e cold-press: tecnologia e oportunidades de mercado' },
	{ id: 'vt4', seed: 'vt4', category: 'Indústria A&B', categoryColor: 'saffron', title: 'Congresso Fispal Tec reúne especialistas para discutir as transformações da indústria de alimentos e bebidas' },
]

export const ARTICLE_TAGS = ['GLP-1', 'Automação', 'Embalagens sustentáveis', 'Foodtech', 'Proteína Animal']

export const NOT_FOUND_CARDS: Array<Article & { author: string }> = [
	{ id: '404a', seed: '404a', category: 'Food ingredients South America', categoryColor: 'saffron', title: 'FiSA 2026 começa com agenda voltada a inovação, saudabilidade e novos ingredientes', author: 'Marcelo Yamashita' },
	{ id: '404b', seed: '404b', category: 'Proteína Animal', categoryColor: 'coral', title: 'Linhas inteligentes de embalagem elevam eficiência e reduzem perdas na indústria de proteína animal', author: 'Rafaela Costa' },
	{ id: '404c', seed: '404c', category: 'Ingredientes', categoryColor: 'mint', title: 'Tendências em ingredientes: GLP-1, proteínas e saúde cognitiva', author: 'João Pedro Almeida' },
	{ id: '404d', seed: '404d', category: 'ESG', categoryColor: 'mint', title: 'Governança de IA: quem está controlando a conta na indústria de alimentos?', author: 'Luiza Bertolaccini' },
	{ id: '404e', seed: '404e', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Klabin avança em cartões brancos para embalagens de alimentos', author: 'Bruno Tavares' },
	{ id: '404f', seed: '404f', category: 'Sorvetes', categoryColor: 'lavander', title: 'Mercado de sorvetes projeta crescimento de até 50% até 2033 e aposta em saudabilidade', author: 'Marcelo Yamashita' },
	{ id: '404g', seed: '404g', category: 'Food Service', categoryColor: 'primary-600', title: 'Custo x valor real: desvendando o mito da economia em equipamentos de limpeza', author: 'Rafaela Costa' },
	{ id: '404h', seed: '404h', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Fornecedores globais de tecnologias para as indústrias de alimentos e bebidas apostam no mercado brasileiro', author: 'Luiza Bertolaccini' },
]

export const CONTATO_EQUIPE_DIGITAL = [
	{
		name: 'Amanda Gonçalves',
		role: 'Curadora de conteúdo digital',
		bio: 'Jornalista experiente em produção de conteúdo voltado para o mercado de saúde. Controla a pauta dos portais e as estratégias de marketing digital. Em 2024, tornou-se curadora de conteúdo do portal Saúde Business.',
		email: 'amanda.goncalves@informa.com',
		img: '25',
	},
	{
		name: 'Ana Dominguez',
		role: 'Coordenadora de conteúdo digital',
		bio: 'Jornalista especializada em Marketing digital, com experiência em criação de conteúdo para a experiência do cliente. Atualmente, atua como Coordenadora de Conteúdo Digital na Informa Markets Latam.',
		email: 'ana.dominguez@informa.com',
		img: '47',
	},
]

export const MENU_ITEMS = [
	{ label: 'Eventos', dropdown: true },
	{ label: 'Ingredientes', dropdown: false },
	{ label: 'Indústria A&B', dropdown: true },
	{ label: 'Proteína Animal', dropdown: false },
	{ label: 'Food Service', dropdown: false },
	{ label: 'Sorvetes', dropdown: false },
	{ label: 'Tecnologia', dropdown: false },
	{ label: 'Embalagens', dropdown: false },
	{ label: 'ESG', dropdown: true },
	{ label: 'Especialistas', dropdown: false },
	{ label: 'E-books', dropdown: false },
]

export function picsumSrc(seed: string, w: number, h: number): string {
	return `https://picsum.photos/seed/${seed}/${w}/${h}`
}
