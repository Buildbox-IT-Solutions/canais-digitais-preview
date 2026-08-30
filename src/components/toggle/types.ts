import type { IconName } from '~/components/icon/types'

/**
 * Aparência do controle — MESMOS três nomes de `Button [1.1]` e `Icon Button [1.2]`
 * (`type`), de propósito: é o mesmo conceito, e um terceiro vocabulário (`variant`,
 * do shadcn) para a mesma coisa é exatamente o tipo de divergência que os 11 portais
 * não sobrevivem. O `outline` do shadcn é o `outlined` daqui.
 *
 * `ghost` é o default e é o único que o Figma desenhou (o set `Toggle [1.0]` inteiro
 * é ghost: sem preenchimento em repouso, `neutral-50` no hover). `outlined` e
 * `filled` são extensão dev-side — ver `figma-specs/toggle.md`.
 */
export type ToggleType = 'ghost' | 'outlined' | 'filled'

/**
 * Superfícies do Figma "Toggle [1.0]" (node 7952:127473):
 * `default`: sem foto atrás — sem preenchimento em repouso, `Neutral/Light/0`
 * (`--color-neutral-50`, #E9EAEC) no hover.
 * `onMedia`: sobre fotografia arbitrária — branco 80% em repouso (fill cru, mesma
 * saída usada pelo Play Button 2.0 do Figma, que também não tem estilo de branco
 * com opacidade no arquivo), branco 100% no hover.
 */
export type ToggleSurface = 'default' | 'onMedia'

/**
 * Só-ícone: escala do `Icon Button [1.0]` — 32/40/48 com ícone 16/24/32 (NÃO é a
 * escala do Play Button). Com rótulo: escala do `Button [1.1]` — mesma altura
 * (32/40/48), mais o padding, o gap e a tipografia daquele botão.
 */
export type ToggleSize = 'small' | 'medium' | 'large'

/** Lado do ícone quando há rótulo. Default `leading` (à esquerda), como no shadcn. */
export type ToggleIconPosition = 'leading' | 'trailing'

interface IToggleBaseProps {
	/** Estado atual — componente controlado, não guarda estado próprio. Equivale a "Selected" no Figma. */
	pressed: boolean
	onPressedChange: (next: boolean) => void
	/** Ícone que NÃO muda com o estado. Ignorado onde `iconOn`/`iconOff` cobrirem o estado. */
	icon?: IconName
	/** Ícone quando `pressed` é true (Selected=On, preenchido no Figma). Cai em `icon` se ausente. */
	iconOn?: IconName
	/** Ícone quando `pressed` é false (Selected=Off, vazado no Figma). Cai em `icon` se ausente. */
	iconOff?: IconName
	iconPosition?: ToggleIconPosition
	/**
	 * Texto do Tooltip quando `pressed` é true — curto, ex. "Remover". Sem
	 * `tooltipOn`/`tooltipOff`, o Toggle não ganha tooltip nenhum.
	 */
	tooltipOn?: string
	/** Texto do Tooltip quando `pressed` é false — curto, ex. "Favoritar". */
	tooltipOff?: string
	/** Default `'ghost'` — a única aparência que o Figma desenhou. */
	type?: ToggleType
	size?: ToggleSize
	/** Superfície sempre presente (com ou sem foto atrás) — default `'default'`. */
	surface?: ToggleSurface
	/**
	 * Estado "Disabled" do Figma — atributo nativo, não prop de "state" (Hover/Focus
	 * também não são prop: são CSS puro, `:hover`/`:focus-visible`, reagindo ao mouse
	 * e ao teclado de verdade).
	 */
	disabled?: boolean
	className?: string
}

/**
 * Formato só-ícone (o do Figma): `labelOn`/`labelOff` são OBRIGATÓRIOS porque viram o
 * `aria-label` — sem eles o botão não teria nome acessível nenhum. O tipo torna esse
 * erro impossível de escrever, em vez de deixá-lo para uma auditoria posterior.
 */
export interface IIconOnlyToggleProps extends IToggleBaseProps {
	/** Nome acessível (aria-label) quando `pressed` é true — normalmente a ação de desligar. */
	labelOn: string
	/** Nome acessível (aria-label) quando `pressed` é false — normalmente a ação de ligar. */
	labelOff: string
	text?: never
	textOn?: never
	textOff?: never
}

/**
 * Formato com rótulo visível. Aqui `labelOn`/`labelOff` são PROIBIDOS: o texto na tela
 * já é o nome acessível, e um `aria-label` diferente dele quebra o WCAG 2.5.3 (Label in
 * Name) — quem dita "clicar em Favoritar" por voz não alcançaria o botão. Estado
 * continua em `aria-pressed`, nunca no texto do nome acessível.
 */
export interface ILabeledToggleProps extends IToggleBaseProps {
	/** Rótulo visível. Serve aos dois estados quando `textOn`/`textOff` não forem passados. */
	text: string
	/** Sobrescreve `text` quando `pressed` é true (ex.: "Favoritado"). */
	textOn?: string
	/** Sobrescreve `text` quando `pressed` é false. */
	textOff?: string
	labelOn?: never
	labelOff?: never
}

export type IToggleProps = IIconOnlyToggleProps | ILabeledToggleProps
