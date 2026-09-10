---
tipo: nota
data: 2026-09-10
validade: vigente
motivo: >-
  Regras de exibição decididas pelo Pedro em 10/09/2026, em revisão técnica com o time de
  desenvolvimento. Vence quando os devs responderem os limites técnicos e as regras
  virarem spec do componente.
---

# Regras de exibição do What's New

> **Decidido pelo Pedro em 10/09/2026.** Cobre os 8 itens que ficaram abertos quando o
> [`whats-new-dialog`](../src/components/whats-new-dialog/index.tsx) foi entregue
> (PR #71). O componente ainda **não** implementa nenhuma destas regras: a home só o abre
> via `?preview=whats-new`.
>
> **O que falta agora é a leitura do time de desenvolvimento** — o que é viável, o que
> esbarra em cache de página, o que custa mais do que parece. Ver
> [Para o time de desenvolvimento](#para-o-time-de-desenvolvimento) no fim.

## A tensão que atravessa tudo

Este modal é duas coisas ao mesmo tempo, e vale nomear isso antes de ler as regras:

- É um **What's New** — anúncio de novidade, que só significa alguma coisa para quem
  conhecia o estado anterior do portal.
- É um **incentivo de cadastro** — o CTA é "Criar conta", e os três passos vendem
  benefícios de ter conta.

Para quem chega pela primeira vez, nada ali é "novo": é o quinto modal pedindo cadastro.
A decisão foi **incluir a primeira sessão mesmo assim**, priorizando alcance — na prática
o modal funciona como incentivo de cadastro para quem chega agora, e como anúncio para
quem já conhecia o portal.

Duas consequências que o resto do documento assume: ele **desloca o Incentivo Portal do
slot da primeira visita** (item 7), e continua sendo uma **campanha com data para acabar**
(item 5), não uma peça permanente da home.

---

## 1. Gatilho

**Regra:** passivo, só na home, disparando **3 segundos depois de a página ficar
interativa**, para todo visitante deslogado — **inclusive na primeira sessão**.

**Por quê:** a espera de 3s é o padrão de mercado para anúncio passivo (tempo de a pessoa
se orientar, antes de investir atenção em ler).

**Consequência direta:** valendo desde a primeira sessão, o What's New passa a disputar
exatamente o slot que hoje é do Incentivo Portal (~4s na home, mesmo público). Os dois não
podem coexistir na mesma visita — quem ganha está no item 7.

**Cuidado no back-end:** contar 3s a partir de *página interativa*, não a partir do
request. Em 3G no mobile a diferença passa de 5s, e o modal abre em cima de alguém que
ainda está esperando a página pintar.

---

## 2. Público

**Regra:**

| Quem | Vê? |
|---|---|
| Deslogado, 1ª sessão | **Sim** |
| Deslogado, 2ª sessão ou mais | **Sim** |
| Logado | Não |
| Já encerrou a campanha (ver item 4) | Não |

Ou seja: **todo visitante deslogado**, até encerrar a campanha pelas regras dos itens 3 e 4.

**Por quê logado não vê:** os três passos anunciam benefícios que a pessoa já tem, e o
CTA "Criar conta" está errado para ela. Dá para imaginar uma variante logada com CTA
"Ver meu perfil" — mas isso é um segundo componente com segunda régua de exibição, e não
paga o custo em 11 portais para anunciar uma funcionalidade que a pessoa já usa.

**Ainda em aberto:** se valer a pena o alcance, a variante logada seria **sem** o passo 1
(login) e com CTA "Ir para minha newsletter". É trabalho de design a mais, não um toggle.

---

## 3. Frequência

**Regra:** no máximo **2 impressões por pessoa/dispositivo**, com **4 dias** entre elas.
A segunda só acontece se a primeira terminou em abandono (fechou no X ou no scrim).
Depois da segunda, nunca mais.

**Por quê:** uma impressão só é o mais seguro e o que menos alcança — boa parte das
pessoas fecha por reflexo, sem ler. A segunda recupera essa parcela sem virar
insistência; três é onde a reclamação aparece. Os 4 dias são curtos o bastante para a
segunda impressão ainda cair dentro da janela de campanha (item 5) e para pegar o
visitante quinzenal na visita seguinte.

---

## 4. O que conta como "visto"

**Regra:** as saídas não são equivalentes.

| Saída | Significado | Conta impressão | Volta? |
|---|---|---|---|
| **X** ou clique no scrim | "agora não" — ambíguo, pode ser reflexo | Sim | Sim, 1 vez em 4 dias |
| **"Pular"** | dispensa explícita | Sim | **Não** |
| **Chegar ao passo 3** (seta ou dot) | mensagem entregue | Sim | **Não** |
| **"Criar conta"** | conversão | Sim | **Não** |

**Por quê:** é a distinção que justifica ter um X *e* um "Pular" no mesmo rodapé — hoje
os dois chamam o mesmo `onClose` e são visualmente redundantes. Tratar o X como "adiar" e
o "Pular" como "não quero" dá função a cada um. Chegar ao passo 3 encerra mesmo sem
clique no CTA: a pessoa leu os três, repetir não acrescenta nada.

---

## 5. Janela de vida

**Regra:** **90 dias** a partir da data de lançamento do login **em cada portal**, com
data de início configurável — nunca fixa no código. A campanha também pode fechar antes,
se a cobertura entre visitantes deslogados passar de ~60%.

Encerrada a janela, o modal é desligado por configuração e o assunto continua vivo pelos
canais passivos que já existem (banner de incentivo, a própria página de cadastro). Não
propor página de changelog: o portal não tem cadência de release que justifique uma.

**Por quê:** os 11 portais não lançam no mesmo dia. Uma data fixa faz o portal que lançou
depois anunciar como "novidade" algo que já tem três meses, ou pior, faz o modal nunca
aparecer lá. É o item com maior risco de divergência entre portais desta lista inteira.

---

## 6. Onde guarda

**Regra:** híbrido, com a chave versionada por campanha.

- **Deslogado:** `localStorage`, chave `cd:whatsnew:<id-da-campanha>`, valor
  `{ impressoes, ultimaEm, status: 'aberto' | 'encerrado' }`.
- **Logado:** preferência no perfil (user meta), para não repetir em outro dispositivo.

**Por quê `localStorage` e não cookie:** o dado não precisa viajar em toda requisição, e
como é preferência funcional (não rastreamento) tende a ficar fora do banner de
consentimento — confirmar com quem cuida do banner antes de assumir.

**Por quê versionar pela campanha:** é o que permite um *segundo* What's New no ano que
vem sem migrar nem limpar nada. Um booleano `jaViu` resolve hoje e trava a próxima
campanha — é o erro mais comum neste tipo de feature.

**Consequência a aceitar:** sem login, a regra vale por navegador. A mesma pessoa pode
ver no celular e no desktop. Corrigir isso exigiria identificar visitante anônimo entre
dispositivos, o que não compensa.

---

## 7. Convivência com os outros incentivos

**Regra:** **uma interrupção por sessão**, e um único slot passivo na home.

| Modal | Tipo | Regra |
|---|---|---|
| **What's New** | passivo, home | Ganha o slot da home enquanto a campanha estiver aberta |
| **Incentivo Portal** | passivo, home | Cede o slot durante a campanha; volta a ser o único depois |
| **Incentivo Leitura** | passivo, conteúdo | Rota diferente, não colide — mas respeita o teto de 1 por sessão |
| **Incentivo Newsletter** | passivo, form | Idem |
| **Incentivo Download** | **ativo**, por clique | Não conta como interrupção. Sempre aparece — é resposta a uma ação |

Se um ativo dispara com um passivo aberto, o passivo fecha primeiro. Dois modais
sobrepostos nunca.

**Por quê:** cinco modais competindo pela mesma home e pelo mesmo visitante deslogado é
o cenário em que cada portal acaba resolvendo a colisão por conta própria — e aí os 11
divergem em silêncio. Um slot com prioridade declarada é uma regra que o back-end
consegue reimplementar igual em todos.

---

## 8. Mobile

**Regra:**

- **Bottom sheet** abaixo de `lg`, largura total, em vez do card de 420px centralizado.
  Reusar o `bottom-sheet` que já existe na família de sobreposições.
- Arrastar para baixo = mesma semântica do X ("agora não").
- **Manter as setas** e os dots, iguais ao desktop. Swipe entre passos, se entrar, é
  acréscimo — não substituto, porque vira trabalho de reimplementação em 11 portais.
- Mesmo gatilho e mesma frequência do desktop. Não criar régua separada por plataforma.
- **As ilustrações precisam de versão mobile.** Os PNGs atuais são recortes de tela
  desktop em 420×180; a 360px de largura o conteúdo dentro deles fica ilegível. É
  trabalho de design pendente, não um `object-fit`.

**Por quê:** o modal fixo em 420px é o único item desta lista que já está errado no
código hoje, não apenas indefinido.

---

## O que fica de fora, por decisão

- **Página de changelog.** Não há cadência de release que a sustente; nasce desatualizada.
- **Bloquear a home até fechar o modal.** O scrim já fecha; não transformar anúncio em pedágio.
- **Reaproveitar o mesmo modal para a próxima novidade** sem trocar o id da campanha —
  quem já encerrou a primeira nunca veria a segunda.
- **Régua diferente por portal** além da data de início. Um só conjunto de regras, uma
  data configurável.

---

## Para o time de desenvolvimento

As regras acima estão decididas do lado de produto/design. O que precisamos de vocês é a
leitura de viabilidade: **o que não dá, o que dá de outro jeito, e o que custa mais do que
parece.** Não é preciso concordar — é preciso apontar o limite antes de virar spec.

**A pergunta que provavelmente derruba mais coisa:** os 11 portais servem a home por
cache de página cheia (CDN/Varnish)? Se sim, nada que dependa do visitante — sessão,
contagem de impressões, estado da campanha — pode ser decidido no PHP que monta a página;
tudo precisa ser client-side, com a configuração da campanha chegando por um endpoint
separado ou embutida como dado estático. Isso muda a forma dos itens 1, 3, 5 e 7.

Por item:

| Item | O que precisamos saber |
|---|---|
| 1. Gatilho | Dá para medir "página interativa" no tema, ou só `DOMContentLoaded`? |
| 1 e 3 | Como o portal identifica "sessão" e "visitante" hoje para quem está deslogado? Existe algo, ou nasce com esta feature? |
| 3 e 6 | `localStorage` é aceitável como única fonte para deslogado? O que acontece em janela anônima e em navegador com storage bloqueado — pode mostrar sempre, ou tem que suprimir? |
| 5 | Onde mora a data de início por portal: wp-admin, arquivo de config, feature flag? Quem consegue mudar sem deploy? |
| 6 | Já existe user meta / API de preferências no perfil, ou precisa criar? |
| 7 | Existe hoje algum orquestrador de modais, ou cada incentivo dispara por conta própria? Se for o segundo caso, o teto de "1 interrupção por sessão" é feature nova, não configuração. |
| 8 | O bottom sheet já existe no tema WordPress, ou só no protótipo React? |

**Consequência no componente, se o item 4 for adiante:** hoje o X e o "Pular" chamam o
mesmo `onClose` e são indistinguíveis. Para o X significar "adiar" e o "Pular" significar
"dispensar", o componente precisa expor dois callbacks — mudança pequena no React, mas
que precisa estar no contrato antes de o back-end reimplementar.

## Ainda em aberto, do lado de produto

1. Vale a variante logada do item 2 (sem o passo 1, CTA "Ir para minha newsletter")?
2. Qual a data de lançamento do login por portal — existe cronograma, ou é tudo junto?
3. O banner de consentimento de cookies trata `localStorage` funcional como isento?
4. O Incentivo Portal sai do ar durante a campanha nos 11 portais ao mesmo tempo, ou
   portal a portal conforme cada um lança?
