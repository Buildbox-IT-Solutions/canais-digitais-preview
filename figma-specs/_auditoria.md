# Auditoria Visual — 2026-04-10

## Resumo
- Total de componentes auditados: 52 showcases + 22 partials
- Total de layouts auditados: 10
- Divergencias encontradas: 2 (Alta: 0 | Media: 1 | Baixa: 1)
- Divergencias corrigidas: 1
- Divergencias pendentes de aprovacao: 1

---

## Metodologia

A auditoria foi conduzida em duas etapas:

1. **Varredura automatizada de codigo** — grep em massa por padroes incorretos em todos os 52 showcases, 22 partials e 10 layouts:
   - Cores hardcoded (`#hex`, `bg-[#`, `text-[#`, `border-[#`)
   - Shadows legados (`shadow-elevation-*`)
   - Container legado (`max-w-[1224px]`)
   - Radius fora do DS (`rounded-md`)
   - Valores arbitrarios inline

2. **Inspecao visual via Figma MCP** — screenshots e design context dos componentes de alta prioridade (Header, Footer, News Card, Button, Video Card, Section Titles) comparados com as implementacoes.

---

## Componentes — divergencias corrigidas

### 1. Partial section-title.php — padding responsivo ausente
- **COMPONENTE:** Section Title / Style 1 (partial)
- **ARQUIVO:** `src/components/_partials/section-title.php`
- **DIVERGENCIA:** Container usava `px-4` sem `lg:px-6`. Todos os layouts e demais partials ja tinham sido migrados para `px-4 lg:px-6` na sessao anterior, mas o section-title ficou de fora.
- **SEVERIDADE:** Media
- **IMPACTO:** Desalinhamento de 8px entre o section-title e o conteudo abaixo em viewports >= 1024px. Afeta 6 layouts (home, 404, conteudo, contato, sobre, anuncie).
- **ACAO TOMADA:** Adicionado `lg:px-6` nas duas ocorrencias (linhas 29 e 41).

---

## Componentes — divergencias pendentes

### 1. Text field — cor de erro hardcoded
- **COMPONENTE:** Text field
- **ARQUIVO:** `src/components/text-field.php`
- **DIVERGENCIA:** Estado Error usa `text-[#bf0413]` e `border-[#bf0413]` (5 ocorrencias). O vermelho #bf0413 e um valor Material Design puro que **nao existe nos tokens do DS** (`tokens.css`).
- **SEVERIDADE:** Baixa
- **MOTIVO DE NAO CORRIGIR:** Ja documentado no header do componente como decisao intencional. Para corrigir seria necessario adicionar um token `--color-error` ao `tokens.css`, o que e uma decisao de DS (nao de auditoria). Recomenda-se criar o token em sessao futura dedicada a error states.

---

## Layouts — divergencias corrigidas

Nenhuma. Todos os 10 layouts estavam corretos apos a migracao anterior.

---

## Layouts — divergencias pendentes

Nenhuma.

---

## Verificacoes realizadas — resultado limpo

| Verificacao | Componentes | Layouts | Status |
|---|---|---|---|
| `shadow-elevation-*` | 0 ocorrencias | 0 ocorrencias | Limpo |
| `max-w-[1224px]` | 0 ocorrencias | 0 ocorrencias | Limpo |
| `rounded-md` no markup | 0 ocorrencias | 0 ocorrencias | Limpo |
| `bg-[#hex]` no markup | 0 ocorrencias | 0 ocorrencias | Limpo |
| `text-[#hex]` no markup | 5 em text-field.php (documentado) | 1 em 404.php (documentado) | Excepcoes documentadas |
| Container `px-4 lg:px-6` | Corrigido em section-title | Todos corretos | Limpo |
| `rounded-lg` uso correto | Sim (widgets, per DESIGN.md) | N/A | Correto |
| `bg-black/8` (MD3 state layer) | Correto | N/A | Correto |
| `bg-black/20` (scrim overlay) | Correto | Correto | Correto |
| Footer `px-6` sem responsivo | Correto (padding intrinseco do footer, nao container de pagina) | N/A | Correto |
| `text-[105px]` no 404 | N/A | Documentado como excecao | Correto |

---

## Decisoes de design tomadas durante a auditoria

1. **Footer `px-6` e intriseco, nao container de pagina** — O footer-desktop partial usa `px-6` fixo (sem `lg:px-6`). Isso e correto porque o footer tem seu proprio layout interno com gap-[72px] e o padding faz parte do design do componente, nao do padrao de container de pagina.

2. **Showcases nao precisam de `lg:px-6`** — Os showcases em `/src/components/*.php` usam `mx-auto space-y-2` sem padding de pagina porque sao renderizados dentro do iframe do showcase.js que ja controla o viewport.

3. **Token de erro nao existe no DS** — O vermelho #bf0413 do text-field error state precisa de um token dedicado. Sugestao: `--color-error: #bf0413` em tokens.css, a ser criado em sessao futura.

---

## Estado pos-auditoria

- 52 showcases: **todos limpos**
- 22 partials: **todos limpos** (1 corrigido nesta sessao)
- 10 layouts: **todos limpos**
- Tailwind rebuild: executado com sucesso
