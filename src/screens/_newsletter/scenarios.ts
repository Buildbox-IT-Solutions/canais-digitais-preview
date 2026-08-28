// Eixo de cenário do banner de newsletter, para a ScenarioBar (ver src/dev).
// Compartilhado por /home e /conteudo: o banner é o mesmo componente nas duas telas e
// precisa ser revisável do mesmo jeito nas duas.
//
// Usa `?newsletter=` e não `?cenario=` porque a home já gasta `?cenario=` com o
// destaque único — dois eixos no mesmo parâmetro se sobrescreveriam, e a combinação
// ("destaque único ligado E leitor já assinante") é justamente o que se revisa.
//
// Só faz sentido com `?logado=true`: deslogado o banner leva ao formulário público e
// não tem estado de assinatura para variar (ver src/lib/use-assinar-newsletter.ts).
import type { ScenarioAxis } from '~/dev/scenario-store'
import { NEWSLETTER_SCENARIO, NEWSLETTER_SCENARIO_PARAM } from '~/lib/use-assinar-newsletter'

export function newsletterAxis(value: string): ScenarioAxis {
	return {
		param: NEWSLETTER_SCENARIO_PARAM,
		label: 'Newsletter',
		value,
		defaultValue: NEWSLETTER_SCENARIO.naoAssinante,
		options: [
			{ value: NEWSLETTER_SCENARIO.naoAssinante, label: 'Não assinante' },
			{ value: NEWSLETTER_SCENARIO.assinante, label: 'Já assinante' },
			{ value: NEWSLETTER_SCENARIO.falha, label: 'Erro ao assinar' },
		],
	}
}

/** Valor do eixo lido da URL, com fallback para o default quando `?newsletter=` é lixo. */
export function newsletterAxisValue(raw: string | null): string {
	const known: string[] = Object.values(NEWSLETTER_SCENARIO)
	return raw && known.includes(raw) ? raw : NEWSLETTER_SCENARIO.naoAssinante
}
