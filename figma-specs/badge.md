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

## Tons (estado atual)

| Tone | Background | Texto | Notas |
|---|---|---|---|
| `mint` | `bg-mint-light` | `text-mint` | Status positivo (Ativo, Favorito) |
| `neutral` | `bg-neutral-100` | `text-neutral-900` | Neutro (Em breve, Atalho) |
| `coral` | `bg-red-100` ⚠️ | `text-red-700` ⚠️ | Erro/Bloqueado. **Inconsistência conhecida** — não usa o token `--color-coral`; usa Tailwind defaults |
| `secondary` | `bg-secondary-50` | `text-primary-600` ⚠️ | Destaque. **Inconsistência conhecida** — texto é `primary-600`, não `secondary-*` |

> As duas inconsistências (`coral` e `secondary`) estão registradas no diagnóstico da sessão de 2026-05-12 (Tier 2) e aguardam decisão de design.

## Decisões de design

- Sem `disabled` — Badge é só rótulo, não tem interação.
- Tamanho fixo em `text-label-sm` (11px, semibold) — não escala. Para chips maiores, usar Categoria (`text-body-sm`) ou Tag (`text-title-sm`).
- O ícone, quando presente, troca o `px-2` por `pl-1.5 pr-2` para colar melhor visualmente.
