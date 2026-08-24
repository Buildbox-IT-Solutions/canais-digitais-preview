import { Badge } from '~/components/badge'

/**
 * Tela: /ds (índice) — página de entrada do Design System, não catálogo.
 * Conteúdo institucional sobre a documentação em si (para quem é, como usar,
 * o que cada status significa) — não documentação de nenhum componente.
 */
export default function DsIntroScreen() {
	return (
		<div className="flex flex-col gap-12">
			<header className="flex flex-col gap-4">
				<h1 className="font-display font-bold text-display-sm text-primary-600">Design System</h1>
				<p className="font-body text-body-lg text-neutral-900 max-w-2xl">
					Reprodução fiel do Figma em React — a fonte da verdade visual dos Canais Digitais. Esta
					página documenta o comportamento e o contrato de saída de cada fundamento e componente,
					para dois consumidores com necessidades diferentes.
				</p>
			</header>

			<section className="flex flex-col gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600">Para quem é isto</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="bg-white border border-neutral-100 rounded-lg p-5 flex flex-col gap-2">
						<p className="font-body font-bold text-title-md text-neutral-900">Design</p>
						<p className="font-body text-body-md text-neutral-700">
							O racional por trás de cada decisão de token e fundamento — por que essa escala, por
							que essa exclusão. Seções "O que é e por quê" e "Decisões e histórico" nas páginas de
							foundation.
						</p>
					</div>
					<div className="bg-white border border-neutral-100 rounded-lg p-5 flex flex-col gap-2">
						<p className="font-body font-bold text-title-md text-neutral-900">Back-end (WordPress/PHP)</p>
						<p className="font-body text-body-md text-neutral-700">
							Valores, tokens e o contrato de saída exato (HTML alvo, classes, props) para
							reimplementar o mesmo comportamento em outra stack, sem precisar perguntar ao
							designer nem ler o React.
						</p>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600">Como usar a documentação</h2>
				<div className="overflow-x-auto border border-neutral-100 rounded-lg">
					<table className="w-full border-collapse font-body text-body-sm">
						<thead className="bg-neutral-50">
							<tr>
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
									Pasta
								</th>
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
									Direção
								</th>
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
									Consumidor
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">
									<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
										src/
									</code>
								</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">Fonte da verdade</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">Quem implementa neste repo</td>
							</tr>
							<tr>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">
									<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
										figma-specs/
									</code>
								</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">Figma → código (entrada)</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">Quem implementa neste repo</td>
							</tr>
							<tr>
								<td className="px-3 py-2 text-neutral-700">
									<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
										ds/
									</code>
								</td>
								<td className="px-3 py-2 text-neutral-700">Código → handoff (saída)</td>
								<td className="px-3 py-2 text-neutral-700">Time de back-end WordPress</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p className="font-body text-body-md text-neutral-700">
					Quando código e Figma divergirem, o código ganha — o repositório define comportamento, o
					Figma define aparência. Esta página (<code className="bg-white border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">/ds</code>) lê e
					renderiza o markdown de <code className="bg-white border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">ds/</code> — nunca duplica o conteúdo.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600">Storybook vs. /ds</h2>
				<div className="overflow-x-auto border border-neutral-100 rounded-lg">
					<table className="w-full border-collapse font-body text-body-sm">
						<thead className="bg-neutral-50">
							<tr>
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900" />
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
									Storybook
								</th>
								<th className="text-left border-b border-neutral-100 px-3 py-2 font-body font-semibold text-label-md text-neutral-900">
									/ds
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border-b border-neutral-100 px-3 py-2 font-semibold text-neutral-900">Mostra</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">Variantes visuais isoladas</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">
									Comportamento, racional e contrato de saída
								</td>
							</tr>
							<tr>
								<td className="border-b border-neutral-100 px-3 py-2 font-semibold text-neutral-900">Fonte</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">
									<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
										*.stories.tsx
									</code>
								</td>
								<td className="border-b border-neutral-100 px-3 py-2 text-neutral-700">
									<code className="bg-neutral-50 border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">
										ds/*.md
									</code>
								</td>
							</tr>
							<tr>
								<td className="px-3 py-2 font-semibold text-neutral-900">Responde</td>
								<td className="px-3 py-2 text-neutral-700">"Como fica esta variante?"</td>
								<td className="px-3 py-2 text-neutral-700">"O que preciso saber para reimplementar?"</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600">O que significa cada status</h2>
				<div className="flex flex-col gap-3">
					<div className="flex items-start gap-3">
						<Badge label="Documentado" tone="mint" className="shrink-0 mt-0.5" />
						<p className="font-body text-body-md text-neutral-700">
							Tem página com conteúdo em <code className="bg-white border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">ds/</code>. Aparece na sidebar como link.
						</p>
					</div>
					<div className="flex items-start gap-3">
						<span className="shrink-0 mt-0.5 font-body text-label-sm text-neutral-400">· em breve</span>
						<p className="font-body text-body-md text-neutral-700">
							Faz parte do catálogo, mas ainda não tem doc — sem arquivo em <code className="bg-white border border-neutral-100 rounded-xs px-1.5 py-0.5 font-body text-label-md text-primary-600">ds/</code>. Visível na sidebar, desabilitado.
						</p>
					</div>
					<div className="flex items-start gap-3">
						<span className="shrink-0 mt-0.5 font-body text-label-sm text-neutral-400">· bloqueado</span>
						<p className="font-body text-body-md text-neutral-700">
							Depende de uma decisão de design ainda não tomada. O motivo aparece ao passar o mouse
							sobre o item na sidebar.
						</p>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600">Duas marcações dentro das páginas</h2>
				<div className="flex flex-col gap-3">
					<p className="flex items-start gap-2 border rounded-lg px-4 py-3 font-body font-semibold text-body-md my-0 bg-coral-light border-coral/40 text-neutral-900">
						🔴 A CONFIRMAR — existe no código ou no Figma, falta descrever. Pergunta para o
						designer responder.
					</p>
					<p className="flex items-start gap-2 border rounded-lg px-4 py-3 font-body font-semibold text-body-md my-0 bg-saffron/10 border-saffron/40 text-neutral-900">
						⚠️ DECISÃO PENDENTE — não existe decisão ainda. Trabalho de design a fazer antes de a
						doc poder afirmar algo.
					</p>
				</div>
			</section>
		</div>
	)
}
