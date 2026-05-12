# Badge

**Figma:** _sem nodeId — utilitário in-house criado durante a migração PHP→React_
**Arquivo:** [`src/components/badge/index.tsx`](../src/components/badge/index.tsx)

Pill informativo / status. Cobre casos não atendidos por `Tag` (keyword clicável) nem por `Categoria` (etiqueta editorial colorida): rótulos como "Ativo", "Em breve", "Bloqueado", "Este dispositivo", "Destaque".

## Quando usar cada um

| Componente | Uso | Clicável | Tipografia |
|---|---|---|---|
| **Badge** | Status informativo (Ativo/Em breve/Erro) | Não | `text-label-sm` (11px) |
| **Tag** | Keyword clicável (filtros, tags de artigo) | Sim | `text-title-sm` (14px) |
| **Categoria** | Etiqueta editorial (Saúde, Tecnologia…) | Opcional via `href` | `text-body-sm` (12px) |

## Variantes

| Prop | Valores |
|---|---|
| `tone` | `mint` (default) · `neutral` · `coral` · `secondary` |
| `shape` | `square` (default, `rounded-sm`) · `pill` (`rounded-full`) |
| `icon` | ReactNode opcional à esquerda |

## Tons

| Tone | Background | Texto | Uso |
|---|---|---|---|
| `mint` | `bg-mint-light` | `text-mint` | Status positivo (Ativo, Favorito) |
| `neutral` | `bg-neutral-100` | `text-neutral-900` | Neutro (Em breve, Atalho) |
| `coral` | `bg-coral-light` | `text-coral` | Erro/Bloqueado |
| `secondary` | `bg-secondary-50` | `text-secondary-950` | Destaque (Conta Informa, dispositivo atual) |

Os 4 tons usam exclusivamente tokens do `@theme` em `src/index.css`. O token `--color-coral-light` (`#FFE4EB`) foi criado especificamente para o background do tom coral.

## Decisões de design

- Sem `disabled` — Badge é só rótulo, não tem interação.
- Tamanho fixo em `text-label-sm` (11px, semibold) — não escala. Para chips maiores, usar Categoria (`text-body-sm`) ou Tag (`text-title-sm`).
- O ícone, quando presente, troca o `px-2` por `pl-1.5 pr-2` para colar melhor visualmente.
