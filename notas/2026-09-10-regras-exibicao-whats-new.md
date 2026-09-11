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

