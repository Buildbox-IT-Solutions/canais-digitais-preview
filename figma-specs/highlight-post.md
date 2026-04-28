# Highlight Post

**Figma:** [`3104:56651`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3104-56651)
**Arquivo:** [`src/components/highlight-post.php`](../src/components/highlight-post.php)

Pull-quote tipográfica pra uso dentro do corpo editorial. NÃO é um hero — é apenas uma citação destacada com barra lateral cinza.

## Anatomia
```
<div py-6 (desktop) | py-4 (mobile) flex flex-col items-start w-[735]>
  <div class="flex gap-8 (desktop) | gap-4 (mobile) items-start w-full">
    <div class="w-1 bg-neutral-50 self-stretch"></div>  ← barra lateral
    <p class="flex-1 font-display text-{title-xl | title-lg-bold} text-primary-600">
      Citação longa aqui.
    </p>
  </div>
</div>
```

## Tipografia
| Device | Font | Size | Weight |
|---|---|---|---|
| Desktop | Aleo | `text-title-xl` (22/28) | Regular |
| Mobile | Aleo | `text-title-lg` (18/24) | **Bold** |

## Decisões de design
- **Completamente diferente do que eu tinha inferido** — a versão inicial era um hero 21:9 com gradient overlay + imagem + categoria + título. A real é apenas uma citação tipográfica, muito mais simples.
- **Barra lateral** é `w-1 bg-neutral-50` (4px cinza claro) com `self-stretch` pra acompanhar a altura do texto.
- **NÃO TEM imagem, categoria, autor nem botão** — pura tipografia.
- **Desktop vs Mobile** diferem no weight (Regular vs Bold) e no size (title-xl vs title-lg), seguindo a hierarquia tipográfica do DS.
- Container `w-[735px]` no Figma (mas uso `max-w-[735px]` pra ficar responsivo).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5. Reescrita completa: removido hero com imagem/gradient/categoria, reduzido pra pull-quote tipográfica fiel ao master.
