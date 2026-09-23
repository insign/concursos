# Lógica de primeira ordem

**Fixe o domínio e traduza quem satisfaz qual propriedade.** Na semântica clássica adotada na aula, o domínio de objetos é não vazio. Constante (`a`) nomeia objeto; variável (`x`) o percorre; função (`f(x)`) devolve objeto; predicado (`P(x)`) e relação (`R(x,y)`) formam afirmações. A **aridade** fixa quantos argumentos o símbolo recebe e sua ordem importa. Termo como `f(a)` designa objeto, sem valor lógico isolado; `P(f(a))` é fórmula. Constantes diferentes podem nomear o mesmo objeto sem uma premissa de desigualdade.

## Tradução: restrinja o universo corretamente

Se `A(x)` significa “x é A” e `B(x)`, “x é B”:

| Frase | Sentença fechada | Teste de direção |
|---|---|---|
| Todo A é B | `∀x(A(x) → B(x))` | Para cada A, B é exigido. |
| Nenhum A é B | `∀x(A(x) → ¬B(x))` | Não existe objeto que seja A e B. |
| Algum A é B | `∃x(A(x) ∧ B(x))` | O mesmo objeto é A e B. |
| Algum A não é B | `∃x(A(x) ∧ ¬B(x))` | Há contraexemplo à universal. |

**Universal restrita usa `→`; existencial restrita usa `∧`.** A fórmula `∀x(A(x) ∧ B(x))` diria que *todos os objetos do domínio* são A e B. Em `∃x(A(x) → B(x))`, um objeto que não é A já satisfaz a condicional, sem comprovar existência de A.

**“Somente servidores acessam”** é `∀x(Acessa(x) → Servidor(x))`: acesso exige ser servidor; não se conclui que todo servidor acessa. “Nem todo A é B” é `∃x(A(x) ∧ ¬B(x))`. “Algum” significa ao menos um, admitindo que todos satisfaçam a propriedade; existência única é afirmação mais forte.

## Escopo, ordem e negação

Um quantificador alcança apenas a subfórmula em seu **escopo**. `P(x)` tem `x` livre; `∀xP(x)` liga essa ocorrência; `∀xR(x,y)` ainda deixa `y` livre. Uma **sentença** não contém variáveis livres. Renomear variável ligada é seguro se o vínculo for preservado; substituir `x` por `y` em `∃yR(x,y)` produziria `∃yR(y,y)`, **capturando** a ocorrência livre. Renomeie antes a ligada para `z`.

| Fórmula | Leitura e consequência |
|---|---|
| `∀x∃yR(x,y)` | Para cada `x` há algum `y`, que pode variar. |
| `∃y∀xR(x,y)` | Um mesmo `y` serve para todos; **implica** a linha anterior, mas a volta falha em geral. |

Quantificadores consecutivos do mesmo tipo podem trocar de ordem; misturar `∀` e `∃` normalmente muda a afirmação. Para negar, **troque cada quantificador alcançado e negue a propriedade**, conservando o escopo:

| Original | Negação equivalente |
|---|---|
| `∀xP(x)` | `∃x¬P(x)` |
| `∃xP(x)` | `∀x¬P(x)` |
| `∀x∃yR(x,y)` | `∃x∀y¬R(x,y)` |
| `∀x(A(x) → B(x))` | `∃x(A(x) ∧ ¬B(x))` |

Negar “todos” pede **um** contraexemplo, sem afirmar que nenhum satisfaça a propriedade. É o contraste cobrado em item oficial do <abbr title="Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos">CEBRASPE</abbr> sobre “Todos são iguais perante a lei”.

## Existência, distribuição e contramodelo

Domínio não vazio permite `∀xP(x) ⇒ ∃xP(x)`; **não** permite inferir `∃xA(x)` de `∀x(A(x) → B(x))`, pois a classe A pode ser vazia.

| Distribuição válida | Troca que falha em geral |
|---|---|
| `∀x(P(x) ∧ Q(x)) ≡ (∀xP(x)) ∧ (∀xQ(x))` | `∀x(P(x) ∨ Q(x))` não exige que um mesmo lado valha para todos. |
| `∃x(P(x) ∨ Q(x)) ≡ (∃xP(x)) ∨ (∃xQ(x))` | `∃xP(x) ∧ ∃xQ(x)` não garante um objeto com as duas propriedades. |

Uma sentença é **satisfatível** se verdadeira em alguma interpretação, **válida** se em todas, **insatisfatível** se em nenhuma. Uma interpretação favorável prova satisfatibilidade; para refutar consequência lógica, basta **contramodelo**: premissas verdadeiras e conclusão falsa. Dois objetos distintos, um apenas com `P` e outro apenas com `Q`, refutam `∃xP(x), ∃xQ(x) ⊨ ∃x(P(x) ∧ Q(x))`. Da universal `∀xP(x)` segue `P(a)` para um objeto nomeado; de `P(a)` segue `∃xP(x)`. De `∃xP(x)` não se conclui `P(a)` para um nome previamente escolhido.
