# Equivalências e leis de De Morgan

**Equivalente:** mesmo valor em todas as atribuições. **Negação:** valor oposto em cada atribuição. Uma coincidência não confirma equivalência; uma divergência a refuta. $P\equiv Q$ exatamente quando $P\leftrightarrow Q$ é <abbr title="Fórmula verdadeira em todas as atribuições">tautologia</abbr>.

## Negue o grupo inteiro

| Fórmula | Negação equivalente |
|---|---|
| $p\land q$ | $\neg p\lor\neg q$ — basta uma parte falsa. |
| $p\lor q$ | $\neg p\land\neg q$ — ambas precisam ser falsas. |
| $p\to q$ | $p\land\neg q$ — <abbr title="Parte que vem depois de se na condicional">antecedente</abbr> verdadeiro e <abbr title="Parte que vem depois de então na condicional">consequente</abbr> falso. |
| $p\leftrightarrow q$ | $(p\land\neg q)\lor(\neg p\land q)$ — valores diferentes. |

**De Morgan:** negue as partes **e** troque $\land$ por $\lor$, ou $\lor$ por $\land$. Vale para cadeias do mesmo conectivo; em grupos aninhados, avance de fora para dentro. Elimine $\neg\neg p$ como $p$.

$$\neg\bigl(p\lor(q\land r)\bigr)\equiv\neg p\land(\neg q\lor\neg r).$$

“Não ambos” = $\neg(p\land q)$; “nem um nem outro” = $\neg(p\lor q)$. O “ou” padrão inclui ambas as alternativas, salvo exclusividade expressa.

## Preserve a condicional ou a bicondicional

| Transformação | Forma e cuidado |
|---|---|
| Eliminar a seta | $p\to q\equiv\neg p\lor q$. Ambas são falsas somente com $p$ verdadeira e $q$ falsa. |
| <abbr title="Condicional que inverte a ordem e nega os dois termos">Contrapositiva</abbr> | $\neg q\to\neg p$ equivale a $p\to q$. |
| <abbr title="Condicional que troca a ordem dos termos sem negá-los">Conversa</abbr> | $q\to p$ não equivale em geral à original. |
| <abbr title="Condicional que nega os termos sem trocar sua ordem">Inversa</abbr> | $\neg p\to\neg q$ não equivale em geral à original; equivale à <abbr title="Condicional que troca a ordem dos termos sem negá-los">conversa</abbr>. |
| Bicondicional | $p\leftrightarrow q\equiv(p\to q)\land(q\to p)\equiv(p\land q)\lor(\neg p\land\neg q)$. |

Negar os dois lados de uma bicondicional mantém a concordância: $\neg p\leftrightarrow\neg q\equiv p\leftrightarrow q$.

**Conectivos compostos:** mantenha o <abbr title="Parte que vem depois de se na condicional">antecedente</abbr> inteiro e negue o <abbr title="Parte que vem depois de então na condicional">consequente</abbr> inteiro antes de abrir agrupamentos.

$$\neg\bigl((p\lor q)\to r\bigr)\equiv(p\lor q)\land\neg r.$$

$$\neg\bigl(p\to(q\lor r)\bigr)\equiv p\land\neg q\land\neg r.$$

A negação da bicondicional também equivale à <abbr title="Disjunção verdadeira quando exatamente uma parte é verdadeira">disjunção exclusiva</abbr>: $(p\lor q)\land\neg(p\land q)$.

## Simplifique com uma regra

| Padrão | Resultado |
|---|---|
| $p\land p$; $p\lor p$ | $p$ |
| $p\land(q\lor r)$ | $(p\land q)\lor(p\land r)$ |
| $p\lor(q\land r)$ | $(p\lor q)\land(p\lor r)$ |
| $p\lor\neg p$; $p\land\neg p$ | $\top$ (sempre verdadeira); $\bot$ (sempre falsa). |
| $p\land\top$; $p\lor\bot$ | $p$ |
| $p\lor\top$; $p\land\bot$ | $\top$; $\bot$, respectivamente. |
| $p\lor(p\land q)$; $p\land(p\lor q)$ | $p$ — <abbr title="A parcela isolada já determina o valor de toda a fórmula">absorção</abbr>. |

Pode trocar a ordem ou reagrupar parcelas ligadas pelo **mesmo** $\land$ ou $\lor$. Com conectivos misturados, preserve parênteses e aplique a regra correspondente. Substitua somente a parte equivalente; não mude o restante da estrutura.
