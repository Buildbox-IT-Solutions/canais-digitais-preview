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
	{ category: 'Proteína Animal', title: 'Como fazer o transporte de pescados frescos corretamente', portal: 'Food Connection', when: 'há poucos segundos' },
	{ category: 'Ingredientes', title: 'Creatina além da musculação: benefícios comprovados para saúde e cognição', portal: 'Food Connection', when: 'há 2 minutos' },
	{ category: 'Food Service', title: 'Por que a experiência do cliente em restaurantes ainda não escala?', portal: 'Food Connection', when: 'ontem' },
	{ category: 'Fispal Tecnologia', title: 'Coquetel da Fispal 2026 antecipa agenda estratégica e oportunidades de negócio', portal: 'Food Connection', when: 'há 3 dias' },
	{ category: 'Tecnocarne', title: 'Smart Processing: inovação ao vivo na Tecnocarne South America', portal: 'Food Connection', when: 'há 1 ano' },
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
	portal: string
	date: string
	size: string
	disabled: boolean
}

export const DOWNLOADS: DownloadEntry[] = [
	{ icon: 'pdf', title: 'Proteína de inseto: produção e regulação desse alimento no Brasil', portal: 'Food Connection', date: '12 Jan 2026', size: '2.6 MB', disabled: false },
	{ icon: 'pdf', title: 'Ozempic, 6×1 e custo da mão de obra: como esses e outros assuntos moldam as tendências para o Food Service em 2026', portal: 'Food Connection', date: '15 Fev 2026', size: '3.2 MB', disabled: false },
	{ icon: 'pdf', title: 'Alternativas vegetais: como as proteínas de origem vegetal estão ganhando espaço na dieta brasileira', portal: 'Food Connection', date: '20 Mar 2026', size: '2.8 MB', disabled: false },
	{ icon: 'pdf', title: 'Linhas de crédito e financiamento para a indústria de alimentos e bebidas: panorama 2026', portal: 'Food Connection', date: '25 Abr 2026', size: '1.9 MB', disabled: false },
	{ icon: 'pdf', title: 'Comida de rua: tendências e regulamentações em crescimento nas principais cidades do Brasil', portal: 'Food Connection', date: '30 Mai 2026', size: '2.5 MB', disabled: false },
	{ icon: 'pdf', title: 'Revolução FoodTech no Brasil: tecnologias que estão reinventando a cadeia de A&B', portal: 'Food Connection', date: '10 Jun 2026', size: '3.0 MB', disabled: true },
	{ icon: 'pdf', title: 'Embalagens sustentáveis: o que muda no setor de alimentos com a nova regulamentação', portal: 'Food Connection', date: '15 Jul 2026', size: '2.3 MB', disabled: false },
	{ icon: 'pdf', title: 'Saúde e nutrição: como as novas diretrizes estão reformulando a indústria de alimentos', portal: 'Food Connection', date: '22 Ago 2026', size: '2.7 MB', disabled: false },
]

export const SESSIONS = [
	{ device: 'MacBook Pro 14"', browser: 'Chrome', location: 'São Paulo, BR', last: 'Agora mesmo', current: true },
	{ device: 'iPhone 15', browser: 'Safari Mobile', location: 'São Paulo, BR', last: 'há 2 horas', current: false },
	{ device: 'Windows 11', browser: 'Edge', location: 'Rio de Janeiro, BR', last: 'há 3 dias', current: false },
]
