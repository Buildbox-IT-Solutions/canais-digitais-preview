import { twMerge } from '~/lib/tw-merge'
import { IconButton } from '~/components/icon-button'
import type { IconButtonSize } from '~/components/icon-button/types'
import { Tooltip } from '~/components/tooltip'
import type { IToggleProps, ToggleSurface } from './types'

/**
 * Componente: Toggle [1.0]
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7952-127473
 * Variantes: Selected (Off/On) × State (Enabled/Hovered/Focused/Disabled, CSS — não é prop) ×
 *            Surface (Default/OnMedia) × Size (Small/Medium/Large) — 48 variantes no Figma.
 *
 * Composto sobre o IconButton já existente (não reconstrói um botão só-ícone à mão).
 * Genérico de propósito: não sabe o que está ligando/desligando. Nenhuma regra de
 * produto (favoritos, autenticação, toast, rede) entra aqui — isso vive em quem chama
 * (ex.: src/lib/use-favorito-toggle.ts). Controlado: `pressed` vem de fora, o clique só
 * notifica via `onPressedChange`, nunca guarda estado próprio.
 *
 * Escala herdada do Icon Button [1.0] (NÃO do Play Button): 32/40/48 com ícone
 * 16/24/32 — o IconButton compartilhado já acerta as 3 caixas, mas seu ícone do
 * `medium` (18px) e do `large` (24px) não batem com o Figma deste set, então o
 * ícone é sobrescrito aqui via `[&_svg]:size-*` (só neste componente, sem tocar
 * no IconButton compartilhado, usado por outros botões que não seguem esta escala).
 *
 * Cor do ícone é FIXA em `text-primary-600` nas duas superfícies e em todo estado
 * — o hover só reforça o preenchimento de fundo, nunca muda a cor do ícone (se
 * mudasse, o sinal de hover competiria com o sinal de Selected). Disabled troca a
 * cor pra `text-neutral-200` (ambos tokens já existentes, nenhum criado).
 *
 * `surface="onMedia"`: `bg-white/80` em repouso — branco com opacidade é fill cru
 * no Figma (não existe estilo de branco-com-opacidade no arquivo; é a mesma saída
 * usada pelo Play Button 2.0 de lá), `hover:bg-white` (100%, sem crossfade de cor).
 *
 * Foco: o Figma desenha um contorno de 2px (stroke externo na moldura). Aqui vira
 * `ring-2` (box-shadow) em vez de `border`, seguindo a convenção já usada no repo
 * (ex. read-list-item) — um `border` real reduziria a área de conteúdo pelos 2px
 * (box-sizing), enquanto `ring` não afeta layout. Sem `ring-offset`: não há folga
 * entre ícone e anel no Figma (ver limitação conhecida #3 no arquivo de stories).
 *
 * Três limitações conhecidas, documentadas e não corrigidas nesta versão:
 * 1. Surface=OnMedia + disabled tem contraste baixo (ícone neutral-200 sobre
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
 * do IconButton pro wrapper do Tooltip (ver esse componente).
 */
const ICON_SIZE_CLASSES: Record<IconButtonSize, string> = {
	small: '[&_svg]:size-4',
	medium: '[&_svg]:size-6',
	large: '[&_svg]:size-8',
}

const SURFACE_CLASSES: Record<ToggleSurface, string> = {
	default: 'hover:bg-neutral-50 focus-visible:ring-primary-600',
	onMedia: 'bg-white/80 hover:bg-white focus-visible:ring-white',
}

export function Toggle({
	pressed,
	onPressedChange,
	iconOn,
	iconOff,
	labelOn,
	labelOff,
	tooltipOn,
	tooltipOff,
	size = 'medium',
	surface = 'default',
	disabled,
	className,
}: IToggleProps) {
	// className do chamador (posicionamento — ex. `absolute top-2 right-2` sobre a
	// mídia) vai pro wrapper do Tooltip quando ele existe; sem tooltip, vai direto
	// pro botão, como antes — ver comentário do Tooltip sobre containing block.
	const tooltipLabel = pressed ? tooltipOn : tooltipOff

	const button = (
		<IconButton
			icon={pressed ? iconOn : iconOff}
			label={pressed ? labelOn : labelOff}
			ariaPressed={pressed}
			size={size}
			type="ghost"
			disabled={disabled}
			onClick={() => onPressedChange(!pressed)}
			className={twMerge(
				'text-primary-600 outline-none disabled:pointer-events-none disabled:text-neutral-200',
				ICON_SIZE_CLASSES[size],
				'focus-visible:ring-2',
				SURFACE_CLASSES[surface],
				tooltipLabel ? undefined : className,
			)}
		/>
	)

	if (!tooltipLabel) return button

	return (
		<Tooltip label={tooltipLabel} disabled={disabled} className={className}>
			{button}
		</Tooltip>
	)
}
