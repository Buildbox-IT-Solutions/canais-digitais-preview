// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver Router em src/router.tsx).

/** Uma opção de um eixo. `value` é o que vai pra URL; `label` é o que o revisor lê. */
export interface ScenarioOption {
	value: string
	label: string
}

/**
 * Um eixo de cenário — uma dimensão independente do estado da tela, com seu próprio
 * parâmetro de URL e seu próprio seletor na ScenarioBar.
 *
 * Cenários que se acumulam (ex.: passo do cadastro × erro exibido) são **dois eixos**,
 * não um produto cartesiano de ids num eixo só: 4 passos × 5 erros dariam 20 opções
 * numa lista, e o revisor perderia de vista qual combinação está vendo.
 */
export interface ScenarioAxis {
	/** Parâmetro de URL que este eixo controla. Único dentro de uma tela. */
	param: string
	/** Rótulo do seletor. */
	label: string
	options: ScenarioOption[]
	/** Valor atual, já resolvido pela tela (com o fallback dela aplicado). */
	value: string
	/**
	 * Valor que representa o estado normal da tela. Selecionar remove o parâmetro da
	 * URL em vez de gravá-lo — sem isso não haveria como voltar ao link limpo.
	 */
	defaultValue?: string
	/**
	 * Parâmetros removidos junto quando este eixo muda, porque perdem sentido
	 * (ex.: `error` é específico do `step` no cadastro).
	 */
	clears?: string[]
}

type Listener = () => void

let axes: ScenarioAxis[] = []
let listeners: Listener[] = []

function emit() {
	for (const listener of listeners) listener()
}

/** Chamado pelo hook `useScenarios` — nunca direto por uma tela. */
export function setActiveAxes(next: ScenarioAxis[]): void {
	axes = next
	emit()
}

export function getActiveAxes(): ScenarioAxis[] {
	return axes
}

export function subscribeAxes(listener: Listener): () => void {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter((l) => l !== listener)
	}
}
