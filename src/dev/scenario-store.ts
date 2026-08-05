// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver Router em src/router.tsx).

export interface ScenarioDef {
	id: string
	label: string
	group: string
	/** Se presente, selecionar este cenário também navega para essa aba (?tab=). */
	tab?: string
	/** Estado "populado"/default do grupo — sem valor de cenario próprio. Selecionar
	 * remove `?cenario=` da URL em vez de gravar `id`. */
	isDefault?: boolean
}

type Listener = () => void

let scenarios: ScenarioDef[] = []
let listeners: Listener[] = []

function emit() {
	for (const listener of listeners) listener()
}

/** Chamado pelo hook `useScenarios` — nunca direto por uma tela. */
export function setActiveScenarios(next: ScenarioDef[]): void {
	scenarios = next
	emit()
}

export function getActiveScenarios(): ScenarioDef[] {
	return scenarios
}

export function subscribeScenarios(listener: Listener): () => void {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter((l) => l !== listener)
	}
}
