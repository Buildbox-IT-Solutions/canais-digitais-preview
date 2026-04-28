# Search view full-screen + Search Item

**Figma Search view:** [`3148:50619`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3148-50619)
**Figma Search Item:** [`3148:51092`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3148-51092)
**Arquivo:** [`src/components/search-view.php`](../src/components/search-view.php)

Overlay full-screen mobile de busca. **4 variantes**: `labelText (Input text|Supporting text) × listItems (false|true)`.

## Anatomia
- Container: `bg-white w-412 flex flex-col items-start`
- **Header h-72** `flex gap-1 items-center p-1 w-full`:
  - Leading icon-button: `arrow_back` size-6 ghost
  - Content (input ou placeholder)
  - Trailing icon-button: `close` size-6 ghost (apenas no Input)
- **Divider** neutral-100
- **List** com items:

### Search Item types
1. **Suggestion** (`labelText=Input text + listItems`):
   - Search icon (size-24) + texto neutral-900 body-lg
   - `flex gap-1 items-center pl-1 pr-4 py-1`
2. **Recentes** (`labelText=Supporting text + listItems`):
   - History icon (clock) + texto neutral-900
   - Mesmo padding que Suggestion
3. **Veja também** (News Card vertical):
   - `flex flex-col items-start px-4 py-3`
   - Categoria mint chip OFF + título Aleo Bold 18 line-clamp-2

## Estados
| labelText | listItems | conteúdo |
|---|---|---|
| Input text | false | header com input + caret |
| Input text | true | header + lista de Suggestions |
| Supporting text | false | header com placeholder cinza |
| Supporting text | true | header + Recentes + section "Últimas notícias" |

## Decisões de design
- **REESCRITA**. A versão antiga era um overlay desktop full-screen com header xl + 2 colunas (buscas populares + resultados). Real é um container mobile (w-412) bem mais simples.
- **Sem chips de buscas populares** — apenas Recentes e Veja também (News Cards).
- **3 search item types** (Suggestion, Recentes, Veja também), NÃO 3 (com thumbnail/play/compacto).
- News Cards no "Veja também" são VERTICAIS sem thumbnail — apenas categoria + título Aleo Bold 18.
- Header é h-72, NÃO h-20.
- "Últimas notícias" como title de section antes do Veja também.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
