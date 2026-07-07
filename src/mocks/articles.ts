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

export const HOME_HERO: Article[] = [
	{
		id: 'home-hero',
		seed: 'home-hero',
		category: 'Eventos',
		categoryColor: 'mint',
		title: 'Redes sociais como ingrediente estratégico no branding gastronômico',
		lead: 'Na Fispal Food Service 2025, fundadora da Food se mostra como transformar perfis no Instagram, TikTok e LinkedIn em vitrines reais para negócios de alimentação.',
		author: 'Company Name',
	},
	{
		id: 'home-h2',
		seed: 'home-h2',
		category: 'Compras',
		categoryColor: 'primary-600',
		title: 'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos',
	},
	{
		id: 'home-h3',
		seed: 'home-h3',
		category: 'Compras',
		categoryColor: 'primary-600',
		title: 'Passo a passo para montar uma dark Kitchen',
	},
]

export const HOME_HERO_TEXT: Article[] = [
	{
		id: 'home-text1',
		seed: 'home-text1',
		category: 'Categoria',
		categoryColor: 'mint',
		title: 'Levedura e fungos: inovação em proteínas alternativas',
		lead: 'Conheça as proteínas alimentadas de levedura e fungos, o potencial de benefícios da Topical com a proteínas de micélio.',
	},
	{
		id: 'home-text2',
		seed: 'home-text2',
		category: 'Categoria',
		categoryColor: 'coral',
		title: 'Como identificar e corrigir gargalos na logística de alimentos',
		lead: 'Transportes refrigerados e problemas na armazenagem prejudicam toda a cadeia de abastecimento.',
	},
	{
		id: 'home-text3',
		seed: 'home-text3',
		category: 'Indústria A&B',
		categoryColor: 'saffron',
		title: 'Design higiênico: pilar estratégico para o futuro da indústria alimentícia',
		lead: 'Equipamentos seguros, higiênicos, eficientes e comprovados pela produção.',
	},
]

export const HOME_HERO_BOTTOM: Article[] = [
	{
		id: 'home-hp1',
		seed: 'home-hp1',
		category: 'Empreendedorismo',
		categoryColor: 'lavander',
		title: 'Quando um dashboard atende melhor do que uma IA Generativa?',
	},
	{
		id: 'home-h5',
		seed: 'home-h5',
		category: 'Compras',
		categoryColor: 'primary-600',
		title: 'Estamos prontos para estourar o desafio de produzir em 5.0?',
	},
	{
		id: 'home-h6',
		seed: 'home-h6',
		category: 'Inovação',
		categoryColor: 'saffron',
		title: 'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação',
	},
]

export const INGREDIENTES_LIST: Article[] = [
	{ id: 'ing1', seed: 'ing1', category: 'Ingredientes', categoryColor: 'mint', title: 'Alimentos para gamers: ingredientes que melhoram foco e desempenho' },
	{ id: 'ing2', seed: 'ing2', category: 'Ingredientes', categoryColor: 'mint', title: 'Levar biotecnologia de laboratório à fábrica e escalar desafios, dúvidas sem...' },
	{ id: 'ing3', seed: 'ing3', category: 'Ingredientes', categoryColor: 'mint', title: 'A novo selo modelo: A economia da nutrição personalizada no Brasil' },
	{ id: 'ing4', seed: 'ing4', category: 'Ingredientes', categoryColor: 'mint', title: 'Sustentabilidade na moda: novos materiais são feitos com fibras de...' },
]

export const FOOD_SERVICE_LIST: Article[] = [
	{ id: 'fs1', seed: 'fs1', category: 'Food Service', categoryColor: 'primary-600', title: 'Padrão de atendimento no food service: dicas para aplicar no seu negócio' },
	{ id: 'fs2', seed: 'fs2', category: 'Food Service', categoryColor: 'primary-600', title: 'Do público certo a operação eficiente: o caminho para tornar mais o seu food service' },
	{ id: 'fs3', seed: 'fs3', category: 'Food Service', categoryColor: 'primary-600', title: 'Como a realidade aumentada está moldando a percepção de sabor no food...' },
	{ id: 'fs4', seed: 'fs4', category: 'Food Service', categoryColor: 'primary-600', title: 'Tendências sustentáveis na indústria de embalagens: inovações e oportunidades de...' },
]

export const EM_ALTA: string[] = [
	'Alimentos para gamers: ingredientes que melhoram foco e desempenho',
	'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos',
	'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação',
	'Design higiênico: pilar estratégico para o futuro da indústria alimentícia',
	'Levedura e fungos: inovação em proteínas alternativas',
]

export const PROTEINA_ANIMAL: Article[] = [
	{ id: 'prot1', seed: 'prot1', category: 'Proteína Animal', categoryColor: 'coral', title: 'Vantagens da energia solar para abatedouros e frigoríficos' },
	{ id: 'prot2', seed: 'prot2', category: 'Proteína Animal', categoryColor: 'coral', title: 'Logística de carnes congeladas: como a indústria pode garantir qualidade na proteína animal' },
	{ id: 'prot3', seed: 'prot3', category: 'Proteína Animal', categoryColor: 'coral', title: 'Desvendando a cadeia de frio: insights de especialistas sobre transporte refrigerado' },
	{ id: 'prot4', seed: 'prot4', category: 'Proteína Animal', categoryColor: 'coral', title: 'Diferenças entre armazenagem refrigerada, congelada e seca' },
]

export const WEBSTORIES = [
	{ seed: 'ws-h1', color: 'mint' as CategoriaColor, label: 'Categoria', title: 'Cultura de inovação como motor da produtividade e inovação' },
	{ seed: 'ws-h2', color: 'coral' as CategoriaColor, label: 'Food Service', title: 'Como usar dados do consumidor para melhorar a experiência do cliente no food service' },
	{ seed: 'ws-h3', color: 'saffron' as CategoriaColor, label: 'Ingredientes', title: 'Análise sensorial com IA: como funciona, aplicações na indústria de alimentos' },
	{ seed: 'ws-h4', color: 'primary-600' as CategoriaColor, label: 'Proteína SAE', title: 'Design higiênico: pilar estratégico para a indústria e a salamandrina' },
]

export const VIDEOS_LIST: Article[] = [
	{ id: 'vid1', seed: 'vid1', category: 'Proteína Animal', categoryColor: 'mint', title: 'Balcão de açougue: qual é a temperatura ideal para carnes expostas' },
	{ id: 'vid2', seed: 'vid2', category: 'Ingredientes', categoryColor: 'mint', title: 'Setor de sorvetes cresce, investe pesado e projeta aceleração em 2026' },
	{ id: 'vid3', seed: 'vid3', category: 'Food Service', categoryColor: 'mint', title: 'Tendência de fermentados exóticos: kimchi, missô e kombucha' },
]

export interface VideoArticle extends Article {
	image: string
}

export const VIDEOS_SECTION: VideoArticle[] = [
	{
		id: 'vid-hero',
		seed: 'vid-hero',
		image: picsumSrc('vid-hero', 1200, 675),
		category: 'Categoria',
		categoryColor: 'mint',
		title: 'Como fazer um plano de logística integrada na indústria de alimentos',
		lead: 'Entenda os métodos da logística de alimentos com planejamento, análise, integração de sistemas e ações de contingência.',
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
		title: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA',
		lead: 'Nestlé, BRF, JBS, Braun, Siemens, Mitsubishi e outras marcas apresentaram na Fispal 2025 inovações em IA e outras tecnologias.',
		author: 'Author Name',
	},
	{
		id: 'fispal2',
		seed: 'fispal2',
		category: 'Embalagens',
		categoryColor: 'saffron',
		title: 'Embalagens flexíveis: mercado cresce impulsionado por inovação e consumo consciente',
		lead: 'Novos materiais para atender consumidores cada vez mais exigentes no cenário atual de inovação.',
	},
	{
		id: 'fispal3',
		seed: 'fispal3',
		category: 'Tecnologia',
		categoryColor: 'secondary-950',
		title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
		lead: 'A navegação inteligente de "colegas" de operação, robôs modulares na automação das linhas de produção.',
	},
]

export const NEWS_PODCAST: Article[] = [
	{
		id: 'nwp-hero',
		seed: 'nwp-s1',
		category: 'Categoria',
		categoryColor: 'mint',
		title: 'Como fazer um plano de logística integrada na indústria de alimentos',
		author: 'Author Name',
	},
	{ id: 'nwp1', seed: 'nwp1', category: 'Proteína Animal', categoryColor: 'coral', title: 'Balcão de açougue: qual é a temperatura ideal para carnes expostas', lead: 'A temperatura adequada e determinantes em balcões para garantir qualidade e hermeticamente...' },
	{ id: 'nwp2', seed: 'nwp2', category: 'Ingredientes', categoryColor: 'mint', title: 'Setor de sorvetes cresce, investe pesado e projeta aceleração em 2026' },
	{ id: 'nwp3', seed: 'nwp3', category: 'Food Service', categoryColor: 'primary-600', title: 'Tendência de fermentados exóticos: kimchi, missô e kombucha' },
]

export const PODCASTS = [
	{ seed: 'pod2', category: 'Ingredientes', title: 'Design higiênico: pilar estratégico para o futuro da indústria alimentícia' },
	{ seed: 'pod3', category: 'Food Service', title: 'Como usar dados de consumidor para melhorar a experiência do cliente no food service' },
	{ seed: 'pod4', category: 'Tecnologia', title: 'Tecnologias verdes: como a sustentabilidade está moldando o futuro da produção' },
]

export const ESPECIALISTAS = [
	{ img: '14', name: 'Augusto Zarpon', role: 'Especialista em melhoria contínua', quote: 'A embalagem que protege seu alimento e a eficiência da sua fábrica' },
	{ img: '33', name: 'Alessandra Gaidargi', role: 'Jornalista especialista em alimentação', quote: 'Desafio do food service: Cardápios Kids saudáveis' },
	{ img: '52', name: 'Luis Fernando Nardi', role: 'Especialista em franchising de food service', quote: 'Guerra pela atenção: como os restaurantes estão vencendo com criatividade, tecnologia e parcerias inéditas' },
	{ img: '44', name: 'Bethânia Vargas', role: 'Head de Projetos e Regulatórios na Pronutrition', quote: 'As fibras serão a nova proteína? O próximo ciclo de protagonismo na nutrição funcional' },
	{ img: '68', name: 'Victor Santos', role: 'CEO e cofundador da Liv Up', quote: 'Personalização é a chave para atrair os consumidores brasileiros' },
	{ img: '26', name: 'Eugenia Muinelo', role: 'Gerente de Assuntos Regulatórios', quote: 'Argentina aprova novos ingredientes em suplementos alimentares' },
]

export const LAST_SECTION: Article[] = [
	{ id: 'last-hero', seed: 'last-hero', category: 'Fispal Tecnologia', categoryColor: 'saffron', title: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA', lead: 'Nestlé, BRF, JBS, Braun, Siemens, Mitsubishi e outras marcas apresentaram inovações em IA e outras tecnologias.', author: 'Author Name' },
	{ id: 'last2', seed: 'last2', category: 'Embalagens', categoryColor: 'saffron', title: 'Embalagens flexíveis: mercado cresce impulsionado por inovação e consumo consciente' },
	{ id: 'last3', seed: 'last3', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos' },
	{ id: 'last4', seed: 'last4', category: 'Tecnologia', categoryColor: 'primary-600', title: 'IA passa a prescrever soluções para "tumor" máquinas industriais' },
]

export const CATEGORIA_FEATURED: Article[] = [
	{ id: 'cat-hero', seed: 'cat-hero', category: 'Embalagens', categoryColor: 'mint', title: 'O futuro das embalagens flexíveis', lead: 'Qual será futuro das embalagens flexíveis e os benefícios para a indústria? Confira agora no vídeo produzido na Fispal Tecnologia!' },
	{ id: 'cat-f2', seed: 'cat-f2', category: 'Embalagens', categoryColor: 'mint', title: 'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos' },
	{ id: 'cat-f3', seed: 'cat-f3', category: 'Embalagens', categoryColor: 'mint', title: 'Cultura do cuidado como motor da produtividade e inovação' },
	{ id: 'cat-f4', seed: 'cat-f4', category: 'Embalagens', categoryColor: 'mint', title: 'Passo a passo para montar uma dark kitchen' },
]

export const CATEGORIA_LIST: Article[] = [
	{ id: 'cat-a1', seed: 'cat-a1', category: 'Embalagens', categoryColor: 'mint', title: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA', lead: 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante' },
	{ id: 'cat-a2', seed: 'cat-a2', category: 'Embalagens', categoryColor: 'mint', title: 'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação', lead: 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias que conduzirão a indústria daqui em diante' },
	{ id: 'cat-a3', seed: 'cat-a3', category: 'Embalagens', categoryColor: 'mint', title: 'Cultura do cuidado como motor da produtividade e inovação', lead: 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho, engajamento e soluções inovadoras' },
	{ id: 'cat-a4', seed: 'cat-a4', category: 'Embalagens', categoryColor: 'mint', title: 'Tendências em design que moldam o futuro das embalagens', lead: 'Mario Narita, CEO da Narita Strategy & Design, fala sobre o futuro do design de embalagens para alimentos' },
	{ id: 'cat-a5', seed: 'cat-a5', category: 'Embalagens', categoryColor: 'mint', title: 'O futuro da alimentação está na origem', lead: 'Rastreabilidade tem se tornado ferramenta de gestão de risco e reputação no food service' },
	{ id: 'cat-a6', seed: 'cat-a6', category: 'Embalagens', categoryColor: 'mint', title: 'Tendências para o mercado de energéticos na indústria de bebidas', lead: 'Energéticos à base de plantas, versões sem açúcar e sabores tropicais estão entre as principais tendências de bebidas energéticas.' },
	{ id: 'cat-a7', seed: 'cat-a7', category: 'Embalagens', categoryColor: 'mint', title: 'O futuro das embalagens flexíveis', lead: 'Qual será futuro das embalagens flexíveis e os benefícios para a indústria? Confira agora no vídeo produzido na Fispal Tecnologia!' },
	{ id: 'cat-a8', seed: 'cat-a8', category: 'Embalagens', categoryColor: 'mint', title: 'Cultura do cuidado como motor da produtividade e inovação', lead: 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho, engajamento e soluções inovadoras' },
]

export const SEARCH_RESULTS: Article[] = [
	{ id: 'bus-1', seed: 'bus-1', category: 'Food Service', categoryColor: 'saffron', title: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA', lead: 'Nestlé, BRF, M.Dias Branco, Siemens, Mitsubishi e tantas outras apresentaram na Fispal 2025 inovações em IA e outras tecnologias' },
	{ id: 'bus-2', seed: 'bus-2', category: 'Ingredientes', categoryColor: 'mint', title: 'Para 2026, a trajetória dos sucos se encontra no caminho entre a tradição e a inovação', lead: 'Novos sabores e combinações para atender um consumidor cada vez mais exigente e consciente' },
	{ id: 'bus-3', seed: 'bus-3', category: 'ESG', categoryColor: 'lavander', title: 'Cultura do cuidado como motor da produtividade e inovação', lead: 'Como a valorização das pessoas e o bem-estar nas organizações impulsionam desempenho' },
	{ id: 'bus-4', seed: 'bus-4', category: 'Embalagens', categoryColor: 'primary-600', title: 'Tendências em design que moldam o futuro das embalagens', lead: 'Mario Narita fala sobre o futuro do design de embalagens para alimentos' },
	{ id: 'bus-5', seed: 'bus-5', category: 'Food Service', categoryColor: 'saffron', title: 'O futuro da alimentação está na origem', lead: 'Rastreabilidade tem se tornado ferramenta de gestão de risco e reputação no food service' },
	{ id: 'bus-6', seed: 'bus-6', category: 'Ingredientes', categoryColor: 'mint', title: 'Tendências para o mercado de energéticos na indústria de bebidas', lead: 'Energéticos à base de plantas, versões sem açúcar e sabores tropicais' },
	{ id: 'bus-7', seed: 'bus-7', category: 'Embalagens', categoryColor: 'primary-600', title: 'O futuro das embalagens flexíveis', lead: 'Qual será futuro das embalagens flexíveis e os benefícios para a indústria?' },
	{ id: 'bus-8', seed: 'bus-8', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Cultura do cuidado como motor da produtividade e inovação', lead: 'Como a valorização das pessoas impulsiona desempenho e soluções inovadoras' },
]

export const VEJA_TAMBEM: Article[] = [
	{ id: 'vt1', seed: 'vt1', category: 'Food Service', categoryColor: 'saffron', title: 'Passo a passo para montar uma dark kitchen' },
	{ id: 'vt2', seed: 'vt2', category: 'Fispal Tecnologia', categoryColor: 'secondary-500', title: 'Fispal Tecnologia 2025: indústria mostra como está enfrentando a era da IA' },
	{ id: 'vt3', seed: 'vt3', category: 'Food ingredients South America', categoryColor: 'coral', title: 'Nutrição de precisão: o que é, como funciona e as transformações na indústria de alimentos' },
	{ id: 'vt4', seed: 'vt4', category: 'Indústria A&B', categoryColor: 'secondary-950', title: 'Estamos prontos para enfrentar o desafio de produzir em 5.0?' },
]

export const ARTICLE_TAGS = ['Análise sensorial', 'IA', 'Indústria 4.0', 'Controle de qualidade', 'Food Tech']

export const NOT_FOUND_CARDS: Array<Article & { author: string }> = [
	{ id: '404a', seed: '404a', category: 'Eventos', categoryColor: 'mint', title: 'FiSA 2026: inscrições abertas para o congresso de ingredientes', author: 'Marcelo Yamashita' },
	{ id: '404b', seed: '404b', category: 'Proteína Animal', categoryColor: 'coral', title: 'Tecnocarne anuncia novo pavilhão para soluções em automação', author: 'Rafaela Costa' },
	{ id: '404c', seed: '404c', category: 'Indústria A&B', categoryColor: 'saffron', title: 'Tendências em proteína vegetal: mercado brasileiro cresce 18%', author: 'João Pedro Almeida' },
	{ id: '404d', seed: '404d', category: 'ESG', categoryColor: 'lavander', title: 'ESG na indústria de laticínios: case da Cooperativa Central Aurora', author: 'Luiza Bertolaccini' },
	{ id: '404e', seed: '404e', category: 'Embalagens', categoryColor: 'secondary-500', title: 'Embalagens sustentáveis: como a Klabin lidera o setor', author: 'Bruno Tavares' },
	{ id: '404f', seed: '404f', category: 'Sorvetes', categoryColor: 'mint', title: 'Sorvetes artesanais: boom de marcas paulistanas no verão 2026', author: 'Marcelo Yamashita' },
	{ id: '404g', seed: '404g', category: 'Food Service', categoryColor: 'primary-600', title: 'Food Service: delivery próprio volta a ganhar tração em 2026', author: 'Rafaela Costa' },
	{ id: '404h', seed: '404h', category: 'Tecnologia', categoryColor: 'secondary-950', title: 'Fispal Food Service 2026: programação de palestras é divulgada', author: 'Luiza Bertolaccini' },
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
