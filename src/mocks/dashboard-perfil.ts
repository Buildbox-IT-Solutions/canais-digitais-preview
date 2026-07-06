export interface PerfilCampos {
	nome: string
	email: string
	telefone: string
	nascimento: string
	genero: string
	empresa: string
	cargo: string
	setor: string
	cpf: string
	pais: string
	estado: string
	cidade: string
	cep: string
	endereco: string
	numero: string
	complemento: string
}

export const PERFIL_CAMPOS: PerfilCampos = {
	nome: 'Mariana Albuquerque',
	email: 'mariana.albuquerque@empresa.com.br',
	telefone: '+55 (11) 98786-9879',
	nascimento: '',
	genero: '',
	empresa: 'Grupo Camargo Alimentos S/A',
	cargo: 'Gerente',
	setor: 'Alimentos & Bebidas',
	cpf: '',
	pais: 'Brasil',
	estado: '',
	cidade: '',
	cep: '',
	endereco: '',
	numero: '',
	complemento: '',
}

export const OPCOES_GENERO = ['Masculino', 'Feminino', 'Prefiro não informar']
export const OPCOES_CARGO = ['Diretor(a)', 'Gerente', 'Coordenador(a)', 'Analista', 'Consultor(a)', 'Outro']
export const OPCOES_SETOR = ['Agro', 'Alimentos & Bebidas', 'Embalagens', 'Saúde', 'Logística', 'Varejo', 'Tecnologia', 'Outro']
export const OPCOES_PAIS = ['Brasil', 'Argentina', 'Chile', 'Colômbia', 'México', 'Peru', 'Portugal', 'Outro']

export const RECENT_NEWS = [
	{ category: 'Proteína Animal', title: 'Como fazer o transporte de pescados frescos corretamente', when: 'há poucos segundos' },
	{ category: 'Ingredientes', title: 'Creatina além da musculação: benefícios comprovados para saúde e cognição', when: 'há 2 minutos' },
	{ category: 'Food Service', title: 'Por que a experiência do cliente em restaurantes ainda não escala?', when: 'ontem' },
	{ category: 'Fispal Tecnologia', title: 'Coquetel da Fispal 2026 antecipa agenda estratégica e oportunidades de negócio', when: 'há 3 dias' },
	{ category: 'Tecnocarne', title: 'Smart Processing: inovação ao vivo na Tecnocarne South America', when: 'há 1 ano' },
]

export const NEWSLETTERS = [
	{ title: 'Novidades e ofertas da Informa Markets', desc: 'Comunicações comerciais, convites para eventos e lançamentos institucionais.', checked: true },
	{ title: 'Food Connection', desc: 'O canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service. Tendências, entrevistas e novidades para quem move a cadeia de alimentos e bebidas.', checked: true },
	{ title: 'FiSA', desc: 'Cobertura da Feira Internacional de Ingredientes, Aditivos e Tecnologia para a Indústria de Alimentos e Bebidas.', checked: false },
	{ title: 'Fispal Tecnologia', desc: 'Conteúdo da feira de processos, embalagens e logística para a indústria de alimentos e bebidas.', checked: false },
	{ title: 'Tecnocarne', desc: 'Tendências e inovações da indústria da carne — processamento, equipamentos, ingredientes e mercado.', checked: false },
	{ title: 'Fispal Food Service', desc: 'O canal de conteúdo do food service brasileiro: bares, restaurantes, padarias, hotelaria, delivery e operações.', checked: false },
]

export type DownloadIconType = 'pdf' | 'doc' | 'image'

export interface DownloadEntry {
	icon: DownloadIconType
	title: string
	date: string
	size: string
	disabled: boolean
}

export const DOWNLOADS: DownloadEntry[] = [
	{ icon: 'pdf', title: 'Proteína de inseto: produção e regulação desse alimento no Brasil', date: '12 Jan 2026', size: '2.6 MB', disabled: false },
	{ icon: 'pdf', title: 'Ozempic, 6×1 e custo da mão de obra: como esses e outros assuntos moldam as tendências para o Food Service em 2026', date: '15 Fev 2026', size: '3.2 MB', disabled: false },
	{ icon: 'pdf', title: 'Alternativas vegetais: como as proteínas de origem vegetal estão ganhando espaço na dieta brasileira', date: '20 Mar 2026', size: '2.8 MB', disabled: false },
	{ icon: 'pdf', title: 'Linhas de crédito e financiamento para a indústria de alimentos e bebidas: panorama 2026', date: '25 Abr 2026', size: '1.9 MB', disabled: false },
	{ icon: 'pdf', title: 'Comida de rua: tendências e regulamentações em crescimento nas principais cidades do Brasil', date: '30 Mai 2026', size: '2.5 MB', disabled: false },
	{ icon: 'pdf', title: 'Revolução FoodTech no Brasil: tecnologias que estão reinventando a cadeia de A&B', date: '10 Jun 2026', size: '3.0 MB', disabled: true },
	{ icon: 'pdf', title: 'Embalagens sustentáveis: o que muda no setor de alimentos com a nova regulamentação', date: '15 Jul 2026', size: '2.3 MB', disabled: false },
	{ icon: 'pdf', title: 'Saúde e nutrição: como as novas diretrizes estão reformulando a indústria de alimentos', date: '22 Ago 2026', size: '2.7 MB', disabled: false },
	{ icon: 'doc', title: 'Rastreabilidade na cadeia de proteína animal: guia prático para conformidade', date: '05 Set 2026', size: '1.4 MB', disabled: false },
	{ icon: 'pdf', title: 'Panorama do mercado de sorvetes e sobremesas geladas no Brasil', date: '12 Set 2026', size: '2.9 MB', disabled: false },
	{ icon: 'image', title: 'Infográfico: a jornada do grão ao atacarejo com rastreabilidade', date: '18 Set 2026', size: '4.1 MB', disabled: false },
	{ icon: 'pdf', title: 'Tendências de embalagens inteligentes e ativas para alimentos perecíveis', date: '24 Set 2026', size: '2.2 MB', disabled: false },
	{ icon: 'pdf', title: 'Fermentação de precisão: aplicações e regulação de novos ingredientes', date: '02 Out 2026', size: '3.5 MB', disabled: true },
	{ icon: 'doc', title: 'Checklist de boas práticas para food service em grandes eventos', date: '09 Out 2026', size: '0.9 MB', disabled: false },
	{ icon: 'pdf', title: 'Logística integrada na indústria de alimentos: métodos e contingência', date: '16 Out 2026', size: '2.6 MB', disabled: false },
	{ icon: 'pdf', title: 'ESG no setor de A&B: métricas, relatórios e responsabilidade social', date: '23 Out 2026', size: '3.1 MB', disabled: false },
	{ icon: 'image', title: 'Guia visual de cortes e rendimento na proteína bovina', date: '30 Out 2026', size: '3.8 MB', disabled: false },
	{ icon: 'pdf', title: 'Nutrição funcional: suplementos em gomas e a nova geração de consumidores', date: '06 Nov 2026', size: '2.4 MB', disabled: false },
	{ icon: 'doc', title: 'Modelo de plano de expansão para redes de padaria e confeitaria', date: '13 Nov 2026', size: '1.1 MB', disabled: true },
	{ icon: 'pdf', title: 'Panorama de crédito e financiamento para FoodTechs em estágio inicial', date: '20 Nov 2026', size: '2.0 MB', disabled: false },
	{ icon: 'pdf', title: 'Segurança de alimentos: novas diretrizes sanitárias para 2027', date: '27 Nov 2026', size: '2.8 MB', disabled: false },
	{ icon: 'image', title: 'Cartilha ilustrada: descarte e reciclagem de embalagens no varejo', date: '04 Dez 2026', size: '3.6 MB', disabled: false },
	{ icon: 'pdf', title: 'Proteínas alternativas: cenário competitivo e projeções de consumo', date: '11 Dez 2026', size: '2.7 MB', disabled: false },
	{ icon: 'doc', title: 'Relatório setorial: indústria de bebidas não alcoólicas no Brasil', date: '18 Dez 2026', size: '1.7 MB', disabled: false },
]

export const SESSIONS = [
	{ device: 'MacBook Pro 14"', browser: 'Chrome', location: 'São Paulo, BR', last: 'Agora mesmo', current: true },
	{ device: 'iPhone 15', browser: 'Safari Mobile', location: 'São Paulo, BR', last: 'há 2 horas', current: false },
	{ device: 'Windows 11', browser: 'Edge', location: 'Rio de Janeiro, BR', last: 'há 3 dias', current: false },
]
