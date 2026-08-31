import { twMerge } from '~/lib/tw-merge'
import {
	BUTTON_LEADING_ICON_PADDING,
	BUTTON_PADDING_NO_ICON,
	BUTTON_SIZE_CLASSES,
	BUTTON_TRAILING_ICON_PADDING,
	buttonIconSize,
} from '~/components/button'
import { Icon } from '~/components/icon'
import { Tooltip } from '~/components/tooltip'
import type { IToggleProps, ToggleSize, ToggleSurface, ToggleType } from './types'

/**
 * Componente: Toggle [1.0]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7952-127473
 * Variantes (Figma): Selected (Off/On) × State (Enabled/Hovered/Focused/Disabled, CSS —
 *            não é prop) × Surface (Default/OnMedia) × Size (Small/Medium/Large) — 48 variantes.
 * Extensão dev-side (30/08/2026): rótulo visível, `type` (ghost/outlined/filled) e
 *            `iconPosition`. Ver `figma-specs/toggle.md` e `ds/achados.md`.
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950,
 *         --color-neutral-50, --color-neutral-200, --color-white
 *
 * Botão de dois estados, genérico de propósito: não sabe o que está ligando/desligando.
 * Nenhuma regra de produto (favoritos, autenticação, toast, rede) entra aqui — isso vive
 * em quem chama (`src/lib/use-favorito-toggle.ts`) ou na instância pronta
 * (`src/components/favorito-toggle`). Controlado: `pressed` vem de fora, o clique só
 * notifica via `onPressedChange`, nunca guarda estado próprio.
 *
 * ## Duas geometrias, duas origens
 *
 * SÓ-ÍCONE é o componente do Figma: caixa quadrada 32/40/48 com ícone 16/24/32, escala
 * herdada do `Icon Button [1.0]` (NÃO do Play Button). Saída idêntica à da versão
 * anterior deste arquivo — os cinco call sites de favoritar não mudam um pixel.
 *
 * COM RÓTULO é extensão dev-side: o Figma não desenhou toggle com texto. Em vez de
 * inventar medidas, herda a pílula do `Button [1.1]` — mesma altura (32/40/48), mesmo
 * padding, mesmo gap, mesma tipografia, importados de lá (`BUTTON_*`), não redigitados.
 * Precedente: `tone="inverse"` do Button, também extensão dev-side formalizada depois.
 * Consequência deliberada: com rótulo o ícone segue a escala do Button (20/24/24), não a
 * do Icon Button — dentro de uma pílula o ícone emparelha com o texto, não com a caixa.
 *
 * ## Como o estado "on" fica visível
 *
 * Uma regra só: **o `on` ganha preenchimento sempre que o estado não estiver legível de
 * outra forma.** Ele está legível de outra forma em exatamente um caso — `type="ghost"`
 * só-ícone com `iconOn` ≠ `iconOff`, que é o set do Figma (contorno → preenchido). Aí o
 * fundo não muda em estado nenhum e a cor do ícone fica FIXA: o hover só reforça o
 * preenchimento de fundo e nunca compete com o sinal de Selected. Em todo o resto
 * (qualquer coisa com texto, qualquer `outlined`/`filled`, ou um ícone que não troca) o
 * `on` preenche, como no shadcn (`data-[state=on]:bg-accent`) e no MD3. Sem essa regra
 * um toggle de texto ghost ficaria com o estado invisível.
 *
 * `outlined`/`filled` seguem o toggle do MD3: o não-selecionado do `filled` é um
 * contêiner neutro (`neutral-50`), não o primary do Button — no Button `filled` quer
 * dizer "ação principal", aqui quer dizer "contêiner que se preenche ao ligar".
 *
 * ## Duas exceções visuais que separam o Toggle do Button (30/08/2026)
 *
 * Sem elas o toggle preenchido virava um `Button [1.1]` filled idêntico, e o outlined
 * pedia atenção (contorno `primary-600` de 1.5px) para dizer "desligado" — o estado que
 * menos merece atenção na tela.
 *
 * 1. **`outlined` tem contorno NEUTRO (`border-neutral-100`, 1px), e ele não muda ao
 *    ligar.** O que muda é o miolo: fundo `primary-100` e texto `secondary-950`. Largura
 *    `border` (1px) e não `border-[1.5px]`: 1.5px é a medida exata do `Button [1.1]` no
 *    Figma, justificada lá; o Toggle outlined não existe no Figma, então não havia
 *    medida a honrar — copiá-la era herança por analogia. 1px + `neutral-100` é o que
 *    TODO controle interativo com contorno deste DS já usa (`form-field`, `form-select`,
 *    `search-bar`).
 * 2. **`filled` ligado é ultramarine (`secondary-950`), não `primary-600`.** Alinha com
 *    o resto dos controles de estado do DS — o `Switch` marcado e os checkboxes também
 *    ligam em `secondary-950`, e o `form-toggle.md` registra isso explicitamente ("Cor
 *    ON é `secondary-950` (Ultramarine), **não** `primary-600`"). De quebra desfaz a
 *    colisão: `bg-primary-600` é exatamente o Button filled em repouso.
 *    O hover do ligado aprofunda pra `primary-600` (#002244) — direção inversa à do
 *    Button (que parte do navy e clareia pro ultramarine), porque aqui o repouso já é o
 *    ultramarine. Os dois usam o mesmo par de tokens, em ordens opostas.
 *
 * Foco: o Figma desenha um contorno de 2px (stroke externo na moldura). Aqui vira
 * `ring-2` (box-shadow) em vez de `border`, seguindo a convenção já usada no repo
 * (ex. read-list-item) — um `border` real reduziria a área de conteúdo pelos 2px
 * (box-sizing), enquanto `ring` não afeta layout. Sem `ring-offset`: não há folga
 * entre ícone e anel no Figma (ver limitação conhecida #3 no arquivo de stories).
 *
 * Nome acessível: só-ícone usa `aria-label` (`labelOn`/`labelOff`, obrigatórios pelo
 * tipo). Com rótulo visível NÃO emite `aria-label` — o texto na tela é o nome, e um
 * `aria-label` divergente quebraria o WCAG 2.5.3 (Label in Name). `aria-pressed` carrega
 * o estado nos dois casos.
 *
 * Três limitações conhecidas, documentadas e não corrigidas nesta versão:
 * 1. Surface=OnMedia + disabled tem contraste baixo (conteúdo neutral-200 sobre
 *    branco 80%) — controle desabilitado é isento de contraste pela norma, mas a
 *    combinação é visualmente ruim. Comportamento do próprio Figma, não bug do código.
 * 2. Size=Small é 32px, abaixo dos 44px de alvo recomendado — é o tamanho herdado
 *    do Icon Button do arquivo. Usado propositalmente nos cards (área de toque
 *    reduzida, pedido de produto — ver comentário em NewsCard/index.tsx); a
 *    página de conteúdo continua `medium`, por convívio com os outros ícones da
 *    barra de ações (WhatsApp/compartilhar).
 * 3. O anel de foco não tem folga do ícone (sem `ring-offset`) — no Figma isso
 *    exigiria uma moldura extra; no CSS teria que ser um `ring-offset` que não foi
 *    aplicado sem alinhamento prévio com o Figma.
 *
 * Tooltip (feature Favoritos, referência: padrão "Instagram" — Salvar/Remover
 * aparecem depois de um breve delay de hover): opcional via `tooltipOn`/
 * `tooltipOff`, textos CURTOS ("Favoritar"/"Remover") — de propósito DIFERENTES
 * de `labelOn`/`labelOff` (aria-label, mais descritivo: "Remover dos favoritos").
 * Sem essas duas props o Toggle continua sem tooltip, igual antes. Quando
 * existem, o `className` de posicionamento (que hoje sempre vem do chamador —
 * `absolute top-2 right-2` sobre mídia, ou nada no caso inline da conteudo) migra
 * do botão pro wrapper do Tooltip (ver esse componente).
 */

/** Caixa quadrada do formato só-ícone — escala do Icon Button [1.0]. */
const ICON_ONLY_BOX: Record<ToggleSize, string> = {
	small: 'h-8 w-8',
	medium: 'h-10 w-10',
	large: 'h-12 w-12',
}

/**
 * Ícone do formato só-ícone: 16/24/32. O `IconButton` compartilhado usa 18px no medium
 * e 24px no large, que não batem com este set do Figma — por isso a escala vive aqui, e
 * não naquele componente (usado por outros botões que não seguem esta escala).
 */
const ICON_ONLY_ICON: Record<ToggleSize, string> = {
	small: 'size-4',
	medium: 'size-6',
	large: 'size-8',
}

type StatePair = { off: string; on: string }

/**
 * Cor por superfície × aparência × estado. `default` é a superfície sem foto atrás;
 * `onMedia` é sobre fotografia arbitrária, onde o branco 80% do Figma é o contêiner —
 * por isso `ghost` e `filled` partem do mesmo repouso ali e só divergem no `on`: sobre
 * uma foto não existe "contêiner neutro" que se distinga do scrim.
 */
const STATE_CLASSES: Record<ToggleSurface, Record<ToggleType, StatePair>> = {
	default: {
		ghost: {
			off: 'text-primary-600 hover:bg-neutral-50',
			on: 'bg-primary-100 text-secondary-950 hover:bg-black/8',
		},
		outlined: {
			off: 'border border-neutral-100 text-primary-600 hover:bg-neutral-50',
			on: 'border border-neutral-100 bg-primary-100 text-secondary-950 hover:bg-black/8',
		},
		filled: {
			off: 'bg-neutral-50 text-primary-600 hover:bg-black/8',
			on: 'bg-secondary-950 text-white hover:bg-primary-600',
		},
	},
	onMedia: {
		ghost: {
			off: 'bg-white/80 text-primary-600 hover:bg-white',
			on: 'bg-white text-secondary-950 hover:bg-white',
		},
		outlined: {
			off: 'border border-white text-white hover:bg-white/10',
			on: 'border border-white bg-white text-secondary-950 hover:bg-white',
		},
		filled: {
			off: 'bg-white/80 text-primary-600 hover:bg-white',
			on: 'bg-secondary-950 text-white hover:bg-primary-600',
		},
	},
}

/**
 * Disabled por superfície também, não só por aparência: em `onMedia` o branco 80% do
 * Figma PERMANECE e só o conteúdo apaga (é a limitação conhecida #1, deliberada); em
 * `default` o preenchimento do `on` some junto.
 */
const DISABLED_CLASSES: Record<ToggleSurface, Record<ToggleType, string>> = {
	default: {
		ghost: 'disabled:bg-transparent disabled:text-neutral-200',
		// Borda desabilitada = a MESMA do repouso. Agora que o contorno em repouso já é
		// um neutro claro (`neutral-100`), escurecê-lo pra `neutral-200` no disabled
		// deixaria o controle desligado mais forte que o ligável. Só o conteúdo apaga.
		outlined: 'disabled:border-neutral-100 disabled:bg-transparent disabled:text-neutral-200',
		filled: 'disabled:bg-neutral-200 disabled:text-white',
	},
	onMedia: {
		ghost: 'disabled:bg-white/80 disabled:text-neutral-200',
		outlined: 'disabled:border-white/40 disabled:bg-transparent disabled:text-white/40',
		filled: 'disabled:bg-white/80 disabled:text-neutral-200',
	},
}

const FOCUS_RING: Record<ToggleSurface, string> = {
	default: 'focus-visible:ring-primary-600',
	onMedia: 'focus-visible:ring-white',
}

export function Toggle({
	pressed,
	onPressedChange,
	icon,
	iconOn,
	iconOff,
	iconPosition = 'leading',
	text,
	textOn,
	textOff,
	labelOn,
	labelOff,
	tooltipOn,
	tooltipOff,
	type = 'ghost',
	size = 'medium',
	surface = 'default',
	disabled,
	className,
}: IToggleProps) {
	const currentText = pressed ? (textOn ?? text) : (textOff ?? text)
	const currentIcon = pressed ? (iconOn ?? icon) : (iconOff ?? icon)

	// A regra única do bloco de doc: o estado já se lê no ícone SÓ no caso do Figma —
	// ghost, sem texto, com dois ícones diferentes. Fora dele, o `on` precisa preencher.
	const stateIsReadableFromIcon =
		type === 'ghost' && !currentText && iconOn !== undefined && iconOff !== undefined && iconOn !== iconOff
	const state = pressed && !stateIsReadableFromIcon ? 'on' : 'off'

	const iconOnly = currentText === undefined
	const iconClasses = iconOnly ? ICON_ONLY_ICON[size] : buttonIconSize(size)

	const geometry = iconOnly
		? ICON_ONLY_BOX[size]
		: twMerge(
				BUTTON_SIZE_CLASSES[size],
				currentIcon === undefined
					? BUTTON_PADDING_NO_ICON[size]
					: iconPosition === 'trailing'
						? BUTTON_TRAILING_ICON_PADDING[size]
						: BUTTON_LEADING_ICON_PADDING[size],
			)

	// className do chamador (posicionamento — ex. `absolute top-2 right-2` sobre a
	// mídia) vai pro wrapper do Tooltip quando ele existe; sem tooltip, vai direto
	// pro botão, como antes — ver comentário do Tooltip sobre containing block.
	const tooltipLabel = pressed ? tooltipOn : tooltipOff

	const iconNode =
		currentIcon === undefined ? null : <Icon name={currentIcon} className={twMerge('shrink-0', iconClasses)} />

	const button = (
		<button
			type="button"
			aria-label={iconOnly ? (pressed ? labelOn : labelOff) : undefined}
			aria-pressed={pressed}
			disabled={disabled}
			onClick={() => onPressedChange(!pressed)}
			className={twMerge(
				'inline-flex items-center justify-center rounded-full font-body font-bold whitespace-nowrap transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
				geometry,
				STATE_CLASSES[surface][type][state],
				DISABLED_CLASSES[surface][type],
				'focus-visible:ring-2',
				FOCUS_RING[surface],
				tooltipLabel ? undefined : className,
			)}
		>
			{iconPosition === 'leading' ? iconNode : null}
			{currentText}
			{iconPosition === 'trailing' ? iconNode : null}
		</button>
	)

	if (!tooltipLabel) return button

	return (
		<Tooltip label={tooltipLabel} disabled={disabled} className={className}>
			{button}
		</Tooltip>
	)
}
