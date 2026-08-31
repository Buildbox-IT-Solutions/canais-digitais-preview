import type { Post } from '~/types/post'
import { picsumSrc } from '~/mocks/articles'

// Fixture de teste do TOC: precisa de 8-10 H2, 2-3 H3 distribuídos sob H2
// diferentes, parágrafos de tamanho realista e pelo menos um título longo
// o suficiente para quebrar linha no painel do TOC em mobile.
export const POST_LONGO_TOC: Post = {
	slug: 'post-longo-toc',
	kicker: 'Transmissão',
	title: 'Transição energética no Brasil: como a matriz elétrica está se transformando até 2030',
	subtitle:
		'Leilões de transmissão, energia solar distribuída, hidrogênio verde e armazenamento em baterias despontam como as frentes que vão redesenhar o setor elétrico brasileiro na próxima década.',
	publishedAt: '2026-07-10T08:00:00-03:00',
	updatedAt: '2026-07-20T16:45:00-03:00',
	readingTimeMin: 15,
	authors: [
		{
			id: 'fernanda-botelho',
			name: 'Fernanda Botelho',
			role: 'Editora de Energia',
			avatarUrl: 'https://i.pravatar.cc/80?img=44',
		},
	],
	media: null,
	audioVersion: {
		src: 'https://cdn.exemplo.com/audio/tts/transicao-energetica-2030.mp3',
		durationSec: 912,
	},
	download: null,
	aiSummary: {
		bullets: [
			'Leilões de transmissão previstos para 2026 devem atrair mais de R$ 20 bilhões em investimentos.',
			'Energia solar distribuída já responde por parcela crescente da matriz, mas enfrenta revisão regulatória.',
			'Hidrogênio verde surge como aposta de exportação, com projetos-piloto no Ceará e no Rio Grande do Norte.',
			'Smart grids e armazenamento em baterias são apontados como a próxima fronteira de investimento do setor.',
		],
		// TODO(copy): disclaimer pendente de aprovação — Ana / jurídico
		disclaimer: 'Resumo gerado por inteligência artificial. Pode conter imprecisões.',
	},
	headings: [
		{ id: 'panorama-atual-da-matriz-eletrica-brasileira', text: 'Panorama atual da matriz elétrica brasileira', level: 2 },
		{ id: 'leiloes-de-transmissao-e-os-novos-investimentos-previstos-para-2026', text: 'Leilões de transmissão e os novos investimentos previstos para 2026', level: 2 },
		{ id: 'principais-lotes-arrematados-no-ultimo-leilao-da-aneel', text: 'Principais lotes arrematados no último leilão da Aneel', level: 3 },
		{ id: 'energia-solar-distribuida-crescimento-e-desafios-regulatorios', text: 'Energia solar distribuída: crescimento e desafios regulatórios', level: 2 },
		{ id: 'impactos-da-revisao-do-marco-legal-da-geracao-distribuida', text: 'Impactos da revisão do marco legal da geração distribuída', level: 3 },
		{ id: 'armazenamento-de-energia-baterias-e-usinas-reversiveis', text: 'Armazenamento de energia: baterias e o papel das usinas reversíveis', level: 2 },
		{ id: 'hidrogenio-verde-e-o-potencial-exportador-do-brasil', text: 'Hidrogênio verde e o potencial exportador do Brasil', level: 2 },
		{ id: 'projetos-piloto-no-ceara-e-no-rio-grande-do-norte', text: 'Projetos-piloto no Ceará e no Rio Grande do Norte', level: 3 },
		{ id: 'modernizacao-das-redes-com-smart-grids', text: 'Modernização das redes de distribuição com redes inteligentes (smart grids)', level: 2 },
		{ id: 'financiamento-para-projetos-de-infraestrutura-energetica', text: 'Financiamento e linhas de crédito para projetos de infraestrutura energética', level: 2 },
		{ id: 'desafios-regulatorios-para-a-expansao-da-transmissao', text: 'Desafios regulatórios para a expansão da transmissão', level: 2 },
		{
			id: 'o-papel-da-agencia-nacional-de-energia-eletrica-aneel-na-integracao-de-fontes-renovaveis-ao-sistema-interligado-nacional',
			text: 'O papel da Agência Nacional de Energia Elétrica (Aneel) na integração de fontes renováveis ao sistema interligado nacional',
			level: 2,
		},
		{ id: 'perspectivas-para-o-setor-eletrico-brasileiro-ate-2030', text: 'Perspectivas para o setor elétrico brasileiro até 2030', level: 2 },
	],
	body: [
		{
			type: 'paragraph',
			text: 'O sistema elétrico brasileiro vive um momento de transformação acelerada. Entre leilões bilionários de transmissão, a ascensão da geração distribuída e as primeiras apostas em hidrogênio verde, o setor caminha para uma configuração bem diferente da que conhecemos há uma década.',
		},
		{
			type: 'paragraph',
			text: 'Este panorama reúne as principais frentes que devem definir os investimentos e a regulação do setor elétrico até o fim da década, com base em dados recentes da Aneel, do Operador Nacional do Sistema Elétrico (ONS) e de associações do setor.',
		},

		{ type: 'heading', id: 'panorama-atual-da-matriz-eletrica-brasileira', text: 'Panorama atual da matriz elétrica brasileira', level: 2 },
		{
			type: 'paragraph',
			text: 'A matriz elétrica brasileira segue entre as mais limpas do mundo, com a hidráulica ainda respondendo pela maior fatia da geração, seguida por eólica, biomassa e solar. Nos últimos cinco anos, porém, a participação de fontes intermitentes cresceu de forma consistente, exigindo mais flexibilidade do sistema.',
		},
		{
			type: 'image',
			src: picsumSrc('matriz-eletrica-brasil', 1200, 700),
			alt: 'Torres de transmissão de energia elétrica ao entardecer',
			caption: 'Expansão da malha de transmissão acompanha o crescimento das fontes renováveis no país.',
		},
		{
			type: 'paragraph',
			text: 'Esse crescimento trouxe um desafio de outra natureza: garantir que a energia gerada em pontos cada vez mais distantes dos grandes centros consumidores chegue ao destino sem perdas excessivas — o que coloca a expansão da transmissão no centro do debate.',
		},

		{ type: 'heading', id: 'leiloes-de-transmissao-e-os-novos-investimentos-previstos-para-2026', text: 'Leilões de transmissão e os novos investimentos previstos para 2026', level: 2 },
		{
			type: 'paragraph',
			text: 'A Aneel confirmou um novo ciclo de leilões de transmissão para 2026, com lotes distribuídos entre as regiões Nordeste, Norte e Sudeste. As estimativas do setor apontam para mais de R$ 20 bilhões em investimentos previstos, distribuídos entre construção de novas linhas e subestações.',
		},
		{
			type: 'highlight',
			text: 'Os lotes do próximo leilão priorizam corredores que escoam energia eólica e solar do Nordeste para os centros de consumo do Sudeste — hoje um dos principais gargalos do sistema.',
		},
		{ type: 'heading', id: 'principais-lotes-arrematados-no-ultimo-leilao-da-aneel', text: 'Principais lotes arrematados no último leilão da Aneel', level: 3 },
		{
			type: 'paragraph',
			text: 'No último leilão realizado, consórcios formados por empresas nacionais e fundos de infraestrutura arremataram a maior parte dos lotes com ágios moderados, sinal de que o setor mantém apetite por ativos de longo prazo mesmo em um cenário de juros ainda elevados.',
		},

		{ type: 'heading', id: 'energia-solar-distribuida-crescimento-e-desafios-regulatorios', text: 'Energia solar distribuída: crescimento e desafios regulatórios', level: 2 },
		{
			type: 'paragraph',
			text: 'A geração distribuída, sobretudo solar em telhados residenciais e comerciais, segue em expansão, impulsionada pela queda no custo dos equipamentos e por linhas de financiamento específicas. O segmento já responde por uma fatia relevante da capacidade instalada no país.',
		},
		{ type: 'heading', id: 'impactos-da-revisao-do-marco-legal-da-geracao-distribuida', text: 'Impactos da revisão do marco legal da geração distribuída', level: 3 },
		{
			type: 'paragraph',
			text: 'A revisão das regras de compensação de energia, que reduz gradualmente os benefícios tarifários para novos sistemas, tem gerado incerteza entre instaladores e consumidores. Ainda assim, o setor projeta manutenção do ritmo de crescimento, puxado por sistemas de maior porte no segmento comercial e industrial.',
		},

		{ type: 'heading', id: 'armazenamento-de-energia-baterias-e-usinas-reversiveis', text: 'Armazenamento de energia: baterias e o papel das usinas reversíveis', level: 2 },
		{
			type: 'paragraph',
			text: 'Com mais geração intermitente entrando no sistema, o armazenamento deixou de ser um tema de nicho. Projetos-piloto de baterias em grande escala já operam em conjunto com parques eólicos e solares, suavizando picos de geração e reduzindo o risco de cortes por excesso de oferta.',
		},
		{
			type: 'paragraph',
			text: 'Usinas hidrelétricas reversíveis — que bombeiam água de volta ao reservatório em horários de baixa demanda — também voltaram a ser discutidas como alternativa de armazenamento de longo prazo, aproveitando a infraestrutura hídrica já existente no país.',
		},

		{ type: 'heading', id: 'hidrogenio-verde-e-o-potencial-exportador-do-brasil', text: 'Hidrogênio verde e o potencial exportador do Brasil', level: 2 },
		{
			type: 'paragraph',
			text: 'O Brasil tem sido citado como um dos países mais bem posicionados para produzir hidrogênio verde em escala competitiva, graças ao custo baixo de energia renovável em regiões como o litoral nordestino. Diversos memorandos de entendimento com investidores estrangeiros já foram assinados nos últimos dois anos.',
		},
		{ type: 'heading', id: 'projetos-piloto-no-ceara-e-no-rio-grande-do-norte', text: 'Projetos-piloto no Ceará e no Rio Grande do Norte', level: 3 },
		{
			type: 'paragraph',
			text: 'No Complexo Portuário do Pecém, no Ceará, e em áreas industriais do Rio Grande do Norte, plantas-piloto de eletrólise já produzem hidrogênio em pequena escala, servindo como prova de conceito para projetos de exportação anunciados para o fim da década.',
		},

		{ type: 'heading', id: 'modernizacao-das-redes-com-smart-grids', text: 'Modernização das redes de distribuição com redes inteligentes (smart grids)', level: 2 },
		{
			type: 'paragraph',
			text: 'Distribuidoras de energia têm investido na troca de medidores convencionais por medidores inteligentes, capazes de monitorar consumo e qualidade de energia em tempo real. A tecnologia permite identificar perdas técnicas e não técnicas — como furtos de energia — de forma muito mais rápida que os métodos tradicionais.',
		},

		{ type: 'heading', id: 'financiamento-para-projetos-de-infraestrutura-energetica', text: 'Financiamento e linhas de crédito para projetos de infraestrutura energética', level: 2 },
		{
			type: 'paragraph',
			text: 'Bancos públicos e privados ampliaram as linhas de crédito voltadas a projetos de infraestrutura energética, com condições diferenciadas para iniciativas de baixo carbono. Fundos internacionais de clima também têm direcionado recursos específicos para projetos brasileiros de transmissão e armazenamento.',
		},

		{ type: 'heading', id: 'desafios-regulatorios-para-a-expansao-da-transmissao', text: 'Desafios regulatórios para a expansão da transmissão', level: 2 },
		{
			type: 'paragraph',
			text: 'Licenciamento ambiental, negociação fundiária e prazos de obra seguem entre os principais riscos apontados por investidores do setor de transmissão. Atrasos nesses processos podem comprometer os cronogramas de entrada em operação previstos nos contratos de concessão.',
		},

		{
			type: 'heading',
			id: 'o-papel-da-agencia-nacional-de-energia-eletrica-aneel-na-integracao-de-fontes-renovaveis-ao-sistema-interligado-nacional',
			text: 'O papel da Agência Nacional de Energia Elétrica (Aneel) na integração de fontes renováveis ao sistema interligado nacional',
			level: 2,
		},
		{
			type: 'paragraph',
			text: 'Cabe à Aneel equilibrar a entrada acelerada de novas fontes renováveis com a estabilidade do sistema interligado nacional. Isso inclui atualizar regras de conexão, revisar critérios de despacho e coordenar com o ONS os limites de escoamento de cada região do país.',
		},

		{ type: 'heading', id: 'perspectivas-para-o-setor-eletrico-brasileiro-ate-2030', text: 'Perspectivas para o setor elétrico brasileiro até 2030', level: 2 },
		{
			type: 'paragraph',
			text: 'Para o horizonte até 2030, o setor projeta uma matriz ainda mais diversificada, com maior participação de armazenamento, hidrogênio verde em fase de escala comercial e uma malha de transmissão redesenhada para dar conta da geração renovável distribuída pelo território nacional.',
		},
		{
			type: 'paragraph',
			text: 'O desafio, segundo especialistas ouvidos para esta reportagem, será conciliar esse ritmo de expansão com a modicidade tarifária — garantir que a conta da transição energética não recaia de forma desproporcional sobre o consumidor final.',
		},
	],
}
