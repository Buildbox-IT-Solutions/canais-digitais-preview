---
status: documentado
---

## 1. Cabeçalho

```
Componente: Categoria
Status: 🔴 A CONFIRMAR — qual o status de maturidade (Estável / Em revisão / Experimental / Descontinuado)?
Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6699
Repo: src/components/categoria/
```

---

## 5. Props (contrato)

| Prop | Tipo | Default | Obrigatório |
|---|---|---|---|
| `label` | `string` | — | sim |
| `color` | `CategoriaColor` — `coral \| mint \| saffron \| lavander \| secondary-950 \| secondary-500 \| primary-600` | — | sim |
| `chip` | `boolean` | `false` | não |
| `href` | `string` | — | não |
| `className` | `string` | — | não |

---

## 6. Implementação

### React — fonte da verdade do comportamento

Exemplo real, `src/screens/conteudo/index.tsx:198-201`:

```tsx
<Categoria
  color="saffron"
  label={activePost.kicker}
  href="/categoria"
/>
```

### HTML alvo — contrato de saída para o WordPress

Variante mais comum no repo: com `href`, sem `chip` (link simples, cor aplicada via classe de texto).

```html
<a href="/categoria" class="text-body-sm font-body font-semibold text-saffron">
  Nome da editoria
</a>
```

Outras variantes de saída, geradas pelas mesmas props com valores diferentes:

- **`chip={true}` + `href`** — vira etiqueta com fundo, padding e hover; classes acrescentam-se às de texto:
  ```html
  <a href="/categoria" class="inline-flex items-center px-2 py-1 rounded-sm bg-white transition-colors hover:bg-black/8 text-body-sm font-body font-semibold text-mint">
    Nome da editoria
  </a>
  ```
- **sem `href`** (qualquer valor de `chip`) — vira `<span>` em vez de `<a>`; se `chip` também estiver ausente, fica só o texto colorido sem fundo/padding:
  ```html
  <span class="text-body-sm font-body font-semibold text-coral">
    Nome da editoria
  </span>
  ```

A classe de cor (`text-{color}`) é sempre um dos 7 valores do enum `CategoriaColor`, nunca um valor hardcoded.

**Checklist de conformidade** — o que o QA valida:
- [ ] Sem `href`, o elemento é `<span>`; com `href`, é `<a>` — nunca os dois combinados nem `<a>` vazio
- [ ] Classe de cor bate 1:1 com um dos 7 tokens de `CategoriaColor` (`text-coral`, `text-mint`, `text-saffron`, `text-lavander`, `text-secondary-950`, `text-secondary-500`, `text-primary-600`)
- [ ] `chip` só adiciona fundo/padding/hover — nunca troca a cor do texto
- [ ] `hover:bg-black/8` só aparece quando `chip` **e** `href` estão presentes juntos
