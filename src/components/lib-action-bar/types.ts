import type { Material } from '~/mocks/biblioteca'

export interface ILibActionBarProps {
	material: Material
	/**
	 * Cruzamento de `material.requerCadastroCompleto` com o gate do usuário — vem pronto
	 * de `estaBloqueado()`. A barra não conhece o gate; ela só troca o DESTINO do clique
	 * em "Baixar", nunca o rótulo nem a aparência do botão.
	 */
	bloqueado?: boolean
	/** Clique em "Baixar" com o material liberado. */
	onBaixar?: (material: Material) => void
	/** Clique em "Baixar" com o material bloqueado — abre o modal de incentivo. */
	onBloqueado?: (material: Material) => void
	/**
	 * Onde o `action-group` (os três ícones) fica quando sobra espaço na linha. Os dois
	 * nós do Figma discordam, e não é ruído de medida:
	 *
	 * - `spread` (default) — card listado, node 8296:91785: o grupo tem 125px numa barra
	 *   de 236 e os ícones ocupam os 112 finais. Vai até a borda.
	 * - `start` — destaque, node 8480:3308: o grupo tem 112px fixos em x=111 de uma barra
	 *   de 476. Fica colado no "Baixar", com 253px de sobra à direita.
	 *
	 * 🔴 A confirmar se a diferença é intencional; até lá cada consumidor segue o seu nó.
	 */
	align?: 'spread' | 'start'
	className?: string
}
