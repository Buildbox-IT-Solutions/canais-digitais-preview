// Eixo de sessão (`?logado=`) para a ScenarioBar — o cenário mais global do protótipo
// e, até 28/08/2026, o único que não estava na barra: quem revisava precisava saber
// que existe um `?logado=true` e digitá-lo na URL. Cenário que só quem conhece o
// código alcança é cenário que ninguém revisa, que é exatamente o que a barra existe
// para evitar.
//
// Vem PRIMEIRO na lista de eixos de cada tela, por dois motivos: é o contexto que
// envolve todos os outros (o estado de assinatura da newsletter só faz sentido dentro
// de "logado"), e Alt+. percorre o primeiro eixo — alternar entre visitante e leitor
// identificado é a travessia mais útil numa demonstração.
//
// `clears: ['newsletter']` porque o eixo do banner de newsletter só é registrado no
// estado logado: sem isso, voltar para "Deslogado" deixaria um `?newsletter=` órfão na
// URL, que reapareceria ao logar de novo trazendo um estado que o revisor não pediu.
import type { ScenarioAxis } from '~/dev/scenario-store'

export const SESSAO_DESLOGADO = 'false'
export const SESSAO_LOGADO = 'true'

export function sessaoAxis(logado: boolean): ScenarioAxis {
	return {
		param: 'logado',
		label: 'Sessão',
		value: logado ? SESSAO_LOGADO : SESSAO_DESLOGADO,
		// Deslogado é o estado normal de uma tela pública: selecionar remove `?logado=`
		// da URL em vez de gravar `?logado=false`, que é ruído no link compartilhado.
		defaultValue: SESSAO_DESLOGADO,
		options: [
			{ value: SESSAO_DESLOGADO, label: 'Deslogado' },
			{ value: SESSAO_LOGADO, label: 'Logado' },
		],
		clears: ['newsletter'],
	}
}
