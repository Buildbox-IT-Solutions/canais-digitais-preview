# Regras de Negócio e Contexto de Produto

> Conteúdo extraído de `legacy/DESIGN.md`, `legacy/FEATURE-cadastro.md`, `legacy/FEATURE-cadastro-etapa2.md` e `legacy/.impeccable.md` antes da remoção desses arquivos do repositório. Este documento preserva apenas regras de negócio e contexto de produto — especificações visuais e de layout já vivem nos arquivos `figma-specs/<componente>.md` correspondentes e não são duplicadas aqui.

---

## Contexto do produto

**Canais Digitais Informa** é a base de design (template) usada por **11+ portais editoriais** da Informa Markets, cobrindo verticais distintos — alimentos e bebidas, saúde, construção civil, arquitetura e outros. Cada portal compartilha a mesma estrutura, componentes e Design System; o que varia entre portais é o conteúdo e as cores categoriais das editorias.

Este projeto não representa um portal específico — é a **plataforma base** que serve todos eles. Por isso a personalidade visual é deliberadamente **neutra, institucional e escalável**: o DS precisa funcionar para verticais muito diferentes sem favorecer nenhuma. A identidade de cada vertical emerge do conteúdo e das cores categoriais, nunca da estrutura visual.

Na feature de Etapa 2 (ver seção de roadmap abaixo), esse conceito multiportal ganha um nome de produto: **"Conta Informa"** — "Uma conta. Todos os portais. É grátis." A lista de portais citada nos documentos legados (a confirmar com o time antes de produção) é:

> Food Connection · Canal Energia · Aquaculture Brasil · Inovação em Pauta · Cosmetiquim · AgroPages · Animal Business Brasil · Ingredientes Online · InfoAdubo · Borracha Atual · PlastiForum

---

## Regras de negócio — Ad Frame

Os ad frames reservam espaços fixos no layout, mas o formato veiculado dentro de cada slot pode variar conforme configuração no Google Ad Manager (gerenciado pelo time Informa, fora do escopo deste repositório).

**Regra central: compatibilidade de formato com o slot, não dimensão exata.**

- Um slot leaderboard (970×250) pode servir um banner menor (728×90) — mesma orientação horizontal, encaixe preservado.
- O que não pode acontecer é substituir um formato horizontal por um squared (ou vice-versa) — isso quebra o encaixe da página.
- No mobile, os formatos também se adaptam conforme configuração no Ad Manager. O template reserva o espaço correto; o Ad Manager decide o que preenche.
- Os formatos suportados (7 tamanhos IAB) estão documentados no componente `ad-frame` — ver `figma-specs/ad-frame.md`.

---

## Regras de negócio — Cards editoriais

### Conteúdo patrocinado
Com exceção do Video Card 2.0, todos os cards possuem uma variante **Patrocinado**, que sinaliza ao leitor que aquele conteúdo foi financiado por uma marca — por transparência editorial. O layout é intencionalmente diferente do card regular para que o leitor identifique imediatamente a natureza do conteúdo. O Video Card 2.0 é o único card sem variante patrocinada — decisão de design deliberada.

### Sistema de grid e variantes de cards
Os cards foram projetados para um grid de 12 colunas no desktop e 4 colunas no mobile. Cada variante de tamanho tem relações específicas entre imagem e texto para caber no espaço alocado e privilegiar a leitura. **Usar a variante errada prejudica o visual da página** — os layouts do Figma apontam explicitamente qual variante usar em cada posição, e isso deve ser seguido à risca.

### Propriedades on/off dos cards (ritmo editorial)
Os cards têm propriedades configuráveis que ligam ou desligam elementos:

| Propriedade | Quando ativa |
|-------------|-------------|
| `author` | Conteúdo escrito por colunista ou especialista identificado |
| `lead` | Seções que exibem Headline + parágrafo de apoio |
| `categoria` | Seções que precisam identificar a editoria do conteúdo |

Essas combinações **não são aleatórias** — são decisões editoriais que criam ritmo na página e evitam repetição visual excessiva. Uma home que mostra autor + lead + categoria em todos os cards ao mesmo tempo sobrecarrega o leitor. Os layouts do Figma definem quais propriedades estão ativas em cada posição e seção.

### Seções e itens configuráveis por portal
Seções inteiras da home — como Podcasts, Vídeos, Especialistas — podem não existir em determinados portais: se o portal não produz aquele tipo de conteúdo, a seção simplesmente não é exibida. O mesmo vale para itens de navegação e outros blocos de página; no legado, tudo era configurável pelos editores via painel admin do WordPress.

**Implicação de design: nenhuma seção pode ser tratada como obrigatória.** O layout precisa funcionar com ou sem cada seção opcional.

### Variantes por quantidade de conteúdo
Algumas seções têm versões responsivas conforme a quantidade de itens configurada pelo editor. Exemplo: a seção de Vídeos na home suporta entre 2 (mínimo) e 4 (máximo) cards, com um layout específico para cada quantidade. O layout não pode assumir um número fixo de itens.

### Seção Especialistas
A seção Especialistas na home exibe os autores/colunistas ativos daquele portal. **O Card Colunista mostra sempre a última notícia publicada pelo autor — não uma notícia qualquer.** No produto real isso é um dado dinâmico alimentado pelo WordPress, não conteúdo estático; ao mockar dados para este componente, o mock deve refletir "a notícia mais recente do autor", não uma escolha arbitrária.

---

## Regras de negócio — Cadastro/Login

Contexto extraído de `legacy/FEATURE-cadastro.md`, que descrevia a feature de cadastro/login do protótipo PHP legado (responsável: Micaelly Caetano). Não representa necessariamente o estado atual do app React — serve como registro do racional de negócio por trás do fluxo.

### Objetivo da feature
Converter usuários anônimos em uma base identificada.

**Racional do MVP:** o usuário logado baixa materiais da Biblioteca de Download sem precisar preencher o formulário toda vez — **o login substitui o preenchimento repetido do formulário de download**. Se os cookies forem limpos, basta logar novamente; não é necessário preencher o form de novo.

O que ficava fora do MVP e reservado para Etapa 2: favoritar notícias, histórico de leitura, preferências e personalização, gated content editorial (ver roadmap abaixo).

### Regras de segurança e UX de autenticação (racional, não apenas copy)
- **Erro de login nunca deve indicar qual campo (e-mail ou senha) está incorreto** — mensagem genérica de credenciais inválidas, por segurança.
- **Bloqueio após 5 tentativas** com countdown de 15 minutos.
- **Recuperação de senha nunca confirma se o e-mail existe na base** — mensagem sempre genérica ("Se este e-mail estiver cadastrado, você receberá um link..."), por segurança (evita enumeração de contas).
- Link de confirmação de cadastro válido por 24h; link de redefinição de senha válido por 1h.
- Vinculação de conta (ex.: login social com e-mail já cadastrado manualmente) deve ser silenciosa no backend, com apenas um toast de feedback visual ao usuário — não um fluxo de confirmação manual.

### Consentimento LGPD no cadastro
- Checkbox de **Termos de Uso é obrigatório** para habilitar o botão de criar conta.
- Checkbox de **Marketing é opcional e desmarcado por padrão** (opt-in, não opt-out).
- Os dois consentimentos (newsletter/marketing) devem ser tratados e registrados como **consentimentos distintos**, não um único aceite genérico.

### Exclusão de conta
Fluxo de exclusão exige digitar a palavra "EXCLUIR" para confirmar — proteção contra exclusão acidental. O botão de confirmação só habilita com o texto exato.

---

## Roadmap não implementado (Etapa 2)

> **Atenção:** tudo nesta seção é escopo **futuro/planejado**, extraído de `legacy/FEATURE-cadastro-etapa2.md` ("Status: Em especificação" no documento original). Nada aqui está implementado no app React atual. Não deve ser confundido com comportamento corrente do protótipo.

Itens que continuavam "em stand by" mesmo após a Etapa 2 ser especificada: favoritar notícias, gated content editorial, histórico de leitura, troca de e-mail.

Escopo coberto pela especificação de Etapa 2 (não implementado):

### Preferências de comunicação (toggles no Dashboard)
- Nova seção "Comunicações" no dashboard de perfil, com dois toggles: Newsletter (segmentada por setor) e Marketing.
- **Regra de padrão:** ambos os toggles sempre iniciam desligados, independentemente do que foi escolhido no cadastro — o estado real viria de uma API que, no protótipo, sempre retorna "off".
- **Auto-save otimista ao clicar:** o toggle muda visualmente de imediato, com toast de sucesso ("Preferência salva."); em caso de erro simulado, o toggle reverte e exibe toast de erro.
- Os dois toggles são consentimentos LGPD distintos e devem ser registrados separadamente.

### Histórico de downloads no perfil
- Nova seção "Meus Downloads" no dashboard, com os 10 downloads mais recentes por padrão, paginados (10 itens por página).
- Cada item mostra: título, tipo (E-book, Whitepaper, Relatório, Guia), portal de origem, data, e ação "Baixar novamente".
- **Regra para material removido do portal:** a linha permanece visível (não é ocultada), mas com título acinzentado, badge "Material não disponível" e o botão de download substituído por texto "Indisponível" desabilitado.
- Estado vazio dedicado quando o usuário nunca baixou nada.

### "Conta Informa" — conta global multiportal
- Conceito de produto: uma única conta de usuário válida em todos os 11+ portais Informa Markets, com tagline "Uma conta. Todos os portais. É grátis."
- **Sem SSO automático entre portais nesta fase:** o leitor precisa logar novamente ao trocar de portal, mesmo tendo uma "Conta Informa" única. Isso deveria ser comunicado de forma transparente na UI, não escondido.
- Envolve atualizações de copy espalhadas por cadastro, login, dashboard e e-mails transacionais para reforçar a identidade multiportal (ex.: grade de logos dos portais no cadastro, badge "Conta Informa · Desde [mês/ano]" no dashboard).

### Cenários de sessão e edge cases (Etapa 2)
- **Sessão expirada por inatividade após 30 dias** — o backend deveria fazer refresh token silencioso enquanto o usuário está ativo; ao expirar, a próxima requisição autenticada dispara o estado `session-expired` no modal de login.
- **Link de confirmação de e-mail expirado (> 24h)** — novo sub-estado dedicado, distinto do estado "e-mail não confirmado mas link ainda válido".
- **Vinculação de contas (LinkedIn + cadastro manual com mesmo e-mail)** — unificação silenciosa de IDs no backend + toast de confirmação visual.
- **Exclusão de conta com histórico de downloads existente:** decisão de negócio é reter o histórico de downloads pelo prazo mínimo exigido pela LGPD, não apagar imediatamente. O histórico retido não pode ser reutilizado para novas comunicações de marketing. A exclusão encerra o acesso a **todos** os portais Informa imediatamente, mesmo que os dados fiquem retidos por mais tempo por obrigação legal.

---

## Princípios de design (anti-referências)

Conteúdo de `legacy/.impeccable.md` que não é duplicado em `DESIGN.md`. A maior parte do arquivo (personalidade de marca, paleta, tipografia, tom institucional) já está coberta pela seção "Personalidade visual" de `DESIGN.md` e não é repetida aqui.

O ponto não coberto em `DESIGN.md` são as **anti-referências** explícitas usadas para calibrar a área logada (dashboard de perfil):

- **Evitar telas de configuração poluídas e ruidosas como a do LinkedIn** — muitas ações competindo por atenção ao mesmo tempo.
- **Evitar dashboards SaaS genéricos cheios de "stat cards" por toda parte** — a área logada deve manter o mesmo tom institucional do portal público, não parecer um painel de analytics genérico.
- Princípio de suporte a essas anti-referências: **"uma tarefa por vez"** — cada seção da tela tem um propósito único, com divulgação progressiva de informação em vez de sobrecarga.

Contexto adicional de público (não visual, mas relevante para tom/priorização): os usuários são profissionais B2B de 11+ verticais que acessam os portais em horário de trabalho, majoritariamente em desktop; visitam a área logada com pouca frequência e quando o fazem querem resolver a tarefa rapidamente, sem fricção — o que reforça a rejeição a telas de configuração complexas/ruidosas.
