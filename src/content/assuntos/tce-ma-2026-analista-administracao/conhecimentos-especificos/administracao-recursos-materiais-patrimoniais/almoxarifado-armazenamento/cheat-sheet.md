# Almoxarifado e armazenamento — revisão rápida

## 1. Conceitos

| Termo | Núcleo |
| --- | --- |
| almoxarifado | unidade organizacional e instalação |
| armazenagem | guarda, localização, segurança e preservação |
| estoque | itens e quantidades mantidos para uso futuro |
| endereço | local físico do item |
| código | identidade do item |
| slotting | decisão sobre o melhor endereço |
| staging | área temporária vinculada a um fluxo |

**Almoxarifado não é sinônimo de compras, recebimento, inventário, contabilidade ou alienação.**

## 2. Alcance normativo

| Fonte | Papel |
| --- | --- |
| IN SEDAP 205/1988 | referência operacional do SISG federal |
| NR 1 | GRO e PGR |
| NR 11 | movimentação e armazenagem |
| NR 17 | ergonomia |
| NR 23 | incêndio articulado à lei estadual |
| NR 26 | GHS, rótulo e ficha de segurança |
| Lei MA 11.390/2020 e CBMMA | incêndio no Maranhão |
| fabricante/projeto | capacidade, instalação e manutenção |

## 3. GRO/PGR

```text
identificar perigo
→ avaliar risco
→ priorizar
→ definir medidas
→ plano de ação
→ implementar
→ verificar eficácia
→ revisar
```

Hierarquia:

```text
eliminar
→ substituir
→ engenharia
→ administrativo
→ EPI
```

EPI não corrige estante instável, sobrecarga, incompatibilidade ou rota bloqueada.

## 4. Controle

Cadeia mínima:

```text
material
+ endereço
+ registro
+ documento
```

Qualidade:

- completude;
- exatidão;
- consistência;
- tempestividade;
- unicidade;
- validade;
- rastreabilidade.

Exceções:

- saldo sem endereço;
- endereço com item diferente;
- lote vencido liberado;
- bloqueado contado como disponível;
- série duplicada;
- movimento sem documento.

## 5. Localização

| Método | Regra |
| --- | --- |
| fixa | posição reservada |
| livre/dinâmica | posição compatível disponível, registrada |
| híbrida | picking fixo e reserva dinâmica |

“Livre” não significa sem endereço.

Critérios:

- frequência;
- acomodabilidade;
- complementaridade;
- massa;
- cubagem;
- validade;
- criticidade;
- valor;
- compatibilidade;
- acesso.

## 6. Acurácia

```text
acurácia de saldo =
itens sem divergência de quantidade ÷ itens verificados
```

```text
acurácia de localização =
itens no endereço correto ÷ itens testados
```

```text
acurácia por valor =
valor correto ÷ valor verificado
```

Saldo correto não garante endereço correto.

## 7. Saldo utilizável

```text
utilizável =
físico
− vencido
− bloqueado
− avariado
− reservado
− quarentena
```

## 8. Conservação e não conformidade

Conservação = prevenção.  
Recuperação = correção após avaria.

Fluxo:

```text
identificar
→ interromper
→ bloquear
→ segregar
→ registrar
→ avaliar
→ decidir
→ liberar somente com registro
```

Custo de recuperação abaixo de 50% na IN 205 não obriga reparo.

## 9. Rotação

| Regra | Prioridade |
| --- | --- |
| PEPS/FIFO físico | entrada mais antiga |
| FEFO/PVPS | vencimento mais próximo |

FEFO não autoriza fornecer vencido e não corrige excesso de compra.

## 10. Movimentação de materiais

- mínima distância;
- mínima manipulação;
- fluxo;
- utilização cúbica;
- carga unitária;
- segurança;
- flexibilidade;
- padronização;
- gravidade controlada.

A mínima distância não supera incompatibilidade ou segurança.

## 11. Horizontalização, verticalização e cross-docking

| Técnica | Ideia |
| --- | --- |
| horizontalização | uso predominante do piso |
| verticalização | uso da altura |
| cross-docking | fluxo rápido com pouca ou nenhuma estocagem |

Empilhadeira alcançando nível alto = verticalização.

## 12. Sistemas

| Sistema | Ponto principal |
| --- | --- |
| bloco | densidade alta, seletividade baixa |
| porta-palete seletivo | acesso direto |
| drive-in | muitos paletes homogêneos |
| flow rack | gravidade e rotação |
| push-back | densidade em canais |
| cantilever | itens longos |
| mezanino | área adicional, exige projeto |
| automatizado | densidade/ergonomia, dependência tecnológica |

## 13. Reserva, picking e staging

- reserva: maior quantidade;
- picking: separação frequente;
- reposição interna: reserva → picking;
- bloqueados: indisponíveis;
- quarentena: aguardam decisão;
- staging: temporário.

## 14. Slotting

| Critério | Tendência |
| --- | --- |
| alto giro | perto da separação |
| pesado | nível baixo |
| volumoso | posição ampla |
| validade | facilitar FEFO |
| alto valor | acesso restrito |
| frágil | proteção |
| incompatível | segregar |

Frequência não vence segurança.

## 15. Espaço

```text
ocupação de posições =
posições ocupadas ÷ posições utilizáveis
```

```text
utilização cúbica =
volume ocupado ÷ volume útil seguro
```

Honeycombing = espaço perdido em posições parcialmente ocupadas.

Ocupação alta pode significar congestionamento.

## 16. Segurança

NR 11:

- capacidade visível;
- equipamento em condição;
- piso e estrutura compatíveis;
- circulação;
- saídas e combate a incêndio livres.

NR 17:

- peso;
- pega;
- postura;
- frequência;
- altura;
- distância;
- meios auxiliares.

NR 23 + CBMMA:

- lei estadual;
- projeto;
- medidas instaladas;
- inspeção e manutenção;
- rotas livres.

NR 26:

- GHS;
- pictograma;
- palavra de advertência;
- frases de perigo e precaução;
- ficha de segurança;
- treinamento.

## 17. Tecnologia

WMS, código de barras e RFID apoiam o controle, mas não provam sozinhos:

- quantidade;
- condição;
- propriedade;
- endereço atual;
- regularidade.

## 18. Indicadores

```text
avarias =
unidades avariadas ÷ unidades movimentadas
```

```text
registro tempestivo =
movimentos no prazo ÷ movimentos ocorridos
```

```text
validade crítica =
unidades próximas do vencimento ÷ unidades sujeitas a validade
```

```text
distância por linha =
distância percorrida ÷ linhas separadas
```

Acompanhar também incidentes, quase acidentes, bloqueados antigos e tempo de localização.

## 19. Pegadinhas

- localização livre dispensa endereço — errado;
- saldo correto garante localização — errado;
- verticalização aumenta capacidade estrutural — errado;
- cross-docking é estocagem longa — errado;
- alta densidade sempre melhora seletividade — errado;
- FEFO e PEPS são sempre iguais — errado;
- PGR substitui projeto de incêndio — errado;
- sinalização elimina risco — errado;
- item bloqueado está disponível — errado;
- reserva e picking são iguais — errado;
- RFID garante rastreabilidade — errado;
- item barato nunca é crítico — errado.
