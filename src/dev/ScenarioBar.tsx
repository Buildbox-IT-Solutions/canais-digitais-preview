// PROVISÓRIO — será substituído pelo Handoff Tour.
// Não importar deste diretório fora do shell (ver RootLayout em src/router.tsx).
//
// Único mecanismo de cenários do protótipo. Até 27/08/2026 conviviam dois: esta barra
// (atrás de ?dev=1) e o `AuthDevNav`, uma fileira de pílulas <a href> só nas telas de
// auth. Duas UIs, dois vocabulários e um deles invisível no link que o revisor recebia.
//
// Montada dentro de RootLayout (irmã de <Outlet />), por isso tem contexto de <Router>
// e pode usar useSearchParams — troca de cenário é navegação client-side
// (setSearchParams), não reload: preserva scroll e o estado local da tela.
//
// Aparece sempre que a tela registra eixos — sem gate de ambiente. O protótipo existe
// para ser revisado, e cenário que só o dev alcança é cenário que ninguém revisa.
// Para um screenshot limpo: ?ui=0 (ou Alt+0).
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router'
import { getActiveAxes, subscribeAxes, type ScenarioAxis } from './scenario-store'

// Fica acima de qualquer overlay do produto (modal, drawer, bottom sheet, toast).
const Z_INDEX = 999999

const COLLAPSED_KEY = 'cd-scenario-bar-collapsed'

// Cores fixas, fora do @theme, e monospace: a barra não é produto e não deve ser
// confundida com ele numa captura de tela enviada pra aprovação.
const INK = '#e5e5e5'
const MUTED = '#8e8e93'
const SURFACE = '#1c1c1e'
const BORDER = '#3a3a3c'

// Atalhos continuam ativos com foco dentro da própria barra (ex.: num <select>) — só
// ficam inertes em campos de formulário do resto da aplicação.
function isTypingTarget(el: Element | null, barEl: HTMLElement | null): boolean {
	if (!el) return false
	if (barEl?.contains(el)) return false
	const tag = el.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
	return el instanceof HTMLElement && el.isContentEditable
}

function readCollapsed(): boolean {
	// Expandida na primeira visita: colapsada por padrão, o revisor não descobre que a
	// tela tem cenários. A escolha dele persiste daí em diante.
	try {
		return localStorage.getItem(COLLAPSED_KEY) === '1'
	} catch {
		return false
	}
}

function writeCollapsed(value: boolean): void {
	try {
		localStorage.setItem(COLLAPSED_KEY, value ? '1' : '0')
	} catch {
		// Modo privado / storage bloqueado: a barra segue funcionando sem lembrar o estado.
	}
}

export function ScenarioBar() {
	const axes = useSyncExternalStore(subscribeAxes, getActiveAxes, getActiveAxes)
	const [params, setSearchParams] = useSearchParams()
	const containerRef = useRef<HTMLDivElement>(null)

	const [hidden, setHidden] = useState(() => params.get('ui') === '0')
	const [collapsed, setCollapsed] = useState(readCollapsed)

	function toggleCollapsed() {
		setCollapsed((v) => {
			writeCollapsed(!v)
			return !v
		})
	}

	// Client-side (mesma navegação que o resto da tela usa): preserva scroll e não
	// recarrega o documento. "replace" pra não empilhar no histórico — o botão voltar do
	// navegador não deve percorrer trocas de cenário.
	//
	// Escreve por merge no que já está na URL, então parâmetros de contexto (?email=,
	// ?returnTo=, ?intent=, ?tab=) sobrevivem sem cada tela ter de repeti-los.
	function select(axis: ScenarioAxis, value: string) {
		const next = new URLSearchParams(params)
		if (value === axis.defaultValue) {
			next.delete(axis.param)
		} else {
			next.set(axis.param, value)
		}
		for (const param of axis.clears ?? []) {
			if (param !== axis.param) next.delete(param)
		}
		setSearchParams(next, { replace: true })
	}

	// Alt+. / Alt+, percorrem o primeiro eixo — é o eixo "principal" da tela (passo do
	// cadastro, estado do fluxo), o que se quer atravessar numa demonstração.
	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (!e.altKey || isTypingTarget(document.activeElement, containerRef.current)) return

			if (e.key === '0') {
				e.preventDefault()
				setHidden((v) => !v)
				return
			}

			const axis = axes[0]
			if ((e.key === '.' || e.key === ',') && axis) {
				e.preventDefault()
				const values = axis.options.map((o) => o.value)
				const currentIndex = Math.max(0, values.indexOf(axis.value))
				const delta = e.key === '.' ? 1 : -1
				select(axis, values[(currentIndex + delta + values.length) % values.length])
			}
		}

		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [axes, params])

	if (hidden || axes.length === 0) return null

	return (
		<div
			ref={containerRef}
			style={{
				position: 'fixed',
				left: 8,
				bottom: 'calc(8px + env(safe-area-inset-bottom))',
				zIndex: Z_INDEX,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: 6,
				fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				fontSize: 11,
				lineHeight: 1.2,
				pointerEvents: 'auto',
			}}
		>
			{collapsed ? null : (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 8,
						padding: 10,
						borderRadius: 7,
						background: SURFACE,
						color: INK,
						boxShadow: '0 8px 24px rgba(0,0,0,.35)',
						maxWidth: 260,
					}}
				>
					{axes.map((axis) => {
						const selectId = `scenario-axis-${axis.param}`
						return (
							<div key={axis.param} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
								<label htmlFor={selectId} style={{ color: MUTED }}>
									{axis.label}
								</label>
								<select
									id={selectId}
									value={axis.value}
									onChange={(e) => select(axis, e.target.value)}
									style={{
										background: 'transparent',
										color: INK,
										border: `1px solid ${BORDER}`,
										borderRadius: 4,
										fontFamily: 'inherit',
										fontSize: 11,
										padding: '3px 4px',
										width: '100%',
									}}
								>
									{axis.options.map((o) => (
										<option key={o.value} value={o.value} style={{ background: SURFACE, color: INK }}>
											{o.label}
										</option>
									))}
								</select>
							</div>
						)
					})}
				</div>
			)}

			<button
				type="button"
				onClick={toggleCollapsed}
				aria-expanded={!collapsed}
				title="Cenários de teste — Alt+0 esconde a barra, Alt+. percorre o primeiro eixo"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 6,
					height: 26,
					padding: '0 10px',
					borderRadius: 7,
					border: 'none',
					background: SURFACE,
					color: INK,
					fontFamily: 'inherit',
					fontSize: 10,
					letterSpacing: '.08em',
					cursor: 'pointer',
				}}
			>
				{/* Sliders desenhado à mão em vez de <Icon>: dev chrome não puxa componente de
				    produto, e Material Symbols é a fonte canônica só para o que é produto. */}
				<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
					<rect x="0" y="1.6" width="12" height="0.8" />
					<rect x="0" y="5.6" width="12" height="0.8" />
					<rect x="0" y="9.6" width="12" height="0.8" />
					<circle cx="3.5" cy="2" r="1.7" />
					<circle cx="8.5" cy="6" r="1.7" />
					<circle cx="5" cy="10" r="1.7" />
				</svg>
				CENÁRIOS
			</button>
		</div>
	)
}
