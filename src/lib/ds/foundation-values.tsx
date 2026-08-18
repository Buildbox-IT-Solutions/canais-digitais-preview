import { useEffect, useState } from 'react'
import indexCssRaw from '~/index.css?raw'
import { probeComputedStyle } from './probe'
import {
	fontClassForLevel,
	groupColorTokens,
	parseThemeTokens,
	typographyLevels,
} from './theme-tokens'

const tokens = parseThemeTokens(indexCssRaw)

function ValueRow({ label, sample, detail }: { label: string; sample: React.ReactNode; detail: string }) {
	return (
		<div className="flex items-center gap-4 py-2 border-b border-neutral-100 last:border-b-0">
			<div className="shrink-0">{sample}</div>
			<div className="flex-1 min-w-0">
				<p className="font-body font-semibold text-label-md text-neutral-900">{label}</p>
				<p className="font-body text-label-sm text-neutral-500">{detail}</p>
			</div>
		</div>
	)
}

/**
 * O Tailwind v4 só emite a variável de um token @theme customizado se alguma
 * classe que a usa (ex. `bg-danger-950`) aparecer em algum arquivo escaneado.
 * Um token declarado mas nunca consumido some do CSS compilado — a swatch
 * mostra isso como "sem uso" em vez de fingir uma cor que não existe.
 */
function useResolvedVars(names: string[]): Record<string, string> {
	const [resolved, setResolved] = useState<Record<string, string>>({})
	useEffect(() => {
		const cs = getComputedStyle(document.documentElement)
		setResolved(Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()])))
	}, [names.join(',')])
	return resolved
}

export function CorValues() {
	const groups = groupColorTokens(tokens)
	const allNames = groups.flatMap((g) => g.swatches.map((s) => s.name))
	const resolved = useResolvedVars(allNames)

	return (
		<div className="flex flex-col gap-6">
			{groups.map((group) => (
				<div key={group.family}>
					<p className="font-body font-semibold text-label-md text-neutral-900 mb-2">{group.family}</p>
					<div className="flex flex-wrap gap-3">
						{group.swatches.map((s) => {
							const value = resolved[s.name]
							const isUnused = value === ''
							return (
								<div key={s.name} className="flex flex-col items-center gap-1 w-20">
									<div
										className={
											isUnused
												? 'size-12 rounded-lg border border-dashed border-neutral-300 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,var(--color-neutral-100)_4px,var(--color-neutral-100)_5px)]'
												: 'size-12 rounded-lg border border-neutral-100'
										}
										style={isUnused ? undefined : { background: `var(${s.name})` }}
										title={isUnused ? `${s.name} — token declarado, sem classe usando ainda` : s.name}
									/>
									<code className="font-body text-label-sm text-neutral-500 text-center break-all">
										{s.shade ?? s.name.replace('--color-', '')}
									</code>
								</div>
							)
						})}
					</div>
				</div>
			))}
		</div>
	)
}

export function TipografiaValues() {
	const levels = typographyLevels(tokens)

	return (
		<div className="flex flex-col">
			{levels.map((level) => {
				const fontClass = fontClassForLevel(level.name)
				return (
					<ValueRow
						key={level.name}
						label={`--text-${level.name}`}
						detail={`${level.size}${level.lineHeight ? ` · lh ${level.lineHeight}` : ''}${
							level.letterSpacing ? ` · ls ${level.letterSpacing}` : ''
						} · ${fontClass}`}
						sample={
							<span className={`${fontClass} text-${level.name} text-neutral-900 whitespace-nowrap`}>Aa</span>
						}
					/>
				)
			})}
		</div>
	)
}

function useProbe(className: string, prop: string): string {
	const [value, setValue] = useState('')
	useEffect(() => {
		setValue(probeComputedStyle(className, prop))
	}, [className, prop])
	return value
}

const RADIUS_CLASSES = ['rounded-xs', 'rounded-sm', 'rounded-lg', 'rounded-2xl', 'rounded-full']

function RadiusRow({ cls }: { cls: string }) {
	const raw = useProbe(cls, 'border-radius')
	// `rounded-full` é `calc(infinity * 1px)` no Tailwind v4 — o navegador resolve isso
	// para um número gigante, não "50%"; mostrar o número bruto confundiria mais do que ajudaria.
	const isEffectivelyInfinite = raw !== '' && Number(raw.replace('px', '')) > 100000
	const detail = isEffectivelyInfinite ? 'totalmente arredondado' : raw || '…'
	return (
		<ValueRow
			label={cls}
			detail={detail}
			sample={<div className={`size-12 bg-primary-100 border border-primary-200 ${cls}`} />}
		/>
	)
}

export function RadiusValues() {
	return (
		<div className="flex flex-col">
			{RADIUS_CLASSES.map((cls) => (
				<RadiusRow key={cls} cls={cls} />
			))}
		</div>
	)
}

const SHADOW_CLASSES = ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']

/** `box-shadow` computado vem como 4-5 camadas rgba encadeadas — conta quantas
 * camadas têm para não despejar a string inteira, que é ilegível. */
function summarizeShadow(value: string): string {
	if (!value) return '…'
	const layers = value
		.split(/,(?![^(]*\))/g)
		.map((l) => l.trim())
		.filter((l) => !l.startsWith('rgba(0, 0, 0, 0)'))
	if (!layers.length) return 'nenhuma'

	const offsets = layers[layers.length - 1].match(/-?\d+px/g) ?? []
	const [, , blur, spread] = offsets
	return `${layers.length} camada${layers.length === 1 ? '' : 's'} · blur ${blur ?? '0px'} · spread ${spread ?? '0px'}`
}

function ShadowRow({ cls }: { cls: string }) {
	const raw = useProbe(cls, 'box-shadow')
	return (
		<ValueRow
			label={cls}
			detail={summarizeShadow(raw)}
			sample={
				<div className="size-12 rounded-lg bg-neutral-50 flex items-center justify-center">
					<div className={`size-8 bg-white rounded-lg ${cls}`} />
				</div>
			}
		/>
	)
}

export function ElevacaoValues() {
	return (
		<div className="flex flex-col gap-1 p-2">
			{SHADOW_CLASSES.map((cls) => (
				<ShadowRow key={cls} cls={cls} />
			))}
		</div>
	)
}

export function StateLayersValues() {
	const hover = useProbe('bg-black/8', 'background-color')
	const scrim = useProbe('bg-black/20', 'background-color')

	return (
		<div className="flex flex-col">
			<ValueRow
				label="bg-black/8 — hover/press"
				detail={hover || '…'}
				sample={<div className="size-12 rounded-lg bg-primary-600 relative overflow-hidden"><div className="absolute inset-0 bg-black/8" /></div>}
			/>
			<ValueRow
				label="bg-black/20 — scrim/overlay"
				detail={scrim || '…'}
				sample={<div className="size-12 rounded-lg bg-primary-600 relative overflow-hidden"><div className="absolute inset-0 bg-black/20" /></div>}
			/>
		</div>
	)
}

export const FOUNDATION_VALUES: Record<string, () => React.ReactElement> = {
	cor: CorValues,
	tipografia: TipografiaValues,
	radius: RadiusValues,
	elevacao: ElevacaoValues,
	'state-layers': StateLayersValues,
}
