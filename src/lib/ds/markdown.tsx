import { useState } from 'react'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

function flattenText(node: ReactNode): string {
	if (typeof node === 'string' || typeof node === 'number') return String(node)
	if (Array.isArray(node)) return node.map(flattenText).join('')
	if (node && typeof node === 'object' && 'props' in node) {
		return flattenText((node as { props: { children?: ReactNode } }).props.children)
	}
	return ''
}

function CodeBlock({ className, children }: { className?: string; children?: ReactNode }) {
	const [copied, setCopied] = useState(false)
	const code = flattenText(children).replace(/\n$/, '')
	const lang = /language-(\w+)/.exec(className ?? '')?.[1] ?? 'text'

	function handleCopy() {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		})
	}

	return (
		<div className="relative group my-4">
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity font-body font-semibold text-label-sm bg-neutral-900 text-white rounded-sm px-2 py-1"
			>
				{copied ? 'Copiado!' : 'Copiar'}
			</button>
			<SyntaxHighlighter
				language={lang}
				style={oneLight}
				customStyle={{
					borderRadius: '8px',
					fontSize: '13px',
					border: '1px solid var(--color-neutral-100)',
					margin: 0,
				}}
			>
				{code}
			</SyntaxHighlighter>
		</div>
	)
}

const CONFIRM_MARK = '🔴 A CONFIRMAR'
const PENDING_MARK = '⚠️ DECISÃO PENDENTE'

/**
 * Duas marcações distintas (regra do briefing):
 * - 🔴 A CONFIRMAR — existe no código/produto, falta descrever. Pergunta pro designer.
 * - ⚠️ DECISÃO PENDENTE — não existe ainda. Trabalho de design a fazer.
 * Ambas viram blockquote (`> marca — texto`) no markdown-fonte; aqui ganham estilo
 * próprio, distinguível de longe uma da outra e do blockquote comum.
 */
function markKind(text: string): 'confirm' | 'pending' | null {
	if (text.includes(CONFIRM_MARK)) return 'confirm'
	if (text.includes(PENDING_MARK)) return 'pending'
	return null
}

function Callout({ kind, children }: { kind: 'confirm' | 'pending'; children: ReactNode }) {
	const styles =
		kind === 'confirm'
			? 'bg-coral-light border-coral/40 text-neutral-900'
			: 'bg-saffron/10 border-saffron/40 text-neutral-900'
	return (
		<div className={`flex items-start gap-2 border rounded-lg px-4 py-3 font-body font-semibold text-body-md my-3 ${styles}`}>
			{children}
		</div>
	)
}

export function DsMarkdown({ content }: { content: string }) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				table: ({ children }) => (
					<div className="overflow-x-auto my-4 border border-neutral-100 rounded-lg">
						<table className="w-full border-collapse font-body text-body-sm">{children}</table>
					</div>
				),
				thead: ({ children }) => <thead className="bg-neutral-50">{children}</thead>,
				th: ({ children }) => (
					<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
						{children}
					</th>
				),
				td: ({ children }) => (
					<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700 align-top">{children}</td>
				),
				// `pre` só existe para código em bloco (```...```) na árvore do CommonMark — é aqui,
				// não no `code`, que se decide bloco vs. inline. Um fence sem linguagem ainda é bloco.
				pre: ({ children }) => {
					const codeEl = Array.isArray(children) ? children[0] : children
					if (codeEl && typeof codeEl === 'object' && 'props' in codeEl) {
						const { className, children: codeChildren } = (
							codeEl as { props: { className?: string; children?: ReactNode } }
						).props
						return <CodeBlock className={className}>{codeChildren}</CodeBlock>
					}
					return <pre>{children}</pre>
				},
				code: ({ children }) => (
					<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
						{children}
					</code>
				),
				// Marcadores sempre chegam via blockquote (`> marca — texto`) — ver renderer de
				// `blockquote` abaixo. Este `p` fica só com o caso comum, sem checar de novo.
				p: ({ children }) => <p className="font-body text-body-md text-neutral-700 my-3">{children}</p>,
				h2: ({ children }) => (
					<h2 className="font-display font-bold text-headline-sm text-primary-600 mt-8 mb-3 pb-2 border-b border-neutral-100">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="font-display font-bold text-title-lg text-neutral-900 mt-6 mb-2">{children}</h3>
				),
				ul: ({ children }) => <ul className="list-disc pl-5 flex flex-col gap-1 my-3">{children}</ul>,
				li: ({ children }) => <li className="font-body text-body-md text-neutral-700">{children}</li>,
				strong: ({ children }) => <strong className="font-bold text-neutral-900">{children}</strong>,
				// `> 🔴 A CONFIRMAR — ...` / `> ⚠️ DECISÃO PENDENTE — ...` chegam aqui como blockquote,
				// não como parágrafo solto — o callout substitui o blockquote em vez de aninhar dentro dele.
				blockquote: ({ children }) => {
					const kind = markKind(flattenText(children))
					if (kind) return <Callout kind={kind}>{children}</Callout>
					return (
						<blockquote className="border-l-4 border-secondary-500 bg-secondary-50/40 pl-4 py-2 my-4 font-body text-body-md text-neutral-700 italic">
							{children}
						</blockquote>
					)
				},
			}}
		>
			{content}
		</ReactMarkdown>
	)
}

/** Divide o markdown em [antes, a-partir-de] de um heading `## texto` — usado para
 * injetar o bloco "Valores" (gerado em código) entre as seções 1 e 3 da foundation. */
export function splitBeforeHeading(content: string, heading: string): [string, string] {
	const marker = `## ${heading}`
	const idx = content.indexOf(marker)
	if (idx === -1) return [content, '']
	return [content.slice(0, idx), content.slice(idx)]
}
