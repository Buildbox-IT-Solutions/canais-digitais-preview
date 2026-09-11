/**
 * Saídas do carrossel, que NÃO são equivalentes — ver o item 4 de
 * `notas/2026-09-10-regras-exibicao-whats-new.md`.
 *
 * - `adiar` — X ou scrim. "Agora não": ambíguo, pode ter sido reflexo, então a
 *   campanha continua aberta e pode voltar uma vez.
 * - `pular` — dispensa explícita. Encerra.
 * - `ultimo-passo` — a pessoa chegou ao passo 3 (por seta ou dot). Encerra, porque a
 *   mensagem foi entregue. **Não fecha o modal**: ela continua lendo.
 * - `criar-conta` — conversão. Encerra e leva para o cadastro.
 */
export type WhatsNewEvento = 'adiar' | 'pular' | 'ultimo-passo' | 'criar-conta'

export interface IWhatsNewDialogProps {
	open: boolean
	/**
	 * Única saída do componente. Quem consome decide o que cada evento faz — inclusive
	 * fechar: `adiar`, `pular` e `criar-conta` fecham, `ultimo-passo` não.
	 */
	onEvento: (evento: WhatsNewEvento) => void
	/** Passo inicial (0-indexed). Só para Storybook/testes — o fluxo real abre no passo 0. Default: 0 */
	initialStep?: number
	className?: string
}
