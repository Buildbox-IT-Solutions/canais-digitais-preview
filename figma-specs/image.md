# Image

**Figma:** [Image — `30:3878`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=30-3878)
**Arquivo:** [`src/components/image.php`](../src/components/image.php)

Wrapper que impõe `aspect-ratio` na imagem contida, com `rounded-sm` (4px) e placeholder `bg-neutral-100`. 9 razões: 5 landscape + 4 portrait.

| Ratio | Tailwind | Uso |
|---|---|---|
| 1:1 | `aspect-square` | avatars grandes, thumbnails quadrados |
| 4:3 | `aspect-[4/3]` | legacy/photo |
| 3:2 | `aspect-[3/2]` | editorial |
| 16:9 | `aspect-video` | hero/card padrão (Tailwind default) |
| 21:9 | `aspect-[21/9]` | cinemascope, banners largos |
| 3:4 | `aspect-[3/4]` | portrait editorial |
| 2:3 | `aspect-[2/3]` | capa de revista |
| 9:16 | `aspect-[9/16]` | vídeo vertical / stories |
| 9:21 | `aspect-[9/21]` | story ultra-tall |

**Decisões de design:**
- O componente **não tem props de state** (hover/disabled) — é um container passivo. Qualquer reação (hover zoom, dark overlay) fica por conta do Card que envolve.
- A imagem interna usa `object-cover` + `w-full h-full` pra preencher o wrapper sem distorcer.
- Placeholder `bg-neutral-100` (#D6D8DD) aparece enquanto a imagem carrega ou se a URL falhar. Matches o fill do Figma.
- `overflow-hidden` no wrapper é **obrigatório** pra garantir que o `object-cover` não vaze no radius.
- 4 ratios usam arbitrary values (`aspect-[4/3]`, etc) porque Tailwind só tem `aspect-square` e `aspect-video` nativos. Sem token perdido.
