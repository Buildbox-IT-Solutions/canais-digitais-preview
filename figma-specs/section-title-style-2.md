# Section Title / Style 2

**Figma:** [`552:5123`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=552-5123)
**Arquivo:** [`src/components/section-title-style-2.php`](../src/components/section-title-style-2.php)

Variante alternativa do Section Title. **9 cores × 2 estados (Enabled|Hovered) = 18 variants**.

## Anatomia
Diferente do Style 1 (que tem 3 bullets + linha grafism), Style 2 é minimalista:

```
<div pt-10 flex flex-col items-center w-full>
  <div max-w-screen-xl flex flex-col gap-2 items-start>
    <!-- grafism: linha horizontal h-px full-width -->
    <div flex items-center w-full>
      <div flex-1 h-px bg-{cor}></div>
    </div>
    <!-- container do título h-72 com texto centralizado -->
    <div flex h-[72px] items-center w-full>
      <h2 text-headline-md font-display font-bold text-center text-{cor}>
        Section Title
      </h2>
    </div>
  </div>
</div>
```

## Cores → tokens
| Figma | Token |
|---|---|
| Ultramarine | `secondary-950` (#003cb2) |
| Sky | `secondary-500` (#28b4ff) |
| Indigo | `primary-600` (#024) |
| Lavander | `lavander` (#9423fc) |
| Coral | `coral` (#ff547c) |
| Saffron | `saffron` (#b05223) |
| Mint Dark | `mint` (#00786e) |
| Carbon | `neutral-950` (#283857) |
| White | `white` (precisa de fundo escuro) |

## Tipografia
- `text-headline-md` (28/36) Aleo Bold
- `text-center` (alinhamento central, NÃO left como Style 1)

## Decisões de design
- **REESCRITA COMPLETA**. A versão anterior tinha 3 bullets verticais (`w-1 h-8`) à esquerda + título inline — completamente errada.
- O Style 2 real é apenas: linha horizontal `h-px` full-width na cor da variante, então um container `h-72` com o título centralizado.
- Hover state: cor do divider e do título ficam mais claras (overlay branco 20%) — omitido aqui (estado puro de prototype, sem efeito visual no master).
- **Sem grafism de bullets** — essa é a principal diferença vs Style 1.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
