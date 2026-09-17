# Criptomoedas: noções gerais

## Mapa central

**chaves autorizam → transação circula → rede valida → consenso organiza o histórico → blockchain registra o estado**

## Conceitos que não podem ser confundidos

| Conceito | Função |
|---|---|
| criptomoeda | ativo digital que usa criptografia e rede para registrar/validar transferências |
| blockchain | livro digital distribuído, organizado em blocos encadeados |
| carteira | administra chaves e cria/assina transações; não é um “arquivo de moedas” |
| chave privada | segredo usado para autorizar/assinar gastos |
| chave pública/endereço | informação pública usada para verificação/recebimento |
| consenso | mecanismo para a rede convergir para um histórico comum |
| <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> | resumo usado para verificar integridade; não cifra nem prova veracidade |

## Bitcoin

- Bitcoin **usa blockchain**; Bitcoin ≠ blockchain.
- A blockchain registra e organiza transações.
- No Bitcoin, o consenso usa <abbr title="Proof of Work, prova de trabalho">PoW</abbr>.
- Mineradores produzem blocos candidatos e competem pelo trabalho exigido pelo protocolo.
- **Pools de mineração** reúnem capacidade de vários mineradores e repartem recompensas segundo as regras do grupo.
- Mineração **não é propriedade universal** de toda criptomoeda.

## Outros consensos

- <abbr title="Proof of Work, prova de trabalho">PoW</abbr> → trabalho computacional; modelo do Bitcoin.
- <abbr title="Proof of Stake, prova de participação">PoS</abbr> → participação econômica conforme regras da rede.

## Carteiras e custódia

- custódia por terceiro → prestadora controla os instrumentos de movimentação;
- autocustódia → usuário controla suas chaves/instrumentos;
- carteira conectada → mais conveniência e maior exposição do segredo ao ambiente conectado;
- carteira isolada/dedicada → reduz certos vetores, sem eliminar fraude, erro ou perda.

## Pegadinhas

- blockchain é moeda → **não**;
- Bitcoin implementa toda blockchain → **não**;
- carteira contém moedas como arquivos locais → **não**;
- chave pública autoriza gasto → **não**;
- endereço revela necessariamente identidade civil → **não**;
- criptomoeda é totalmente anônima → **não**;
- toda criptomoeda é minerada → **não**;
- <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> prova que o conteúdo é verdadeiro → **não**.

## Brasil — corte 13/7/2026

A Lei nº 14.478/2022 define **ativo virtual** e exclui, entre outros, moeda nacional/estrangeira, moeda eletrônica, pontos de fidelidade e representações já disciplinadas como valores mobiliários ou ativos financeiros.

O Decreto nº 11.563/2023 atribui ao <abbr title="Banco Central do Brasil">BCB</abbr> regulação, autorização e supervisão das prestadoras de serviços de ativos virtuais, preservando competências da <abbr title="Comissão de Valores Mobiliários">CVM</abbr>.

**Criptomoedas populares como Bitcoin não são emitidas nem garantidas pelo <abbr title="Banco Central do Brasil">BCB</abbr>.**

## Método de prova

1. registro distribuído? → blockchain  
2. autorizar gasto? → chave privada/assinatura  
3. administrar chaves? → carteira  
4. histórico comum? → consenso  
5. trabalho computacional do Bitcoin? → <abbr title="Proof of Work, prova de trabalho">PoW</abbr>/mineração  
6. compra, venda ou custódia intermediada? → prestadora/corretora, não o protocolo
