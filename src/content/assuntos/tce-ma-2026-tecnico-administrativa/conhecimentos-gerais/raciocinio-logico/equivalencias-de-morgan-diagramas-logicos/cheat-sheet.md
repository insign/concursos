# Equivalências, De Morgan e diagramas lógicos

## Equivalência em uma linha

$$
P \equiv Q
\iff
\text{mesmo valor em todas as atribuições}
$$

- uma linha igual não prova equivalência;
- uma linha diferente refuta;
- $P\equiv Q$ se $P\leftrightarrow Q$ for tautologia.

## Equivalências indispensáveis

| Forma | Equivalente |
|---|---|
| $\neg\neg p$ | $p$ |
| $p\to q$ | $\neg p\lor q$ |
| $p\to q$ | $\neg q\to\neg p$ |
| $\neg(p\to q)$ | $p\land\neg q$ |
| $p\leftrightarrow q$ | $(p\to q)\land(q\to p)$ |
| $p\leftrightarrow q$ | $(p\land q)\lor(\neg p\land\neg q)$ |
| $\neg(p\leftrightarrow q)$ | $(p\land\neg q)\lor(\neg p\land q)$ |

### Condicional: não confunda

| A partir de $p\to q$ | Forma | Equivale à original? |
|---|---:|:---:|
| conversa | $q\to p$ | não |
| inversa | $\neg p\to\neg q$ | não |
| contrapositiva | $\neg q\to\neg p$ | **sim** |

> Negação da condicional: **mantém $p$, nega $q$ e troca a seta por “e”**.

## Leis algébricas úteis

| Padrão | Resultado |
|---|---|
| $p\land p$ ou $p\lor p$ | $p$ |
| $p\land q$ | $q\land p$ |
| $p\lor q$ | $q\lor p$ |
| $p\lor\neg p$ | $\top$ |
| $p\land\neg p$ | $\bot$ |
| $p\land\top$ | $p$ |
| $p\lor\bot$ | $p$ |
| $p\lor(p\land q)$ | $p$ |
| $p\land(p\lor q)$ | $p$ |

### Distributividade

$$
p\land(q\lor r)
\equiv
(p\land q)\lor(p\land r)
$$

$$
p\lor(q\land r)
\equiv
(p\lor q)\land(p\lor r)
$$

## De Morgan

$$
\neg(p\land q)
\equiv
\neg p\lor\neg q
$$

$$
\neg(p\lor q)
\equiv
\neg p\land\neg q
$$

> **Negue cada parcela + troque o conectivo.**

### Cadeias

- $\neg(p\land q\land r)\equiv\neg p\lor\neg q\lor\neg r$.
- $\neg(p\lor q\lor r)\equiv\neg p\land\neg q\land\neg r$.
- “nem $p$ nem $q$” = $\neg p\land\neg q$.

### Linguagem natural

| Negação de | Forma correta |
|---|---|
| $p$ e $q$ | não $p$ **ou** não $q$ |
| $p$ ou $q$ | não $p$ **e** não $q$ |
| todos os requisitos | pelo menos um requisito não |
| algum dos requisitos | nenhum dos requisitos |

## Fluxo de transformação

1. Preserve parênteses.
2. Localize o conectivo principal.
3. Elimine $\to$ ou $\leftrightarrow$ se ajudar.
4. Aplique De Morgan de fora para dentro.
5. Elimine $\neg\neg$.
6. Procure complemento, distributividade, identidade e absorção.
7. Confira por tabela ou contraexemplo se necessário.

Exemplo:

$$
\neg(p\to q)
\equiv
\neg(\neg p\lor q)
\equiv
p\land\neg q.
$$

## Diagramas: legenda

- **hachura** = região vazia;
- **X** = existência confirmada;
- região em branco = existência não determinada;
- X na fronteira = objeto existe, mas sua sub-região exata não foi determinada.

## Quatro formas categóricas

| Frase | Diagrama |
|---|---|
| Todo $A$ é $B$ | $A$ fora de $B$ vazia |
| Nenhum $A$ é $B$ | $A\cap B$ vazia |
| Algum $A$ é $B$ | X em $A\cap B$ |
| Algum $A$ não é $B$ | X em $A$ fora de $B$ |

## Negação categórica

| Afirmação | Negação |
|---|---|
| Todo $A$ é $B$ | Algum $A$ não é $B$ |
| Nenhum $A$ é $B$ | Algum $A$ é $B$ |
| Algum $A$ é $B$ | Nenhum $A$ é $B$ |
| Algum $A$ não é $B$ | Todo $A$ é $B$ |

## Existência: regra operacional

No método usado neste material:

- universal **hachura/restringe**, mas não cria X;
- “algum” cria X;
- indivíduo identificado também pode fornecer existência;
- se a questão declarar convenção diferente, siga o enunciado.

> “Todo $A$ é $B$” não autoriza sozinho concluir “algum $A$ é $B$”.

## Padrões diagramáticos

### Inclusão encadeada

$$
A\subseteq B,\ B\subseteq C
\Rightarrow
A\subseteq C
$$

### Existência sobe

- Todo $A$ é $B$.
- Algum $A$ é $C$.
- **Logo:** algum $B$ é $C$.

### Existência não desce

- Todo $A$ é $B$.
- Algum $B$ é $C$.
- **Não conclua:** algum $A$ é $C$.

### Inclusão + exclusão

- Todo $A$ é $B$.
- Nenhum $B$ é $C$.
- **Logo:** nenhum $A$ é $C$.

### Existência + exclusão

- Algum $A$ é $B$.
- Nenhum $B$ é $C$.
- **Logo:** algum $A$ não é $C$.

## Três classes

1. Desenhe as sobreposições ainda possíveis.
2. Hachure as regiões proibidas pelas universais.
3. Depois coloque os X das existenciais.
4. Se duas posições continuarem possíveis, mantenha o X na fronteira.
5. Não complete o desenho por conveniência.

## Necessário × possível

- **necessária:** vale em todos os diagramas compatíveis;
- **possível:** vale em algum, mas não em todos;
- **incompatível:** viola alguma premissa.

> Um único diagrama admissível sem a conclusão refuta a necessidade.

## Pegadinhas

- coincidência em uma linha ≠ equivalência;
- conversa ≠ contrapositiva;
- $\neg(p\to q)\equiv p\land\neg q$;
- De Morgan troca o conectivo;
- não “cancele” letras proposicionais;
- todo $A$ é $B$ não implica todo $B$ é $A$;
- universal não cria X no método adotado;
- região em branco não significa ocupada;
- X não pode ser posicionado para favorecer a conclusão;
- possível ≠ necessário.

## Checklist

1. A transformação preserva os parênteses?
2. A seta foi eliminada corretamente?
3. A contrapositiva foi confundida com a conversa?
4. De Morgan negou todas as parcelas e trocou o conectivo?
5. Há um contraexemplo que refute a equivalência?
6. Nos diagramas, quais regiões estão proibidas?
7. Qual premissa justifica cada X?
8. Algum X deve permanecer sobre fronteira?
9. A conclusão vale em todos os diagramas admissíveis?
