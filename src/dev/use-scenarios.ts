// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver Router em src/router.tsx).
import { useEffect } from 'react'
import { setActiveScenarios, type ScenarioDef } from './scenario-store'

/**
 * Declara os cenários de teste da tela atual — a ScenarioBar só lê o que foi
 * registrado aqui, nunca o inverso. Limpa o registro ao desmontar/trocar de tela.
 */
export function useScenarios(scenarios: ScenarioDef[]): void {
	useEffect(() => {
		setActiveScenarios(scenarios)
		return () => setActiveScenarios([])
	}, [scenarios])
}
