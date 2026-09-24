# Almoxarifado e armazenamento — revisão rápida

> **Saldo, endereço, condição e disponibilidade precisam coincidir.** Um saldo correto com o material no endereço errado ainda causa busca, separação indevida e falsa ruptura.

## 1. Qual etapa controla o quê?

| Elemento | Pergunta de prova |
| --- | --- |
| Almoxarifado | Unidade e instalação que recebe, guarda, controla e distribui materiais. |
| Armazenagem | Guarda, localização, segurança e preservação do material; não é a licitação nem a avaliação contábil. |
| Estoque | Itens e quantidades mantidos para necessidades futuras. |
| Código × endereço | Código identifica **qual item**; endereço registra **onde** está cada quantidade, inclusive quando um código ocupa várias posições. |

A cadeia de controle é **material físico ↔ endereço ↔ registro ↔ documento do movimento**. Mover sem registrar rompe a trilha; capturar uma etiqueta não prova a existência ou a condição do conteúdo. Em contingência do sistema, conserve hora do fato, responsável, documento e posterior reconciliação.

**Localização fixa** reserva posição por item e pode deixar espaço ocioso; **dinâmica** usa posição compatível disponível e exige atualização a cada movimento; **híbrida** pode manter separação fixa e reserva dinâmica. “Livre” nunca significa “sem endereço”. <abbr title="escolha do endereço de guarda segundo perfil e risco do material">Slotting</abbr> escolhe posição ponderando giro, volume, massa, fragilidade, valor, validade, compatibilidade e acesso. Alto giro costuma aproximar da expedição; carga pesada fica em baixo; incompatível deve ser segregado mesmo com percurso maior.

**Acurácia de saldo** = itens sem divergência de quantidade ÷ itens verificados; **acurácia de localização** = itens encontrados no endereço registrado ÷ itens testados. Informe universo e tolerância: 190 de 200 com quantidade correta = 95%, mas 180 de 200 nos endereços corretos = 90%. Um <abbr title="sistema de gestão de armazém">WMS</abbr>, código de barras ou <abbr title="identificação por radiofrequência">RFID</abbr> auxilia captura e rastreio; não substitui conferência e documento.

## 2. O material pode ser usado?

**Conservação** previne deterioração: embalagem adequada, ambiente, inspeção, limpeza, proteção contra pragas, dano e furto. **Recuperação** tenta restabelecer utilidade após avaria, mediante decisão técnica e econômica. Na <abbr title="Instrução Normativa">IN</abbr> <abbr title="Secretaria de Administração Pública da Presidência da República">SEDAP</abbr> nº 205/1988, a recuperação de bem móvel é considerada viável quando a despesa não excede **50% do valor estimado de mercado** (item 9.3); isso não obriga o reparo nem cria percentual estadual universal.

Disponibilidade e condição são eixos distintos: íntegro pode estar reservado ou sob inspeção; avariado pode estar bloqueado. **Utilizável = físico − unidades indisponíveis distintas**, sem descontar duas vezes um lote simultaneamente avariado e bloqueado. Diante de vazamento, vencimento, dano ou dúvida: **identifique → interrompa uso inseguro → bloqueie/segregue conforme risco → registre → avalie → decida → libere apenas com decisão registrada**. Rotação não autoriza fornecer material impróprio.

| Rotação física | Gatilho |
| --- | --- |
| <abbr title="primeiro a entrar, primeiro a sair">PEPS</abbr> | Antiguidade de entrada, orientação da <abbr title="Instrução Normativa">IN</abbr> nº 205/1988, item 4.1, para evitar envelhecimento. |
| <abbr title="primeiro que vence, primeiro que sai">PVPS</abbr> (<abbr title="first expired, first out; primeiro que vence, primeiro que sai">FEFO</abbr>) | Validade mais próxima **entre lotes liberados**: lote novo pode sair antes do antigo se vencer primeiro. |

<abbr title="primeiro a entrar, primeiro a sair">PEPS</abbr> físico seleciona o lote real; <abbr title="primeiro a entrar, primeiro a sair">PEPS</abbr> contábil atribui uma camada de custo. A coincidência de nomes não prova que a rotação física e a valoração sejam iguais.

## 3. Qual arranjo evita custo sem gerar risco?

**Unitização** reúne volumes numa carga de movimentação; paletizar é uma forma, sem aumentar capacidade de piso, estante ou empilhadeira. Duas faces do palete descrevem sua estrutura; duas ou quatro entradas descrevem por onde entram os garfos — dimensões independentes.

| Opção | Ganho e limite |
| --- | --- |
| Piso ou empilhamento em bloco | Densidade possível com cargas homogêneas estáveis; acesso a uma unidade pode exigir remover outras. |
| Porta-paletes seletivo | Acesso direto, com menor densidade relativa. |
| <abbr title="estrutura em profundidade com entrada do equipamento no canal">Drive-in</abbr> | Muitos paletes homogêneos, com acesso/ordem mais restritos. |
| <abbr title="estrutura dinâmica de armazenagem por gravidade">Flow rack</abbr> | Fluxo e rotação ordenados; exige carga compatível e manutenção. |
| <abbr title="estrutura de braços para materiais longos">Cantilever</abbr> | Tubos e perfis; depende de apoio estável. |
| Verticalização × horizontalização | Usar altura × plano do piso; verticalizar aumenta exigências de estrutura, equipamento, circulação e emergência. |

**Seletividade** é acessar uma carga sem remover outras. Ocupação = posições ocupadas ÷ posições úteis; utilização cúbica = volume ocupado ÷ volume útil e seguro. Área total inclui corredores, docas, inspeção e fuga, que não viram armazenamento. Ocupação alta pode coexistir com espaço perdido em posições parcialmente usadas (*honeycombing*, perda de capacidade dentro de posição ocupada) e baixa seletividade.

**Reserva** guarda maior quantidade; <abbr title="área de separação frequente de materiais">picking</abbr> atende separação frequente; transferência interna deve registrar origem, destino e quantidade. <abbr title="área temporária para receber, consolidar ou expedir remessas">Staging</abbr> é temporária, sem ocupar corredor de fuga. <abbr title="fluxo coordenado do recebimento à expedição com pouca ou nenhuma estocagem">Cross-docking</abbr> sincroniza chegada, triagem e saída; não dispensa conferência. Saldo total suficiente com <abbr title="área de separação frequente de materiais">picking</abbr> vazio pode ser falha de reposição interna, não falta global.

Na movimentação, reduza distância, toques e retornos desnecessários e use carga unitária segura. A capacidade efetiva da empilhadeira depende da geometria e da altura, além do peso: **centro de carga** afastado do mastro aumenta o momento de tombamento. Verifique placa, manual, piso, palete, estrutura e rota conjuntamente.

## 4. Qual regra de segurança se aplica?

A <abbr title="Instrução Normativa">IN</abbr> nº 205/1988 é referência do <abbr title="Sistema de Serviços Gerais">SISG</abbr> **federal**, sem imposição automática ao <abbr title="Tribunal de Contas do Estado do Maranhão">TCE-MA</abbr>. Seus cuidados de armazenagem incluem pesados em partes inferiores, materiais sem contato direto com piso, marcação visível e acesso a emergência livre. Para empilhamento, menciona aproximadamente **70 cm do teto e 50 cm das paredes**; não substitua por 20 cm nem trate como regra universal de projeto.

| Fonte no corte do edital | Decisão prática |
| --- | --- |
| <abbr title="Norma Regulamentadora">NR</abbr> 1, capítulo 1.5 vigente desde **26/5/2026** | <abbr title="Gerenciamento de Riscos Ocupacionais">GRO</abbr> identifica, avalia e controla riscos; <abbr title="Programa de Gerenciamento de Riscos">PGR</abbr> contém ao menos inventário de riscos e plano de ação. Priorize eliminação, proteção coletiva, medidas administrativas e, por fim, <abbr title="Equipamento de Proteção Individual">EPI</abbr>. |
| <abbr title="Norma Regulamentadora">NR</abbr> 11 | Carga visível e equipamento conservado; peso armazenado ≤ capacidade calculada do piso; material empilhado afastado **ao menos 0,50 m das estruturas laterais**; não obstruir circulação, iluminação, combate a incêndio ou saídas. O Anexo I de rochas ornamentais tem alcance específico. |
| <abbr title="Norma Regulamentadora">NR</abbr> 17 | Avalie peso, pega, postura, frequência, altura e distância; não há peso único seguro para toda tarefa. Em levantamento não eventual capaz de comprometer saúde/segurança, alcance horizontal de pega **acima de 60 cm** é vedado. |
| <abbr title="Norma Regulamentadora">NR</abbr> 23 | Incêndio exige legislação estadual e normas técnicas oficiais complementares quando aplicáveis; saídas desobstruídas. No Maranhão, confira Lei nº 11.390/2020 e regras do <abbr title="Corpo de Bombeiros Militar do Maranhão">CBMMA</abbr> para a edificação. |
| <abbr title="Norma Regulamentadora">NR</abbr> 26 | Perigo químico, rotulagem e ficha com dados de segurança; cor ou pictograma comunica o risco e não substitui contenção, segregação e treinamento. |

Risco e desempenho devem ser lidos juntos: uma estante instável requer tratamento da causa, não apenas <abbr title="Equipamento de Proteção Individual">EPI</abbr>; um extintor obstruído não se justifica por ganho de densidade. Mudança de leiaute, demanda ou material pode exigir rever capacidade, circulação, prevenção contra incêndio e risco ocupacional. Registre a condição, sua causa, efeito e evidência para corrigir o processo.
