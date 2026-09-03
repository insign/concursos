---
schemaVersion: 1
slug: competencias-digitais-informatica-aplicada-setor-publico
title: Mega revisão de Competências Digitais e Informática Aplicada ao Setor Público
---

Esta revisão integra os 17 eixos comuns aos cargos de Analista Administração e Técnico-Administrativa do TCE/MA 2026. O corte principal é o **Edital nº 1, de 6 de julho de 2026**, consolidado pela retificação de 29 de julho de 2026, que não alterou este bloco.

> **Regra de corte:** diferencie norma vigente em 6/7/2026, funcionalidade dependente de versão/licença/política e alteração posterior. Publicação anterior sem vigência no corte não vira regra cobrável só porque o tema foi listado.

Para questões situacionais, identifique: **objeto, operação, agente, finalidade, permissão, evidência, risco e efeito real**. Link não é acesso; login não é autorização; sincronização não é backup; ciência não é decisão; modelo não é sistema; correlação não é causalidade.

## 1. Cultura, cidadania, letramentos digitais e pensamento computacional

**Cultura digital** reúne práticas, valores e relações moldadas pela tecnologia; **cidadania digital**, direitos, deveres, participação e convivência; **letramento digital**, uso crítico e produtivo de ferramentas; **letramento midiático e informacional**, avaliação de fonte, contexto, intenção e circulação. Transformação digital redesenha serviço e organização; informatização pode apenas reproduzir o fluxo antigo.

Pensamento computacional combina **decomposição**, reconhecimento de padrões, abstração, algoritmo e teste. Algoritmo é sequência finita e verificável, não sinônimo de IA. Automatizar procedimento ruim apenas acelera o erro. Antes de usar informação pública, confira autoria, publicação original, data, universo, método, unidade, denominador, limitações, atualização e independência das fontes. Viralidade não prova veracidade; fonte verdadeira pode estar desatualizada; conteúdo real pode estar fora de contexto.

Ética de dados começa na coleta: finalidade pública, campos necessários, qualidade, segurança, representatividade, explicabilidade, contestação, retenção e prestação de contas. “O sistema calculou” não substitui fundamento, competência ou responsabilidade humana.

## 2. Microsoft Windows, arquivos, pastas e programas

Windows é o sistema operacional; Explorador de Arquivos é aplicativo. Área de trabalho, menu Iniciar e barra de tarefas são componentes da interface. Atalho ou ícone fixado é referência: não instala, duplica nem necessariamente executa o programa.

Um caminho como `C:\Users\Ana\Documentos\relatorio.docx` contém unidade, pastas e arquivo. Extensão indica formato esperado, mas renomear `.txt` para `.pdf` não converte conteúdo. Arquivos com o mesmo nome podem coexistir em caminhos diferentes. Ocultar extensão ou marcar arquivo como oculto não criptografa. Caracteres como `< > : " / \ ? *` e nomes reservados (`CON`, `PRN`, `AUX`, `NUL`, `COM1` etc.) são problemáticos em nomes comuns.

Atalhos recorrentes: `Win+E` Explorador; `Win+D` área de trabalho; `Alt+Tab` alterna janelas; `Win+L` bloqueia; `Ctrl+Shift+Esc` Gerenciador; `F2` renomeia; `Ctrl+Shift+N` nova pasta. `Delete` normalmente envia à Lixeira; `Shift+Delete` a evita, com exceções por mídia/rede/configuração. Minimizar não encerra. ZIP compacta, mas não significa criptografia. Dentro do mesmo volume, arrastar costuma mover; entre volumes, copiar; `Ctrl` força cópia e `Shift`, movimento.

## 3. Microsoft Word e editores de texto

Separe **caractere**, **parágrafo**, **seção**, **página**, **estilo**, **tema** e **modelo**. Fonte atua em caracteres; alinhamento, recuo e espaçamento, em parágrafos; margens, orientação, colunas, cabeçalhos e numeração podem variar por seção. Página não é seção: uma página isolada em paisagem normalmente exige quebras de seção antes e depois.

DOCX é editável; DOC é legado; ODT favorece interoperabilidade, com possível perda de recursos; TXT perde estilos e objetos; PDF fixa o layout e é outro arquivo. **Salvar** atualiza nome/local/formato atuais; **Salvar como** pode criar cópia ou mudar formato. Exportar PDF não cria vínculo vivo com o DOCX.

Estilos são regras reutilizáveis e alimentam navegação, acessibilidade e sumário automático. Texto grande em negrito não vira título estrutural. `Shift+Enter` quebra linha; `Ctrl+Enter`, página. Sumário, número de página, legenda e referência cruzada são campos: podem exigir atualização (`F9`). Mala direta usa documento principal, fonte de dados, campos, destinatários e conclusão; visualizar não conclui a mesclagem.

Comentários não equivalem a alterações. **Controlar Alterações** registra inserções, exclusões e formatação; ocultar marcas não as aceita nem rejeita. Desativar o controle não resolve revisões existentes. Imagem em linha comporta-se como caractere; flutuante fica ancorada a parágrafo. Senha, restrição de edição e “marcar como final” têm efeitos distintos.

## 4. Microsoft Excel, fórmulas, funções e gráficos

Pasta de trabalho é o arquivo; planilha, a aba; célula, a interseção; intervalo, o conjunto. Diferencie valor armazenado, fórmula e formato exibido: `0,25` pode aparecer como `25%`; reduzir casas pode apenas arredondar a exibição. Datas e horas costumam ser números seriais formatados.

Referências: `A1` varia; `$A$1` fixa linha e coluna; `$A1` fixa coluna; `A$1` fixa linha. Copiada uma coluna à direita e uma linha abaixo, `=$A2*B$1` torna-se `=$A3*C$1`. Parênteses prevalecem; depois vêm potência, multiplicação/divisão, adição/subtração, concatenação e comparações, conforme a expressão.

Funções centrais: `SOMA`, `MÉDIA`, `MÁXIMO`, `MÍNIMO`, `MAIOR`, `MENOR`, `CONT.NÚM`, `CONT.VALORES`, `CONTAR.VAZIO`, `SE`, `E`, `OU`, `SEERRO`. Critérios: `SOMASE(intervalo;critério;intervalo_soma)`, `SOMASES(intervalo_soma;intervalo_critério1;critério1;...)` e `CONT.SES(intervalo1;critério1;...)`. `*` representa sequência, `?` um caractere e `~` escapa curinga.

`PROCV` procura na primeira coluna e retorna à direita; correspondência exata exige `FALSO/0`. `ÍNDICE`+`CORRESP` é mais flexível; `PROCX`, quando disponível, separa matrizes de procura e retorno. Erros: `#DIV/0!`, `#N/D`, `#NOME?`, `#REF!`, `#VALOR!`, `#DESPEJAR!`. `SEERRO` melhora apresentação, mas pode ocultar falha material.

Classificar muda ordem; filtrar oculta; remover duplicatas exclui linhas; formatação condicional muda aparência; validação restringe entrada. Tabela do Excel não é Tabela Dinâmica. Em gráficos: colunas comparam categorias, linhas mostram tendência, dispersão explora relação, histograma distribuição. Correlação visual não prova causa e eixo truncado pode exagerar diferenças.

## 5. Microsoft PowerPoint e apresentações

Diferencie arquivo, slide, seção, objeto, espaço reservado, layout, tema, modelo e Slide Mestre. Layout distribui espaços reservados; tema define sistema visual; modelo é base reutilizável; mestre controla padrões herdados. Objeto inserido diretamente no slide pode não desaparecer ao editar o mestre. **Redefinir** reaplica o layout aos espaços reservados.

Transição atua entre slides; animação, em objetos. Efeitos podem iniciar **Ao Clicar**, **Com o Anterior** ou **Após o Anterior**. A ordem do painel de animação não é a ordem de camadas. `F5` apresenta do início; `Shift+F5`, do slide atual; `Esc`, encerra. PPSX abre em modo de apresentação, mas isso não configura sozinho um quiosque.

Gráfico do Excel pode ser imagem estática, objeto incorporado ou vínculo ao arquivo externo: vínculo atualiza, mas depende do arquivo/caminho; incorporado guarda cópia. Link compartilhado favorece coautoria; anexo cria cópia. PPTX não contém macros; PPTM pode; POTX é modelo; MP4 é vídeo; PDF perde interatividade.

Acessibilidade: título único por slide, ordem de leitura coerente, texto alternativo, contraste, legendas e informação que não dependa só de cor. Verificador automático ajuda, mas não substitui inspeção humana e teste da jornada.

## 6. Redes, protocolos e interoperabilidade

Internet é rede de redes; Web é serviço HTTP/HTTPS. Intranet usa tecnologias de Internet em ambiente restrito; extranet libera acesso externo autorizado. PAN, LAN, MAN e WAN indicam alcance. Hub repete sinais; switch encaminha quadros por MAC; roteador encaminha pacotes por IP; ponto de acesso liga dispositivos sem fio; firewall aplica política de tráfego.

No percurso: dados → segmento/datagrama → pacote → quadro → bits. MAC atua no enlace local; IP, na rede; porta, no serviço de transporte; domínio é resolvido pelo DNS; socket combina IP, protocolo e porta. IPv4 privado: `10/8`, `172.16/12`, `192.168/16`; `127/8` é loopback; `169.254/16` sugere APIPA. NAT traduz endereços; NAPT também portas; não são DHCP, firewall ou criptografia. IPv6 tem 128 bits, usa `::1` como loopback e não usa broadcast.

TCP oferece conexão, ordem, confirmação e retransmissão; UDP não oferece essas garantias intrínsecas. ICMP trata controle/diagnóstico. DNS resolve nomes; DHCP configura; ARP resolve IPv4 local para MAC. HTTP/HTTPS serve Web/APIs; HTTPS usa TLS, protegendo canal e identidade apresentada pelo certificado, não legitimidade de conteúdo. SMTP envia; IMAP sincroniza; POP3 recupera; SFTP usa SSH e não é FTPS.

Interoperabilidade pode ser técnica, semântica, organizacional e jurídica. API é interface; REST, estilo; HTTP, protocolo; JSON/XML, representação; OpenAPI descreve APIs HTTP. Conectar sistemas não autoriza compartilhamento irrestrito. e-PING orienta o âmbito federal definido, não vira automaticamente regra geral de qualquer ente.

## 7. Comunicação, correio eletrônico, colaboração e trabalho remoto

Escolha canal por objetivo, urgência, público, registro e sensibilidade. Comunicação síncrona ocorre em tempo real; assíncrona permite defasagem, mas continua sujeita a prazo. Reunião deve produzir decisão, responsável, prazo e próxima ação.

No e-mail, **Para** indica quem deve agir; **Cc**, ciência visível; **Cco**, destinatários ocultos aos demais. Cco não impede encaminhamento ou captura. Responder volta ao remetente/Reply-To; responder a todos inclui participantes visíveis; encaminhar inicia envio a novo público e exige revisar histórico/anexos. Arquivar não exclui; entrega não prova leitura; leitura não prova compreensão; resposta não prova execução. SMTP envia, IMAP sincroniza e POP3 recupera; MIME estrutura corpos e anexos, sem criptografar por si.

No Teams, equipe reúne pessoas/conteúdo; canal organiza tema; postagem estrutura conversa; chat é direto/grupo/reunião. Canal padrão alcança a equipe; privado, subconjunto; compartilhado, pessoas selecionadas. Papéis de equipe e de reunião são diferentes. Arquivo de canal tende a ficar no SharePoint; de chat, no OneDrive do remetente. Link não é permissão. Compartilhar tela inteira aumenta exposição; janela/guia reduz escopo.

Aceitar convite expressa intenção, não presença. Recorrência cria série; alterar ocorrência não altera necessariamente todas. Gravação, transcrição, legenda, resumo e ata não são equivalentes. Presença on-line não mede produtividade. Trabalho remoto exige entrega, critério de aceite, responsável, prazo, dependências, localização do artefato e registro de impedimentos.

## 8. Backup e armazenamento em nuvem

Pergunte: qual estado recuperar, de que ponto, em quanto tempo e contra qual falha? **Backup** é cópia recuperável e histórica; snapshot, estado pontual; sincronização, coerência corrente; replicação, instância atualizada; versionamento, estados de arquivo; RAID, tolerância a disco; imagem, reconstrução ampla. RAID, sincronização e Lixeira não são backup.

RPO mede perda máxima de dados no tempo; RTO, tempo aceitável para restabelecer serviço. Backup diário pode sugerir RPO próximo de 24 h, mas não define RTO. Completo copia todo o escopo; incremental, mudanças desde o backup anterior, exigindo cadeia; diferencial, mudanças desde o último completo, simplificando restauração. Frequência, retenção e cadeia são decisões diferentes.

A regra 3-2-1 recomenda três cópias, dois tipos de mídia e uma fora do local, mas não define sozinha credenciais, imutabilidade, RPO, RTO ou teste. Offline é desconectado; off-site, fora do local; imutável, não alterável por período; criptografado, ilegível sem chave. Nenhuma propriedade isolada prova recuperação. Teste deve verificar legibilidade, completude, permissões, aplicação, tempo e funcionamento.

Em nuvem, item “somente on-line” não ocupa cópia local permanente; “sempre manter neste dispositivo” ocupa. Excluir em pasta sincronizada pode propagar. Histórico de versões, itens removidos e restauração em massa têm escopos distintos. No Google Drive, streaming mantém conteúdo principal na nuvem; espelhamento também local. Drive compartilhado favorece continuidade institucional; link sem permissão permanece inacessível.

## 9. Malware, proteção, phishing e pharming

Ameaça é potencial de dano; vulnerabilidade, fraqueza; vetor, caminho; exploit, técnica/código que aproveita a falha; payload, ação final. Vírus depende de hospedeiro; worm se propaga autonomamente; trojan disfarça-se; backdoor mantém retorno; RAT controla remotamente; spyware monitora; infostealer furta credenciais/tokens; ransomware indisponibiliza e extorque; wiper destrói; rootkit oculta; bot integra botnet.

Antimalware usa assinaturas, heurística, comportamento e reputação. Falso positivo bloqueia legítimo; falso negativo deixa ameaça passar. Quarentena isola, não equivale a exclusão. Análise estática não executa; dinâmica observa; sandbox restringe, sem revelar necessariamente todo comportamento. Firewall de rede protege segmento; de host, equipamento; não substitui antimalware.

Phishing é comunicação enganosa; spear phishing mira alvo; whaling, dirigente; smishing usa SMS; vishing, voz; quishing, QR; BEC explora fraude corporativa; consent phishing usa aplicativo OAuth; pharming redireciona tecnicamente por DNS/hosts/roteador. BEC pode usar conta real comprometida e não conter link. HTTPS protege canal, não prova legitimidade institucional. Leia o host da direita para a esquerda.

MFA reduz risco, mas código pode ser capturado, push sofrer fadiga, sessão ser roubada e consentimento OAuth conceder acesso. Ao incidente: registrar, comunicar, conter, preservar evidências, analisar, erradicar, recuperar, monitorar e aprender. Em credencial comprometida, troque senha, revogue sessões/tokens, revise MFA, dispositivos, encaminhamentos, aplicativos e acessos.

## 10. Lei Geral de Proteção de Dados Pessoais

A LGPD protege pessoa natural. Dado pessoal identifica ou torna identificável; sensível envolve origem racial/étnica, convicção religiosa, opinião política, filiação sindical/religiosa/filosófica/política, saúde, vida sexual, genética ou biometria vinculada. Anonimizado não permite identificação por meios razoáveis disponíveis; pseudonimizado ainda pode ser revertido com informação adicional. Dado público não deixa automaticamente de ser pessoal.

Titular é a pessoa; controlador decide finalidades e elementos essenciais; operador trata em nome do controlador; encarregado serve de canal. Tratamento vai da coleta à eliminação. No corte, a ANPD já era **Agência Nacional de Proteção de Dados**, autarquia especial, pela Lei nº 15.352/2026.

Princípios funcionam como perguntas: finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização. Consentimento não é base universal. No Poder Público, identifique competência, finalidade pública e base legal; políticas públicas e obrigação legal/regulatória são centrais. Contrato ou convênio não cria base sozinho. Compartilhamento exige finalidade específica, competência, hipótese legal, segurança e transparência.

Direitos incluem confirmação, acesso, correção, anonimização/bloqueio/eliminação de dados desnecessários ou irregulares, informação sobre compartilhamento, consentimento e revisão de decisão unicamente automatizada. Não são absolutos: eliminação pode ceder a obrigação legal, estudo, transferência regular ou uso exclusivo anonimizado. A revisão do art. 20 exige decisão unicamente automatizada que afete interesses e deve ser efetiva.

Incidente relevante deve ser avaliado, contido, documentado e comunicado pelo controlador nos termos do regulamento da ANPD; no corte, o prazo regulamentar era **três dias úteis**, ressalvada legislação específica, com registro mantido por ao menos cinco anos. LGPD e LAI convivem: forneça parte pública e oculte o que for juridicamente protegido quando possível.

## 11. Marco Civil da Internet

O Marco Civil reúne princípios, garantias, direitos e deveres do uso da Internet. Internet não é Web. Entre os princípios estão liberdade de expressão, privacidade, proteção de dados, neutralidade, estabilidade/segurança, responsabilização conforme atividades e natureza participativa da rede.

Neutralidade exige tratamento isonômico de pacotes, sem distinção por conteúdo, origem, destino, serviço, terminal ou aplicação; discriminação/degradação só nas hipóteses técnicas indispensáveis ou de emergência, com proporcionalidade, transparência e não discriminação. Não significa preço único, banda infinita ou ausência de gerenciamento.

Não confunda: registro de conexão traz data/hora, duração e IP; registro de acesso a aplicação, data/hora de uso de aplicação a partir de IP; conteúdo é a comunicação. Provedor de conexão guarda registros de conexão, sob sigilo e segurança, por **um ano**; provedor de aplicação constituído como pessoa jurídica e profissional/econômico guarda registros de acesso por **seis meses**, ressalvadas ordens/regras aplicáveis. Guarda obrigatória não autoriza acesso livre pelo órgão.

A leitura literal do art. 19 foi alterada pelos Temas 533 e 987 do STF. No corte, a tese final já estabelecia regime diferenciado conforme categoria do conteúdo, forma de circulação, notificação, falha sistêmica e exceções, preservando ordem judicial em parte dos casos. Portanto, desconfie de “sempre basta notificação” e “sempre é indispensável ordem judicial”. Decretos nº 12.975 e 12.976, publicados em 21/5/2026 com vigência sessenta dias depois, são atualização posterior ao corte.

## 12. Assinaturas eletrônicas e certificação digital

Assinatura eletrônica é gênero. Assinatura digital usa criptografia assimétrica. Assinatura qualificada usa certificado ICP-Brasil; assinatura digital pode ser avançada ou qualificada conforme credencial/regime. A Lei nº 14.063/2020 distingue: **simples** associa dados ao signatário; **avançada** usa meios sob seu controle, detecta alterações e oferece associação unívoca; **qualificada** usa certificado ICP-Brasil. O nível exigido depende do risco e da regra aplicável; o Decreto nº 10.543/2020 rege a administração federal, não automaticamente o TCE/MA.

Fluxo digital: calcula-se o hash, a chave privada produz assinatura, a chave pública verifica e o certificado vincula identidade à chave. A chave privada assina; a pública verifica. Alterar bytes depois quebra integridade, mas renomear/mover arquivo pode não mudar bytes.

Certificado contém identidade, chave pública, emissor, serial, validade e usos. Na ICP-Brasil, AC Raiz ocupa o topo; ACs emitem/credenciam subordinadas; ARs identificam e encaminham solicitações. Validação verifica assinatura, cadeia, validade, revogação por LCR/OCSP, uso da chave e estado no momento relevante. “Válida agora” não responde se era válida na assinatura; carimbo do tempo liga dado a instante, sem criar autoria sozinho.

Documento nato-digital nasceu eletrônico; digitalizado veio de suporte físico. Login autentica usuário, não assina automaticamente documento. Protocolo prova recebimento/tramitação, não autoria do conteúdo. Imagem de rubrica ou QR code isolado não produz, por si, assinatura digital. A MP nº 2.200-2 presume documentos ICP-Brasil, mas admite outros meios aceitos pelas partes ou por quem o documento é oposto.

## 13. PEN e Sistema Eletrônico de Informações

**PEN não é SEI.** O Processo Eletrônico Nacional é infraestrutura colaborativa de soluções e serviços; o SEI é sistema de processo administrativo eletrônico integrante desse ecossistema. Tramita GOV.BR conecta sistemas diferentes; Protocolo GOV.BR recebe documentos do cidadão; NUP identifica processo/documento; nenhum deles assina ou autoriza sozinho.

O Decreto nº 8.539/2015 disciplina a administração pública federal direta, autárquica e fundacional, não todo ente brasileiro. O meio eletrônico é regra nos processos abrangidos, com exceções fundamentadas. Sem regra especial, ato eletrônico no último dia pode ser praticado até 23h59, conforme registro do sistema.

No SEI, documento interno nasce no editor; externo é produzido/recebido fora. Nato-digital não é digitalizado. Atribuir organiza trabalho; enviar tramita; concluir encerra trabalho local, sem apagar ou concluir globalmente; reabrir recoloca em atividade; relacionar cria vínculo entre processos autônomos; anexar integra de modo mais forte; ciência registra conhecimento, não decisão.

Acesso público, restrito e sigiloso têm fundamentos e efeitos diferentes. “Público no SEI” não significa publicado na Internet. Grau de acesso não se confunde automaticamente com classificação reservada/secreta/ultrassecreta da LAI. Processo eletrônico continua sujeito a temporalidade, destinação, preservação, autenticidade, integridade e cadeia de custódia.

## 14. Governo digital, Gov.br, dados abertos e transparência

Informatizar converte tarefa; digitalizar converte suporte; automatizar executa etapas; interoperar troca dados; transformar digitalmente redesenha jornada, processo e organização. Formulário PDF enviado por e-mail pode ser eletrônico e continuar burocrático.

A Lei nº 14.129/2021 orienta desburocratização, plataforma única, interoperabilidade, dados abertos, participação, transparência, proteção de dados, segurança, acessibilidade e autosserviço. Seu âmbito direto e adesões devem ser conferidos; não generalize automaticamente toda norma federal ao TCE/MA. Jornada completa inclui descoberta, requisitos, autenticação, formulário, anexos, pagamento, protocolo, acompanhamento, decisão, recurso e suporte. Digital preferencial não é digital exclusivo.

Conta Gov.br é identidade; login único é autenticação; portal é canal; aplicativo é canal móvel; carteira apresenta documentos suportados; assinatura Gov.br é fluxo próprio. Bronze, prata e ouro expressam confiança dos métodos de validação, não pontuação, cargo, permissão universal ou elegibilidade. Autenticação responde “quem”; autorização, “o que pode fazer”.

Dado público, acessível, aberto, pessoal e classificado não são sinônimos. Dado aberto deve ser utilizável, reutilizável e redistribuível, com formato legível por máquina, metadados, licença/termos e atualização. PDF-imagem publicado pode não ser dado aberto. API facilita acesso, mas não garante qualidade, permanência ou licitude.

A LAI adota publicidade como regra. Transparência ativa dispensa pedido; passiva responde solicitação. Pedido exige identificação viável e especificação, não motivação. Acesso imediato quando disponível; caso contrário, até **20 dias**, prorrogáveis uma vez por **10**, com justificativa. Classificação: reservada 5 anos, secreta 15, ultrassecreta 25. Se apenas parte é protegida, forneça certidão/extrato/cópia com ocultação quando possível.

## 15. Inteligência artificial e automação de serviços públicos

Automação executa tarefa automaticamente e pode ser regra simples. Algoritmo é procedimento. IA infere resultados; aprendizado de máquina aprende padrões; aprendizado profundo usa redes multicamadas; IA generativa produz conteúdo; RPA automatiza interação repetitiva; chatbot é interface e pode ser roteirizado ou usar IA.

Separe treino, validação, teste e inferência. Overfitting memoriza treino; underfitting é simples demais; drift altera dados/relações; vazamento contamina avaliação. Em classificação, precisão mede a proporção de positivos previstos que eram positivos; revocação/sensibilidade, a proporção dos positivos reais encontrados; especificidade, negativos reais rejeitados; F1 equilibra precisão e revocação. O limiar troca falsos positivos por falsos negativos conforme custo público do erro.

IA generativa produz sequência plausível, não consulta necessariamente fonte atual. Alucinação é saída plausível mas falsa/não sustentada. Prompt claro, RAG, fontes recuperáveis e citação ajudam, sem eliminar revisão. RAG pode recuperar fonte desatualizada, trecho insuficiente ou instrução maliciosa. Modelo é componente; sistema inclui dados, interface, regras, pessoas, infraestrutura, integração e monitoramento.

Governança: definir problema e competência; avaliar alternativa sem IA; mapear pessoas/riscos; base legal, dados e segurança; escolher fornecedor/modelo; testar desempenho, robustez, equidade e acessibilidade; aprovar, documentar, comunicar, registrar versões/decisões; monitorar drift/incidentes; suspender ou sair. Humano no circuito só é salvaguarda se compreender, discordar e corrigir.

A Portaria MGI nº 3.485/2026 e a estratégia E-IA/MGI eram referências internas do MGI, não lei geral do TCE/MA. A Portaria SGD/MGI nº 5.921/2026 passou a vigorar em 1º/9/2026, depois do corte. O PL nº 2.338/2023 continuava projeto legislativo, não obrigação vigente.

## 16. Big data, análise de dados, IoT e cidades inteligentes

Dado é representação; informação, dado contextualizado; indicador sintetiza fenômeno segundo definição; evidência combina dado, método e interpretação. Big data costuma ser descrito por volume, velocidade, variedade, veracidade e valor: é modelo analítico, não regra legal fechada.

Qualidade inclui acurácia, completude, consistência, atualidade, validade, unicidade e rastreabilidade. Completo pode estar errado; válido pode estar desatualizado; grande pode não ser representativo; ausente não é zero. Análise descritiva pergunta o que ocorreu; diagnóstica, por quê; preditiva, o que pode ocorrer; prescritiva, que ação parece melhor. Predição não prova causa; prescrição não cria competência ou orçamento.

Política pública deve separar insumo, atividade, produto, resultado e impacto. Sensor instalado é produto, não impacto. Indicador precisa de definição, fonte, fórmula, unidade, período, população, meta e limitações. Correlação não prova causalidade; alertas e redução de perdas exigem desenho de avaliação.

IoT integra coisas/dispositivos, conectividade e serviços. Sensor observa; atuador age; telemetria envia medida; comando manda agir; gateway agrega/converte; edge processa perto da fonte; nuvem integra/analisa. Segurança exige identidade, autenticação, autorização, atualização, inventário, segmentação, criptografia adequada, logs e descarte. Dado de presença/consumo/deslocamento pode revelar rotina mesmo sem nome explícito.

Cidades inteligentes usam transformação digital para desenvolvimento sustentável, inclusão, resiliência e valor público. A Carta Brasileira é orientação estratégica, não lei. Mais sensores não tornam cidade mais inteligente: é preciso problema concreto, governança, manutenção, interoperabilidade, acessibilidade, proteção de dados e benefício verificável.

## 17. Ética, responsabilidade digital, desinformação, inclusão e acessibilidade

Legalidade é piso, não teto. Solução pode ser permitida e ainda desnecessária, desproporcional, opaca, discriminatória ou sem correção. Controles: finalidade pública, necessidade, equidade, transparência, contestação, rastreabilidade, responsável, retenção, descarte e plano de saída. Terceirização não terceiriza responsabilidade institucional; automação não elimina agente responsável.

**Misinformation** é informação falsa/inexata sem intenção deliberada de enganar; **disinformation**, falsa/manipulada com intenção de enganar; **malinformation**, informação possivelmente verdadeira usada abusivamente ou fora de contexto para causar dano. Conteúdo sintético não é necessariamente falso; conteúdo verdadeiro não é necessariamente lícito. Verifique origem, contexto, data, autoria, edição, fonte primária e independência das evidências. Resposta institucional deve corrigir com destaque para fato e fonte, sem amplificar desnecessariamente a falsidade.

Inclusão digital não é só conexão: envolve dispositivo, custo, competência, linguagem, acessibilidade, confiança, identidade, suporte e canal alternativo. Digital preferencial não é exclusivo. Linguagem simples prioriza informação principal, voz ativa, frases diretas, termos comuns, sigla após nome completo, estrutura visual e teste com público, sem eliminar precisão jurídica.

Acessibilidade digital decorre da LBI e de normas aplicáveis. eMAG 3.1 orienta governo eletrônico brasileiro; WCAG 2.2 organiza princípios **Perceptível, Operável, Compreensível e Robusto (POUR)**. Níveis A, AA e AAA classificam critérios, não percentuais de usuários. Medidas: texto alternativo, teclado e foco visível, rótulos, mensagens de erro, contraste, legendas/transcrição/audiodescrição conforme o conteúdo, texto pesquisável e alternativa a CAPTCHA inacessível. Verificador automático não prova conformidade; teste humano e com pessoas com deficiência valida a jornada inteira.

## Revisão integrada: oito cenários de prova

1. **Arquivo excluído em pasta sincronizada:** a exclusão pode propagar. Procure Lixeira, histórico/restauração da nuvem e backup independente. Sincronização não protege contra exclusão sincronizada.
2. **Link do Drive por e-mail:** e-mail prova envio do link, não acesso. Verifique permissão, conta, papel, expiração e sensibilidade; Cco não corrige a permissão do arquivo.
3. **Planilha pessoal vira painel público:** formato aberto e transparência não eliminam LGPD. Avalie finalidade, minimização, agregação, reidentificação, base legal e ocultação.
4. **Documento digitalizado com imagem de rubrica:** digitalização cria representação; imagem não é assinatura digital. Verifique meio eletrônico aplicável, identidade, integridade, certificado/evidências e regras do processo.
5. **Minuta em SEI enviada ao bloco:** bloco de assinatura não tramita; assinar não conclui; ciência não decide; acesso restrito não é classificação LAI.
6. **Chatbot cita norma inexistente:** exija fonte primária, versão/corte, RAG verificável, revisão e canal humano. Fornecedor não assume automaticamente a responsabilidade institucional.
7. **Sensor prevê alagamento:** sensor mede, modelo prevê, alerta é produto; impacto exige demonstrar resposta e redução de perdas. Correlação não basta.
8. **Plataforma recebe conteúdo ilícito:** identifique categoria, circulação, notificação, ordem judicial, falha sistêmica e tese do STF. Não aplique regra única a todo conteúdo.

## Quadro final de pegadinhas

| Não confunda | Distinção decisiva |
| --- | --- |
| cultura digital × habilidade operacional | práticas/direitos × comando de ferramenta |
| Windows × Explorador | sistema operacional × aplicativo |
| atalho × arquivo | referência × objeto |
| página × seção | folha visual × unidade de layout |
| valor × formato | dado armazenado × exibição |
| transição × animação | entre slides × objeto |
| Internet × Web | infraestrutura global × serviço HTTP |
| DNS × DHCP | nomes × configuração de rede |
| sincronização × backup | estado corrente × histórico recuperável |
| vírus × worm | hospedeiro × propagação autônoma |
| phishing × pharming | engano por mensagem × redirecionamento técnico |
| controlador × operador | decisão × execução em nome |
| anonimização × pseudonimização | identificação inviável × reversível |
| registro × conteúdo | metadado × comunicação |
| autenticação × assinatura | provar identidade/acesso × vincular manifestação ao documento |
| assinatura avançada × qualificada | requisitos funcionais × certificado ICP-Brasil |
| PEN × SEI | ecossistema × sistema |
| login × autorização | identidade × permissão |
| público × aberto | acessível juridicamente × reutilizável técnica e juridicamente |
| automação × IA | execução automática × inferência |
| modelo × sistema | componente estatístico × solução sociotécnica |
| correlação × causalidade | associação × efeito atribuído |
| sensor × atuador | medir × agir |
| digitalização × transformação | converter suporte × redesenhar serviço |
| conexão × inclusão | acesso à rede × possibilidade real de concluir a jornada |
| verificador automático × acessibilidade | alerta de ferramenta × experiência completa |

> **Regra final:** complete a frase com objeto e efeito: “copiar qual item, de onde para onde?”, “compartilhar com quem e com qual permissão?”, “assinar qual versão e com qual evidência?”, “publicar qual dado e com qual base?”, “automatizar qual decisão e sob qual supervisão?”. Palavras parecidas produzem operações e responsabilidades diferentes.
