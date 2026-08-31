import { Toggle } from '~/components/toggle'
import type { IFavoritoToggleProps } from './types'

/**
 * Componente: FavoritoToggle
 * Instância pronta do `Toggle` — não é um componente do Figma, é o `Toggle [1.0]`
 * com os textos e ícones de "favoritar" fixados.
 *
 * Existe porque os mesmos seis props (`iconOn`, `iconOff`, `labelOn`, `labelOff`,
 * `tooltipOn`, `tooltipOff`) estavam repetidos, palavra por palavra, em cinco call
 * sites: NewsCard (dois), VideoCard, CategoryColumn, DestaqueSection e a tela de
 * conteúdo. Copiado seis vezes, o texto do aria-label diverge no primeiro ajuste — e
 * divergência entre portais é o risco central deste sistema. Aqui ele existe uma vez.
 *
 * NÃO chama `useFavoritoToggle` de propósito: o hook precisa de `contentId` e do gancho
 * de autenticação, e no NewsCard uma única chamada alimenta DOIS toggles (o de cima da
 * mídia e o inline). Quem chama continua dono do hook; este componente só desenha.
 *
 * Os textos, e por que são três pares diferentes:
 * · `labelOn`/`labelOff` (aria-label, só no formato só-ícone) descrevem a AÇÃO do
 *   clique, por extenso: "Remover dos favoritos" / "Favoritar".
 * · `tooltipOn`/`tooltipOff` são curtos, para caber no balão: "Remover" / "Favoritar".
 * · O rótulo visível (`showLabel`) é ESTÁVEL nos dois estados — "Favoritar" continua
 *   "Favoritar" ligado. O estado vive no `aria-pressed`, no coração preenchido e no
 *   fundo; trocar o nome acessível a cada clique só faria o leitor de tela anunciar
 *   duas vezes a mesma informação.
 */
export function FavoritoToggle({
	pressed,
	onPressedChange,
	showLabel = false,
	type,
	size,
	surface,
	disabled,
	tooltipSide,
	className,
}: IFavoritoToggleProps) {
	const shared = {
		pressed,
		onPressedChange,
		iconOn: 'favorite' as const,
		iconOff: 'favorite-border' as const,
		type,
		size,
		surface,
		disabled,
		className,
	}

	if (showLabel) return <Toggle {...shared} text="Favoritar" />

	return (
		<Toggle
			{...shared}
			labelOn="Remover dos favoritos"
			labelOff="Favoritar"
			tooltipOn="Remover"
			tooltipOff="Favoritar"
			tooltipSide={tooltipSide}
		/>
	)
}
