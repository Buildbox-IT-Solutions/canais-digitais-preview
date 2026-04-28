# Video Card 2.0 / Inverse

**Figma:** [`2803:26398`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2803-26398)
**Arquivo:** [`src/components/video-card-inverse.php`](../src/components/video-card-inverse.php)

Variante "Inverse" do Video Card 2.0. **NÃO TEM container próprio** — é apenas o conteúdo direto, com texto branco/light, pra ser usado SOBRE uma seção de fundo escuro.

## Diferenças vs Video Card 2.0
| Elemento | Video Card 2.0 | Video Card / Inverse |
|---|---|---|
| Container | sem container | sem container (mas usado em bg dark) |
| Categoria | `chip off` text-mint | **`chip on`** bg-white text-mint (visivel sobre dark) |
| Title color enabled | `text-primary-600` | **`text-white`** |
| Title color hovered | `group-hover:underline` | **`group-hover:text-primary-100`** (#d4dae0) |
| Lead | `text-neutral-900` | **`text-neutral-50`** (#e9eaec) |
| Author "Por" | `text-neutral-900` | **`text-neutral-50`** |
| Author Name | `text-neutral-950 font-bold` | **`text-neutral-50 font-bold`** |
| Play button | mesmo (overlay) | mesmo (overlay) |

## Decisões de design
- O showcase embrulha tudo num `bg-primary-600` SOMENTE pra preview visual. Em uso real (layouts), a section pai define o fundo (qualquer cor escura).
- **Não tem `bg-primary-600 rounded-md p-10`** como container do card — isso era uma inferência minha errada. O componente é "transparente".
- Categoria `chip=on` é a única forma de garantir contraste do label sobre o fundo escuro — vira um pill branco com texto mint.

## Composição via partials
- `_partials/thumbnail` (com play overlay)
- `_partials/categoria` (chip on mint)

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
