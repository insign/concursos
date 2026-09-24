# Segurança da informação: confidencialidade, integridade e disponibilidade

## Tríade

| Propriedade | Pergunta-chave | Violação típica |
|---|---|---|
| confidencialidade | quem pode conhecer? | divulgação/acesso não autorizado |
| integridade | o conteúdo foi alterado indevidamente? | modificação, exclusão ou corrupção |
| disponibilidade | o autorizado consegue usar quando precisa? | indisponibilidade, interrupção ou atraso relevante |

## Pegadinhas

- **Disponibilidade ≠ 24 × 7 obrigatório.** É acesso oportuno e confiável conforme a necessidade/requisito.
- **Integridade ≠ garantia de acerto factual.** Um dado digitado errado pode permanecer intacto. O Cebraspe/PCDF 2024, item 120, usou “veracidade” para integridade; reconhecer o uso da banca sem concluir que a propriedade corrige erros de origem.
- **Autenticação ≠ autorização.** Autenticar identifica; autorizar define o que pode ser feito.
- **Usuário autenticado ≠ acesso irrestrito.**
- **Controle ≠ propriedade.** Cifragem, backup, redundância e controle de acesso são mecanismos.
- Um incidente pode afetar **mais de uma** propriedade.
- Segurança da informação abrange **pessoas, processos, ambientes e tecnologia**.

## Associação rápida

- menor privilégio / controle de acesso → principalmente **confidencialidade**
- permissões de edição / trilha de auditoria / verificação de alteração → **integridade**
- redundância / recuperação / capacidade / mitigação de negação de serviço → **disponibilidade**
- origem/identidade confiável → **autenticidade** (relacionada, mas distinta da tríade literal)

## Método de prova

1. **leitura/divulgação indevida?** → confidencialidade  
2. **alteração/destruição indevida?** → integridade  
3. **acesso legítimo impedido?** → disponibilidade  
4. **origem/identidade?** → autenticidade
