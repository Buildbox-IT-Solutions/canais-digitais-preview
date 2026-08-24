#!/usr/bin/env node
/**
 * check-docs — verifica que a documentação do repositório não mente.
 *
 * Por que isto existe: em 24/08/2026 um levantamento encontrou seis quebras na
 * documentação, TODAS dentro de uma estrutura organizada e corretamente descrita no
 * CLAUDE.md. Nenhuma foi causada por má arquitetura de pastas — foram causadas por nada
 * verificar se a descrição ainda corresponde ao disco. Um arquivo renomeado, um glob
 * apontando pra pasta ignorada, um slug adicionado ao catálogo sem o .md: mudanças de uma
 * linha que não quebram build nem teste, e que só aparecem quando alguém tenta USAR a doc
 * — normalmente o back-end, no pior momento.
 *
 * A diferença entre um padrão documentado e um padrão verificado. Com 11 portais
 * reimplementando em PHP, só o segundo escala.
 *
 * Quatro asserções:
 *   A. todo caminho de repositório citado na norma existe em disco
 *   B. todo link relativo em .md resolve
 *   C. todo .md de entregável é alcançável pelo catálogo da /ds (sem doc órfã)
 *   D. toda pasta lida por import.meta.glob está versionada
 *
 * Roda no `pnpm build`. Falha com código 1 e lista o que consertar.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, resolve, relative, extname } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

/** Arquivos de norma: o que o Claude tem que obedecer. Citar caminho inexistente aqui é
 *  pior que em qualquer outro lugar — manda quem lê procurar o que não existe. */
const NORMA = ['CLAUDE.md', 'norma']

/** Pastas de entregável do /ds, e o catálogo que decide o que é alcançável. */
const DS = {
	catalogo: 'src/lib/ds/catalog.ts',
	componentes: ['ds/componentes', 'docs/componentes'],
	foundations: ['ds/foundations', 'docs/foundations'],
}

/** Fora do escopo: legacy/ é read-only até ser apagado, node_modules não é nosso. */
const IGNORAR_DIR = new Set([
	'node_modules',
	'.git',
	'dist',
	'storybook-static',
	'legacy',
	'.worktrees',
	// Ferramental, não conteúdo nosso.
	'.agents',
	'.claude',
	'.storybook',
])

const problemas = []
function falhar(asser, arquivo, msg, detalhe) {
	problemas.push({ asser, arquivo, msg, detalhe })
}

function listarMd(dir, acc = []) {
	if (!existsSync(dir)) return acc
	for (const nome of readdirSync(dir)) {
		if (IGNORAR_DIR.has(nome)) continue
		const p = join(dir, nome)
		if (statSync(p).isDirectory()) listarMd(p, acc)
		else if (extname(p) === '.md') acc.push(p)
	}
	return acc
}

const todosMd = listarMd(ROOT).map((p) => relative(ROOT, p))

// ─────────────────────────────────────────────────────────────────────────────
// A. Todo caminho de repositório citado na norma existe em disco.
//
// Extrai só tokens em backtick que são inequivocamente caminho: têm barra ou
// extensão conhecida, e nada de placeholder (`<nome>`), glob (`*`), alias (`~/`)
// ou URL. Preferir falso-negativo a falso-positivo: um check que grita errado é
// desligado, e aí não checa nada.
// ─────────────────────────────────────────────────────────────────────────────
const EXT_CAMINHO = /\.(md|tsx?|css|json|php|html|mjs|svg|png)$/
const arquivosNorma = NORMA.flatMap((n) => {
	const p = join(ROOT, n)
	if (!existsSync(p)) return []
	return statSync(p).isDirectory() ? listarMd(p).map((x) => relative(ROOT, x)) : [n]
})

for (const arq of arquivosNorma) {
	const texto = readFileSync(join(ROOT, arq), 'utf8')
	for (const [, tok] of texto.matchAll(/`([^`\n]+)`/g)) {
		const t = tok.trim()
		if (!t || t.includes('<') || t.includes('*') || t.includes(' ')) continue
		if (t.startsWith('~/') || t.startsWith('@') || /^https?:/.test(t)) continue
		// Exige diretório no caminho. Um `types.ts` solto em prosa quer dizer "o
		// types.ts daquele componente", não um arquivo na raiz — cobrar isso é ruído.
		if (!t.includes('/')) continue
		if (!/^[\w.-]+(\/[\w.-]+)*\/?$/.test(t)) continue
		// Barra final = diretório; sem ela, precisa de extensão conhecida.
		if (!t.endsWith('/') && !EXT_CAMINHO.test(t)) continue
		// Caminho parcial relativo a src/: os docs citam `download-item/index.tsx`
		// querendo dizer `src/components/download-item/index.tsx`. Só cobra o que
		// começa numa pasta de topo real — o resto é abreviação de prosa.
		const topo = t.split('/')[0]
		if (!existsSync(join(ROOT, topo))) continue
		const alvo = join(ROOT, t)
		if (!existsSync(alvo)) {
			falhar('A', arq, `caminho citado não existe: ${t}`)
		}
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// B. Todo link relativo em .md resolve.
// ─────────────────────────────────────────────────────────────────────────────
for (const arq of todosMd) {
	const texto = readFileSync(join(ROOT, arq), 'utf8')
	for (const [, , destino] of texto.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)) {
		if (/^(https?:|mailto:|#)/.test(destino)) continue
		const limpo = destino.split('#')[0]
		if (!limpo) continue
		if (!existsSync(resolve(dirname(join(ROOT, arq)), limpo))) {
			falhar('B', arq, `link relativo não resolve: ${destino}`)
		}
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// C. Todo .md de entregável é alcançável pelo catálogo da /ds.
//
// A assimetria é de propósito: slug no catálogo SEM .md é estado legítimo — a /ds
// mostra "em breve", e a curadoria pode ir na frente da escrita. O que não pode é
// o contrário: um .md escrito que nenhuma entrada do catálogo alcança nunca é
// renderizado, então é trabalho invisível.
// ─────────────────────────────────────────────────────────────────────────────
const catalogoPath = join(ROOT, DS.catalogo)
if (existsSync(catalogoPath)) {
	const src = readFileSync(catalogoPath, 'utf8')
	const slugsComp = new Set(
		[...src.matchAll(/slugs:\s*\[([^\]]*)\]/gs)].flatMap((m) =>
			[...m[1].matchAll(/'([a-z0-9-]+)'/g)].map((x) => x[1]),
		),
	)
	const slugsFound = new Set([...src.matchAll(/\{\s*slug:\s*'([a-z0-9-]+)'/g)].map((x) => x[1]))

	for (const [rotulo, dirs, slugs] of [
		['componente', DS.componentes, slugsComp],
		['foundation', DS.foundations, slugsFound],
	]) {
		for (const dir of dirs) {
			const abs = join(ROOT, dir)
			if (!existsSync(abs)) continue
			for (const nome of readdirSync(abs)) {
				if (extname(nome) !== '.md') continue
				const slug = nome.replace(/\.md$/, '')
				if (!slugs.has(slug)) {
					falhar(
						'C',
						`${dir}/${nome}`,
						`doc de ${rotulo} órfã: nenhuma entrada do catálogo alcança "${slug}"`,
						`adicione o slug em ${DS.catalogo} ou mova o arquivo pra notas/`,
					)
				}
			}
		}
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// D. Toda pasta lida por import.meta.glob está versionada.
//
// Esta é a asserção que pega a quebra mais silenciosa de todas: glob apontando pra
// pasta no .gitignore casa zero arquivos num clone limpo, o build passa sem erro
// nenhum, e a tela sobe vazia.
// ─────────────────────────────────────────────────────────────────────────────
function ignoradoPeloGit(caminho) {
	try {
		execFileSync('git', ['check-ignore', '-q', caminho], { cwd: ROOT, stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

function listarSrc(dir, acc = []) {
	for (const nome of readdirSync(dir)) {
		if (IGNORAR_DIR.has(nome)) continue
		const p = join(dir, nome)
		if (statSync(p).isDirectory()) listarSrc(p, acc)
		else if (/\.(tsx?|mjs)$/.test(p)) acc.push(p)
	}
	return acc
}

for (const abs of listarSrc(join(ROOT, 'src'))) {
	const texto = readFileSync(abs, 'utf8')
	for (const [, padrao] of texto.matchAll(/import\.meta\.glob\(\s*['"]([^'"]+)['"]/g)) {
		const prefixo = padrao.slice(0, padrao.indexOf('*')).replace(/^\//, '').replace(/\/$/, '')
		if (!prefixo) continue
		const arq = relative(ROOT, abs)
		if (!existsSync(join(ROOT, prefixo))) {
			falhar('D', arq, `glob aponta pra pasta inexistente: ${padrao}`)
		} else if (ignoradoPeloGit(prefixo)) {
			falhar(
				'D',
				arq,
				`glob lê pasta IGNORADA pelo git: ${padrao}`,
				'num clone limpo o glob casa zero arquivos e a tela sobe vazia, sem erro',
			)
		}
	}
}

// ─────────────────────────────────────────────────────────────────────────────
const NOMES = {
	A: 'caminho citado na norma existe',
	B: 'link relativo em .md resolve',
	C: 'doc de entregável é alcançável pelo catálogo',
	D: 'glob lê pasta versionada',
}

if (problemas.length === 0) {
	console.log(`check-docs: ok — ${todosMd.length} arquivos .md, 4 asserções.`)
	process.exit(0)
}

console.error(`\ncheck-docs: ${problemas.length} problema(s).\n`)
for (const letra of ['A', 'B', 'C', 'D']) {
	const doGrupo = problemas.filter((p) => p.asser === letra)
	if (!doGrupo.length) continue
	console.error(`  ${letra}. ${NOMES[letra]} — ${doGrupo.length}`)
	const porArquivo = new Map()
	for (const p of doGrupo) {
		if (!porArquivo.has(p.arquivo)) porArquivo.set(p.arquivo, [])
		porArquivo.get(p.arquivo).push(p)
	}
	for (const [arquivo, itens] of porArquivo) {
		console.error(`     ${arquivo}`)
		// Um arquivo com muitas ocorrências da mesma asserção é um problema só —
		// listar 50 linhas iguais esconde os outros grupos.
		for (const p of itens.slice(0, 5)) {
			console.error(`       · ${p.msg}${p.detalhe ? `\n         ${p.detalhe}` : ''}`)
		}
		if (itens.length > 5) console.error(`       · … e outros ${itens.length - 5}`)
	}
	console.error('')
}
process.exit(1)
