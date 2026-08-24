# Template de Página de Componente — Canais Digitais

> Mix aplicado: estrutura enxuta (Nord) + "quando não usar" e copy (Polaris) + dual-stack (Primer) + status de maturidade em uma linha (Carbon).
> Regra de ouro: se uma seção estiver vazia, **apague a seção**. Doc com campo vazio ensina o time a ignorar a doc.

---

## 1. Cabeçalho (sempre 4 linhas, nunca mais)

```
Componente: NewsCard
Status: Estável | Em revisão | Experimental | Descontinuado
Figma: [link direto pro node]
Repo: src/components/NewsCard/
```

---

## 2. O que é e quando usar

Uma frase do que o componente faz. Depois:

**Use quando**
- caso 1
- caso 2

**Não use quando**
- caso 1 → use `OutroComponente`
- caso 2 → use `OutroComponente`

> O "não use" é a seção mais valiosa da doc inteira. É ela que evita 11 portais divergirem.

---

## 3. Anatomia

Print do Figma com as partes numeradas + lista:

1. Container
2. Imagem (aspect ratio X)
3. Editoria (link)
4. Título (máx. N linhas)
5. Metadados (data, autor)

Só liste partes que têm **regra**. Parte óbvia não precisa de número.

---

## 4. Variantes e estados

| Variante | Uso | Diferença |
|---|---|---|
| `default` | listagens | — |
| `featured` | topo da home | imagem 16:9, título maior |
| `compact` | sidebar, relacionados | sem imagem |

**Estados:** default · hover · focus-visible · loading (skeleton) · vazio

Estado que não existe no componente, não liste.

---

## 5. Props (contrato)

| Prop | Tipo | Default | Obrigatório |
|---|---|---|---|
| `title` | string | — | sim |
| `href` | string | — | sim |
| `variant` | `default \| featured \| compact` | `default` | não |
| `image` | `{src, alt}` | — | não |

---

## 6. Implementação

### React — fonte da verdade do comportamento

```tsx
<NewsCard
  variant="featured"
  title="Título da matéria"
  href="/noticia/slug"
  image={{ src: "...", alt: "..." }}
/>
```

### HTML alvo — contrato de saída para o WordPress

O que precisa sair renderizado no browser. Como o PHP produz isso é decisão do time de back-end.

```html
<article class="cd-news-card cd-news-card--featured">
  <a class="cd-news-card__link" href="/noticia/slug">
    <img class="cd-news-card__image" src="..." alt="...">
    <span class="cd-news-card__editoria">Energia</span>
    <h3 class="cd-news-card__title">Título da matéria</h3>
    <time class="cd-news-card__date" datetime="2026-08-14">14 ago 2026</time>
  </a>
</article>
```

**Checklist de conformidade** — o que o QA (Ulisses) valida:
- [ ] Classes e hierarquia batem com o contrato acima
- [ ] Tokens aplicados via CSS custom properties, sem valor hardcoded
- [ ] Estados de foco visíveis com teclado

---

## 7. Comportamento e acessibilidade

Só o que o código **não** revela sozinho:

- Área clicável cobre todo o card, mas gera **um único link** no DOM (não empilhar `<a>` dentro de `<a>`)
- Título trunca em N linhas com `line-clamp`; o texto completo permanece acessível a leitor de tela
- `focus-visible` com outline de 2px no container, não no link interno
- Abaixo de 768px, muda para `compact`

---

## 8. Conteúdo (só quando houver texto fixo)

| Elemento | Regra | Exemplo |
|---|---|---|
| CTA | verbo no infinitivo, máx. 2 palavras | "Ler matéria" |
| Estado vazio | sem culpar o usuário | "Nenhuma matéria nesta editoria ainda." |

Componente sem texto fixo? Apague a seção.

---

# Como operar isso sendo um só

**Comece com 6 componentes, não com 40.** Os que aparecem em mais de um dos 11 portais e os que geram mais retrabalho no handoff. Provavelmente: NewsCard, Button, Header/Nav, Form Field, Modal, Paywall/Login Prompt.

**Três níveis de profundidade, e tudo bem parar no nível 1:**

| Nível | Seções | Quando |
|---|---|---|
| 1 — Stub | 1, 5, 6 | componente novo, ainda mudando |
| 2 — Utilizável | + 2, 4, 7 | entrou em handoff |
| 3 — Completo | + 3, 8 | é reusado por 3+ portais |

**A seção 6 e a 7 são as que pagam o investimento.** Se um dia você só tiver tempo para duas seções, sejam essas: o contrato de saída e as regras invisíveis. O resto o Figma já conta.
