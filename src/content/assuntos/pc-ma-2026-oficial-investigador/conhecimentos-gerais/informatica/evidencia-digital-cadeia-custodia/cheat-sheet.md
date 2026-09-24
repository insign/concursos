# Evidência digital e cadeia de custódia

## Mapa do procedimento

**identificar → preservar → adquirir/coletar → verificar integridade → documentar → analisar → armazenar/rastrear**

- **evidência digital:** dado com potencial relevância probatória;
- **suporte físico ≠ dado:** o aparelho contém dados, mas não se confunde com eles;
- **cópia bem produzida ≠ prova inferior:** o ponto é preservar a **mesmidade** — correspondência com o material originalmente obtido — e permitir auditoria.

## Cadeia de custódia no <abbr title="Código de Processo Penal">CPP</abbr>

Começa com **preservação do local** ou com procedimento policial/pericial em que se detecte vestígio — **não apenas na coleta**.

Ordem do art. 158-B:

**reconhecimento → isolamento → fixação → coleta → acondicionamento → transporte → recebimento → processamento → armazenamento → descarte**

Pegadinhas:

- **fixação** = descrição/registro detalhado do vestígio e de sua posição/situação;
- coleta é **preferencialmente** por perito oficial, não “exclusivamente”;
- exame não encerra automaticamente a cadeia; há armazenamento e posterior destinação;
- a cadeia não se limita a vestígios encontrados no local físico do crime.

## <abbr title="Resumo criptográfico de uma sequência de dados">Hash</abbr>

- mesmo método de cálculo + mesmos dados → espera-se o mesmo resumo;
- mudança nos dados → tende a produzir resumo diferente;
- apoia **integridade** e **mesmidade**;
- **não prova sozinho** autoria, veracidade, autenticidade, completude, licitude ou toda a cadeia de custódia.

**<abbr title="Resumo criptográfico de uma sequência de dados">Hash</abbr> é verificador técnico; cadeia de custódia é histórico controlado.**

## Fonte e cópia

Quando viável:

1. preserve a fonte;
2. produza aquisição/cópia controlada;
3. verifique a integridade;
4. analise a cópia de trabalho;
5. registre ferramentas, operador, horários, transferências e ocorrências.

**Aquisição lógica:** obtém objetos apresentados pelo sistema/aplicativo.  
**Aquisição de baixo nível:** busca representação mais próxima dos dados acessíveis no suporte.

## Dados voláteis

Informações em <abbr title="Random Access Memory, memória de acesso aleatório">RAM</abbr>, conexões ativas e estados de processos podem desaparecer ou mudar rapidamente.

- desligar pode destruir dado volátil;
- manter ligado também permite alterações;
- não existe resposta universal “sempre desligar” ou “nunca desligar”;
- considere a ordem de volatilidade e documente as ações.

## Captura de tela

Captura de tela é **representação visual**, não sinônimo de aquisição técnica completa. Pode omitir metadados, conteúdo não visível e elementos necessários à reprodução do exame.

O <abbr title="Superior Tribunal de Justiça">STJ</abbr> destaca preservação, auditabilidade e exame técnico independente na edição 281 de Jurisprudência em Teses; o Informativo 878 exige perícia diante de dúvida razoável sobre integridade e autenticidade.

## Checklist para auditoria

Registre **quem, o quê, onde, quando e como**, além de:

- fonte e identificadores;
- ferramenta/versão/parâmetros relevantes;
- valores de <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> quando aplicáveis;
- recebimentos e transferências;
- acessos e armazenamento;
- falhas, exceções e discrepâncias temporais.

## Método de prova

- cadeia começa só na coleta? **não**;
- perito oficial é sempre exclusivo? **não**;
- cópia digital é automaticamente imprestável? **não**;
- <abbr title="Resumo criptográfico de uma sequência de dados">hash</abbr> igual prova autoria? **não**;
- captura de tela equivale a aquisição completa? **não**;
- todo dado digital é permanente? **não**.
