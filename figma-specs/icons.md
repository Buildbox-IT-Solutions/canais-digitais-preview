# Icones — Canais Digitais 2.0

> Familia: **Material Symbols** (Google) — estilo **Outlined**, Weight 400 / Grade 0 / Optical size 24 / Fill 0 (config canônica, ver `CLAUDE.md`). `favorite` é a única exceção com Fill 1 — eixo FILL usado como sinal de estado "favoritado" (ver `docs/_achados.md`, "Ícones — divergência de família/estilo", 2026-08-19).
> Social/brand icons são SVGs específicos de cada marca (não Material Symbols).

---

## UI Icons (Material Symbols Outlined)

Todos os ícones de UI do DS usam `fill="currentColor"` e `viewBox="0 -960 960 960"` (viewBox padrão do Material Symbols — não é `0 0 24 24`). A cor é herdada via `text-{cor}` do container.

Fonte dos paths: `fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/<nome>/<default|fill1>/24px.svg` — essa URL já entrega exatamente a config canônica (Weight 400/Grade 0/Optical size 24), variando só o eixo Fill.

| Nome (chave no código) | Material name | Uso |
|------|--------------|------|
| search | `search` | search-bar, header, icon-button |
| close | `close` | icon-button (fechar drawer/modal/dialog/toast), search-bar (clear) |
| menu | `menu` | header (hamburger), icon-button |
| add | `add` | button (icon trailing) |
| arrow-back | `arrow_back` | back-link (telas de auth) |
| arrow-forward | `arrow_forward` | button (trailing), widget-podcast, dashboard |
| expand-more | `expand_more` | form-select, accordion, table-of-contents, ai-summary-block |
| keyboard-arrow-up | `keyboard_arrow_up` | contraparte de `expand-more` (recolher) |
| arrow-drop-down | `arrow_drop_down` | header nav-item chevron, dropdown-menu, decoração de select nativo |
| chevron-left / chevron-right | `chevron_left` / `chevron_right` | paginação (via `IconButton`), carrossel, afordância "navegar" em listas |
| download | `download` | download-section, banner-download, download-item |
| check | `check` | checkboxes, filter-chip (selected), menu-list-item |
| share | `share` | icon-button, conteúdo (share widget) |
| print | `print` | conteúdo (share widget) |
| play-arrow | `play_arrow` | play-button, video-container |
| pause | `pause` | play-button |
| home | `home` | menu-list-item |
| mail | `mail` | newsletters, form fields de e-mail |
| star | `star` | badge (chip "Complete seu Perfil" no profile-box) |
| visibility / visibility-off | `visibility` / `visibility_off` | password-input (mostrar/ocultar senha) |
| logout | `logout` | user-menu (header-desktop, dashboard) |
| settings | `settings` | dashboard (atalho conta) |
| dashboard | `dashboard` | dashboard (atalho visão geral) |
| folder | `folder` | dashboard (atalho arquivos) |
| work | `work` | profile-box (campo cargo/empresa) |
| camera | `camera` | dashboard-welcome (trocar foto) |
| edit | `edit` | profile-box (cta) |
| picture-as-pdf | `picture_as_pdf` | download-item / icon-tile (arquivo PDF) |
| docs | `docs` | download-item / icon-tile (arquivo doc — achado por *significado*, não é o `description` clássico, ver `_achados.md`) |
| image | `image` | download-item / icon-tile (arquivo imagem) |
| history | `history` | dashboard (últimas leituras) |
| delete / delete-outline | `delete` (Fill 0 nos dois — ver nota de FILL no `_achados.md`) | delete: ação destrutiva (status-ring/dialog "danger", general-item); delete-outline: remover item de lista (read-list-item-menu) |
| open-in-new | `open_in_new` | consentimentos (link externo) |
| schedule | `schedule` | telas de auth (aguardando/expiração) |
| remove | `remove` | form-checkbox (estado indeterminado) |
| toc | `toc` | conteúdo, table-of-contents |
| error / warning / info | `error` / `warning` / `info` | toast (variantes de estado) |
| check-circle | `check_circle` | toast (sucesso), password-checklist |
| cancel | `cancel` | toast |
| radio-button-unchecked | `radio_button_unchecked` | password-checklist |
| smartphone / laptop / desktop-windows | `smartphone` / `laptop` / `desktop_windows` | session-row (ícone por tipo de dispositivo da sessão ativa) |
| more-vert | `more_vert` | read-list-item-menu (trigger do menu) |
| favorite (Fill 1) / favorite-border (Fill 0) | `favorite` | favoritar/desfavoritar (dashboard-perfil-v4, Toggle) — eixo FILL é o sinal de estado |
| account-circle | `account_circle` | avatar fallback (header-desktop, login-button, side-menu) |
| book | `book` | coming-soon |
| description | `description` | dashboard (lista "Meus arquivos"), incentive-banner |
| location-on | `location_on` | profile-box (campo localização) |

---

## Brand / Social Icons

Não são Material Symbols — são SVGs oficiais de cada marca. Usam `fill="currentColor"` e `viewBox="0 0 24 24"` (viewBox clássico, diferente do Material Symbols acima).

| Nome | Uso |
|------|-----|
| WhatsApp | header-desktop, footer-desktop, side-menu, conteúdo (share) |
| LinkedIn | header-desktop, footer-desktop, side-menu, author-summary, authors-carousel, conteúdo (share) |
| Facebook | header-desktop, footer-desktop, side-menu |
| YouTube | header-desktop, footer-desktop, side-menu |
| X / Twitter | header-desktop, footer-desktop, side-menu, author-summary, authors-carousel, conteúdo (share) |
| Instagram | author-summary, authors-carousel |

---

## Uso padrão

```html
<!-- UI icon (Material Symbols Outlined) -->
<svg class="size-6" viewBox="0 -960 960 960" fill="currentColor">
  <path d="...material symbols path..."/>
</svg>

<!-- Brand icon (SVG oficial) -->
<svg class="size-6" viewBox="0 0 24 24" fill="currentColor">
  <path d="...brand SVG path..."/>
</svg>
```

Tamanhos: escala do `icon-button` é a referência — `size-6` (24px, large) · `size-[18px]` (medium) · `size-4` (16px, small). Ícones decorativos fora de um `IconButton` seguem o mesmo tamanho de quem os envolve; `arrow-drop-down` (sempre decorativo, nunca um botão isolado) é `size-4` em todo o código.

---

## Migrações pendentes

Os seguintes arquivos ainda usam ícones Lucide/Feather (stroke) que precisam ser migrados para Material Symbols Outlined:

- `_partials/search-bar.php` — search e close
- `search-bar.php` (showcase) — search e close
- `icon-button.php` — search, close, menu, arrows, bookmark, heart, share, plus, chevrons
- `button.php` — arrow-right, plus-circle
- `pagination.php` — chevron-left, chevron-right
- `banner-download.php` — download
- `download-section.php` — download
- `form-download.php` (layout) — download
- `home.php` (layout) — download, arrow-right
- `conteudo.php` (layout) — share widget icons (print, whatsapp, linkedin)
- `buscar.php` (layout) — search, close, expand_more
- `form-select.php` — chevron-down
- `filter-chip.php` — expand_more, check
