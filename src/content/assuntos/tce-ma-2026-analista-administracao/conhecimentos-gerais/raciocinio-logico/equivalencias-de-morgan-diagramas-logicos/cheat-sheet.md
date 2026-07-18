# Equivalências, De Morgan e diagramas lógicos

## Equivalência lógica

$$
P \equiv Q
$$

- $P$ e $Q$ têm o mesmo valor em **todas** as atribuições.
- As colunas finais das tabelas-verdade são idênticas.
- Uma coincidência em uma linha não basta.
- Uma única linha divergente refuta a equivalência.
- $P \equiv Q$ se e somente se $P \leftrightarrow Q$ é tautologia.

## Não confunda

| Relação | Ideia |
|---|---|
| $P \equiv Q$ | mesmos valores em todas as atribuições |
| $P \to Q$ | fórmula falsa somente em V/F |
| $P \models Q$ | não há caso com $P$ verdadeira e $Q$ falsa |

- Equivalência vale nas duas direções.
- Consequência pode valer em uma única direção.
- $p \land q \models p$, mas $p \land q \not\equiv p$.

## Testes

### Por tabela

1. Liste as letras distintas.
2. Enumere todas as atribuições.
3. Calcule as duas fórmulas.
4. Compare as colunas finais.

### Por bicondicional

$$
P \equiv Q
\quad\Longleftrightarrow\quad
P \leftrightarrow Q\text{ é tautologia}.
$$

### Para refutar

Encontre uma atribuição em que uma fórmula seja V e a outra seja F.

## Leis básicas

### Dupla negação

$$
\neg\neg p \equiv p
$$

### Idempotência

$$
p \land p \equiv p
$$

$$
p \lor p \equiv p
$$

### Comutatividade

$$
p \land q \equiv q \land p
$$

$$
p \lor q \equiv q \lor p
$$

> A condicional não é comutativa: $p \to q \not\equiv q \to p$.

### Associatividade

$$
(p \land q) \land r \equiv p \land (q \land r)
$$

$$
(p \lor q) \lor r \equiv p \lor (q \lor r)
$$

### Distributividade

$$
p \land (q \lor r)
\equiv
(p \land q) \lor (p \land r)
$$

$$
p \lor (q \land r)
\equiv
(p \lor q) \land (p \lor r)
$$

### Identidade

$$
p \land \top \equiv p
$$

$$
p \lor \bot \equiv p
$$

### Dominação

$$
p \lor \top \equiv \top
$$

$$
p \land \bot \equiv \bot
$$

### Complemento

$$
p \lor \neg p \equiv \top
$$

$$
p \land \neg p \equiv \bot
$$

### Absorção

$$
p \lor (p \land q) \equiv p
$$

$$
p \land (p \lor q) \equiv p
$$

## Condicional

### Eliminar a seta

$$
p \to q
\equiv
\neg p \lor q
\equiv
\neg(p \land \neg q)
$$

### Contrapositiva

$$
p \to q \equiv \neg q \to \neg p
$$

| A partir de $p \to q$ | Forma | Equivalência |
|---|---:|---|
| conversa | $q \to p$ | não equivale em geral |
| inversa | $\neg p \to \neg q$ | não equivale em geral |
| contrapositiva | $\neg q \to \neg p$ | equivale |

- Conversa e inversa são equivalentes entre si.
- Original e contrapositiva são equivalentes entre si.

### Negar a condicional

$$
\neg(p \to q) \equiv p \land \neg q
$$

> Negar a promessa é afirmar sua única violação: antecedente V e consequente F.

### Distribuições úteis

$$
p \to (q \land r)
\equiv
(p \to q) \land (p \to r)
$$

$$
(p \lor q) \to r
\equiv
(p \to r) \land (q \to r)
$$

## Bicondicional

$$
p \leftrightarrow q
\equiv
(p \to q) \land (q \to p)
$$

$$
p \leftrightarrow q
\equiv
(p \land q) \lor (\neg p \land \neg q)
$$

- Verdadeira quando os valores são iguais.
- Expressa as duas direções condicionais.

### Negação

$$
\neg(p \leftrightarrow q)
\equiv
(p \land \neg q) \lor (\neg p \land q)
$$

- A negação da bicondicional é a disjunção exclusiva.
- Exige valores diferentes.

## Leis de De Morgan

$$
\neg(p \land q)
\equiv
\neg p \lor \neg q
$$

$$
\neg(p \lor q)
\equiv
\neg p \land \neg q
$$

> Negue cada parcela **e troque o conectivo**.

### Três parcelas

$$
\neg(p \land q \land r)
\equiv
\neg p \lor \neg q \lor \neg r
$$

$$
\neg(p \lor q \lor r)
\equiv
\neg p \land \neg q \land \neg r
$$

### Linguagem natural

| Negação de | Equivalente |
|---|---|
| $p$ e $q$ | não $p$ ou não $q$ |
| $p$ ou $q$ | não $p$ e não $q$ |
| todos os requisitos | pelo menos um requisito não |
| algum dos requisitos | nenhum dos requisitos |
| nem $p$ nem $q$ | $\neg p \land \neg q$ |

### Fórmula aninhada

$$
\neg\bigl(p \lor (q \land r)\bigr)
\equiv
\neg p \land (\neg q \lor \neg r)
$$

## Transformação segura

1. Preserve os parênteses.
2. Identifique o conectivo principal.
3. Elimine $\to$ e $\leftrightarrow$ quando útil.
4. Aplique De Morgan de fora para dentro.
5. Elimine duplas negações.
6. Use complemento, identidade, absorção e distributividade.
7. Justifique cada passo por uma lei.
8. Confira por tabela ou contraexemplo se necessário.

Exemplo:

$$
\neg(p \to q)
\equiv
\neg(\neg p \lor q)
\equiv
\neg\neg p \land \neg q
\equiv
p \land \neg q.
$$

Exemplo:

$$
(p \land q) \lor (p \land \neg q)
\equiv
p \land (q \lor \neg q)
\equiv
p \land \top
\equiv
p.
$$

## Diagramas lógicos

- Círculos representam **classes**, não fórmulas proposicionais isoladas.
- Região hachurada: vazia.
- X: existe ao menos um objeto.
- Região em branco: existência não determinada.
- X na fronteira: objeto existe, mas a sub-região exata é indeterminada.
- O termo do CEBRASPE refere-se a diagramas de classes do tipo Venn/Euler, não a portas digitais.

## Quatro formas categóricas

| Forma | Região | Registro |
|---|---|---|
| Todo $A$ é $B$ | $A$ fora de $B$ vazia | $A \subseteq B$ |
| Nenhum $A$ é $B$ | interseção vazia | $A \cap B=\varnothing$ |
| Algum $A$ é $B$ | X na interseção | $A \cap B\neq\varnothing$ |
| Algum $A$ não é $B$ | X em $A$ fora de $B$ | $A \setminus B\neq\varnothing$ |

## Negação categórica

| Afirmação | Negação |
|---|---|
| Todo $A$ é $B$ | Algum $A$ não é $B$ |
| Nenhum $A$ é $B$ | Algum $A$ é $B$ |
| Algum $A$ é $B$ | Nenhum $A$ é $B$ |
| Algum $A$ não é $B$ | Todo $A$ é $B$ |

## Conversões

| Original | Conversa | Válida? |
|---|---|:---:|
| Nenhum $A$ é $B$ | Nenhum $B$ é $A$ | sim |
| Algum $A$ é $B$ | Algum $B$ é $A$ | sim |
| Todo $A$ é $B$ | Todo $B$ é $A$ | não |
| Algum $A$ não é $B$ | Algum $B$ não é $A$ | não |

> Interseção e exclusão são simétricas; inclusão e diferença orientada não são.

## Existência

- Universais não criam X.
- “Todo $A$ é $B$” não garante que exista $A$.
- “Nenhum $A$ é $B$” não garante que existam $A$ ou $B$.
- Existência vem de “algum”, de indivíduo identificado ou de premissa equivalente.
- “Todo $A$ é $B$” e “nenhum $A$ é $B$” podem coexistir se $A$ estiver vazia.

## Três classes

1. Desenhe todas as sobreposições ainda possíveis.
2. Lance universais primeiro: hachure regiões vazias.
3. Lance existenciais depois: coloque X em região permitida.
4. Mantenha X sobre fronteira quando a posição não estiver determinada.
5. Não acrescente relações ausentes das premissas.
6. Teste a conclusão em todos os desenhos admissíveis.

## Padrões de inferência

### Inclusão encadeada

$$
A \subseteq B,\quad B \subseteq C
\quad\Longrightarrow\quad
A \subseteq C.
$$

### Existência no menor sobe para o maior

- Todo $A$ é $B$.
- Algum $A$ é $C$.
- Logo, algum $B$ é $C$.

### Existência no maior não desce

- Todo $A$ é $B$.
- Algum $B$ é $C$.
- Não se conclui que algum $A$ seja $C$.

### Inclusão e exclusão

- Todo $A$ é $B$.
- Nenhum $B$ é $C$.
- Logo, nenhum $A$ é $C$.

### Existência e exclusão

- Nenhum $A$ é $B$.
- Algum $C$ é $A$.
- Logo, algum $C$ não é $B$.

## Necessário × possível

- **Necessária:** conclusão aparece em todos os diagramas compatíveis.
- **Possível:** aparece em algum diagrama, mas não em todos.
- **Incompatível:** viola região vazia ou existência exigida.
- Um único diagrama admissível sem a conclusão refuta a necessidade.

## Pegadinhas

- Mesma verdade em uma linha ≠ equivalência.
- Conversa ≠ contrapositiva.
- $\neg(p \to q) \equiv p \land \neg q$.
- De Morgan troca o conectivo.
- Não existe cancelamento informal de letras.
- Todo $A$ é $B$ não implica todo $B$ é $A$.
- Todo $A$ é $B$ não implica algum $A$ é $B$.
- Região em branco não significa região ocupada.
- X não pode ser posicionado por conveniência.
- Conclusão possível não é necessariamente válida.

## Checklist final

1. A igualdade foi testada em todas as atribuições?
2. Há uma linha contraexemplo?
3. A conversa foi confundida com a contrapositiva?
4. A negação alcançou toda a subfórmula?
5. De Morgan trocou $\land$ e $\lor$?
6. Cada transformação possui uma lei identificável?
7. Nos diagramas, quais regiões estão vazias?
8. Qual premissa introduz cada X?
9. Algum X deveria permanecer sobre uma fronteira?
10. A conclusão vale em todos os diagramas admissíveis?
