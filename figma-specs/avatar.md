# Avatar

**Figma:** [Avatar — `751:3445`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=751-3445)
**Arquivo:** [`src/components/avatar.php`](../src/components/avatar.php)

Imagem de perfil em duas formas: `Squared` (`rounded-sm` = 4px) e `Rounded` (`rounded-full`), cada uma com estado `Hovered` que sobrepõe um state-layer branco semitransparente (#FFFFFF24 ≈ `bg-white/25`). Tamanho default 80×80 (`size-20`); o Dev pode trocar livremente.

**Decisões de design:**
- Hover é implementado como overlay absoluto dentro de um wrapper `group`, pra preservar a imagem original (Material state-layer pattern).
- Bg de placeholder `bg-neutral-100` aparece enquanto a imagem carrega ou se a URL falhar — bate com a cor neutra dos slots vazios do Figma.
- Sem prop `size` no markup: shape é uma classe utilitária (`rounded-sm` ou `rounded-full`), tamanho idem (`size-20`, `size-16`, etc). Mantém o componente simples e idiomático em Tailwind.
- O state-layer hover usa `transition-colors` pra ter um fade suave, que o Figma também sugere via "state-layer" como camada separada.
