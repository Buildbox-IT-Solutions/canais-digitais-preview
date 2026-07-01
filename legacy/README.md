# legacy/ — referência residual da migração PHP→React

Esta pasta continha o protótipo PHP original do projeto. A migração para
React foi concluída (marco na tag `migracao-php-react-v1`), e a maior parte
do legado já foi removida nesta limpeza:

- Componentes com equivalente React confirmado — removidos.
- Layouts/telas já migrados ou superados por versões canônicas — removidos.
- Infra e tooling do preview PHP (`index.php`, `router.php`, `Dockerfile`,
  site estático de DS em `src/docs/`, geradores em `tools/`, tokens/estilos
  duplicados, JS de interação) — removidos.
- Documentos de contexto (`DESIGN.md`, `FEATURE-cadastro*.md`, `.impeccable.md`)
  e templates de e-mail — o conteúdo único foi extraído antes da remoção para
  `figma-specs/_regras-de-negocio.md` e `docs/legacy-reference/emails/`.

## O que permanece aqui (e por quê)

O que sobrou é **referência intencional** para trabalho de migração ainda
pendente, não sobra esquecida:

- **`src/components/`** — componentes que ainda **não têm equivalente React**
  (ex.: `tooltip`, `bottom-sheet`, `avatar-stack`, `filter-chip`, `search-view`,
  `relacionadas`, `resumo-box`, `highlight-post`, `author-summary`,
  `authors-carousel`, `header-author`, `loading-button`, `video-container`),
  além de padrões de card que hoje existem apenas **inline** dentro das telas
  React e ainda não foram extraídos como componentes próprios com stories
  (ex.: `news-card*`, `video-card*`, `podcast-card*`, `webstories`,
  `widget-*`, `side-menu`, `banner-newsletter`).
- **`src/layouts/`** — três telas **não migradas**: `cadastro-v2.php` e
  `login-v2.php` (designs alternativos single-column, diferentes das telas
  homônimas que existem em React) e `onboarding-backup.php` (wizard com chips
  de interesse + tela de celebração, não coberto pelo cadastro atual).

## Histórico completo

Todo o conteúdo removido permanece recuperável na tag
**`migracao-php-react-v1`** — por exemplo:

```bash
git show migracao-php-react-v1:legacy/src/components/tooltip.php
```

Quando os itens pendentes acima forem concluídos, esta pasta deve desaparecer
por completo.
