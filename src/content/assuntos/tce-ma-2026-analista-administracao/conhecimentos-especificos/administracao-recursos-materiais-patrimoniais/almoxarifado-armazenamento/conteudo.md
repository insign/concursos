---
schemaVersion: 1
title: Almoxarifado e armazenamento
description: Almoxarifado, armazenagem, localização, conservação, slotting, espaço, segurança, sistemas, indicadores e auditoria.
order: 120
storageId: almoxarifado-armazenamento
---

# Almoxarifado e armazenamento

O sistema informa 40 unidades de um material. A contagem confirma 40, mas 12 estão em posições diferentes das registradas. **O saldo está certo; o almoxarifado, não.** Guardar materiais significa manter quantidade, localização, condição e disponibilidade coerentes ao mesmo tempo.

> **Modelo mental:** identificar → endereçar → armazenar → preservar → movimentar e registrar → aplicar a rotação → inspecionar → tratar desvios.

O Edital nº 1/2026 do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>, publicado em **6 de julho de 2026**, inclui neste assunto: funções, princípios e objetivos do almoxarifado; controle, registro, conservação e recuperação de material; técnicas de armazenamento; utilização do espaço; e segurança.

A <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 é uma referência operacional do <abbr title="Sistema de Serviços Gerais">SISG</abbr> federal. Ela não se aplica automaticamente ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>, mas fornece conceitos clássicos cobrados em administração de materiais. As <abbr title="Normas Regulamentadoras">NR</abbr> têm campos de aplicação próprios; quando utilizadas aqui, servem para compreender os requisitos de segurança pertinentes. A redação da <abbr title="Norma Regulamentadora">NR</abbr> 1 que entrou em vigor em **26 de maio de 2026** já integra o corte do edital.

<!-- REVISAO-ALMOXARIFADO-2026 -->

## 1. O que o almoxarifado precisa entregar

### 1.1 Unidade, atividade e estoque

Três conceitos próximos não são sinônimos:

| Conceito | Pergunta que responde | Núcleo |
| --- | --- | --- |
| **almoxarifado** | quem/onde guarda e controla? | unidade organizacional e instalação destinadas à custódia e ao controle de materiais |
| **armazenagem** | o que se faz com o material guardado? | guarda, localização, segurança e preservação |
| **estoque** | o que existe para uso futuro? | conjunto de itens e quantidades mantidos para atender necessidades |

A <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 define armazenagem como a guarda, localização, segurança e preservação do material adquirido para suprir as necessidades operacionais.

Isso ajuda a separar fronteiras. **Comprar** obtém o material; **receber e aceitar** verificam a entrega; **armazenar** conserva e localiza; **distribuir** entrega ao usuário; **inventariar** confronta físico e registro; **alienar** dá destinação jurídica ao bem. Esses processos se conectam, mas não devem ser confundidos.

### 1.2 Objetivos e funções

Um almoxarifado bem administrado busca manter o material:

- **disponível:** apto a atender a demanda autorizada;
- **localizável:** endereço físico conhecido e atualizado;
- **íntegro:** protegido contra deterioração, avaria, contaminação e extravio;
- **identificado:** código, descrição, lote, série ou validade preservados quando pertinentes;
- **rastreável:** cada movimento pode ser relacionado a origem, destino, responsável e documento;
- **seguro:** carga, estrutura, circulação, equipamento e pessoas operam dentro dos limites aplicáveis;
- **economicamente organizado:** espaço, percurso e manipulação são usados sem criar riscos ou perdas maiores.

Desses objetivos decorrem funções como endereçar, guardar, registrar movimentações, conservar, separar materiais incompatíveis, acompanhar validade e condição, restringir acessos quando necessário e fornecer informação confiável para reposição e inventário.

A meta não é “encher o prédio”. **Densidade é apenas uma variável.** Um depósito lotado, sem seletividade e com rotas de emergência obstruídas pode ter alta ocupação e baixa qualidade operacional.

## 2. Controle: o material físico precisa ter um endereço informacional

### 2.1 A cadeia mínima

O controle interno liga quatro elementos:

```text
material físico
+ endereço
+ registro
+ documento que justifica o movimento
```

Se um desses elos falha, a rastreabilidade se rompe. Uma etiqueta não prova que a quantidade existe; um saldo correto não prova que o endereço está correto; uma movimentação física sem atualização pode tornar o sistema temporariamente falso.

### 2.2 Código não é endereço

O **código do material** responde “qual item é este?”. O **endereço de armazenagem** responde “onde ele está?”. Um mesmo código pode ocupar mais de uma posição, desde que o sistema registre todas elas e seus respectivos saldos.

Um endereço pode ser estruturado, por exemplo, em zona, corredor, módulo, nível e posição. O formato específico importa menos que três propriedades:

1. cada posição precisa ser identificável sem ambiguidade;
2. o mapa físico e o cadastro precisam representar a mesma estrutura;
3. a atualização deve acompanhar a movimentação.

### 2.3 Localização fixa, dinâmica e híbrida

| Método | Como funciona | Principal cuidado |
| --- | --- | --- |
| **fixa** | cada item tem posição previamente reservada | pode deixar espaço ocioso quando o saldo cai |
| **dinâmica ou livre** | o item ocupa posição disponível e compatível | exige registro tempestivo de cada alocação e retirada |
| **híbrida** | combina regras, como separação fixa e reserva dinâmica | precisa controlar a passagem entre as áreas |

“Livre” não significa “sem endereço”. Na localização dinâmica, o endereço muda; justamente por isso, o registro precisa ser ainda mais confiável.

A decisão sobre o melhor endereço de cada item é chamada **<abbr title="escolha do endereço mais adequado para cada item">slotting</abbr>**. Ela combina, entre outros fatores:

- giro ou frequência de acesso;
- massa e volume;
- fragilidade;
- validade;
- criticidade para o serviço;
- valor e facilidade de subtração;
- compatibilidade entre materiais;
- equipamento e rota disponíveis.

Alto giro costuma favorecer proximidade da separação, mas não supera segurança. Um item pesado ou incompatível pode exigir nível inferior ou área segregada mesmo que isso aumente o percurso.

### 2.4 Registro tempestivo e qualidade dos dados

Um registro de almoxarifado deve ser:

- completo: contém os campos necessários;
- exato: corresponde ao fato físico;
- consistente: não contradiz outros registros;
- tempestivo: é lançado sem atraso capaz de comprometer o controle;
- único quando precisa identificar item, lote, série ou endereço;
- rastreável: preserva quem fez, quando fez e por qual documento.

Relatórios de exceção são mais úteis que a simples existência do sistema. Exemplos: saldo em posição inexistente, lote vencido liberado, item bloqueado tratado como disponível, endereço físico divergente, série duplicada ou movimento sem documento.

### 2.5 Acurácia: quantidade e localização são dimensões diferentes

Uma forma de medir a acurácia de saldo é:

$$
\text{acurácia de saldo}=
\frac{\text{itens sem divergência de quantidade}}
{\text{itens verificados}}\times100
$$

Para localização:

$$
\text{acurácia de localização}=
\frac{\text{itens encontrados no endereço correto}}
{\text{itens testados}}\times100
$$

**Exemplo hipotético.** Em 200 itens testados, 190 têm quantidade correta: acurácia de saldo de 95%. Se apenas 180 estão no endereço registrado, a acurácia de localização é 90%. Não existe contradição: são problemas distintos.

Ao comparar indicadores, declare universo, amostra, unidade e tolerância. Alterar o método entre períodos pode criar uma melhora ou piora apenas aparente.

### 2.6 Tecnologia ajuda; processo continua necessário

Um <abbr title="Warehouse Management System, sistema de gestão de armazém">WMS</abbr> pode controlar endereços, tarefas, lotes, regras de separação e histórico. Código de barras e <abbr title="Quick Response, código de resposta rápida">QR</abbr> reduzem digitação; <abbr title="Radio Frequency Identification, identificação por radiofrequência">RFID</abbr> permite identificação por radiofrequência sem depender da mesma linha de visada de um código óptico.

Nenhuma dessas tecnologias prova, sozinha, quantidade, condição, propriedade ou regularidade do material. Uma etiqueta <abbr title="Radio Frequency Identification, identificação por radiofrequência">RFID</abbr> pode ser lida em uma caixa vazia; um <abbr title="Warehouse Management System, sistema de gestão de armazém">WMS</abbr> pode mostrar o endereço errado se a movimentação não foi registrada.

Também é necessário prever **contingência**. Se o sistema ficar indisponível, movimentos excepcionais devem manter identificação, data efetiva, responsável e documento para posterior reconciliação. Sincronizar depois não autoriza apagar a diferença entre a hora do fato e a hora do lançamento.

## 3. Conservação, condição e recuperação

### 3.1 Conservar é prevenir

Conservação procura impedir que o material perca a aptidão de uso. O controle depende das características do item e pode envolver:

- proteção contra umidade, calor, luz, poeira e intempéries;
- inspeção de embalagem e lacres;
- controle de pragas e contaminação;
- estabilidade de pilhas e cargas;
- segregação de produtos incompatíveis;
- controle de temperatura ou outra condição ambiental quando necessária;
- preservação da embalagem original quando ela é parte da proteção;
- inspeções periódicas e registro de anomalias.

A <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 orienta, entre outros cuidados, proteger contra furto, perigos mecânicos, clima e animais daninhos; evitar contato direto com o piso; facilitar inspeção; e manter a face de identificação voltada para o acesso.

### 3.2 Disponibilidade não é a mesma coisa que condição física

Um material pode estar fisicamente íntegro e, ainda assim, indisponível por estar reservado ou em inspeção. Também pode estar avariado e, por isso, bloqueado. Se essas categorias forem somadas como se fossem independentes, ocorre dupla contagem.

Convém separar duas dimensões:

| Dimensão | Exemplos |
| --- | --- |
| **situação de disponibilidade** | disponível, reservado, em inspeção, bloqueado, quarentena |
| **condição do material** | íntegro, avariado, vencido, contaminado, suspeito |

Uma representação segura é:

$$
\text{saldo utilizável}=\text{saldo físico}-\text{quantidades indisponíveis, sem dupla contagem}
$$

Portanto, não se deve subtrair automaticamente “bloqueado + avariado + quarentena” se o mesmo lote pertence a mais de uma dessas categorias.

### 3.3 Não conformidade: primeiro impedir o uso indevido

Quando há vazamento, dano, validade vencida, contaminação ou dúvida relevante, o fluxo básico é:

```text
identificar
→ interromper o uso ou movimento inseguro
→ bloquear
→ segregar de forma compatível
→ registrar
→ avaliar
→ decidir
→ liberar somente após decisão registrada
```

A segregação pode ser física, sistêmica ou ambas, conforme o risco. O ponto essencial é impedir que material pendente seja confundido com saldo liberado.

### 3.4 Recuperar é corrigir depois da avaria

**Conservação** evita a deterioração; **recuperação** busca restabelecer a utilidade de material avariado quando isso for tecnicamente, economicamente e juridicamente adequado.

Na referência federal da <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988, a recuperação é considerada viável quando a despesa envolvida orça, no máximo, 50% do valor estimado de mercado do bem móvel. Essa regra pertence ao regime da própria instrução e **não deve ser transformada em percentual universal do <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>**.

Mesmo dentro do âmbito da instrução, “abaixo de 50%” não significa reparar cegamente. Segurança, possibilidade técnica, vida útil restante, peças, prazo, custo de indisponibilidade e decisão competente continuam relevantes.

## 4. Rotação, acondicionamento e movimentação

### 4.1 A rotação evita envelhecimento e vencimento

A <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 adota o princípio físico <abbr title="Primeiro que Entra, Primeiro que Sai">PEPS</abbr>: materiais estocados há mais tempo devem, em regra, ser fornecidos primeiro para reduzir envelhecimento.

Para itens sujeitos a validade, é comum usar <abbr title="First Expired, First Out">FEFO</abbr>, também expresso em português como <abbr title="Primeiro que Vence, Primeiro que Sai">PVPS</abbr>: sai primeiro o lote **liberado** com vencimento mais próximo.

**Exemplo hipotético.** O lote A entrou em janeiro e vence em dezembro; o lote B entrou em fevereiro e vence em junho. Pelo <abbr title="Primeiro que Entra, Primeiro que Sai">PEPS</abbr>, A teria prioridade pela entrada. Pelo <abbr title="First Expired, First Out">FEFO</abbr>, B sai antes porque vence primeiro.

Nenhuma regra de rotação autoriza fornecer vencido, avariado ou bloqueado. Também não confunda <abbr title="Primeiro que Entra, Primeiro que Sai">PEPS</abbr> físico, que orienta qual lote real sai, com um método contábil de atribuição de custos.

### 4.2 Unitização e paletização

**Unitização** reúne volumes menores em uma unidade de movimentação. A paletização é uma forma de unitização: caixas ou outros volumes são organizados sobre um palete para facilitar movimentação, armazenagem e transporte.

Palete, carga, estrutura e equipamento formam um sistema. O palete não aumenta por si só a capacidade do piso, da estante ou da empilhadeira.

Duas classificações de paletes respondem a perguntas diferentes:

- **uma ou duas faces:** quantas faces estruturais o palete possui;
- **duas ou quatro entradas:** por quantos lados os garfos podem entrar.

Logo, “duas faces” não significa “quatro entradas”. A necessidade de acesso dos equipamentos se relaciona ao número e à disposição das **entradas**, não ao número de faces.

### 4.3 Arrumação: regras clássicas e seus limites

Entre as orientações da <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988 estão:

- itens de maior movimentação em locais de fácil acesso e próximos da expedição;
- materiais pesados ou volumosos nas partes inferiores;
- materiais da mesma classe em áreas adjacentes **quando isso for compatível com a segurança**;
- material fora do contato direto com o piso;
- identificação voltada ao lado de acesso;
- pilhas organizadas sem comprometer qualidade, arejamento, circulação ou emergência;
- aproximadamente **70 cm do teto e 50 cm das paredes** na orientação de empilhamento da própria instrução.

Esses números não substituem projeto, regra de incêndio, especificação do fabricante nem requisito especial do material. Além disso, a <abbr title="Norma Regulamentadora">NR</abbr> 11 exige, para material empilhado, afastamento de **pelo menos 0,50 m das estruturas laterais do prédio**.

### 4.4 Princípios de movimentação

Movimentar bem significa reduzir trabalho que não agrega controle nem disponibilidade. São ideias úteis:

- **mínima distância:** aproximar etapas que interagem, sem criar incompatibilidade ou risco;
- **mínima manipulação:** reduzir reempilhamentos, transferências e toques desnecessários;
- **fluxo:** evitar retornos, zigue-zague e cruzamentos desnecessários;
- **carga unitária:** mover conjunto estável quando isso for apropriado;
- **uso cúbico:** aproveitar altura e volume sem exceder capacidade nem sacrificar acesso;
- **padronização e flexibilidade:** usar meios compatíveis, mas capazes de responder à variedade real do estoque.

O melhor princípio não é o que produz a menor distância isoladamente. Se aproximar dois produtos cria incompatibilidade química ou bloqueia uma rota de emergência, a solução deixa de ser boa.

## 5. Espaço e leiaute: densidade, seletividade e fluxo

### 5.1 Área total não é área útil de armazenagem

O volume bruto do prédio inclui corredores, rotas de fuga, docas, pilares, áreas técnicas, folgas, zonas de inspeção e outros espaços que não podem ser preenchidos com estoque. Por isso, capacidade precisa ser tratada como **capacidade útil e segura**.

Um leiaute eficiente busca, ao mesmo tempo:

- fluxo coerente entre entrada, guarda, separação e saída;
- acesso ao item sem movimentações excessivas de outras cargas;
- circulação compatível com pessoas e equipamentos;
- preservação das rotas e medidas de emergência;
- possibilidade de inspeção e inventário;
- expansão ou mudança quando demanda, equipamento ou processo se alterarem.

### 5.2 Horizontalizar ou verticalizar

- **horizontalização:** usa predominantemente o plano do piso; pode simplificar acesso, mas consome mais área e aumentar percursos;
- **verticalização:** utiliza níveis superiores; aumenta a densidade potencial, mas exige estrutura, equipamento, estabilidade, operação e emergência compatíveis.

Empilhadeira que alcança níveis altos apoia a verticalização; ela não torna ilimitada a capacidade do piso ou da estante.

### 5.3 Seletividade e sistemas de armazenagem

**Seletividade** é a facilidade de acessar uma unidade de carga sem remover outras. Maior densidade frequentemente reduz seletividade; por isso, o sistema deve refletir o perfil do material.

| Sistema | Onde tende a funcionar bem | Principal limite |
| --- | --- | --- |
| empilhamento em bloco | cargas homogêneas, estáveis e empilháveis | baixa seletividade e compressão |
| porta-paletes seletivo | acesso direto a cada palete | densidade relativa menor |
| <abbr title="estrutura em profundidade na qual o equipamento entra no canal">drive-in</abbr>/<abbr title="variante em profundidade com acesso por lados opostos">drive-through</abbr> | muitos paletes homogêneos | acesso e sequência mais restritos |
| <abbr title="estrutura dinâmica em que a carga se desloca por gravidade">flow rack</abbr> | rotação por gravidade e fluxo ordenado | custo, manutenção e compatibilidade da carga |
| <abbr title="estrutura com braços em balanço para armazenar cargas longas">cantilever</abbr> | tubos, perfis e outros itens longos | exige apoio e estabilidade adequados |
| <abbr title="piso intermediário elevado que amplia a área operacional">mezanino</abbr> | ampliação de área operacional em níveis | depende de projeto estrutural e circulação segura |

Não existe sistema universalmente superior. Variedade, giro, massa, dimensão, validade, densidade desejada, equipamento e risco orientam a escolha.

### 5.4 Reserva, separação, reposição e área temporária

Em operações com volume suficiente, um mesmo item pode aparecer em zonas funcionalmente diferentes:

- **reserva:** concentra maior quantidade e menor frequência de acesso;
- **<abbr title="área ou atividade de separação frequente de itens">picking</abbr>:** mantém quantidade preparada para separação frequente;
- **reposição interna:** transfere material da reserva para o <abbr title="área ou atividade de separação frequente de itens">picking</abbr>;
- **<abbr title="área temporária associada a recebimento, transferência ou expedição">staging</abbr>:** permanência temporária ligada a um fluxo;
- **bloqueados/quarentena:** material indisponível até decisão.

Saldo total suficiente com <abbr title="área ou atividade de separação frequente de itens">picking</abbr> vazio não significa necessariamente ruptura global: pode haver falha de reposição interna. A transferência deve registrar origem, destino, quantidade, lote quando aplicável e momento.

<abbr title="área temporária associada a recebimento, transferência ou expedição">Staging</abbr> não deve virar estoque permanente improvisado em corredor.

### 5.5 Fluxo com pouca ou nenhuma estocagem

**<abbr title="fluxo em que a mercadoria passa rapidamente do recebimento para a expedição, com pouca ou nenhuma estocagem">cross-docking</abbr>** reduz a permanência do material ao coordenar chegada, triagem e saída. Pode utilizar <abbr title="área temporária associada a recebimento, transferência ou expedição">staging</abbr>, mas não elimina conferência, informação ou rastreabilidade.

Se chegada e saída não estiverem sincronizadas, a área temporária congestiona e o fluxo pode virar armazenagem não planejada.

### 5.6 Medir espaço sem premiar congestionamento

Duas medidas úteis são:

$$
\text{ocupação de posições}=
\frac{\text{posições ocupadas}}
{\text{posições utilizáveis}}\times100
$$

$$
\text{utilização cúbica}=
\frac{\text{volume efetivamente ocupado}}
{\text{volume útil e seguro}}\times100
$$

**<abbr title="espaço perdido dentro de posições parcialmente ocupadas ou mal dimensionadas">Honeycombing</abbr>** ocorre quando posições parecem ocupadas, mas parte relevante de sua capacidade fica perdida. Assim, 90% das posições ocupadas pode coexistir com baixa utilização cúbica.

Alta ocupação também pode reduzir seletividade. Se três paletes precisam ser removidos para acessar um quarto, aumentar ainda mais a densidade provavelmente piorará tempo, risco e custo de movimentação.

Em questões de capacidade, posições são indivisíveis. Se 100.000 caixas precisam ser armazenadas e cada posição comporta três paletes de 50 caixas, a capacidade por posição é 150 caixas:

$$
\frac{100000}{150}=666{,}67
$$

São necessárias **667 posições**, não 666.

## 6. Segurança: capacidade, circulação e risco

### 6.1 O risco vem do sistema, não de um único objeto

A mesma caixa pode ser segura no piso e perigosa no alto; a mesma empilhadeira pode ser adequada com uma carga e instável com outra. Avalie em conjunto:

- material e condição da embalagem;
- massa, dimensões e centro de carga;
- piso, estante, palete e acessórios;
- equipamento de movimentação;
- pessoas, rotas e cruzamentos;
- ambiente e incompatibilidades;
- medidas de emergência.

### 6.2 Gerenciamento de riscos e programa de gerenciamento

A <abbr title="Norma Regulamentadora">NR</abbr> 1 estrutura o <abbr title="Gerenciamento de Riscos Ocupacionais">GRO</abbr>. O <abbr title="Programa de Gerenciamento de Riscos">PGR</abbr> deve conter, no mínimo, **inventário de riscos** e **plano de ação**.

O raciocínio operacional é:

```text
identificar perigos
→ avaliar e classificar riscos
→ definir medidas
→ planejar responsáveis e prazos
→ implementar
→ acompanhar a eficácia
→ revisar quando necessário
```

Na ordem de prioridade da <abbr title="Norma Regulamentadora">NR</abbr> 1, devem ser priorizados:

1. eliminação dos fatores de risco;
2. minimização e controle com medidas de proteção coletiva;
3. medidas administrativas ou de organização do trabalho;
4. <abbr title="Equipamento de Proteção Individual">EPI</abbr>.

Portanto, <abbr title="Equipamento de Proteção Individual">EPI</abbr> não transforma estante instável, carga acima da capacidade ou rota obstruída em condição aceitável.

A avaliação deve ser revista, entre outras hipóteses, após mudanças que criem ou modifiquem riscos, quando medidas forem inadequadas ou ineficazes, após acidentes ou doenças relacionadas ao trabalho e quando requisitos legais aplicáveis mudarem. Eventos perigosos com potencial de consequências graves também devem ser analisados.

### 6.3 Armazenamento e equipamentos: requisitos da Norma Regulamentadora 11

A <abbr title="Norma Regulamentadora">NR</abbr> 11 estabelece, entre outros pontos:

- equipamentos de movimentação devem oferecer resistência e segurança e ser mantidos em condições de trabalho;
- a carga máxima de trabalho permitida deve estar indicada de forma visível;
- componentes e transportadores devem ser inspecionados e defeitos tratados;
- operadores de equipamentos motorizados devem atender aos requisitos de treinamento e habilitação previstos;
- o peso armazenado não pode exceder a capacidade de carga calculada do piso;
- portas, equipamentos contra incêndio e saídas de emergência não podem ser obstruídos;
- a carga não pode dificultar trânsito, iluminação nem acesso às saídas;
- cada tipo de material deve obedecer aos requisitos especiais de segurança que lhe forem aplicáveis.

O Anexo I da <abbr title="Norma Regulamentadora">NR</abbr> 11 trata especificamente de chapas de rochas ornamentais. Suas medidas para cavaletes e equipamentos **não devem ser generalizadas** para qualquer almoxarifado.

### 6.4 Empilhadeira e centro de carga

A capacidade nominal de uma empilhadeira vale para as condições previstas pelo fabricante. **Centro de carga** é, de forma simplificada, a distância horizontal entre a face de apoio dos garfos e o centro de gravidade da carga.

Quanto mais o centro de gravidade se afasta do mastro, maior o momento que tende a tombar o equipamento. Por isso, uma carga pode estar abaixo do peso nominal e ainda assim exceder a capacidade efetiva para aquela geometria ou altura.

Em prova, desconfie da frase “a empilhadeira suporta X kg em qualquer posição”. Consulte a placa de capacidade, o manual e as condições reais de operação; não deduza capacidade pela aparência da máquina.

### 6.5 Ergonomia na movimentação manual

A <abbr title="Norma Regulamentadora">NR</abbr> 17 não fornece um único “peso seguro” válido para toda pessoa e tarefa. Ela proíbe exigir ou admitir transporte manual cujo peso seja suscetível de comprometer a saúde ou a segurança e exige considerar a situação de trabalho.

Na movimentação individual não eventual, são relevantes:

- peso e dimensões;
- pega;
- postura;
- frequência e duração;
- alturas de pega e deposição;
- distância percorrida;
- meios técnicos auxiliares.

A norma também veda o levantamento não eventual que possa comprometer saúde e segurança quando o alcance horizontal da pega for superior a **60 cm** em relação ao corpo.

### 6.6 Incêndio: norma federal e regra estadual precisam conversar

A <abbr title="Norma Regulamentadora">NR</abbr> 23 determina que as medidas de prevenção contra incêndios observem a **legislação estadual** e, complementarmente, as normas técnicas oficiais aplicáveis. Também exige informação aos trabalhadores e preservação de saídas de emergência.

No Maranhão, o referencial inclui a **Lei Estadual nº 11.390/2020** e as normas técnicas do <abbr title="Corpo de Bombeiros Militar do Maranhão">CBMMA</abbr>, entre elas a <abbr title="Norma Técnica">NT</abbr> 01, atualizada em 2024.

Isso impede duas simplificações:

- a <abbr title="Norma Regulamentadora">NR</abbr> 23 não define sozinha todos os extintores, distâncias e medidas de uma edificação;
- um <abbr title="Programa de Gerenciamento de Riscos">PGR</abbr> não substitui projeto, licenciamento, instalação, inspeção e manutenção das medidas de incêndio exigidas para a edificação.

Mudança de leiaute, ocupação, material ou carga de incêndio pode exigir reavaliação das medidas aplicáveis.

### 6.7 Produtos químicos e comunicação de perigos

A <abbr title="Norma Regulamentadora">NR</abbr> 26 exige classificação dos perigos químicos segundo o <abbr title="Sistema Globalmente Harmonizado de Classificação e Rotulagem de Produtos Químicos">GHS</abbr> e disciplina a rotulagem preventiva.

Para produto químico perigoso, a rotulagem inclui identificação e composição, pictogramas, palavra de advertência, frases de perigo, frases de precaução e informações suplementares. O fabricante ou fornecedor deve disponibilizar a <abbr title="Ficha com Dados de Segurança">FDS</abbr> nas situações previstas, e os trabalhadores devem ter acesso às <abbr title="Fichas com Dados de Segurança">FDS</abbr> dos produtos que utilizam e receber treinamento pertinente.

A cor comunica; não elimina o risco. Rótulo correto em embalagem vazando não substitui bloqueio, contenção, segregação e resposta adequada.

## 7. Integração e auditoria

### 7.1 Quatro situações que condensam o assunto

**Situação 1 — saldo certo, endereço errado.** A quantidade total pode estar correta enquanto a localização está incorreta. Corrija endereço e, principalmente, a causa do movimento sem registro.

**Situação 2 — lote mais novo vence primeiro.** Para material sujeito a validade, <abbr title="First Expired, First Out">FEFO</abbr> pode divergir do <abbr title="Primeiro que Entra, Primeiro que Sai">PEPS</abbr>. A condição de liberação vem antes da ordem de rotação.

**Situação 3 — 96% de ocupação e três movimentações para acessar um palete.** O indicador de densidade não prova eficiência; a seletividade e o fluxo estão degradados.

**Situação 4 — caixa vazando.** Não a devolva à posição liberada “até alguém decidir”. Interrompa, identifique, bloqueie, segregue conforme o risco, registre e avalie.

### 7.2 Como transformar uma falha em achado

Um achado de auditoria fica mais útil quando separa:

| Elemento | Exemplo |
| --- | --- |
| **critério** | procedimento exige atualização do endereço no momento da alocação |
| **condição** | parte dos itens está em posições diferentes das registradas |
| **causa** | lançamento é feito apenas ao fim do turno |
| **efeito** | buscas, separações erradas e falsa impressão de falta |
| **evidência** | inspeção física, registros e documentos de movimentação |
| **encaminhamento** | registrar na alocação, tratar exceções e acompanhar tempestividade |

Corrigir apenas o saldo ou o endereço encerra o sintoma; não evita reincidência.

## 8. Síntese do mecanismo

Uma armazenagem madura preserva simultaneamente **disponibilidade, localização, condição, rastreabilidade e segurança**.

O fluxo de decisão é:

1. identificar material, condição e riscos;
2. escolher endereço compatível com massa, giro, volume, validade e incompatibilidades;
3. guardar dentro da capacidade de piso, estrutura, palete e equipamento;
4. registrar endereço, quantidade, lote ou série e documento aplicável;
5. aplicar <abbr title="Primeiro que Entra, Primeiro que Sai">PEPS</abbr> ou <abbr title="First Expired, First Out">FEFO</abbr> conforme a natureza do material, sem liberar item impróprio;
6. inspecionar conservação, validade, acesso e emergência;
7. bloquear e segregar desvios antes de decidir recuperação ou outra providência;
8. medir acurácia, espaço, avarias e tempestividade sem confundir ocupação com eficiência;
9. investigar causas e corrigir o processo, não apenas o registro final.
