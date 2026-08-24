# Fase 0 — Reconhecimento de componentes

> Gerado em 2026-08-14. Levantamento mecânico (grep de imports + contagem de stories) sobre `src/components/`. Nenhum código foi modificado nesta fase.

## Metodologia

- **Usos totais**: nº de arquivos (fora da própria pasta do componente) que importam de `~/components/<nome>`.
- **Telas**: quantos desses usos são em `src/screens/`.
- **Comps**: quantos desses usos são em outro `src/components/`.
- **Classificação**: `base` (sem dependência de outros componentes de domínio, ou só de `icon`), `composto` (montado a partir de 2+ componentes de domínio), `de página` (uso único).
- **Variantes**: nº de `export const` no arquivo `.stories.tsx` do componente (proxy para riqueza de variantes/estados implementados). `NOSTORY` = não tem arquivo de stories.

## Tabela completa (ordenada por nº de usos)

| # | Componente | Usos totais | Telas | Comps | Classificação | Variantes (stories) |
|---|---|---|---|---|---|---|
| 1 | `icon` | 70 | 22 | 48 | base | 0 — **casca** |
| 2 | `header-desktop` | 17 | 15 | 2 | composto | 3 |
| 3 | `footer-desktop` | 15 | 15 | 0 | base* | 1 — quase casca |
| 4 | `news-card` | 13 | 9 | 4 | composto | 25 — mais rico do repo |
| 5 | `categoria` | 13 | 2 | 10 | base | 15 |
| 6 | `divider` | 12 | 4 | 8 | base | 2 |
| 7 | `status-ring` | 11 | 8 | 3 | base | 5 |
| 8 | `section-title` | 11 | 8 | 3 | base | 5 |
| 9 | `proof-panel-minimal` | 10 | 10 | 0 | base | 7 |
| 10 | `modal` | 9 | 6 | 3 | base | 6 |
| 11 | `thumbnail` | 8 | 3 | 5 | base | 6 |
| 12 | `button` | 8 | 3 | 5 | base | 11 |
| 13 | `badge` | 7 | 1 | 6 | base | 7 |
| 14 | `icon-button` | 7 | 1 | 6 | base | 5 |
| 15 | `ad-frame` | 6 | 5 | 1 | base | 4 |
| 16 | `toast` | 6 | 4 | 1 | base | 6 |
| 17 | `incentive-download-dialog` | 6 | 2 | 4 | composto | 2 |
| 18 | `password-checklist` | 5 | 3 | 2 | base | 3 |
| 19 | `play-button` | 5 | 2 | 3 | base | 6 |
| 20 | `toggle` | 5 | 1 | 4 | composto | 6 |
| 21 | `menu-list-item` | 4 | 0 | 4 | base | 5 |
| 22 | `icon-tile` | 4 | 0 | 4 | base | 3 |
| 23 | `bottom-sheet` | 4 | 0 | 4 | base | 1 |
| 24 | `dialog` | 3 | 3 | 0 | composto | 6 |
| 25 | `widget-em-alta` | 3 | 3 | 0 | composto | 1 |
| 26 | `form-field` | 3 | 2 | 1 | base | **0 — NOSTORY** |
| 27 | `sponsor-line` | 3 | 1 | 2 | base | 2 |
| 28 | `dropdown-menu` | 3 | 0 | 3 | base | 2 |
| 29 | `pagination` | 2 | 2 | 0 | base | 6 |
| 30 | `form-checkbox` | 2 | 2 | 0 | base | 5 |
| 31 | `avatar` | 2 | 2 | 0 | base | 5 |
| 32 | `download-item` | 2 | 2 | 0 | composto | 4 |
| 33 | `spinner` | 2 | 2 | 0 | base | 3 |
| 34 | `general-item` | 2 | 2 | 0 | composto | 3 |
| 35 | `profile-box` | 2 | 2 | 0 | composto | 2 |
| 36 | `newsletter-item` | 2 | 2 | 0 | base | 2 |
| 37 | `incentive-banner` | 2 | 2 | 0 | composto | 2 |
| 38 | `drawer` | 2 | 2 | 0 | base | 2 |
| 39 | `dashboard-welcome` | 2 | 2 | 0 | composto | 2 |
| 40 | `incentive-newsletter-dialog` | 2 | 2 | 0 | composto | 1 |
| 41 | `session-row` | 2 | 2 | 0 | composto | **0 — NOSTORY** |
| 42 | `form-select` | 2 | 2 | 0 | base | **0 — NOSTORY** |
| 43 | `tooltip` | 2 | 1 | 1 | base | 4 |
| 44 | `byline` | 2 | 1 | 1 | base | 3 |
| 45 | `side-menu` | 2 | 1 | 1 | composto | 2 |
| 46 | `podcast-card` | 2 | 1 | 1 | composto | 2 |
| 47 | `webstory-card` | 2 | 1 | 1 | composto | 1 |
| 48 | `google-logo` | 2 | 0 | 2 | base | 2 |
| 49 | `access-invite` | 2 | 0 | 2 | composto | 2 |
| 50–89 | *(40 componentes com uso único — ver nota abaixo)* | 1 | — | — | **de página** | var. |
| — | `image`, `loading`, `card` | 0 | 0 | 0 | **não referenciado** | 9 / 4 / 3 |
| — | `toaster` | 1 (via `router.tsx`) | — | — | composto (envolve `toast`) | 1 |

### Nota sobre os 40 de uso único

`dashboard-tabs-v4`, `avatar-stack`, `link-button`, `banner-download`, `accordion`, `videos-section`, `tag`, `table-of-contents`, `table-of-contents-margin`, `table-of-contents-icon`, `category-column`, `audio-version-block`, `widget-podcast`, `webstories-section`, `ultima-secao`, `recent-news-item`, `proteina-animal-section`, `especialistas-section`, `download-section`, `destaque-section`, `banner-newsletter`, `ai-summary-block`, `read-list-item`, `sponsor-card`, `social-button`, `password-strength`, `orbit`, `form-disclaimer`, `dashboard-tabs-v3`, `dashboard-header`, `coming-soon`, `access-method-card`, `switch`, `video-card`, `nav-item`, `skeleton`, `search-bar`, `login-button`, `header-informa`.

Todos classificados como "de página" pela definição do briefing (usados uma vez só), independente de riqueza interna.

Destaque: **`read-list-item`** tem 13 stories (rico) mas só é usado em uma tela até agora — provável candidato a virar "base" quando a área de Favoritos crescer.

### Casos de fronteira

- **`footer-desktop`** está classificado como "base" pela regra mecânica (só depende de `icon`), mas na prática é uma seção de chrome de página, não um átomo reutilizável — marcado para validação.
- **`image`, `loading`, `card`** não têm nenhuma referência fora da própria pasta — candidatos a dead code. Não é ação desta fase (regra invariante 1: não modificar componente); vai para `docs/_achados.md` quando a Fase 1 começar.

## Proposta dos 6 primeiros a documentar

| # | Componente | Justificativa (uma linha) |
|---|---|---|
| 1 | `news-card` | Maior superfície de variantes do repo (25 stories), composto, presente em 9 telas + 4 componentes — é o card editorial que todo portal reproduz diferente. |
| 2 | `header-desktop` | 2º maior reuso (17), presente em praticamente toda tela, composição complexa (11 sub-componentes) com regras de responsividade/dropdown que não saem só olhando o Figma. |
| 3 | `button` | Átomo mais usado como "base" (8 usos, 11 variantes), vocabulário de CTA que se repete em todo o app — pedido clássico de handoff. |
| 4 | `modal` | Fundação de todos os fluxos de auth + `dialog`/`incentive-*-dialog`; `types.ts` já expõe regras nada óbvias (`mobileFullScreen`, `padded`, `closeHref` vs `onClose`) que o back precisa saber sem perguntar. |
| 5 | `categoria` | Base reaproveitada por `news-card`, `video-card`, `webstory-card`, `read-list-item`, `destaque-section` — 15 variantes de cor, é o "tag" que aparece em quase todo conteúdo editorial. |
| 6 | `toast` | Menor uso bruto (6) mas comportamento de empilhamento/dismiss (reskin recente estilo sonner) é puramente de interação — impossível de derivar do Figma estático, alto risco de divergência entre os 11 portais. |

## Gate

Aguardando confirmação da lista acima antes de iniciar a Fase 1 (piloto stub do primeiro componente aprovado).
