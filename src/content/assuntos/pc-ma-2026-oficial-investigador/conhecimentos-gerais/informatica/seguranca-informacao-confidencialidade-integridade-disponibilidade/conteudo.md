---
schemaVersion: 1
title: "Segurança da informação: confidencialidade, integridade e disponibilidade"
description: Fundamentos de segurança da informação e distinção prática entre confidencialidade, integridade e disponibilidade.
order: 28
storageId: pc-u028
---

# Segurança da informação: confidencialidade, integridade e disponibilidade

Imagine um relatório policial digital. Três falhas diferentes podem acontecer:

1. uma pessoa não autorizada lê o relatório;
2. alguém altera um dado do relatório sem autorização;
3. o sistema fica indisponível justamente quando a equipe autorizada precisa consultar o arquivo.

As três situações são problemas de segurança, mas **não são o mesmo problema**. Elas correspondem, respectivamente, a **confidencialidade, integridade e disponibilidade**.

Esse é o mapa central do assunto:

> **quem pode conhecer? → confidencialidade | o conteúdo permanece confiável contra alteração indevida? → integridade | quem está autorizado consegue usar quando precisa? → disponibilidade**

O <abbr title="National Institute of Standards and Technology">NIST</abbr> define segurança da informação como a proteção da informação e dos sistemas contra acesso, uso, divulgação, interrupção, modificação ou destruição não autorizados, de modo a preservar essas propriedades. No Brasil, a Política Nacional de Segurança da Informação também trabalha com disponibilidade, integridade, confidencialidade e autenticidade.

## 1. Segurança da informação não é sinônimo de “guardar segredo”

A primeira armadilha é reduzir segurança a sigilo.

Se ninguém de fora consegue ler um banco de dados, mas uma falha altera registros, há problema de **integridade**. Se os dados continuam corretos e secretos, mas o serviço fica inacessível para quem precisa usá-lo, há problema de **disponibilidade**.

Por isso, pense na informação durante todo o seu ciclo de uso: ela pode estar armazenada, sendo processada, transmitida, impressa ou conhecida por pessoas. Segurança da informação é mais ampla que segurança de um computador isolado. Pessoas, processos, instalações, equipamentos e sistemas podem participar da proteção.

## 2. Confidencialidade: quem pode conhecer a informação?

**Confidencialidade** é a preservação das restrições autorizadas de acesso e divulgação. Em linguagem de prova:

> **a informação só deve ser conhecida por quem está autorizado.**

Violações típicas:

- consulta indevida a um cadastro restrito;
- envio de documento sigiloso ao destinatário errado;
- exposição pública de uma pasta que deveria ser privada;
- cópia não autorizada de dados por alguém que possuía acesso técnico ao ambiente, mas não autorização para aquele conteúdo.

Perceba a diferença entre **ter capacidade técnica de acessar** e **estar autorizado a acessar**.

### 2.1 Autenticação não é autorização

Dois conceitos aparecem juntos, mas respondem a perguntas diferentes:

- **autenticação:** verifica a identidade alegada;
- **autorização:** determina o que aquela identidade pode fazer.

Uma pessoa pode estar corretamente autenticada e, ainda assim, não ter autorização para abrir determinado arquivo. Essa distinção ajuda a entender por que <abbr title="Entrada autenticada em uma conta ou sistema">login</abbr> válido não significa acesso irrestrito.

### 2.2 Menor privilégio

O princípio do **menor privilégio** recomenda conceder apenas os acessos necessários à função desempenhada. Ele reduz a exposição caso uma conta seja usada indevidamente e evita que uma pessoa veja dados que não precisa conhecer.

Alguns controles podem apoiar a confidencialidade:

- controle de acesso;
- autenticação;
- autorizações por papel ou função;
- menor privilégio;
- cifragem.

A cifragem será estudada em profundidade na unidade de criptografia. Aqui, basta a ponte: **tornar o conteúdo ininteligível para quem não possui o segredo adequado é uma forma de proteger confidencialidade**.

## 3. Integridade: a informação foi alterada de forma indevida?

**Integridade** protege contra modificação ou destruição não autorizada ou acidental. A pergunta operacional é:

> **o conteúdo que chegou até mim continua como deveria estar?**

Violações típicas:

- valor alterado em uma base sem autorização;
- arquivo corrompido durante armazenamento ou transmissão;
- exclusão indevida de registros;
- substituição de um documento legítimo por versão adulterada.

### 3.1 Integridade não significa que o dado original era verdadeiro

Esta distinção é decisiva.

**Situação hipotética:** alguém digita por engano a data errada em um formulário. Depois disso, o registro não sofre nenhuma alteração. O dado pode continuar incorreto do ponto de vista factual, embora sua integridade — no sentido de não ter sido modificado indevidamente depois de registrado — não tenha sido necessariamente violada.

Logo:

> **integridade protege contra alteração indevida; não transforma automaticamente informação errada em informação verdadeira.**

### 3.2 Controles que ajudam a preservar ou verificar integridade

Exemplos:

- permissões que limitam quem pode editar;
- <abbr title="Registros que permitem reconstruir ações e alterações">trilhas de auditoria</abbr> e registros de alteração;
- <abbr title="Manutenção de versões sucessivas de um conteúdo">versionamento</abbr>;
- mecanismos de validação;
- <abbr title="Resumo criptográfico usado para detectar alteração de conteúdo">hash criptográfico</abbr> e assinaturas digitais, quando empregados de modo apropriado.

Os mecanismos criptográficos ficam na U030. Para U028, retenha apenas a função: alguns mecanismos ajudam a **detectar** alterações; outros também podem ajudar a vinculá-las a uma origem confiável.

## 4. Disponibilidade: o recurso está acessível quando precisa estar?

**Disponibilidade** significa acesso oportuno e confiável à informação ou ao serviço por entidades autorizadas.

A frase importante é **“quando necessário”**, e não “obrigatoriamente 24 horas por dia”.

Um sistema pode ter uma janela de operação prevista e ainda atender ao requisito de disponibilidade se estiver acessível nos períodos acordados. A prova pode explorar exatamente essa diferença.

Violações típicas:

- pane de hardware sem alternativa operacional;
- falha de energia sem continuidade suficiente;
- serviço sobrecarregado até ficar inutilizável;
- ataque de <abbr title="Denial of Service, negação de serviço">DoS</abbr> ou <abbr title="Distributed Denial of Service, negação de serviço distribuída">DDoS</abbr>;
- exclusão ou corrupção que impeça o uso de dados essenciais.

Controles que apoiam disponibilidade podem incluir:

- redundância de componentes, isto é, componentes alternativos capazes de assumir a função;
- monitoramento e resposta a falhas;
- capacidade adequada;
- continuidade e recuperação;
- <abbr title="Cópia destinada à recuperação de dados">backup</abbr> recuperável;
- proteção contra sobrecarga e ataques de negação de serviço.

A unidade de malware tratará das pragas e ataques específicos; a unidade própria de cópias/recuperação aprofundará <abbr title="Cópia destinada à recuperação de dados">backup</abbr> quando esse mecanismo aparecer no programa. Aqui, o ponto é apenas a relação entre **falha de acesso legítimo** e **disponibilidade**.

## 5. Uma ocorrência pode atingir mais de uma propriedade

Classificar a propriedade principal ajuda em prova, mas incidentes reais podem produzir vários efeitos.

| Situação | Efeito mais direto | Outros efeitos possíveis |
|---|---|---|
| documento restrito é publicado na Internet | confidencialidade | integridade, se também houver alteração |
| invasor modifica cadastro | integridade | confidencialidade, se precisou ler dados para agir |
| servidor fica fora do ar | disponibilidade | integridade, se houver perda/corrupção de dados |
| <abbr title="Malware que bloqueia acesso ou cifra dados para extorsão">ransomware</abbr> cifra arquivos sem autorização | disponibilidade e integridade | confidencialidade, se também houver <abbr title="Cópia ou retirada não autorizada de dados">exfiltração</abbr> |

Não memorize “um ataque = um princípio”. Pergunte **o que aconteceu com a informação**.

## 6. Controle não é propriedade

Outra confusão comum é misturar objetivo com mecanismo.

- **confidencialidade, integridade e disponibilidade** são propriedades que se deseja preservar;
- **controle de acesso, redundância, cifragem, auditoria e <abbr title="Cópia destinada à recuperação de dados">backup</abbr>** são exemplos de mecanismos ou práticas que podem ajudar a preservá-las.

Um mesmo controle pode contribuir para mais de uma propriedade, e nenhuma propriedade depende de um único mecanismo obrigatório.

Exemplo: uma solução de <abbr title="Cópia destinada à recuperação de dados">backup</abbr> pode ajudar a recuperar informação e, assim, sustentar disponibilidade; se houver versões confiáveis, também pode ajudar na recuperação de dados alterados. Isso não faz do <abbr title="Cópia destinada à recuperação de dados">backup</abbr> uma “definição” de disponibilidade ou integridade.

## 7. Autenticidade é relacionada, mas não substitui a tríade

No programa desta unidade, o núcleo é a tríade **confidencialidade–integridade–disponibilidade**. Em referências governamentais brasileiras, aparece também a **autenticidade**, propriedade ligada à confiança de que a informação, entidade ou origem declarada é aquilo que afirma ser.

Não troque os conceitos:

- segredo contra leitura indevida → confidencialidade;
- proteção contra alteração indevida → integridade;
- acesso oportuno pelo autorizado → disponibilidade;
- confiança na origem ou identidade declarada → autenticidade.

A U030 aprofunda certificados e assinatura digital, que ajudam a trabalhar autenticidade e integridade em contextos específicos.

## 8. Segurança da informação é mais ampla que tecnologia

Uma folha impressa abandonada sobre uma mesa pode causar violação de confidencialidade sem exploração de software. Uma pessoa pode apagar acidentalmente registros e afetar integridade ou disponibilidade. Uma sala sem controle físico pode expor equipamentos e mídias.

Por isso, medidas de segurança podem ser:

- **administrativas:** políticas, responsabilidades, procedimentos;
- **físicas:** controle de acesso a ambientes e equipamentos;
- **técnicas:** autenticação, permissões, cifragem, registros, redundância.

A classificação exata dos controles pode variar conforme o referencial. Para este item, o importante é reconhecer que **a propriedade protegida não depende de o controle ser “digital”**.

## 9. Método de prova: encontre o verbo da violação

Ao ler uma alternativa, procure primeiro o efeito:

1. **leu, divulgou, expôs ou copiou sem autorização?** → confidencialidade;
2. **alterou, apagou, corrompeu ou substituiu indevidamente?** → integridade;
3. **impediu, atrasou ou interrompeu o acesso legítimo?** → disponibilidade;
4. **a questão pergunta quem é a entidade ou de onde veio a informação?** → autenticidade, conceito relacionado, mas distinto da tríade literal.

Depois teste as pegadinhas:

- “disponibilidade significa 24 × 7 em qualquer sistema” → **generalização indevida**;
- “integridade garante que todo dado registrado é verdadeiro” → **falso**;
- “usuário autenticado pode acessar qualquer informação” → **falso**;
- “criptografia sempre garante disponibilidade” → **falso**;
- “segurança da informação só existe em sistemas eletrônicos” → **falso**.

O mapa final é simples:

> **confidencialidade controla conhecimento; integridade controla alteração; disponibilidade controla acesso legítimo no tempo necessário.**
