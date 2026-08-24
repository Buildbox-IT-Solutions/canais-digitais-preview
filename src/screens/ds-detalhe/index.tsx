import { useParams } from 'react-router'
import { Badge } from '~/components/badge'
import type { BadgeTone } from '~/components/badge/types'
import { getFoundationEntry } from '~/lib/ds/foundation-registry'
import { getComponentEntry } from '~/lib/ds/component-registry'
import { humanizeSlug } from '~/lib/ds/catalog'
import { DsMarkdown, splitBeforeHeading } from '~/lib/ds/markdown'
import { FOUNDATION_VALUES } from '~/lib/ds/foundation-values'
import { COMPONENT_EXAMPLES } from '~/lib/ds/component-examples'
import type { DsStatus } from '~/lib/ds/status'

/**
 * Tela: /ds/:slug — página de foundation ou de componente do catálogo curado.
 * Markdown é a fonte da verdade; esta tela só lê ds/foundations/*.md ou
 * ds/componentes/*.md (via os registries) e renderiza. Não duplica conteúdo.
 * O chrome de navegação (sidebar) vive em src/screens/ds/index.tsx, layout pai.
 */

const STATUS_META: Record<DsStatus, { label: string; tone: BadgeTone }> = {
	documentado: { label: 'Documentado', tone: 'mint' },
	bloqueado: { label: 'Bloqueado', tone: 'coral' },
	'em-breve': { label: 'Em breve', tone: 'neutral' },
}

function BlockedOrPending({ title, status, motivo }: { title: string; status: DsStatus; motivo?: string }) {
	const meta = STATUS_META[status]
	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-display font-bold text-display-sm text-primary-600">{title}</h1>
			<div className="bg-white border border-neutral-100 rounded-lg p-6 flex flex-col gap-3 w-fit min-w-80">
				<Badge label={meta.label} tone={meta.tone} className="w-fit" />
				<p className="font-body text-body-md text-neutral-700">
					{motivo ?? 'Ainda não tem documentação — sem arquivo em docs/.'}
				</p>
			</div>
		</div>
	)
}

export default function DsDetalheScreen() {
	const { slug = '' } = useParams()

	const foundation = getFoundationEntry(slug)
	if (foundation) {
		if (foundation.status !== 'documentado' || !foundation.content) {
			return <BlockedOrPending title={foundation.label} status={foundation.status} motivo={foundation.motivo} />
		}

		const [before, after] = splitBeforeHeading(foundation.content, '2. Valores')
		const [beforeUso, usoEDepois] = splitBeforeHeading(after, '3. Como usar')
		const ValuesBlock = FOUNDATION_VALUES[slug]

		return (
			<div className="flex flex-col gap-1">
				<h1 className="font-display font-bold text-display-sm text-primary-600 mb-2">{foundation.label}</h1>
				<Badge label="Documentado" tone="mint" className="mb-6 w-fit" />
				<DsMarkdown content={before} />
				{ValuesBlock ? (
					<section>
						<h2 className="font-display font-bold text-headline-sm text-primary-600 mt-8 mb-3 pb-2 border-b border-neutral-100">
							2. Valores
						</h2>
						<div className="bg-white border border-neutral-100 rounded-lg p-4">
							<ValuesBlock />
						</div>
					</section>
				) : (
					<DsMarkdown content={beforeUso} />
				)}
				<DsMarkdown content={usoEDepois} />
			</div>
		)
	}

	const component = getComponentEntry(slug)
	if (component) {
		if (component.status !== 'documentado' || !component.content) {
			return <BlockedOrPending title={humanizeSlug(slug)} status={component.status} motivo={component.motivo} />
		}

		const Example = COMPONENT_EXAMPLES[slug]

		return (
			<div className="flex flex-col gap-1">
				<h1 className="font-display font-bold text-display-sm text-primary-600 mb-2">{humanizeSlug(slug)}</h1>
				<Badge label="Documentado" tone="mint" className="mb-6 w-fit" />
				{Example ? (
					<section className="mb-8">
						<h2 className="font-display font-bold text-headline-sm text-primary-600 mb-3 pb-2 border-b border-neutral-100">
							Preview
						</h2>
						<div className="bg-white border border-neutral-100 rounded-lg p-8 flex items-center justify-center">
							<Example />
						</div>
					</section>
				) : null}
				<DsMarkdown content={component.content} />
			</div>
		)
	}

	return (
		<div className="bg-white border border-neutral-100 rounded-lg p-6">
			<p className="font-body text-body-md text-neutral-700">
				Nada em foundations ou componentes com o slug "{slug}" — fora do catálogo curado (ver
				src/lib/ds/catalog.ts).
			</p>
		</div>
	)
}
