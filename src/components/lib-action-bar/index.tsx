import { twMerge } from '~/lib/tw-merge'
import { FavoritoToggle } from '~/components/favorito-toggle'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { Tooltip } from '~/components/tooltip'
import { compartilharConteudo } from '~/lib/compartilhar-conteudo'
import { desfavoritar, favoritar, useFavorito } from '~/lib/favoritos-store'
import { toast } from '~/lib/toast-store'
import type { ILibActionBarProps } from './types'

/**
 * Componente: LibActionBar — as quatro ações de um material do acervo.
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8480-3308
 * Tokens: --color-primary-600, --color-neutral-50, --text-body-md
 *
 * Baixar (ação principal, com rótulo) + abrir o post + compartilhar + favoritar. Nasceu
 * dentro do `LibCard` e foi extraída em 2026-08-31, quando o Figma passou a pedir a MESMA
 * barra no destaque da aba (node `8480:3299`): "atualizações para que ficasse com os
 * mesmos recursos dos cards listados". Extrair foi a única forma de "os mesmos recursos"
 * ser verdade — duas cópias divergem no primeiro ajuste.
 *
 * O nó do Figma é idêntico nos dois lugares: `Button [1.2]` com ícone 20px + `action-group`
 * de três controles de 32px, gap 8. Nenhuma variante de tamanho: o destaque não usa uma
 * barra maior por ser maior.
 *
 * **`data-handoff="lib-card-actionbar"` foi mantido** mesmo fora do LibCard: o marcador
 * identifica o CONTRATO que o back-end reimplementa, não o arquivo onde ele mora. Card
 * listado e destaque emitem o mesmo marcador de propósito — é o que diz que são a mesma
 * coisa.
 */
export function LibActionBar({
	material,
	bloqueado = false,
	onBaixar,
	onBloqueado,
	align = 'spread',
	className,
}: ILibActionBarProps) {
	// Ação direta na store + toast, SEM `useFavoritoToggle`. Aquele hook trava a ação
	// atrás de `useLogado()` (`?logado=true`) e abre o convite de criar conta se
	// deslogado — faz sentido em conteúdo público, não aqui: a Biblioteca exclusiva É a
	// área logada. Mesmo racional (e mesmo código) já usados em dashboard-perfil-v4.
	// "Favorita e abre toast. Semelhante a Últimas leituras." — a anotação.
	const pressed = useFavorito(material.id)

	function alternarFavorito() {
		if (pressed) {
			desfavoritar(material.id)
			toast.success('Removido dos favoritos.')
		} else {
			favoritar(material.id)
			toast.success('Adicionado aos seus Favoritos!')
		}
	}

	return (
		<div
			data-handoff="lib-card-actionbar"
			className={twMerge('flex w-full items-center gap-2', className)}
		>
			{/* "Para materiais desbloqueados faz o download direto; para materiais
			    bloqueados abre-se modal de incentivo" — a anotação. Os dois caminhos saem
			    do MESMO botão, com o mesmo rótulo: o usuário não descobre que está
			    bloqueado por um botão diferente, descobre pelo cadeado no badge. */}
			<button
				type="button"
				onClick={() => (bloqueado ? onBloqueado?.(material) : onBaixar?.(material))}
				className="inline-flex h-8 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-primary-600 pr-4 pl-3 font-body font-bold text-body-md text-primary-600 transition-colors hover:bg-neutral-50"
			>
				<Icon name="download" className="size-5" />
				Baixar
			</button>

			{/* `action-group` do Figma: os três ícones vão para a direita, separados do
			    "Baixar". Sem isso os quatro controles ficam agrupados à esquerda e o
			    download perde a hierarquia de ação principal.

			    Os três têm tooltip; "Baixar" não — ele já tem rótulo visível, e balão
			    repetindo a palavra que está na tela não informa nada (mesmo racional do
			    `showLabel` no FavoritoToggle).

			    `side="top"` nos três, e isso NÃO é preferência estética: o balão é
			    `absolute` dentro do gatilho, então qualquer ancestral com `overflow` o
			    corta. No card listado a barra é a última linha do card, e o card vive
			    dentro do trilho (`overflow-x-auto`) — para baixo o balão sai pela borda e é
			    cortado. Para cima ele cai sobre o lead, dentro dos limites do card, e
			    sobrevive nos dois contextos. No destaque não há trilho, mas manter o mesmo
			    lado é o que faz a barra ser uma só. */}
			<div
				className={twMerge(
					'flex min-w-0 items-center gap-2',
					// `spread` cresce e joga os ícones na borda (card listado); `start` não cresce
					// e eles ficam colados no "Baixar" (destaque). Ver o `align` em types.ts.
					align === 'spread' && 'flex-1 justify-end',
				)}
			>
				<Tooltip label="Abrir" side="top">
					<IconButton
						icon="open-in-new"
						label="Abrir o post"
						href={material.arquivoUrl}
						type="ghost"
						size="small"
					/>
				</Tooltip>
				<Tooltip label="Compartilhar" side="top">
					<IconButton
						icon="share"
						label="Compartilhar"
						type="ghost"
						size="small"
						onClick={() => compartilharConteudo(material.titulo, material.arquivoUrl)}
					/>
				</Tooltip>
				<FavoritoToggle
					pressed={pressed}
					onPressedChange={alternarFavorito}
					size="small"
					tooltipSide="top"
				/>
			</div>
		</div>
	)
}
