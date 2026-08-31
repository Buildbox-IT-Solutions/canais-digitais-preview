import { useEffect, useRef, useState } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { IconButton } from '~/components/icon-button'
import type { ILibCarouselProps } from './types'

/**
 * Componente: LibCarousel — trilho horizontal das seções da Biblioteca exclusiva.
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8458-115867
 * Tokens: --color-white (fundo das setas), sombra `shadow-md` (Elevation/1 do Figma)
 *
 * Anotação do Figma: "Setas de navegação aparecem com o mouseover em dispositivos com
 * mouse. Mobile é o carrossel clássico."
 *
 * As duas metades dessa frase viram coisas diferentes:
 *
 * - **"dispositivos com mouse"** é `hover-fine` (`@media (hover: hover) and (pointer:
 *   fine)`), o mesmo custom variant que os cards do portal já usam para o toggle de
 *   favoritar — NÃO é breakpoint de largura. Um tablet grande com touch não ganha setas;
 *   um notebook estreito ganha. Quem decide é o ponteiro, não a viewport.
 * - **"carrossel clássico"** é o que sobra quando as setas não existem: rolagem
 *   horizontal por arrasto, com `snap` nos cards. Isso está sempre ligado, inclusive sob
 *   as setas — elas são um atalho para quem tem mouse, não o único caminho.
 *
 * As setas somem nas pontas (`scrollLeft` no início/fim) em vez de ficarem desabilitadas:
 * seta cinza sobre a capa competiria com o conteúdo sem oferecer nada.
 *
 * Rolagem é por página (a largura visível do trilho), não por card: o card aberto tem
 * largura diferente do fechado, então "um card" não é uma distância estável.
 *
 * ## A largura do card é DERIVADA, não fixa — e é isso que garante o card cortado
 *
 * O trilho precisa terminar com um card visivelmente cortado: é o corte que diz "tem
 * mais, role para o lado". Com largura fixa (os 236px do Figma) esse corte vira **sobra
 * da divisão** — num container de 1232px sobravam 192px do quinto card, 81% dele. Não
 * lia como card cortado, lia como card estreito demais.
 *
 * Aqui a conta é ao contrário: **a espiada é fixa e a largura do card sai dela.**
 *
 *     card = (100% − espiada − colunas × gap) / colunas
 *
 * No container cheio (1232px, 4 colunas, gap 24, espiada 56) o card dá 270px e a espiada
 * fica em 21% dele — fração pequena o bastante para nunca ser confundida com um card
 * inteiro, grande o bastante para se ver que é conteúdo. Os degraus de coluna e de
 * espiada são escolhidos para essa proporção ficar entre 20% e 27% em toda a escala, de
 * 360px a 1920px, em vez de depender do resto da divisão.
 *
 * As medidas viram custom properties (`--lib-card`, `--lib-gap`) para os `<li>` e o card
 * aberto consumirem sem repetir a fórmula — o card aberto é `2 × card + gap`. **Para o
 * back-end: 236px não é a largura do card; é o valor que a fórmula devolvia na largura de
 * container do Figma.**
 *
 * ## Por que `100cqw` e não `100%`
 *
 * Custom property é substituída como TEXTO, não como valor já resolvido. Com `100%` na
 * fórmula, cada elemento que lesse `--lib-card` resolveria a porcentagem contra o PRÓPRIO
 * pai: no `<li>` dava certo (o pai é o trilho), mas na coluna da capa dentro do card
 * aberto o pai é o card, e a conta virava `(540 − 56 − 96) / 4 = 97px` — a capa
 * encolhia para um terço do tamanho.
 *
 * `cqw` resolve contra o container declarado, não contra o pai imediato. Com
 * `container-type: inline-size` no wrapper, `100cqw` é sempre a largura do trilho, e
 * `--lib-card` vira um comprimento absoluto que qualquer descendente pode ler sem
 * surpresa. **Para o back-end: a fórmula precisa de um ancestral de referência fixo; sem
 * isso ela dá resultados diferentes em cada nível de aninhamento.**
 */
export function LibCarousel({ children, ariaLabel, className }: ILibCarouselProps) {
	const trilhoRef = useRef<HTMLUListElement>(null)
	const [podeVoltar, setPodeVoltar] = useState(false)
	const [podeAvancar, setPodeAvancar] = useState(false)

	// Margem de 1px: `scrollWidth`/`clientWidth` são arredondados e a conta bate exata
	// com uma sobra fracionária, deixando a seta "avançar" acesa no fim do trilho.
	function medir() {
		const el = trilhoRef.current
		if (!el) return
		setPodeVoltar(el.scrollLeft > 1)
		setPodeAvancar(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
	}

	useEffect(() => {
		medir()
		const el = trilhoRef.current
		if (!el) return
		// ResizeObserver além do scroll: abrir um card muda o `scrollWidth` sem que
		// ninguém role, e sem isso a seta não reaparece.
		const observer = new ResizeObserver(medir)
		observer.observe(el)
		for (const filho of Array.from(el.children)) observer.observe(filho)
		return () => observer.disconnect()
	}, [children])

	function rolar(direcao: -1 | 1) {
		const el = trilhoRef.current
		if (!el) return
		el.scrollBy({ left: direcao * el.clientWidth, behavior: 'smooth' })
	}

	return (
		// `overflow-hidden` no wrapper e `min-w-0` são o que impede o trilho de esticar o
		// documento: sem eles o conteúdo do flex/grid ancestral cresce até caber os 12
		// cards e a PÁGINA inteira ganha barra horizontal, não o trilho.
		// `@container` (container-type: inline-size) é o ancestral de referência da fórmula
		// de largura — ver o bloco de doc.
		// `group/trilho` NOMEADO: o LibCard tem um `group/card` próprio para o hover do
		// título, e com dois grupos anônimos aninhados qualquer hover no trilho acendia o
		// título de TODOS os cards.
		<div
			className={twMerge(
				// `-mt-3` cancela, PARA FORA, o `py-3` que o trilho reserva para a sangria do
				// card expandido. Sem isso o consumidor declara `gap-4` entre o título da
				// seção e o trilho e recebe 28px (16 + 12) — o espaço que estava sobrando.
				// Assim o gap declarado é o gap visto.
				// SEM `overflow-hidden`: o `<ul>` abaixo se estende 12px à esquerda deste wrapper
				// para reservar espaço à sangria da moldura do card aberto, e clipar aqui mataria
				// justamente esses 12px. Quem rola é o `<ul>`, e à direita ele não passa da borda
				// deste wrapper — então nada disso gera barra de rolagem na página.
				'group/trilho @container -mt-3 w-full min-w-0',
				className,
			)}
		>
			{/* Wrapper INTERNO. Existe por dois motivos que se encaixam:
			    1. As variáveis de geometria precisam ficar AQUI, não no `<ul>`: as setas são
			       IRMÃS do `<ul>` e leem `--lib-card` para se posicionar. Declaradas no `<ul>`,
			       `var(--lib-card)` chegava INDEFINIDA na seta, o `calc()` do `top` ficava
			       inválido e a seta perdia o posicionamento (bug de 2026-08-31).
			    2. `--lib-card` usa `100cqw`, e unidade de container não pode ser resolvida no
			       próprio elemento que É o container — um elemento não consulta a si mesmo. Daí
			       o `@container` ficar no wrapper de fora e as variáveis aqui dentro. */}
			<div
				className={twMerge(
					'relative',
					'[--lib-gap:24px]',
					// A espiada é um pouco maior onde o card é mais largo em relação à tela, para a
					// proporção espiada/card ficar na mesma faixa (~20–27%) em todos os degraus.
					'[--lib-peek:64px] xl:[--lib-peek:56px]',
					// 3 colunas no lg e só 4 no xl: com 4 já em 1024px o card cairia para 206px,
					// mais estreito que os 236px do Figma.
					'[--lib-cols:1] sm:[--lib-cols:2] lg:[--lib-cols:3] xl:[--lib-cols:4]',
					'[--lib-card:calc((100cqw_-_var(--lib-peek)_-_var(--lib-cols)_*_var(--lib-gap))_/_var(--lib-cols))]',
				)}
			>
				<ul
				ref={trilhoRef}
				onScroll={medir}
				aria-label={ariaLabel}
				// A rolagem é DESTE elemento, nunca do documento. Sem sangria por margem
				// negativa: era ela que empurrava o trilho para fora do container e criava a
				// barra horizontal na página.
				//
				// `scrollbar-hide` (utilitário de src/index.css, o mesmo que a
				// Especialistas Section usa): a barra nativa fica visível o tempo todo em
				// macOS configurado para "sempre mostrar", e uma barra cinza atravessando a
				// seção lê como erro de layout. A rolagem continua inteira — arrasto, roda
				// horizontal, teclado e as setas.
				// `py-3` reserva a folga da moldura do card aberto, que senão seria recortada
				// pelo `overflow-hidden` do wrapper.
				className={twMerge(
					// `items-start`: o card expandido é mais alto que os fechados, e sem isso o
					// stretch do flex esticaria todos os vizinhos até a altura dele.
					'flex snap-x items-start overflow-x-auto scrollbar-hide py-3',
					// ── ONDE O TRILHO É RECORTADO ──
					// Na borda do CONTAINER INVISÍVEL, não na borda do box do consumidor: depois do
					// card cortado o padding lateral continua visível. Regra dada pelo Pedro em
					// 2026-08-31, com meclivros.mec.gov.br como referência — "a sangria não se dá
					// exatamente nas bordas do box e sim nas bordas de container invisível (mostra
					// o padding lateral)".
					//
					// **Quem consome não deve alargar o trilho por cima do próprio padding.** Era
					// isso que o painel da home fazia (`-mr-6 lg:-mr-10`, do tamanho exato do
					// padding) e era o defeito: o card cortado morria rente à borda do box azul,
					// sem nenhuma folga depois dele. O `LibCarousel` entra sem className de
					// largura, e o recorte sai certo de graça.
					//
					// ── ESPAÇO PARA A SANGRIA DA MOLDURA DO CARD ABERTO ──
					// A moldura cresce 12px para fora do card (ver LibCard). Num carrossel isso NÃO
					// funciona de graça: `scrollLeft` não vai a negativo, então 12px à esquerda do
					// primeiro item são inalcançáveis, e depois do último item não existe nada além
					// do fim do conteúdo. Era o bug das duas pontas.
					//
					// `px-3` reserva os 12px DENTRO do scroller: padding entra no `scrollWidth`, e
					// `overflow` recorta na PADDING box — então ele não reduz a área visível no meio
					// da rolagem e a espiada do próximo card continua intacta. No fim da rolagem o
					// conteúdo para 12px antes da borda e a moldura do último card encosta nela,
					// inteira. `-ml-3` mais 12px de largura extra devolvem o padding esquerdo para
					// fora, para a primeira capa seguir alinhada com o título da seção.
					// `scroll-px-3` casando com o `px-3` é obrigatório, não enfeite: sem ele o
					// scroll-snap alinha o `snap-start` do primeiro item à borda do scrollport e
					// COME o padding — o navegador entra com `scrollLeft: 12` e a primeira capa
					// volta a desalinhar do título. Com o scroll-padding declarado, o snap em
					// `scrollLeft: 0` já é a posição correta.
					//
					// O `-ml-3` faz o recorte esquerdo cair 12px DENTRO do padding, e não rente a
					// ele. É o único jeito de as duas coisas conviverem: sem ele, a moldura do
					// primeiro card aberto é decepada rente à borda (medido em 2026-08-31 —
					// moldura em 101 contra recorte em 113) e o card aberto fica sem padding de um
					// lado só. 12px num padding de 24 a 40px continuam mostrando padding, que é o
					// que a referência pede; moldura decepada não tem como ler bem.
					'-ml-3 w-[calc(100%_+_var(--spacing)*3)] px-3 scroll-px-3',
					// `gap-[var(--lib-gap)]` em vez de `gap-6` para o espaçamento real e o da fórmula
					// de largura não poderem divergir. As VARIÁVEIS não moram aqui — ver o wrapper
					// interno acima.
					'gap-[var(--lib-gap)]',
				)}
			>
				{children}
			</ul>

				<Seta dir="prev" visivel={podeVoltar} onClick={() => rolar(-1)} />
				<Seta dir="next" visivel={podeAvancar} onClick={() => rolar(1)} />
			</div>
		</div>
	)
}

function Seta({
	dir,
	visivel,
	onClick,
}: {
	dir: 'prev' | 'next'
	visivel: boolean
	onClick: () => void
}) {
	if (!visivel) return null

	return (
		<div
			className={twMerge(
				// Centrada na CAPA, não na altura do trilho. O trilho cresce quando um card
				// expande, e `top-1/2` levava a seta para cima do texto do card aberto. A capa
				// é 16:9 da largura do card, então seu centro fica a `card * 9/32` do topo,
				// mais os 12px de `py-3` do trilho.
				'absolute top-[calc(var(--lib-card)*9/32_+_var(--spacing)*3)] -translate-y-1/2',
				dir === 'prev' ? 'left-2' : 'right-2',
				// Só existe onde há ponteiro fino; lá, aparece no hover ou no foco de teclado
				// dentro do trilho. Sem hover fino a seta nunca é renderizada visível — o
				// arrasto do carrossel clássico é o caminho.
				'hidden hover-fine:block',
				'opacity-0 transition-opacity duration-150 group-hover/trilho:opacity-100 group-focus-within/trilho:opacity-100',
			)}
		>
			<IconButton
				icon={dir === 'prev' ? 'chevron-left' : 'chevron-right'}
				label={dir === 'prev' ? 'Voltar' : 'Avançar'}
				type="filled"
				size="medium"
				onClick={onClick}
				className="bg-white text-primary-600 shadow-md hover:bg-neutral-50"
			/>
		</div>
	)
}
