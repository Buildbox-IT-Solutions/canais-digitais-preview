/**
 * Picklists do Eloqua — listas que o cadastro e o perfil precisam oferecer iguais.
 *
 * Os valores são verbatim do formulário de download em produção (saudebusiness.com,
 * campos `GSQJobLevel`, `country` e `stateProv`). Se as duas telas oferecerem listas
 * diferentes, o mesmo usuário grava valores diferentes para o mesmo campo e o
 * mapeamento no Eloqua quebra — por isso a lista mora aqui, não em cada tela.
 */

/** `GSQJobLevel`. Ordem do formulário: por senioridade, não alfabética. */
export const OPCOES_CARGO = [
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
]

/**
 * `country`. 🔴 O formulário em produção lista 194 países; aqui fica uma amostra com
 * o Brasil primeiro, suficiente para o protótipo. A lista completa é a do Eloqua.
 */
export const OPCOES_PAIS = [
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
]

/** `stateProv`. Nome por extenso e em ordem alfabética, como no formulário — não sigla. */
export const OPCOES_ESTADO = [
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
]
