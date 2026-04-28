# Canais Digitais 2.0 — Tema WordPress (Design-as-Code)

Reprodução fiel do Design do Figma em PHP + Tailwind v4. Fonte da verdade visual para o time de Devs do tema WordPress real.

> Leia o [`CLAUDE.md`](./CLAUDE.md) antes de qualquer trabalho neste projeto.

**Figma:** https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0

## Stack

- **PHP** (.php files com header de doc) — destino: tema WordPress
- **Tailwind v4** — config via CSS (`@theme` em `src/tokens/tokens.css`), não JS
- **PHP built-in server** + `router.php` — preview local

## Como rodar o preview local

Pré-requisitos: PHP 8.x e o binário `tools/tailwindcss.exe` (ver abaixo).

### Setup único (Windows)

O PHP built-in server não funciona com espaços no path. Crie uma junction uma vez:

```
mklink /J C:\wptheme "C:\Pedro\Informa\Canais Digitais\Redesign\WP Theme"
```

### Subir o ambiente

Em **dois terminais** a partir de `C:\wptheme`:

```bash
# Terminal 1 — Tailwind watcher (regenera output.css ao salvar)
tools/tailwindcss.exe -i src/styles/input.css -o src/docs/output.css --watch

# Terminal 2 — Servidor PHP
cd C:\wptheme && php -S localhost:8000 router.php
```

### URLs de acesso

| URL | O que mostra |
|-----|-------------|
| <http://localhost:8000/src/docs/index.html> | Showcase de componentes (catálogo visual) |
| <http://localhost:8000/src/docs/tokens.html> | Tokens de design (cores, radius, sombras) |
| <http://localhost:8000/src/docs/typography.html> | Type specimen (tipografia) |
| <http://localhost:8000/src/layouts/404.php> | Layout 404 (PHP nativo) |

### Como o `router.php` funciona

| Rota | Comportamento |
|------|--------------|
| `/src/components/**` | Servido como **texto plano** — `showcase.js` resolve o PHP no client |
| `/src/layouts/**` | Executado como **PHP nativo** — `get_template_part()` polyfill ativo |
| demais arquivos | Comportamento estático padrão (HTML, CSS, JS, imagens) |

## Tailwind v4 standalone CLI

Baixe o binário único do release oficial e salve em `tools/tailwindcss.exe`:

- Releases: https://github.com/tailwindlabs/tailwindcss/releases
- Arquivo: `tailwindcss-windows-x64.exe`

O binário é gitignored — cada quem baixa o seu.

## Estrutura

```
src/
  components/   ← componentes .php (marcação + classes Tailwind)
  tokens/       ← tokens.css com @theme do Tailwind v4
  layouts/      ← templates de página
  styles/       ← input.css (entrypoint do Tailwind)
  docs/         ← index.html + showcase.js + output.css (gerado)
figma-specs/    ← anotações por componente
tools/          ← tailwindcss.exe (gitignored)
```

## Adicionando um novo componente

1. Consultar o frame no Figma
2. Verificar tokens em `src/tokens/tokens.css`
3. Criar `src/components/<nome>.php` (ver convenções no `CLAUDE.md` §5.2)
4. Registrar em `COMPONENTS` no `src/docs/showcase.js`
5. Documentar decisões em `figma-specs/<nome>.md`
