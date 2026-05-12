# Categoria

**Figma:** [Categoria — `71:6699`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6699)
**Arquivo:** [`src/components/categoria.php`](../src/components/categoria.php)

Etiqueta de editoria. 7 cores categoricais × 2 modos visuais (`Chip=On` pill, `Chip=Off` texto inline) × hover. Tipografia: `text-body-sm font-body font-semibold` (12px Open Sans SemiBold).

| Style | Token | Hex |
|---|---|---|
| Coral | `text-coral` | `#FF547C` |
| Mint | `text-mint` | `#00786E` |
| Saffron | `text-saffron` | `#B05223` |
| Lavander | `text-lavander` | `#9423FC` |
| Ultramarine | `text-secondary-950` | `#003CB2` |
| Sky | `text-secondary-500` | `#28B4FF` |
| Indigo | `text-primary-600` | `#002244` |

**Decisões de design:**
- 4 cores **novas** foram adicionadas em `tokens.css` como categorical colors (Coral/Mint/Saffron/Lavander). Não fazem parte da escala 50-950 porque são valores únicos por nome semântico — não escalam visualmente.
- 3 cores reutilizam tokens existentes (Ultramarine = secondary-950, Sky = secondary-500, Indigo = primary-600).
- `Chip=On` é o pill colorido em fundo branco; `Chip=Off` é só o texto solto. Hover só faz sentido no modo On **e quando há `href`** — chip estático (`<span>`) não recebe hover.
- Hover do chip clicável usa `hover:bg-black/8` (state-layer MD3 documentado no CLAUDE.md), não `hover:bg-neutral-50` do legado. A mudança escureceu levemente o tom mas alinhou com o padrão do DS.
- Nenhum estado disabled — categorias são sempre ativas. O Figma confirma só 2 estados: Enabled e Hovered.
