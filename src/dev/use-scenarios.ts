// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver Router em src/router.tsx).
import { useEffect } from 'react'
import { setActiveAxes, type ScenarioAxis } from './scenario-store'

/**
 * Declara os eixos de cenário da tela atual — a ScenarioBar só lê o que foi registrado
 * aqui, nunca o inverso. Limpa o registro ao desmontar/trocar de tela.
 *
 * Uma tela renderizada como fundo de outra (ex.: `<HomeScreen />` atrás dos modais de
 * auth) deve passar `[]` nesse caso, senão sobrescreve os eixos de quem está na frente
 * — a ordem em que os efeitos de pai e filho rodam não é contrato de nada.
 */
export function useScenarios(axes: ScenarioAxis[]): void {
	// O `value` de cada eixo vem da URL, então os eixos são remontados a cada render e a
	// identidade do array não serve de dependência — comparamos o conteúdo.
	const key = JSON.stringify(axes)

	useEffect(() => {
		setActiveAxes(axes)
		return () => setActiveAxes([])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key])
}
