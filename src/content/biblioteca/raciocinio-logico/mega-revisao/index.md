---
schemaVersion: 1
slug: raciocinio-logico
title: Mega revisão de Raciocínio Lógico
---

## 1. Do comando ao método

**Primeiro reconheça o objeto; depois escolha o que precisa demonstrar.** Uma distribuição de pessoas, uma linha de <abbr title="Tabela que avalia todas as combinações de valores das proposições simples">tabela-verdade</abbr> e um diagrama de classes podem representar a mesma tarefa: encontrar situações que satisfaçam todas as <abbr title="Afirmações tomadas como ponto de partida do raciocínio">premissas</abbr> e verificar a conclusão.

| O comando pede… | O que resolve | O que ainda não basta |
|---|---|---|
| **Pode ocorrer** | Uma configuração completa que obedeça a todas as condições | Uma hipótese parcial ou que desrespeite outra pista |
| **Necessariamente ocorre** | Valer em todas as configurações permitidas | Acontecer no primeiro caso encontrado |
| **Não pode ocorrer** | Mostrar que a hipótese sempre viola alguma condição | Não ter encontrado um exemplo rapidamente |
| **Argumento dedutivo válido** | Não existir caso com todas as premissas verdadeiras e conclusão falsa | Premissas ou conclusão parecerem verdadeiras isoladamente |
| **Equivalência** | Duas fórmulas terem o mesmo valor em todas as <abbr title="Atribuições de significado e valores que permitem avaliar as fórmulas">interpretações</abbr> | Ambas serem verdadeiras em um caso |
| **Negação** | Inverter o valor em todos os casos | Produzir uma frase diferente ou mais forte |

**Havendo ao menos uma configuração admissível, possível inclui o necessário.** Algo verdadeiro em todos esses casos também é verdadeiro em algum. Para derrubar uma conclusão necessária, procure um **contraexemplo**: premissas verdadeiras com a conclusão falsa. Esse mesmo teste serve a argumentos, diagramas e problemas de organização.

### Organizar restrições sem inventar relações

| Estrutura | Representação e propagação |
|---|---|
| Ordem | Posições numeradas. “Antes” exige posição menor; “imediatamente antes”, diferença de uma posição. Estar ao lado não é relação <abbr title="Relação que permite encadear A com B e B com C para concluir A com C">transitiva</abbr>: os vizinhos de uma pessoa podem não ser vizinhos entre si. |
| Associação um a um | Tabela de possibilidades. Confirmar um par elimina os outros da mesma linha e coluna; use essa exclusividade somente quando dada. |
| Grupos e capacidades | Marcar pertencimento e vagas restantes. Estar no mesmo grupo não determina ordem interna. |
| Falas verdadeiras/falsas | Formalizar cada fala e aplicar também a quantidade global de falas verdadeiras. O conteúdo de uma fala não determina sozinho o tipo de seu autor. |
| Alternativas condicionais | Abrir casos separados, propagar consequências e descartar o caso que gerar contradição. Não misturar conclusões de hipóteses diferentes. |

Poucas posições possíveis, vínculos obrigatórios e limites de capacidade costumam restringir mais cedo. Uma solução candidata deve satisfazer **simultaneamente** todas as pistas.

### Quanto apoio a conclusão recebe?

- **Dedução:** exige necessidade. Verdade é atributo das proposições; validade, da ligação entre premissas e conclusão. Argumento **sólido** é válido e tem premissas verdadeiras.
- **Indução:** amostra ou frequência apoia conclusão provável; avalie representatividade, tamanho e exceções. “A maioria tem P” não obriga um indivíduo previamente escolhido a ter P.
- **Analogia:** transfere uma expectativa entre casos semelhantes; importam as semelhanças relevantes para a conclusão e as diferenças capazes de desfazê-la.

Uma conclusão falsa não identifica sozinha o defeito do argumento; uma conclusão verdadeira também pode ter sido obtida por raciocínio inválido. Sucessão temporal, por si, não estabelece causalidade.

## 2. Traduzir, negar e testar a conclusão

Uma **proposição** é uma afirmação que admite valor verdadeiro ou falso. Perguntas e ordens não o admitem; uma frase com variável ainda livre depende da atribuição de um objeto. Proposição simples não contém conectivo proposicional; composta combina proposições. Para $n$ proposições simples distintas, a tabela-verdade completa tem $2^n$ linhas; letras repetidas não criam novas variáveis.

### A condicional conecta linguagem, tabela e argumento

| Leitura | Formalização | Condição recuperada |
|---|---|---|
| Se p, então q; p somente se q | $p\to q$ | p suficiente para q; q necessária para p |
| p se q | $q\to p$ | O trecho depois de “se” é o antecedente |
| p se, e somente se, q | $p\leftrightarrow q$ | As duas direções valem |

Em $p\to q$, o **antecedente** p é a hipótese e o **consequente** q é o que ela exige. A condicional é falsa somente com p verdadeira e q falsa. Com antecedente falso, é verdadeira; isso não afirma causa, sequência temporal nem verdade de q.

| Partindo de $p\to q$ | Conclusão autorizada? |
|---|---|
| p; logo q | Sim: *modus ponens*, afirmar o antecedente |
| $\neg q$; logo $\neg p$ | Sim: *modus tollens*, negar o consequente |
| q; logo p | Não: q pode ocorrer sem p |
| $\neg p$; logo $\neg q$ | Não: a hipótese ausente não impede q |

Também valem o encadeamento $p\to q$, $q\to r\Rightarrow p\to r$ e, de $p\lor q$ com $\neg p$, a conclusão q. Já $p\lor q$ com p não permite negar q: o “ou” inclusivo admite ambos.

### Valor, equivalência e negação em uma consulta

| Fórmula | Quando é verdadeira | Negação equivalente |
|---|---|---|
| $p\land q$ | Ambas verdadeiras | $\neg p\lor\neg q$ |
| $p\lor q$ | Ao menos uma verdadeira | $\neg p\land\neg q$ |
| $p\oplus q$ — “ou” exclusivo | Exatamente uma verdadeira | $p\leftrightarrow q$ |
| $p\to q$ | Exceto p verdadeira e q falsa | $p\land\neg q$ |
| $p\leftrightarrow q$ | Valores iguais | $p\oplus q$ |

$$
p\to q\equiv\neg p\lor q\equiv\neg q\to\neg p.
$$

A última forma é a **contrapositiva**, que inverte e nega as duas partes. Ela preserva a condicional; sua negação é $p\land\neg q$. Trocar somente a ordem produz a conversa $q\to p$, e negar sem trocar produz a inversa $\neg p\to\neg q$: estas duas são equivalentes entre si, mas não equivalem em geral à original.

Para reorganizar fórmulas: dupla negação elimina-se; $\land$ e $\lor$ são <abbr title="Permitem trocar a ordem das parcelas sem mudar o valor lógico">comutativos</abbr> e <abbr title="Permitem reagrupar parcelas unidas pelo mesmo conectivo">associativos</abbr> e distribuem-se um sobre o outro: $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$, e vale a forma com $\land/\lor$ trocados. A condicional não permite a troca da ordem em geral. Preserve parênteses: negar a fórmula inteira difere de negar uma parcela.

**Tautologia** é verdadeira em todas as linhas; **contradição**, falsa em todas; **contingência**, verdadeira em algumas e falsa em outras. **Satisfatível** significa verdadeira em pelo menos uma interpretação.

### A mesma negação em três linguagens

| Linguagem | Troca que acompanha a negação |
|---|---|
| Proposições — leis de De Morgan | $\neg(p\land q)\equiv\neg p\lor\neg q$; $\neg(p\lor q)\equiv\neg p\land\neg q$ |
| Conjuntos — complemento no mesmo universo | $(A\cap B)^c=A^c\cup B^c$; $(A\cup B)^c=A^c\cap B^c$ |
| Quantificadores — todos/existe | $\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)$; $\neg\exists x\,P(x)\equiv\forall x\,\neg P(x)$ |

**Negar “todos” pede uma exceção; negar “algum” elimina todas as ocorrências.** “Algum” significa pelo menos um e não exclui que sejam todos.

### Classes, quantificadores e diagramas

Na tabela, $A(x)$ significa “x pertence à classe A”. O **domínio** é o conjunto de objetos sobre os quais se quantifica.

| Afirmação | Fórmula | Região imposta | Negação |
|---|---|---|---|
| Todo A é B | $\forall x(A(x)\to B(x))$ | $A\subseteq B$ | Algum A não é B |
| Nenhum A é B | $\forall x(A(x)\to\neg B(x))$ | $A\cap B=\varnothing$ | Algum A é B |
| Algum A é B | $\exists x(A(x)\land B(x))$ | Interseção ocupada | Nenhum A é B |
| Algum A não é B | $\exists x(A(x)\land\neg B(x))$ | $A\setminus B$ ocupada | Todo A é B |

**Universal de classe não cria indivíduo.** Na lógica clássica de primeira ordem, o domínio é não vazio, mas A pode ser vazio. De “todo A é B” não se conclui “algum A é B” sem existência de A. “Nenhum A é B” e “algum A é B” admitem troca de A/B; “todo A é B” e “algum A não é B” não admitem essa troca em geral.

No diagrama, marque região vazia e existência conhecida; região sem marca não é necessariamente ocupada. Se a premissa deixa mais de um desenho possível, a conclusão necessária precisa sobreviver a todos. Duas afirmações “algum” podem se referir a pessoas diferentes: de algum A ser B e algum B ser C não se segue que algum A seja C.

### <abbr title="Trecho da fórmula governado por um quantificador">Escopo</abbr> e dependência dos quantificadores

- **Termo** nomeia objeto: constante, variável ou aplicação de função. **Predicado** afirma propriedade/relação e, com os argumentos interpretados, recebe valor lógico; função retorna objeto. A **aridade** é o número de argumentos exigidos.
- Uma ocorrência de variável está **ligada** se está sob o quantificador que a rege; caso contrário, está **livre**. Uma fórmula sem variáveis livres é uma sentença. Renomear variável ligada exige preservar o <abbr title="Trecho da fórmula governado por um quantificador">escopo</abbr> e evitar **captura**, quando uma ocorrência antes livre passa a ser ligada.
- $\forall x\exists y\,R(x,y)$: cada x tem algum y, que pode variar. $\exists y\forall x\,R(x,y)$: existe um mesmo y que serve a todos os x. A segunda implica a primeira; a recíproca não vale em geral. “Um mesmo” não significa “único”.
- Quantificadores consecutivos do mesmo tipo podem trocar de ordem. Ao negar uma sequência de quantificadores, troque cada $\forall/\exists$ alcançado pela negação e negue o escopo restante, conservando a ordem.
- Distribuições válidas: $\forall x(P(x)\land Q(x))\equiv(\forall xP(x))\land(\forall xQ(x))$ e $\exists x(P(x)\lor Q(x))\equiv(\exists xP(x))\lor(\exists xQ(x))$. Em geral, $\forall$ não se distribui sobre $\lor$; dois existenciais separados tampouco garantem um mesmo objeto para uma conjunção.
- De $\forall xP(x)$ pode-se concluir $P(a)$ para um objeto a do domínio; de $\exists xP(x)$ não se conclui que um objeto a previamente escolhido satisfaça P.

## 3. Da região à contagem e à probabilidade

**Defina o que distingue dois resultados.** Conjunto não muda pela ordem nem pela repetição de elementos; sequência pode mudar com a ordem; numa matriz, a posição é parte do dado. $x\in A$ relaciona elemento e conjunto; $A\subseteq B$, dois conjuntos. O vazio é subconjunto de qualquer conjunto, mas não é automaticamente elemento dele. Dois conjuntos são iguais quando possuem os mesmos elementos.

### Traduzir antes de contar

| Expressão | Região no universo U |
|---|---|
| A ou B; pelo menos um | $A\cup B$ — inclui a interseção |
| A e B; ambos | $A\cap B$ |
| A, mas não B | $A\setminus B=A\cap B^c$ |
| Exatamente um dos dois | $(A\setminus B)\cup(B\setminus A)$ — diferença simétrica |
| Nenhum dos dois | $(A\cup B)^c$ |
| Não ambos | $(A\cap B)^c$ — admite um só e também nenhum |

Para conjuntos finitos, $\lvert A\rvert$ é a quantidade de elementos distintos. **Inclusão-exclusão** corrige sobreposições:

$$
\lvert A\cup B\rvert=\lvert A\rvert+\lvert B\rvert-\lvert A\cap B\rvert.
$$

Com três conjuntos, some os três totais, subtraia as três interseções de pares e recoloque a interseção tripla. Cada interseção de par inclui a tripla, salvo se o enunciado disser “somente”. Preencha o diagrama do centro para fora; a parte externa é o total do universo menos a união.

Para contar **exatamente dois** entre A, B e C, some as três interseções de pares e subtraia três vezes a tripla. Para **pelo menos dois**, subtraia duas vezes a tripla. O critério muda a região, mesmo quando os dados são iguais.

### Restrições primeiro; fórmula depois

Somam-se casos **disjuntos**, sem resultados comuns. Multiplicam-se as opções de etapas sucessivas quando cada percurso tem as quantidades indicadas; se o número de escolhas seguintes varia, separe os casos. Esse princípio de contagem não exige independência probabilística. Na tabela, os parâmetros são inteiros não negativos, com as condições adicionais indicadas.

| Situação | Número e condição |
|---|---|
| Ordenar n objetos distintos | $n!$; por convenção, $0!=1$ |
| Escolher e ordenar k entre n distintos, sem repetir | $n!/(n-k)!$, com $0\le k\le n$ |
| Escolher k entre n distintos, sem ordenar nem repetir | $\binom nk=n!/[k!(n-k)!]$, com $0\le k\le n$ |
| Escolher k unidades entre n tipos, repetindo sem ordenar | $\binom{n+k-1}{k}$, com $n\ge1$ |
| Preencher k posições com n opções por posição, repetição livre | $n^k$, com $n\ge1$ |
| Ordenar n objetos com grupos de indistinguíveis | $n!/(n_1!\cdots n_r!)$, sendo $\sum n_i=n$ |
| Dispor n distintos em círculo | $(n-1)!$, com $n\ge1$, quando só rotações são equivalentes; lugares marcados e reflexões mudam o modelo |

Se pessoas devem ficar juntas, trate-as como bloco e conte a ordem interna permitida. Para números, zero não pode ocupar a primeira posição. Para “pelo menos um”, o complemento “nenhum” pode encurtar a conta.

**Casa dos pombos:** distribuir N objetos em k caixas, com k inteiro positivo, garante alguma caixa com pelo menos $\lceil N/k\rceil$ objetos, o menor inteiro não inferior a $N/k$. Para forçar alguma caixa a atingir r objetos, com r inteiro positivo, bastam $k(r-1)+1$. A garantia é de existência: não identifica qual caixa nem afirma ocupação exata.

### Quando contar dá uma probabilidade?

O **espaço amostral** $\Omega$ reúne resultados possíveis; evento é um subconjunto. Em espaço finito **equiprovável**, com resultados de mesma chance:

$$
P(A)=\frac{\lvert A\rvert}{\lvert\Omega\rvert}.
$$

Sem equiprobabilidade, some as probabilidades dos resultados favoráveis. Duas somas numéricas possíveis, por exemplo, podem corresponder a quantidades diferentes de pares ordenados.

| Operação ou hipótese | Regra |
|---|---|
| Complemento | $P(A^c)=1-P(A)$ |
| União | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ |
| Dado que B ocorreu | $P(A\mid B)=P(A\cap B)/P(B)$, com $P(B)>0$ |
| Etapas dependentes | $P(A\cap B)=P(B)P(A\mid B)$, com $P(B)>0$ |
| A e B independentes | $P(A\cap B)=P(A)P(B)$; conhecer um não altera a chance do outro, quando a condicional está definida |

Eventos **mutuamente exclusivos** não ocorrem juntos. Se ambos têm probabilidade positiva, exclusão e independência não podem coexistir. Retirada sem reposição modifica a composição; com reposição, a composição é restaurada, mas a independência ainda depende do mecanismo de sorteio e dos eventos considerados.

Em n tentativas independentes com chance p constante, a probabilidade de pelo menos um sucesso é $1-(1-p)^n$. Como controle da conta, a interseção não excede o menor conjunto/evento; a união não excede o universo/probabilidade 1. Se a soma dos dois totais ultrapassa o universo, alguma sobreposição é obrigatória.

Se $B_1,\ldots,B_k$ formam uma **partição**, casos disjuntos que cobrem o espaço, e têm probabilidades positivas:

$$
P(A)=\sum_i P(B_i)P(A\mid B_i),
\qquad
P(B_j\mid A)=\frac{P(B_j)P(A\mid B_j)}{\sum_iP(B_i)P(A\mid B_i)}.
$$

A segunda fórmula, regra de Bayes, exige ainda $P(A)>0$: a informação A passa a definir a base da comparação. $P(A\mid B)$ e $P(B\mid A)$ respondem a perguntas diferentes.

## 4. Base, pesos e taxas: a ponte quantitativa

**“De qual total?”** une porcentagem, probabilidade condicional, juros e médias. **“O que permanece constante?”** decide proporção, trabalho conjunto, mistura e movimento.

| Problema | Modelo que preserva a base |
|---|---|
| Proporção direta | $y=kx$: razão constante |
| Proporção inversa | $xy=k$: produto constante; aumentar uma e diminuir outra não basta para provar o modelo |
| Dividir T na razão a:b:c | Pesos $a,b,c$; cada parte é T vezes seu peso dividido pela soma. Na divisão inversa, use os <abbr title="Inversos multiplicativos: um dividido por cada peso">recíprocos</abbr> dos pesos positivos. |
| Aumento/desconto de p% | Multiplicar por $1+p/100$ ou $1-p/100$. Para desfazer, dividir pelo fator, quando não nulo. |
| Mudanças sucessivas | Multiplicar os fatores; aumento de 20% seguido de redução de 20% dá fator $1{,}2\times0{,}8=0{,}96$ |
| Variação de uma taxa | De 40% a 50%: 10 pontos percentuais; aumento relativo de $10/40=25\%$ |

### Juros: identificar o capital antes da taxa

Com capital C, taxa decimal i por período e n períodos na mesma unidade:

| Regime | <abbr title="Total do capital mais os juros">Montante</abbr> M | Juros J |
|---|---|---|
| Simples — incidência sempre em C | $M=C(1+in)$ | $J=Cin$ |
| Compostos — incidência no saldo acumulado | $M=C(1+i)^n$ | $J=M-C$ |

Em compra com entrada, o capital financiado é o preço à vista menos a entrada. Se o restante é quitado por uma única parcela futura, compare essa parcela com o **saldo financiado**. Dividir o encargo pelo preço integral muda a taxa. Não misture meses com taxa anual sem converter segundo o regime e as condições do problema.

### Soma ponderada: média, mistura e matriz

$$
\bar x=\frac{\sum_iw_ix_i}{\sum_iw_i},\qquad \sum_iw_i>0.
$$

Os pesos $w_i$ são não negativos e representam frequências, tamanhos ou participações. Média simples usa pesos iguais; para reunir médias de grupos, seus tamanhos são os pesos. Em mistura de volumes aditivos, sem perda do componente, a concentração final é $(c_1V_1+c_2V_2)/(V_1+V_2)$: conserva-se a quantidade $cV$ do componente, não a média simples das concentrações.

Em tabela de quantidades Q por setor/produto e <abbr title="Matriz com uma única coluna">vetor-coluna</abbr> p de preços, **Qp é a soma ponderada dos custos por setor**; não se divide pela soma dos pesos porque o pedido é total. O mesmo raciocínio “multiplicar correspondentes e somar” aparece no produto matricial.

### Taxa e tempo; solução e contexto

- Trabalho uniforme: quem realiza uma tarefa em t unidades de tempo tem taxa $1/t$. Agentes simultâneos somam taxas quando mantêm as produtividades assumidas; entradas e saídas de reservatório usam sinais opostos.
- Movimento uniforme: $d=vt$. Velocidade média é distância total/tempo total. Em aproximação em sentidos opostos, somam-se velocidades; perseguição no mesmo sentido usa a diferença. Com tempos iguais, pode-se usar a média aritmética das velocidades.
- Mais trabalhadores reduzem o tempo inversamente se quantidade de trabalho, jornada e produtividade individual forem mantidas. Verifique a hipótese antes de montar regra de três.
- Idades avançam pelo mesmo intervalo, preservando diferenças. Número de dois algarismos é $10x+y$, com $x\ne0$; inverter algarismos produz $10y+x$. Solução de equação ainda deve respeitar positividade, integralidade e limites do enunciado.
- Divisão inteira: $a=bq+r$, com divisor positivo b e $0\le r<b$. Ciclos usam resto, mas resto zero pode apontar para a última posição de uma numeração iniciada em 1.
- <abbr title="Mínimo múltiplo comum">MMC</abbr> recupera coincidência de ciclos que começam juntos; <abbr title="Máximo divisor comum">MDC</abbr>, maior medida comum que divide quantidades sem sobra. Se os ciclos têm inícios diferentes, considere também esse deslocamento.
- Em sequências, teste diferenças, razões, alternância e regra de recorrência, na qual um termo depende de anteriores. A regra deve explicar todos os dados pertinentes; poucos termos não determinam uma continuação única sem restrições adicionais.

## 5. Dimensão e escala: o cálculo tem de medir o que foi pedido

O desenho sugere uma organização; paralelismo, perpendicularidade e medidas precisam ser dados ou demonstrados. Antes da conta, distinga **contorno, superfície e espaço ocupado**.

| Pedido | Recuperação e condição |
|---|---|
| Ângulos | Complementares somam $90^\circ$; suplementares, $180^\circ$; opostos pelo vértice são iguais. Em paralelas cortadas por <abbr title="Reta que corta as duas outras retas em pontos distintos">transversal</abbr>, <abbr title="Ângulos na mesma posição relativa nas duas interseções">correspondentes</abbr> e <abbr title="Ângulos em lados opostos da transversal, ambos internos ou ambos externos">alternos</abbr> são iguais; <abbr title="Ângulos no mesmo lado da transversal, ambos internos ou ambos externos">colaterais</abbr> são suplementares. |
| Triângulo | Ângulos internos somam $180^\circ$. Com lados positivos e c o maior, exige-se $c<a+b$. Pitágoras $c^2=a^2+b^2$ exige ângulo reto, sendo c a hipotenusa, lado oposto a esse ângulo. |
| <abbr title="Polígono cuja fronteira não se cruza">Polígono simples</abbr> de n lados | Soma interna $(n-2)180^\circ$, com $n\ge3$. Num polígono <abbr title="Com lados e ângulos internos iguais">regular</abbr> <abbr title="Com todos os ângulos internos menores que cento e oitenta graus">convexo</abbr>, divida por n para o ângulo interno. |
| Perímetro | Soma dos segmentos da fronteira. Em figura composta, bordas internas comuns não entram; recortes podem aumentar o contorno enquanto reduzem a área. |
| Área | Retângulo $ab$; paralelogramo $bh$; triângulo $bh/2$; trapézio $(B+b)h/2$; losango $Dd/2$, com D e d diagonais. Altura h é perpendicular à base. Decomponha sem dupla contagem ou subtraia recortes. |
| Circunferência e círculo | Diâmetro $2r$; comprimento $2\pi r$; área $\pi r^2$. Arco e setor correspondentes a ângulo central $\theta$ em graus usam a fração $\theta/360^\circ$ do comprimento e da área, respectivamente. |
| Tangência e coroa circular | Circunferências <abbr title="Tocam-se em um único ponto, sem uma ficar dentro da outra">tangentes externamente</abbr> têm distância entre centros $r_1+r_2$. Coroa entre círculos <abbr title="Com o mesmo centro">concêntricos</abbr> de raios $R>r$ tem área $\pi(R^2-r^2)$, não $\pi(R-r)^2$. |
| Volume | Prisma/cilindro: $A_bh$; pirâmide/cone: $A_bh/3$, com $A_b$ área da base e h altura perpendicular. No cilindro/cone circular, $A_b=\pi r^2$; no paralelepípedo retângulo, $V=abc$. |
| Área de superfície | Some somente as faces existentes. <abbr title="Prisma com arestas laterais perpendiculares às bases">Prisma reto</abbr>: lateral $P_bh$, com $P_b$ perímetro da base; <abbr title="Cilindro de bases circulares com eixo perpendicular às bases">cilindro circular reto</abbr>: lateral $2\pi rh$. Acrescente as bases efetivamente presentes. |

### A razão linear controla outras dimensões

Figuras **semelhantes** preservam ângulos e têm medidas lineares correspondentes proporcionais. Se a passagem da figura 1 para a 2 multiplica comprimentos por $k>0$, multiplica perímetros por k, áreas por $k^2$ e volumes por $k^3$. Tales exige paralelismo e correspondência correta dos segmentos.

Na escala **desenho:real = 1:n**, passar do desenho ao real multiplica comprimentos por n e áreas por $n^2$; volumes de modelos semelhantes, por $n^3$. O sentido inverso divide pelos mesmos fatores.

**Ponte com taxas:** num cone reto invertido, com base horizontal e vértice para baixo, a água até altura h forma cone semelhante ao total de altura H; assim, a fração do volume é $(h/H)^3$. Com vazão constante, o tempo para acrescentar líquido é proporcional ao volume acrescentado. Ao encher desde vazio, atingir metade da altura não consome metade do tempo total; num prisma de seção horizontal constante, a relação altura/volume é linear.

Unidade linear elevada ao quadrado vira área; ao cubo, volume:

$$
1\,\mathrm{m}=100\,\mathrm{cm},\quad
1\,\mathrm{m}^2=10\,000\,\mathrm{cm}^2,\quad
1\,\mathrm{m}^3=1\,000\,000\,\mathrm{cm}^3=1\,000\,\mathrm{L}.
$$

$$
1\,\mathrm{L}=1\,\mathrm{dm}^3=1\,000\,\mathrm{cm}^3,\qquad
1\,\mathrm{m/s}=3{,}6\,\mathrm{km/h}.
$$

Uma hora contém 60 minutos: duas horas e quinze minutos são $2{,}25$ horas. Converta antes de combinar medidas.

## 6. Matrizes: posições, restrições e composição

Em $A_{m\times n}$, m conta linhas e n conta colunas; $a_{ij}$ ocupa linha i, coluna j. Rotule eixos e unidades. **Padrão em quadro** pede uma regra que explique as posições relevantes; **operação matricial** tem definição própria.

| Decisão | Recuperação |
|---|---|
| Regra por casos | Primeiro compare os índices, por exemplo $i<j$, $i=j$, $i>j$; depois aplique a fórmula daquele caso. Não confunda índice com valor da entrada. |
| Contar entradas com uma propriedade | Conte pares $(i,j)$ dentro de $1\le i\le m$, $1\le j\le n$. Uma condição sobre $i-j$ seleciona posições; respeite os limites de linhas e colunas. |
| Igualdade, soma e subtração | Exigem mesma ordem; compare/opere entradas correspondentes. Igualdade pode produzir equações simultâneas para as incógnitas. |
| Escalar — número que multiplica a matriz | Multiplica todas as entradas. Aumento de 10% produz $1{,}10A$; o acréscimo sozinho é $0{,}10A$. |
| Transposta | $A^T$ troca linhas e colunas: $(A^T)_{ij}=a_{ji}$; ordem $m\times n$ passa a $n\times m$. |
| Produto | $A_{m\times n}B_{n\times p}$ existe e tem ordem $m\times p$. Cada entrada é linha da primeira vezes coluna da segunda, somando os produtos. |

$$
(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

Dimensões internas coincidem; externas dão a ordem final. O produto **não** é feito posição a posição. Em geral, $AB\ne BA$, e AB existir não garante que BA exista. A matriz identidade tem 1 na <abbr title="Entradas em que o índice da linha é igual ao índice da coluna">diagonal principal</abbr> e 0 nas demais entradas; com ordens compatíveis, $AI=A$ e $IA=A$. Potência $A^2=AA$ exige <abbr title="Matriz com igual número de linhas e colunas">matriz quadrada</abbr>.

Na aplicação a **<abbr title="Matrizes com uma única coluna">vetores-coluna</abbr>**, o fator mais à direita atua primeiro: $ABx=A(Bx)$. A ordem representa etapas do processo. Em Qp, por exemplo, quantidades por produto combinam-se com preços por produto para dar custos por setor; rótulos e unidades confirmam o produto adequado.

Quadros com somas de linhas/colunas e números distintos retomam as estruturas lógicas: todas essas condições valem juntas. Propague as somas e exclua valores já usados somente se a distinção for exigida.

## Última decisão antes de marcar

**Traduzi a força do comando?** Possível ou necessário; algum ou todos; “não ambos” ou nenhum. **Fixei a base?** Universo condicionado, capital financiado, soma dos pesos. **Respeitei as hipóteses?** Ordem/repetição, independência, paralelismo, ângulo reto, dimensões matriciais. **Voltei ao enunciado?** A configuração e o resultado precisam satisfazer todas as condições, com unidade e sentido corretos.
