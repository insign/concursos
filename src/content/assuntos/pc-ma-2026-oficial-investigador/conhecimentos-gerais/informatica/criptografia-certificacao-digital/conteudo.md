---
schemaVersion: 1
title: "Criptografia e certificação digital"
description: Noções de criptografia simétrica e assimétrica, hash, assinatura digital, certificados e cadeia de confiança.
order: 30
storageId: pc-u030
---

# Criptografia e certificação digital

Um arquivo pode precisar de três proteções diferentes: **ninguém não autorizado deve lê-lo; alterações precisam ser detectadas; a autoria precisa ser verificável**. Uma única palavra — “criptografia” — não resolve automaticamente os três problemas.

O mapa deste capítulo é:

> **sigilo → cifragem | alteração → integridade | autoria → assinatura | identidade da chave → certificado**.

## 1. Antes dos algoritmos: o que está sendo protegido?

**Texto claro** é o dado antes da cifragem. **Texto cifrado** é o resultado transformado para ficar ininteligível sem o segredo adequado. A **chave criptográfica** é o valor que controla a operação.

A cifragem busca principalmente **confidencialidade**: impedir leitura por quem não possui a chave apropriada. Isso é diferente de provar quem enviou o documento ou se ele foi alterado.

## 2. Criptografia simétrica: um segredo compartilhado

Na **criptografia simétrica**, as partes autorizadas usam a mesma chave secreta — ou chaves diretamente equivalentes no mecanismo — para cifrar e decifrar.

O ponto forte é a eficiência: ela é adequada para proteger grandes volumes de dados. O desafio é **distribuir e proteger o segredo**. Se a chave for copiada por um invasor, o sigilo do conteúdo protegido por ela fica comprometido.

**Situação hipotética:** duas unidades precisam trocar um arquivo grande. Se já compartilham de modo seguro uma chave secreta, a cifragem simétrica protege o conteúdo com baixo custo computacional.

## 3. Criptografia assimétrica: chave pública e chave privada

Na **criptografia assimétrica**, cada participante possui um par de chaves matematicamente relacionadas:

- **chave pública:** pode ser divulgada;
- **chave privada:** deve permanecer sob controle do titular.

Para um modelo simplificado de **confidencialidade**, o remetente pode cifrar usando a chave pública do destinatário; a chave privada correspondente é usada para decifrar.

Para **assinatura digital**, o papel muda: a chave privada do signatário participa da criação da assinatura, e a chave pública correspondente permite verificá-la.

Portanto, não decore apenas “pública cifra, privada decifra”. Pergunte primeiro **qual operação está sendo realizada: sigilo ou assinatura?**

## 4. Por que sistemas reais combinam os dois modelos

A criptografia assimétrica facilita estabelecimento de confiança e troca de segredos, mas é computacionalmente mais custosa para grandes volumes. Por isso, protocolos seguros costumam usar um modelo **híbrido**:

1. mecanismos assimétricos autenticam as partes e/ou estabelecem um segredo;
2. desse processo resulta uma chave de sessão;
3. a cifragem simétrica protege o volume principal de dados.

O protocolo <abbr title="Transport Layer Security">TLS</abbr>, usado para proteger muitas comunicações de rede, é exemplo importante da combinação de mecanismos, embora os detalhes exatos variem conforme a versão e o conjunto criptográfico negociado.

## 5. Hash: impressão digital do conteúdo, não cifragem

Uma **função hash criptográfica** recebe dados de tamanho variável e produz um resumo de tamanho definido. Para ser útil em segurança, pequenas mudanças na entrada devem produzir resultado diferente de modo imprevisível, e não deve ser viável reconstruir o conteúdo original a partir do resumo.

O hash ajuda a responder:

> **os mesmos bytes continuam aqui?**

Ele não responde sozinho:

- quem produziu o documento;
- quem está autorizado a lê-lo;
- se a origem declarada é verdadeira.

Por isso, **hash ≠ criptografia reversível ≠ assinatura**.

## 6. Assinatura digital: integridade e vínculo com o signatário

Em um fluxo simplificado:

1. calcula-se o hash do documento;
2. a chave privada do signatário participa da geração da assinatura sobre dados ligados àquele conteúdo;
3. o verificador usa a chave pública correspondente;
4. o documento recebido é novamente resumido;
5. alteração incompatível com a assinatura faz a verificação falhar.

A assinatura digital oferece evidências de **integridade** e de **autenticidade/autoria** dentro do modelo de confiança adotado. Ela não torna o conteúdo secreto automaticamente.

### Não repúdio não é impossibilidade de fraude

A assinatura pode produzir evidências que dificultam a negativa de autoria. Ainda pode ser necessário investigar comprometimento da chave privada, uso indevido do dispositivo, representação ou outros fatos do caso. “Não repúdio” não significa infalibilidade.

## 7. Assinatura digitalizada não é assinatura digital

Uma imagem de assinatura manuscrita inserida em um arquivo é **assinatura digitalizada**. Ela pode ser copiada de um documento para outro e, isoladamente, não cria vínculo criptográfico com o conteúdo.

A distinção de prova é direta:

> **digitalizada = imagem; digital = mecanismo criptográfico.**

## 8. Certificado digital: quem afirma que esta chave pertence a esta identidade?

Conhecer uma chave pública não basta para saber de quem ela é. Um **certificado digital** associa uma identidade a uma chave pública e a outros dados, com uma assinatura de uma autoridade confiável.

Certificado **não é a assinatura de cada documento**. Ele ajuda o verificador a responder se a chave pública apresentada está ligada à identidade indicada.

Muitos certificados seguem o padrão <abbr title="Padrão técnico de certificados digitais">X.509</abbr>. Um campo isolado com um nome correto não prova confiança: a validação precisa considerar a cadeia de certificação, a assinatura da autoridade, o período de validade, eventual revogação e outras regras aplicáveis.

## 9. Cadeia de confiança

A confiança é construída em níveis. De forma simplificada:

1. o certificado do titular foi assinado por uma autoridade certificadora;
2. essa autoridade pode ter sido certificada por outra;
3. a cadeia termina em uma raiz que o sistema aceita como confiável.

Se a cadeia não puder ser validada, o simples fato de o arquivo exibir um nome, selo ou ícone visual não basta.

## 10. <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>: papéis essenciais

A <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr> é a infraestrutura brasileira de confiança para certificados digitais no regime instituído pela Medida Provisória nº 2.200-2/2001.

No nível necessário para este item:

| Integrante | Função principal |
|---|---|
| <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> | exerce a função de Autoridade Certificadora Raiz da infraestrutura |
| <abbr title="Autoridade Certificadora">AC</abbr> | emite e gerencia certificados dentro da cadeia |
| <abbr title="Autoridade de Registro">AR</abbr> | identifica/cadastra o solicitante e encaminha a solicitação à autoridade competente |

Regra curta: **<abbr title="Autoridade de Registro">AR</abbr> identifica; <abbr title="Autoridade Certificadora">AC</abbr> emite; <abbr title="Instituto Nacional de Tecnologia da Informação">ITI</abbr> está na raiz da <abbr title="Infraestrutura de Chaves Públicas Brasileira">ICP-Brasil</abbr>.**

## 11. Validade, expiração e revogação

Certificados possuem período de validade. **Expiração** é o término normal desse período. **Revogação** retira antecipadamente a confiança, por exemplo quando a chave privada é exposta ou há outro comprometimento relevante.

A autoridade certificadora publica informações que permitem verificar certificados revogados, como a <abbr title="Lista de Certificados Revogados">LCR</abbr>.

Se uma chave privada foi exposta, continuar confiando no certificado até a expiração normal é erro: a revogação existe justamente para interromper a confiança antes do prazo.

## 12. O que verificar diante de um certificado

Ao analisar uma questão ou um documento, use esta ordem:

1. **o objetivo é sigilo, integridade ou autoria?**
2. é criptografia simétrica, assimétrica, hash ou assinatura?
3. se há certificado, ele realmente pertence ao sujeito alegado?
4. a cadeia chega a uma raiz confiável?
5. o certificado está no período relevante e sem revogação impeditiva?
6. a chave privada permaneceu protegida?

Esse roteiro evita as pegadinhas mais comuns:

- hash não cifra;
- assinatura não garante confidencialidade;
- certificado não é assinatura;
- chave pública não deve ser confundida com chave privada;
- nome correto em um certificado não basta para torná-lo confiável;
- imagem de assinatura não é assinatura digital;
- chave privada comprometida exige resposta sobre a confiança do certificado.