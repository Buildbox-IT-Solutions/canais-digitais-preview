/**
 * Gate de download da Biblioteca exclusiva.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * REGRA DE PRODUTO — O DESBLOQUEIO É CONCEDIDO, NUNCA REVOGADO.
 *
 * Quando `camposFaltantes` fica vazio, `desbloqueado` vira `true` e PERMANECE `true`
 * para sempre — mesmo que novos campos obrigatórios sejam adicionados ao cadastro
 * depois, e mesmo que campos já preenchidos voltem a ficar em branco.
 *
 * Isto NÃO é um detalhe de implementação nem efeito colateral de cache: é decisão de
 * produto. Quem completou o cadastro uma vez conquistou o acesso ao acervo; um campo
 * novo criado meses depois não pode tirar do usuário um direito que ele já exerceu.
 *
 * A regra está inteira em `resolverGate` — uma função PURA de duas entradas. É de
 * propósito: assim o back-end reimplementa sem reproduzir store, listener ou storage.
 *
 *     desbloqueado = latchPersistido OU camposFaltantes.length === 0
 *
 * Leia a fórmula de novo: `camposFaltantes` só sabe LIGAR. Não existe termo capaz de
 * desligar. `desbloqueado` não é função do cadastro — é um latch monotônico alimentado
 * por ele. `camposFaltantes` segue sendo a verdade corrente do cadastro, mas nunca
 * reverte o latch.
 *
 * **Para o back-end WordPress:** persista o latch na CONTA (uma coluna
 * `biblioteca_desbloqueada`, gravada uma única vez) e NÃO recalcule o desbloqueio a
 * partir dos campos a cada request. Recalcular é o bug que esta regra existe pra impedir.
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * O gate é global ao USUÁRIO, mas o bloqueio é por MATERIAL: quem decide se um card
 * está trancado é `estaBloqueado()` em src/lib/biblioteca.ts, cruzando este gate com
 * `material.requerCadastroCompleto`. Um gate fechado não tranca o acervo inteiro.
 *
 * Mesmo padrão de store manual (listeners + emit + useSyncExternalStore) de
 * src/lib/favoritos-store.ts. localStorage aqui faz o papel do back-end: neste protótipo
 * não há servidor, então o navegador guarda o que seria persistido na conta.
 */
import { useSyncExternalStore } from 'react'
import type { LibraryGate } from '~/mocks/biblioteca'

const STORAGE_KEY = 'cd_biblioteca_desbloqueada'

type Listener = () => void

let listeners: Listener[] = []

/**
 * A REGRA, isolada e pura. Nenhum acesso a storage, nenhum estado de módulo.
 *
 * `latchPersistido` é o desbloqueio já concedido em algum momento do passado;
 * `camposFaltantes` é o estado corrente do cadastro. O `||` é a regra inteira: o
 * cadastro completo concede, e nada revoga.
 */
export function resolverGate(camposFaltantes: string[], latchPersistido: boolean): LibraryGate {
	return { camposFaltantes, desbloqueado: latchPersistido || camposFaltantes.length === 0 }
}

function lerLatch(): boolean {
	try {
		return localStorage.getItem(STORAGE_KEY) === 'true'
	} catch {
		// Modo privado / storage bloqueado: degrada para "nunca desbloqueado" em vez de
		// estourar. No produto quem responde isso é a conta, não o navegador.
		return false
	}
}

function emit(): void {
	for (const listener of listeners) listener()
}

export function subscribe(listener: Listener): () => void {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter((l) => l !== listener)
	}
}

/**
 * Grava o latch. Idempotente e sem volta: chamar de novo com o latch ligado é no-op.
 *
 * Só a PERSISTÊNCIA vive aqui — o valor corrente de `desbloqueado` vem de
 * `resolverGate`, que já devolve `true` no primeiro render em que o cadastro está
 * completo, antes deste efeito rodar. Essa separação evita o cadeado dos cards piscar
 * na primeira pintura de um perfil completo.
 */
export function persistirDesbloqueio(): void {
	if (lerLatch()) return
	try {
		localStorage.setItem(STORAGE_KEY, 'true')
	} catch {
		/* ver lerLatch */
	}
	emit()
}

/**
 * Zera o latch. NÃO é operação de produto — existe só para o protótipo voltar ao cenário
 * de perfil incompleto entre revisões, já que o latch fica gravado no navegador de quem
 * revisa. O back-end não deve expor equivalente.
 */
export function resetarDesbloqueioParaRevisao(): void {
	try {
		localStorage.removeItem(STORAGE_KEY)
	} catch {
		/* ver lerLatch */
	}
	emit()
}

// `false` no server (SSR/smoke test): não há localStorage, e "nada concedido ainda" é o
// default seguro — `resolverGate` ainda desbloqueia pelo cadastro completo.
function latchNoServidor(): boolean {
	return false
}

/** Latch persistido, reativo. A REGRA não está aqui: componha com `resolverGate`. */
export function useLatchDesbloqueio(): boolean {
	return useSyncExternalStore(subscribe, lerLatch, latchNoServidor)
}
