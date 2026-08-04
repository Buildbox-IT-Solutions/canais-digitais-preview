// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver Router em src/router.tsx).
//
// Fica montada como irmã do <RouterProvider> (ver Router()), fora da árvore
// roteada — por isso usa window.location/history direto em vez de
// useSearchParams do react-router, que exige contexto de <Router>.
import { useEffect, useState, useSyncExternalStore } from 'react'
import { getActiveScenarios, subscribeScenarios } from './scenario-store'

// Fica acima de qualquer overlay do produto (modal, drawer, bottom sheet, toast).
const Z_INDEX = 999999

function isTypingTarget(el: Element | null): boolean {
	if (!el) return false
	const tag = el.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
	return el instanceof HTMLElement && el.isContentEditable
}

export function ScenarioBar() {
	const scenarios = useSyncExternalStore(subscribeScenarios, getActiveScenarios, getActiveScenarios)

	const [params, setParams] = useState(() => new URLSearchParams(window.location.search))
	const [manuallyHidden, setManuallyHidden] = useState(() => params.get('ui') === '0')

	// A URL só muda hoje via navegação de página inteira (padrão do app inteiro —
	// nenhuma tela usa <Link> do SPA) — reler no popstate cobre voltar/avançar.
	useEffect(() => {
		function onPopState() {
			setParams(new URLSearchParams(window.location.search))
		}
		window.addEventListener('popstate', onPopState)
		return () => window.removeEventListener('popstate', onPopState)
	}, [])

	const eligible = import.meta.env.DEV || params.get('dev') === '1'
	const visible = eligible && !manuallyHidden && scenarios.length > 0

	const activeId = (() => {
		const current = params.get('cenario')
		if (current && scenarios.some((s) => s.id === current)) return current
		return scenarios[0]?.id ?? ''
	})()

	// Navegação de página inteira (replace) — mesmo modelo do resto do app, que
	// não usa <Link> do SPA em lugar nenhum. "replace" pra não empilhar no histórico.
	function selectScenario(id: string) {
		const scenario = scenarios.find((s) => s.id === id)
		const next = new URLSearchParams(window.location.search)
		next.set('cenario', id)
		if (scenario?.tab) next.set('tab', scenario.tab)
		const url = `${window.location.pathname}?${next.toString()}`
		window.location.replace(url)
	}

	// Atalhos só existem enquanto elegível — em produção sem ?dev=1 o componente
	// nem chega a montar este efeito, então não há como invocar a barra por teclado.
	useEffect(() => {
		if (!eligible) return

		function onKeyDown(e: KeyboardEvent) {
			if (!e.altKey || isTypingTarget(document.activeElement)) return

			if (e.key === '0') {
				e.preventDefault()
				setManuallyHidden((v) => !v)
				return
			}

			if ((e.key === '.' || e.key === ',') && scenarios.length > 0) {
				e.preventDefault()
				const ids = scenarios.map((s) => s.id)
				const currentIndex = Math.max(0, ids.indexOf(activeId))
				const delta = e.key === '.' ? 1 : -1
				const nextIndex = (currentIndex + delta + ids.length) % ids.length
				selectScenario(ids[nextIndex])
			}
		}

		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [eligible, scenarios, activeId])

	if (!visible) return null

	const groups = new Map<string, typeof scenarios>()
	for (const scenario of scenarios) {
		const list = groups.get(scenario.group) ?? []
		list.push(scenario)
		groups.set(scenario.group, list)
	}

	return (
		<div
			style={{
				position: 'fixed',
				left: 8,
				bottom: 'calc(8px + env(safe-area-inset-bottom))',
				zIndex: Z_INDEX,
				display: 'flex',
				alignItems: 'center',
				gap: 6,
				height: 30,
				padding: '0 10px',
				borderRadius: 7,
				background: '#1c1c1e',
				color: '#e5e5e5',
				fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				fontSize: 11,
				lineHeight: 1,
				pointerEvents: 'auto',
			}}
		>
			<label htmlFor="scenario-bar-select" style={{ color: '#8e8e93', whiteSpace: 'nowrap' }}>
				cenário
			</label>
			<select
				id="scenario-bar-select"
				aria-label="Cenário de teste"
				value={activeId}
				onChange={(e) => selectScenario(e.target.value)}
				style={{
					background: 'transparent',
					color: '#e5e5e5',
					border: '1px solid #3a3a3c',
					borderRadius: 4,
					fontFamily: 'inherit',
					fontSize: 11,
					padding: '2px 4px',
					maxWidth: 200,
				}}
			>
				{[...groups.entries()].map(([group, items]) => (
					<optgroup key={group} label={group}>
						{items.map((s) => (
							<option key={s.id} value={s.id}>
								{s.label}
							</option>
						))}
					</optgroup>
				))}
			</select>
		</div>
	)
}
