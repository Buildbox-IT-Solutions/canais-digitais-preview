# Prompt — Onda 3: Etapa 2 — Conta Informa, Downloads e Edge Cases
# (com diretrizes de qualidade visual da skill de frontend)

Leia o `CLAUDE.md`, `FEATURE-cadastro.md` e `FEATURE-cadastro-etapa2.md` antes de começar.

---

## Diretriz de qualidade visual — aplicar em tudo que for novo

Para qualquer elemento novo — partials, seções, estados — seguir:

**Tipografia (DS do projeto):**
- Títulos e displays: `font-display` — Aleo, Georgia, serif
- Todo o resto: `font-body` — Open Sans, Arial, sans-serif
- Labels de campos: `text-label-lg font-semibold text-neutral-950`
- Hints/suporte: `text-label-md text-neutral-500`
- Valores preenchidos: `text-body-lg text-neutral-950`
- Valores vazios: `text-body-lg text-neutral-500 italic`

**Cores (tokens confirmados do DS):**
- Toggle ON: `bg-secondary-950` (#003CB2 Ultramarine) — não `bg-primary-600`
- Checkbox selecionado: `bg-secondary-950` — não `bg-primary-600`
- Erro: `border-[#bf0413] text-[#bf0413]` (Material red — não Tailwind red)
- Botão primário: `bg-primary-600 hover:bg-secondary-950`
- Botão outlined: `border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50`

**Border-radius (confirmado):**
- Inputs, selects: `rounded-sm` (4px)
- Modais, cards, sheets: `rounded-lg` (8px)
- Botões primários e outlined: `rounded-full` (pill)
- Bottom sheet cantos superiores: `rounded-t-2xl` (16px)

**Micro-animações obrigatórias em componentes novos:**
- Toggle track: `transition-colors duration-200`
- Toggle thumb: `transition-transform duration-200`
- Toast: entrada com `opacity-0 translate-y-2` → `opacity-100 translate-y-0` (220ms)
- Todos os botões: `transition-colors`

**Qualidade de código:**
- Nunca usar hex hardcoded — sempre classes Tailwind geradas pelos tokens
- Cabeçalho PHPDoc em todo arquivo novo (Componente, Figma, Variantes, Tokens usados)
- Todo partial novo: showcase em `src/components/` + partial em `_partials/` + spec em `figma-specs/`
- Sombras: escala Tailwind nativa (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`)

---

## PASSO 1 — Criar partial `form-toggle.php`

### Arquivos a criar
- `src/components/form-toggle.php` — showcase
- `src/components/_partials/form-toggle.php` — partial
- `figma-specs/form-toggle.md` — spec

### Especificação visual

```
Track:  44×24px, rounded-full
        Off:      bg-neutral-200
        On:       bg-secondary-950
        Disabled: bg-neutral-100
        Transição: transition-colors duration-200

Thumb:  20×20px, rounded-full, bg-white, shadow-sm
        Off: translate-x-0 (2px da esquerda)
        On:  translate-x-5 (22px da esquerda)
        Transição: transition-transform duration-200

Label:  font-body text-body-lg text-neutral-950
Hint:   font-body text-label-md text-neutral-500 mt-0.5
Gap:    gap-3 entre track e label
```

### Props (`$args`)
```php
'id'       => string   // obrigatório
'label'    => string   // obrigatório
'hint'     => string   // opcional, null padrão
'checked'  => bool     // false padrão
'disabled' => bool     // false padrão
```

### Markup do partial

Usar `input sr-only peer` + visual CSS puro para o track.
O thumb requer JS (peer-checked não alcança elementos aninhados no Tailwind):

```html
<label class="flex items-start gap-3 <?= $disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer' ?>">
  <input type="checkbox" id="<?= $id ?>" class="sr-only peer"
         <?= $checked ? 'checked' : '' ?> <?= $disabled ? 'disabled' : '' ?>
         data-analytics-event="preferencia_toggle">
  <!-- Track -->
  <div class="relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200
              bg-neutral-200 peer-checked:bg-secondary-950 peer-disabled:bg-neutral-100"
       aria-hidden="true">
    <!-- Thumb — JS adiciona/remove translate-x-5 -->
    <div class="absolute top-[2px] left-[2px] size-5 rounded-full bg-white shadow-sm
                transition-transform duration-200"
         data-toggle-thumb></div>
  </div>
  <div class="flex flex-col">
    <span class="font-body text-body-lg text-neutral-950"><?= $label ?></span>
    <?php if ($hint): ?>
      <span class="font-body text-label-md text-neutral-500 mt-0.5"><?= $hint ?></span>
    <?php endif; ?>
  </div>
</label>
```

### JS para o thumb e auto-save (adicionar em `cadastro-flow.js`)

```javascript
document.addEventListener('change', (e) => {
  const input = e.target;
  if (!input.classList.contains('sr-only') || input.type !== 'checkbox') return;
  const thumb = input.closest('label')?.querySelector('[data-toggle-thumb]');
  if (!thumb) return;
  input.checked ? thumb.classList.add('translate-x-5')
                : thumb.classList.remove('translate-x-5');
  if (typeof showToast === 'function') {
    showToast('success', 'Preferência salva.');
  }
});
```

### Showcase — 4 variantes
Off default · On default · Off disabled · On disabled

---

## PASSO 2 — Atualizar `dashboard-perfil.php`

Ler o arquivo antes de editar. Adicionar nesta ordem:

### 2a. Badge "Conta Informa" no cabeçalho

Localizar bloco avatar + nome + e-mail. Adicionar à direita:

```php
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-secondary-50 text-secondary-950 font-body text-label-sm whitespace-nowrap">
  <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
  Conta Informa · Desde abr. 2026
</div>
```

Abaixo do badge:
```php
<p class="font-body text-body-sm text-neutral-600 mt-2 max-w-[480px]">
  Sua conta é válida em todos os portais Informa.
  Ao acessar outro portal, faça login com o mesmo e-mail e senha.
</p>
```

### 2b. Título da página
"Meu Perfil" → "Minha Conta Informa"

### 2c. Seção "Comunicações"

Adicionar após "Dados Fiscais e Localização", antes de "Conta":

```php
<section class="py-8 border-t border-neutral-100">
  <div class="flex flex-col gap-1 mb-6">
    <h2 class="font-display font-bold text-title-lg text-neutral-950">Comunicações</h2>
    <p class="font-body text-body-md text-neutral-500">Gerencie suas preferências de e-mail.</p>
  </div>
  <div class="flex flex-col gap-6 max-w-[560px]">
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'    => 'toggle-newsletter',
      'label' => 'Receber newsletter segmentada por setor',
      'hint'  => 'Você pode cancelar a qualquer momento nas suas preferências.',
    ]); ?>
    <?php get_template_part('components/_partials/form-toggle', null, [
      'id'    => 'toggle-marketing',
      'label' => 'Receber comunicações e novidades da Informa Markets',
      'hint'  => 'Ao ativar, você concorda em receber ofertas e novidades por e-mail.',
    ]); ?>
  </div>
</section>
```

### 2d. Seção "Meus Downloads"

Dados de mock:
```php
$downloads = [
  ['title' => '10 Tendências em Food Service para 2026', 'type' => 'E-book',
   'portal' => 'Food Connection', 'date' => '12 abr. 2026', 'available' => true],
  ['title' => 'Guia de Embalagens Sustentáveis', 'type' => 'Guia',
   'portal' => 'Food Connection', 'date' => '03 mar. 2026', 'available' => true],
  ['title' => 'Relatório Setorial: Proteína Animal 2025', 'type' => 'Relatório',
   'portal' => 'Food Connection', 'date' => '18 fev. 2026', 'available' => false],
  ['title' => 'Whitepaper: IA na Indústria de Alimentos', 'type' => 'Whitepaper',
   'portal' => 'Food Connection', 'date' => '05 jan. 2026', 'available' => true],
];
$emptyDownloads = ($_GET['downloads'] ?? '') === 'empty';
```

Estrutura da seção:
- Cabeçalho com título "Meus Downloads" + subtítulo "Últimos 10 materiais. Página 1 de 3."
- Estado vazio (`?downloads=empty`): ícone download neutral-200 + texto + btn outlined "Ver Biblioteca" → `form-download.php`
- Estado com itens: lista `divide-y divide-neutral-100`
  - Item disponível: título `text-neutral-950` + metadados + btn outlined "Baixar novamente" → `form-download.php?user=logged`
  - Item indisponível: título `text-neutral-400` + badge "Material não disponível" + texto "Indisponível" (desabilitado)
- Paginação via `get_template_part('components/_partials/pagination', ...)`
- Links de simulação discretos no rodapé: `?downloads=empty` e `?`

### 2e. Modal de exclusão — atualizar texto

```
Título: "Excluir sua Conta Informa?"

"Esta ação encerrará seu acesso a todos os portais Informa.
 Seus dados pessoais serão removidos em até [X] dias úteis,
 conforme a Lei Geral de Proteção de Dados (LGPD).

 Seu histórico de downloads será mantido pelo prazo mínimo
 exigido por lei e não será utilizado para novas comunicações."
```

---

## PASSO 3 — Atualizar `login-modal.php`

### 3a. Chips de portais

Entre o título "Entrar" e o subtítulo:

```php
<?php
$portaisCompact = ['Food Connection','Canal Energia','Aquaculture Brasil',
                   'Inovação em Pauta','Cosmetiquim','AgroPages'];
?>
<div class="flex flex-wrap gap-1.5 justify-center my-3">
  <?php foreach ($portaisCompact as $p): ?>
    <span class="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100
                 font-body text-label-sm text-neutral-600 whitespace-nowrap"><?= $p ?></span>
  <?php endforeach; ?>
  <span class="px-2.5 py-1 rounded-full bg-secondary-50 border border-secondary-100
               font-body text-label-sm text-secondary-950 whitespace-nowrap font-semibold">
    e mais 5
  </span>
</div>
<p class="font-body text-body-sm text-neutral-500 text-center mb-4">
  Uma conta. Todos os portais. É grátis.
</p>
```

### 3b. Estado `linkedin-merge`

Adicionar a `$allowedStates`. No switch, renderizar o estado `default` com o toast de vinculação visível acima do modal.

---

## PASSO 4 — Atualizar `cadastro-bloco-1.php`

Adicionar antes do indicador de progresso:

```php
<?php $portais = ['Food Connection','Canal Energia','Aquaculture Brasil',
  'Inovação em Pauta','Cosmetiquim','AgroPages','Animal Business',
  'Ingredientes Online','InfoAdubo','Borracha Atual','PlastiForum']; ?>
<div class="flex flex-col items-center gap-3 mb-8 text-center">
  <div class="flex flex-wrap gap-1.5 justify-center">
    <?php foreach ($portais as $p): ?>
      <span class="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100
                   font-body text-label-sm text-neutral-600 whitespace-nowrap"><?= $p ?></span>
    <?php endforeach; ?>
  </div>
  <p class="font-display font-bold text-title-md text-neutral-950">
    Uma conta. Todos os portais. É grátis.
  </p>
</div>
```

Copy do subtítulo:
"Crie sua Conta Informa e acesse todos os portais gratuitamente."

---

## PASSO 5 — Copy nos outros layouts

`cadastro-bloco-2.php`: "Crie uma senha" → "Crie uma senha para sua Conta Informa"

`onboarding.php`: "...experiência no portal." → "...experiência em todos os portais Informa."

---

## PASSO 6 — Atualizar `confirmacao-email.php`

Adicionar estado `link-expired` ao `$allowedStates` e à função de renderização:

```
Visual do estado:
  Ícone alert-circle em bg-[#FEF2F2], cor text-[#bf0413], size-8
  Título: "Seu link expirou" — font-display font-bold text-headline-md
  Texto:  "O link de confirmação é válido por 24 horas.
           Solicite um novo para ativar sua conta."
  CTA:    btn filled "Enviar novo link" → ?state=waiting
  Link:   "Voltar para o login" → /src/layouts/login-modal.php
```

Adicionar chip "Link expirado" ao navegador de estados.

---

## PASSO 7 — Atualizar e-mails transacionais

`email-boasvindas.html`:
- Título: "Boas-vindas à sua Conta Informa"
- Substituir benefícios pela lista dos 11 portais em texto corrido
- Footer: tagline "Uma conta. Todos os portais. É grátis."

`email-confirmacao.html`:
- Após o botão: "Com sua Conta Informa, você acessa Food Connection, Canal Energia e mais 9 portais."

`email-recuperacao-senha.html`:
- Atualizar referências à conta para "Conta Informa" no header

`email-exclusao-conta.html`:
- "Esta ação encerrará seu acesso a todos os portais Informa."
- Adicionar: "Seu histórico de downloads será mantido pelo prazo mínimo exigido por lei."

---

## PASSO 8 — Completar `cadastro-flow.js`

Verificar o que já existe. Adicionar o que faltar:
- Foco automático no Bloco 1
- Enter no input = submit
- Reenvio com cooldown 60s
- Countdown de bloqueio 15min
- Auto-dismiss do toast após 4s
- Sincronização do thumb do toggle (translate-x-5)

---

## PASSO 9 — Rebuild e smoke test

```bash
./tools/tailwindcss.exe -i src/styles/input.css -o src/docs/output.css
```

Testar:
1. Dashboard → badge "Conta Informa" visível
2. Dashboard → toggle → thumb animado + toast "Preferência salva."
3. Dashboard → 4 downloads (1 indisponível) + paginação
4. Dashboard?downloads=empty → estado vazio com CTA
5. Login → chips de portais + "e mais 5"
6. Login?state=linkedin-merge → toast de vinculação
7. Bloco 1 → grade de portais + tagline
8. Confirmação?state=link-expired → estado com ícone vermelho
9. Navegador de estados → chip "Link expirado" presente

**Confirme o plano e comece pelo PASSO 1 (form-toggle.php).**
