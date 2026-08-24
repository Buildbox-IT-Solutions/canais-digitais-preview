# Toast

**Figma:** — (sem nodeId; derivado de `FEATURE-cadastro.md` — 🔴 A CONFIRMAR: equivalente atual não identificado)
**Status:** implementação divergiu deliberadamente do Figma original para seguir a estrutura do shadcn/ui — ver `docs/superpowers/specs/2026-08-06-toast-shadcn-refactor-design.md`. Este documento reflete o estado atual (pós-divergência), não mais o Figma original.

Notificação flutuante usada para feedback assíncrono (salvar perfil, senha redefinida, erros de submissão). Auto-dismiss de 4s (sobrescrevível via `durationMs`), empilhamento estilo sonner (ver `src/lib/toast-store.ts` / `src/components/toaster/`).

**Variantes (`type`):** `success` | `error` | `warning` | `info`. Cada tipo define o ícone Material e a cor do ícone.

**Cores do ícone:**
- `success` → `#16A34A`
- `error` → `#bf0413` (red MD do DS — arbitrary value)
- `warning` → `#F59E0B`
- `info` → `secondary-950` (#003CB2)

**Estrutura (fiel ao shadcn/ui, temizada com os tokens do projeto):**
- Card neutro — `bg-white border border-neutral-200 rounded-lg shadow-lg` — **sem borda esquerda colorida** (decisão anterior descartada; cor de destaque agora só no ícone, para seguir a convenção real do shadcn em vez de uma mistura MD3/shadcn).
- Itens (ícone, conteúdo, ação, fechar) centralizados verticalmente (`items-center`), não alinhados ao topo.
- Conteúdo: `title?` (negrito) + `message` como description abaixo, quando `title` está presente. Sem `title`, `message` ocupa sozinho o espaço (compatibilidade com os usos atuais, que só passam `message`).
- Ação (opcional): botão compacto (`h-8`, `rounded-full`, borda fina, sem preenchimento) — não é o componente `Button` do projeto (que é bold/CTA com cores de marca, destoaria dentro do card), mas segue o mesmo formato pill.
- Botão de fechar: sempre visível (desvio intencional do shadcn puro, que revela só no hover — aqui não há swipe-to-dismiss, então hover-only deixaria touch/mobile sem forma manual de fechar).
- Sem swipe-to-dismiss / drag (fora de escopo — projeto não usa Radix).

**Posicionamento:**
- `fixed bottom-6 right-6`, em todos os breakpoints (não adota o `top-0` mobile padrão do shadcn — mantém a convenção original deste projeto).
- Layout mobile dedicado (`fixed bottom-0 inset-x-0 p-4`, mencionado em versões anteriores desta spec) **continua não implementado** — pendência conhecida, não é objeto das mudanças recentes.

**Empilhamento:**
- Até 3 toasts simultaneamente visíveis: o mais novo à frente, até 2 anteriores "espiando" atrás (offset + escala reduzidos). Além disso, entram em fila.
- Passar o mouse sobre a pilha expande todos os visíveis em lista completa e pausa o auto-dismiss; ao sair, recolapsa e retoma os timers.

**Acessibilidade:**
- `role="alert"` + `aria-live="assertive"` para `error`/`warning`.
- `role="status"` + `aria-live="polite"` para `success`/`info`.
- Botão X com `aria-label="Fechar notificação"`.

**Fora de escopo (decisões pré-existentes, não revisitadas):**
- Cores de status via hex arbitrário (`#16A34A`, `#bf0413`, `#F59E0B`) — sem token equivalente no DS.
- Layout mobile responsivo dedicado do `Toaster`.
