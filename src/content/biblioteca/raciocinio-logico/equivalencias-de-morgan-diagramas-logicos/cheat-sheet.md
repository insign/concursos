# Equivalências, De Morgan e diagramas lógicos

**Dois testes diferentes, a mesma disciplina:** fórmulas são equivalentes se têm o mesmo valor em **todas** as atribuições; uma conclusão sobre classes é necessária se vale em **todos** os diagramas admitidos pelas premissas. Uma linha com valores distintos refuta equivalência; um diagrama compatível sem a conclusão refuta necessidade.

## Troque a fórmula sem mudar a verdade

| Partida | Forma equivalente / negação procurada |
|---|---|
| Condicional `p → q` | `¬p ∨ q` e `¬q → ¬p` (<abbr title="Condicional que inverte e nega antecedente e consequente">contrapositiva</abbr>). |
| Negação de `p → q` | `p ∧ ¬q`: exatamente o caso que torna a condicional falsa. |
| Bicondicional `p ↔ q` | `(p → q) ∧ (q → p)` ou `(p ∧ q) ∨ (¬p ∧ ¬q)`. |
| Negação de `p ↔ q` | `(p ∧ ¬q) ∨ (¬p ∧ q)`: valores diferentes. |
| Dupla negação `¬¬p` | `p`. |

A <abbr title="Condicional que troca a ordem dos termos sem negá-los">conversa</abbr> `q → p` e a <abbr title="Condicional que nega os termos sem trocar sua ordem">inversa</abbr> `¬p → ¬q` **não** equivalem em geral a `p → q`. Para refutá-las, procure uma atribuição divergente; para confirmar equivalência, compare todas as linhas ou verifique se a bicondicional entre as fórmulas é sempre verdadeira.

**De Morgan atravessa o agrupamento:** negue cada parcela **e** troque `∧` por `∨` ou `∨` por `∧`.

| Negação | Equivalente |
|---|---|
| `¬(p ∧ q)` | `¬p ∨ ¬q` |
| `¬(p ∨ q)` | `¬p ∧ ¬q` |

Para três parcelas, aplique a mesma troca a todas; em expressão aninhada, avance de fora para dentro, preservando parênteses. “Nem p nem q” significa `¬p ∧ ¬q`. Para simplificar, reconheça também **idempotência** (`p ∧ p ≡ p`), **comutatividade/associatividade** (trocar ordem/agrupamento sem trocar conectivo), **distributividade** (`p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)`, e a forma dual), **complemento** (`p ∨ ¬p` sempre verdadeiro; `p ∧ ¬p` sempre falso), **identidade** (`p ∧ V ≡ p`, `p ∨ F ≡ p`) e **absorção** (`p ∨ (p ∧ q) ≡ p`, `p ∧ (p ∨ q) ≡ p`). Não cancele símbolos por aparência.

## Leia regiões antes de concluir

Nos diagramas, letras `A`, `B` representam classes. **Hachura** exclui objetos; **X** afirma existência; região em branco não decide se existe alguém. Um X sobre fronteira conserva a dúvida entre sub-regiões possíveis.

| Frase | Restrição / existência | Negação |
|---|---|---|
| Todo `A` é `B` | `A` fora de `B` vazia (`A ⊆ B`). | Algum `A` não é `B`. |
| Nenhum `A` é `B` | `A ∩ B` vazia. | Algum `A` é `B`. |
| Algum `A` é `B` | X em `A ∩ B`. | Nenhum `A` é `B`. |
| Algum `A` não é `B` | X em `A` fora de `B`. | Todo `A` é `B`. |

**Universal restringe, sem criar X:** “todo A é B” sozinho não garante que exista A. “Algum” e indivíduo identificado afirmam existência. Se o enunciado estabelecer outra convenção, siga-a. Com três classes, hachure primeiro as regiões vedadas; só depois situe os X. Se um X couber em duas sub-regiões, deixe-o na fronteira, sem escolher o lado que favorece a resposta.

| Premissas | Consequência segura / limite |
|---|---|
| `A ⊆ B`, `B ⊆ C` | `A ⊆ C`; inclusão não se inverte. |
| Algum `A` é `C`, `A ⊆ B` | Algum `B` é `C`; existência sobe para o conjunto maior. |
| Algum `B` é `C`, `A ⊆ B` | Pode estar fora de `A`; existência não desce. |
| `A ⊆ B`, nenhum `B` é `C` | Nenhum `A` é `C`. |
| Algum `A` é `B`, nenhum `B` é `C` | Algum `A` não é `C`. |

**Necessário:** vale em todo diagrama compatível. **Possível:** cabe em algum. **Incompatível:** viola premissa. Um desenho favorável prova possibilidade, não necessidade.
