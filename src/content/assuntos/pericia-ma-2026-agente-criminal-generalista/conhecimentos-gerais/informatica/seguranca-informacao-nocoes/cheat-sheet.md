---
---

## Propriedades, identidade e risco

| Conceito | Reconhecimento no caso |
|---|---|
| **Confidencialidade** | Restringir conhecimento da informação a quem tem autorização. |
| **Integridade** | Preservar contra alteração ou destruição indevida. Comparar versões não prova verdade factual. |
| **Disponibilidade** | Acesso oportuno e confiável por quem está autorizado, conforme a necessidade do serviço. |
| **Autenticidade** | Confiança na identidade ou origem declarada; não é sinônimo de sigilo. |
| **Autenticação / autorização** | Verificar identidade / decidir ações e recursos permitidos. |
| **Menor privilégio** | Conceder somente permissões necessárias à tarefa. |
| **Ameaça / vulnerabilidade / risco** | Potencial de dano / fragilidade explorável / possibilidade do evento adverso e suas consequências. |

Um incidente pode afetar várias propriedades. **Propriedades são objetivos; controles são medidas.** Pessoas, procedimentos e proteção física também participam da segurança.

**Autenticação multifator:** tipos distintos — algo que se sabe, possui ou é. Duas senhas são do mesmo tipo. Use senhas diferentes entre serviços; não forneça códigos nem aprove solicitações que não iniciou.

## Ameaças pelo mecanismo

- **Malware:** código malicioso. **Vírus:** depende de hospedeiro. **Worm:** replica-se de forma autônoma entre sistemas.
- **Trojan:** função aparentemente útil com ação maliciosa escondida. **Spyware:** coleta oculta; **keylogger** malicioso captura teclas.
- **Ransomware:** bloqueio extorsivo; dupla extorsão acrescenta ameaça de divulgar dados roubados.
- **Botnet:** conjunto de dispositivos comprometidos sob controle remoto do atacante.
- **Engenharia social:** manipula pessoas. **Phishing:** comunicação eletrônica fraudulenta que induz entrega de dados ou ações; não exige infecção.
- **Pharming:** desvio técnico para destino falso, por exemplo na resolução de nomes pelo <abbr title="Domain Name System — sistema de nomes de domínio">DNS</abbr>.

Examine o host, nome do serviço no endereço. Em `https://login.gov.br.exemplo.com/validar`, o domínio registrável é `exemplo.com`. Confirme pedidos sensíveis por contato conhecido e independente; o contato da própria mensagem suspeita não basta.

## Medida e limite

| Medida | Apoio e limite principal |
|---|---|
| Atualizações legítimas | Corrigem falhas conhecidas; não eliminam todos os riscos. |
| Antimalware | Detecta e trata código malicioso. Assinaturas usam padrões conhecidos; heurística e comportamento procuram sinais suspeitos. Pode errar. |
| Quarentena | Restringe uso de objeto suspeito; não é exclusão definitiva nem garantia de máquina limpa. |
| Firewall | Controla tráfego conforme regras; não remove sozinho malware nem certifica honestidade de mensagens. |
| Cifragem | Protege leitura sem a chave adequada; não garante disponibilidade. |
| Hash criptográfico | Resumo para comparar com referência confiável; não recupera o arquivo nem autentica sozinho seu autor. |
| Assinatura digital | Permite verificar origem e integridade dos dados assinados; não cifra o conteúdo por si só. |
| Backup, ou cópia de segurança | Apoia recuperação quando há versão útil, protegida e restaurável; sincronizar alterações pode também propagar danos. |

**Falso positivo:** legítimo marcado como ameaça. **Falso negativo:** ameaça não detectada.

**Conter ≠ remover a causa ≠ recuperar.** Isolar pode limitar efeitos, mas não elimina sozinho a infecção. Comunique a suspeita e siga o plano institucional; verifique o efeito e o alcance de cada medida.
