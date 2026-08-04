// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver RootLayout em src/router.tsx).
// Montada dentro de RootLayout (irmã de <Outlet />), por isso tem contexto de
// <Router> e pode usar useSearchParams normalmente — troca de cenário é uma
// navegação client-side (setSearchParams), não um reload de página.
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router'
import { getActiveScenarios, subscribeScenarios } from './scenario-store'

// Fica acima de qualquer overlay do produto (modal, drawer, bottom sheet, toast).
const Z_INDEX = 999999

// Atalhos continuam ativos com foco dentro da própria barra (ex.: no <select>) —
// só ficam inertes em campos de formulário do resto da aplicação.
function isTypingTarget(el: Element | null, barEl: HTMLElement | null): boolean {
	if (!el) return false
	if (barEl?.contains(el)) return false
	const tag = el.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
	return el instanceof HTMLElement && el.isContentEditable
}

export function ScenarioBar() {
	const scenarios = useSyncExternalStore(subscribeScenarios, getActiveScenarios, getActiveScenarios)
	const [params, setSearchParams] = useSearchParams()
	const containerRef = useRef<HTMLDivElement>(null)

	const [manuallyHidden, setManuallyHidden] = useState(() => params.get('ui') === '0')

	const eligible = import.meta.env.DEV || params.get('dev') === '1'
	const visible = eligible && !manuallyHidden && scenarios.length > 0

	const activeId = (() => {
		const current = params.get('cenario')
		if (current && scenarios.some((s) => s.id === current)) return current
		// Sem ?cenario=: se a aba atual tem um estado "Preenchido"/default registrado,
		// reflete ele no select em vez de cair sempre no primeiro item da lista.
		const effectiveTab = params.get('tab') ?? 'perfil'
		const defaultForTab = scenarios.find((s) => s.isDefault && s.tab === effectiveTab)
		return defaultForTab?.id ?? scenarios[0]?.id ?? ''
	})()

	// Client-side (mesma navegação que o resto da tela usa pra ?state=/?cenario=):
	// preserva scroll e não recarrega o documento. "replace" pra não empilhar no
	// histórico — o botão voltar do navegador não deve percorrer trocas de cenário.
	function selectScenario(id: string) {
		const scenario = scenarios.find((s) => s.id === id)
		const next = new URLSearchParams(params)
		// "Preenchido"/default não tem valor de cenario próprio — remove em vez de gravar,
		// senão não haveria como voltar ao estado normal sem editar a URL na mão.
		if (scenario?.isDefault) {
			next.delete('cenario')
		} else {
			next.set('cenario', id)
		}
		if (scenario?.tab) next.set('tab', scenario.tab)
		setSearchParams(next, { replace: true })
	}

	// Atalhos só existem enquanto elegível — em produção sem ?dev=1 o componente
	// nem chega a montar este efeito, então não há como invocar a barra por teclado.
	useEffect(() => {
		if (!eligible) return

		function onKeyDown(e: KeyboardEvent) {
			if (!e.altKey || isTypingTarget(document.activeElement, containerRef.current)) return

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
	}, [eligible, scenarios, activeId, params])

	if (!visible) return null

	const groups = new Map<string, typeof scenarios>()
	for (const scenario of scenarios) {
		const list = groups.get(scenario.group) ?? []
		list.push(scenario)
		groups.set(scenario.group, list)
	}

	return (
		<div
			ref={containerRef}
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
