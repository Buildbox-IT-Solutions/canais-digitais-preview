# Card Colunista

**Figma:** [`1352:23176`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1352-23176)
**Arquivo:** [`src/components/card-colunista.php`](../src/components/card-colunista.php)

Card de colunista. **Apenas 2 variantes**: `state (Enabled|Hovered)`. Width 392px (max 496, min 392).

## Anatomia
Container `bg-white border border-neutral-100 rounded-sm overflow-hidden`, dividido em 2 áreas verticais:

### Área 1: photo + name/role
```
<div flex items-center w-full>
  <div p-3>
    <div border-neutral-50 rounded-sm size-104>
      <img>
    </div>
  </div>
  <div flex-1 flex-col pl-2 pr-4 py-4>
    <p font-display font-bold text-title-lg text-secondary-950 truncate>
      Author Name
    </p>
    <p font-body text-body-md text-neutral-900 truncate>
      Role description
    </p>
  </div>
</div>
```

### Área 2: citação/lead
```
<div flex flex-col items-start justify-end h-24 p-4 w-full>
  <p font-display font-bold text-title-md text-primary-600 line-clamp-3>
    Lorem ipsum dolor sit amet consectetur...
  </p>
</div>
```

## Estados
| Estado | BG | Border |
|---|---|---|
| Enabled | `white` | `neutral-100` |
| Hovered | **`neutral-50`** | **`primary-600`** |

## Decisões de design
- **Foto é SQUARED** (`rounded-sm` 4px), NÃO circular como eu tinha antes.
- **Author Name** é `text-secondary-950` (Ultramarine, link button color), NÃO `text-primary-600`.
- **Lead** (citação) é `text-title-md` Aleo Bold com tracking 0.15 (`tracking-[0.15px]`), `line-clamp-3`.
- Apenas 2 variantes (Enabled/Hovered) — sem variante "featured" como eu tinha antes.
- O master NÃO usa partials de categoria/byline — é uma anatomia única e específica.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
