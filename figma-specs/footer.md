# Footer

**Figma:** [`335:9364`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=335-9364)
**Arquivo:** [`src/components/footer.php`](../src/components/footer.php)

Footer do **Food Connection** (by Informa Markets). Bg `primary-600`, texto branco, com 2 variantes: Desktop e Mobile.

## Desktop (max-w-screen-xl)
Estrutura `flex gap-72`:

- **Main column (flex-1):**
  - Brand/Informa logo (124×40, top pt-8 pb-4)
  - Grid 4-col × 3-row com as 11 editorias (gap-x-14 gap-y-4)
  - Divider + descrição + Divider (py-4, gap-4)
  - Flex row com legal links (Acessibilidade · Termos e condições do visitante · Termos de Uso · Política de privacidade) + copyright "© 2026 Informa PLC" à direita (pb-10 pt-4)

- **Right column (self-stretch):**
  - Social list VERTICAL com 5 ícones outlined (`border border-white size-10`): WhatsApp, LinkedIn, Facebook, YouTube, X/Twitter — px-4 py-8

## Mobile (w-[375px])
Empilhado:
1. Brand Informa (p-4)
2. Social list horizontal (5 ícones outlined — p-4 gap-4)
3. Editorias 2-col × 6-row (gap-24 items-start p-4)
4. Divider + descrição + Divider (px-4 py-2)
5. Legal links 2-col × 2-row (px-4 py-2)
6. Copyright (px-4 py-8)

## Descrição oficial (do Figma)
> "Canal de conteúdo oficial das feiras FiSA, Fispal Tecnologia, Tecnocarne e Fispal Food Service. Aqui você encontra conteúdo relevante e entrevistas com profissionais que compartilham informações, tendências e ideias para revolucionar a cadeia de alimentos e bebidas."

## Decisões de design
- **NÃO tem formulário de newsletter** — o footer real não captura email. A primeira versão inferida tinha, foi removida na sessão 5.
- **Social icons outlined** com `border border-white rounded-full size-10 p-2`. Usa brand icons inline (não partial icon-button) pela mesma razão do Header.
- **Dividers** usam `bg-neutral-100/50` pra ficarem visíveis sem atrapalhar o texto branco do footer dark.
- **Texto dos links**: `text-label-lg font-semibold text-white`. Hover → underline.
- Copyright e descrição usam `text-body-sm` (12/16 tracking 0.4).
- Editorias são as mesmas 11 do Header — fonte única de verdade para navegação.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5.
