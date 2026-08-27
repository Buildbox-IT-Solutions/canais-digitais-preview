import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'

/**
 * Configuração do cadastro multi-step — fonte única para `/cadastro` (modal) e
 * `/cadastro-full` (fullpage). As duas telas mostram o mesmo formulário; só muda o
 * invólucro. Manter os campos aqui evita que uma versão avance sem a outra.
 *
 * Os campos espelham o formulário de download do Eloqua (rótulos, ordem e
 * obrigatoriedade), para que uma conta completa dispense o preenchimento do
 * formulário no gate de download.
 */

export const CADASTRO_TOTAL_STEPS = 4

export type CadastroStep = 1 | 2 | 3 | 4

export const CADASTRO_STEPS: CadastroStep[] = [1, 2, 3, 4]

export interface CadastroTextField {
	kind: 'text'
	name: string
	label: string
	type: 'text' | 'email' | 'tel'
	placeholder?: string
	autoComplete: string
	/** Campos vizinhos com o mesmo `row` ocupam uma linha só (2 colunas a partir de `sm`). */
	row?: string
}

export interface CadastroSelectField {
	kind: 'select'
	name: string
	label: string
	placeholder: string
	options: string[]
	defaultValue?: string
	autoComplete?: string
	row?: string
}

export type CadastroField = CadastroTextField | CadastroSelectField

export const HEADINGS: Record<CadastroStep, { title: string; sub: string | null }> = {
	1: { title: 'Vamos criar sua conta', sub: 'Recomendamos o uso do seu e-mail corporativo.' },
	2: { title: 'Crie uma senha', sub: null },
	3: {
		title: 'Conte um pouco sobre você',
		sub: 'Usamos isso para recomendar conteúdo, eventos e materiais relevantes para o seu mercado.',
	},
	4: {
		title: 'Onde você está?',
		sub: 'Usamos sua localização para indicar eventos e materiais da sua região.',
	},
}

export const PRIMARY_CTA: Record<CadastroStep, string> = {
	1: 'Avançar',
	2: 'Avançar',
	3: 'Avançar',
	4: 'Criar minha conta',
}

export const PROOF_VARIANT: Record<CadastroStep, ProofPanelMinimalVariant> = {
	1: 'signup-1',
	2: 'signup-2',
	3: 'signup-3',
	4: 'signup-4',
}

/**
 * Passo 1 — identidade. O e-mail fecha o passo e é renderizado à parte: só ele
 * carrega valor de retorno (`?email=`), erros próprios e link de "Entrar".
 */
export const IDENTITY_FIELDS: CadastroTextField[] = [
	{
		kind: 'text',
		name: 'nome',
		label: 'Nome',
		type: 'text',
		autoComplete: 'given-name',
		row: 'nome',
	},
	{
		kind: 'text',
		name: 'sobrenome',
		label: 'Sobrenome',
		type: 'text',
		autoComplete: 'family-name',
		row: 'nome',
	},
]

export const EMAIL_FIELD: CadastroTextField = {
	kind: 'text',
	name: 'email',
	label: 'E-mail Corporativo',
	type: 'email',
	placeholder: 'exemplo@gmail.com',
	autoComplete: 'email',
}

/** Passo 3 — dados profissionais. */
export const PROFESSIONAL_FIELDS: CadastroField[] = [
	{
		kind: 'text',
		name: 'empresa',
		label: 'Empresa',
		type: 'text',
		placeholder: 'Digite o nome da sua empresa',
		autoComplete: 'organization',
	},
	{
		kind: 'select',
		name: 'cargo',
		label: 'Cargo Ocupado',
		placeholder: 'Selecione',
		// Lista verbatim do formulário de download em produção (campo `GSQJobLevel` do
		// Eloqua). A ordem é a do formulário — não é alfabética, é por senioridade.
		options: [
			'Estudante/Trainee/Docentes',
			'Analista/Assistente',
			'Técnico/Engenheiro',
			'Coordenador/Supervisor',
			'Gerente',
			'Diretor',
			'Presidente/Vice-Presidente',
			'C-Level',
			'Representante/Vendedor',
			'Proprietário/Empreendedor',
			'Consultor',
			'Investidor',
			'Autoridade',
		],
		autoComplete: 'organization-title',
	},
	{
		kind: 'text',
		name: 'telefone',
		label: 'Melhor Telefone',
		type: 'tel',
		placeholder: '(xx) xxxxx-xxxx',
		autoComplete: 'tel',
	},
]

/** Passo 4 — dados demográficos. */
export const DEMOGRAPHIC_FIELDS: CadastroField[] = [
	{
		kind: 'select',
		name: 'pais',
		label: 'País',
		placeholder: 'Selecione',
		// Vem preenchido com Brasil — o público do MVP é nacional. 🔴 O formulário em
		// produção (campo `country` do Eloqua) lista 194 países; aqui fica uma amostra,
		// suficiente para o protótipo. A lista completa é a do Eloqua.
		defaultValue: 'Brasil',
		options: [
			'Brasil',
			'Argentina',
			'Chile',
			'Colômbia',
			'México',
			'Paraguai',
			'Peru',
			'Portugal',
			'Uruguai',
			'Estados Unidos',
		],
		autoComplete: 'country-name',
	},
	{
		kind: 'select',
		name: 'estado',
		label: 'Estado',
		placeholder: 'Selecione',
		// Nomes por extenso e em ordem alfabética, como no formulário em produção
		// (campo `stateProv` do Eloqua) — não sigla.
		options: [
			'Acre',
			'Alagoas',
			'Amapá',
			'Amazonas',
			'Bahia',
			'Ceará',
			'Distrito Federal',
			'Espírito Santo',
			'Goiás',
			'Maranhão',
			'Mato Grosso',
			'Mato Grosso do Sul',
			'Minas Gerais',
			'Pará',
			'Paraíba',
			'Paraná',
			'Pernambuco',
			'Piauí',
			'Rio de Janeiro',
			'Rio Grande do Norte',
			'Rio Grande do Sul',
			'Rondônia',
			'Roraima',
			'Santa Catarina',
			'São Paulo',
			'Sergipe',
			'Tocantins',
		],
		autoComplete: 'address-level1',
	},
	{
		kind: 'text',
		name: 'cidade',
		label: 'Cidade',
		type: 'text',
		placeholder: 'Digite o nome da sua cidade',
		autoComplete: 'address-level2',
	},
]

export const STEP_FIELDS: Record<3 | 4, CadastroField[]> = {
	3: PROFESSIONAL_FIELDS,
	4: DEMOGRAPHIC_FIELDS,
}
