---
schemaVersion: 1
title: "Windows e Linux: arquivos e ambiente — revisão rápida"
description: "Contrastes essenciais de caminhos, arquivos, diretórios, atalhos, área de trabalho e área de transferência."
order: 23
storageId: pc-u023
---

# Windows e Linux — revisão rápida

## Modelo comum

**objeto → caminho → operação → origem/destino → resultado**

- arquivo = dados identificados por nome e localização;
- pasta/diretório = contêiner hierárquico;
- caminho = localização do item;
- atalho/link = referência, não cópia.

## Windows

```text
C:\Users\Ana\Documents\relatorio.pdf
```

- `C:` = unidade; `C:\` = raiz da unidade;
- `\` separa níveis;
- `Win + E` abre o Explorador;
- `Win + D` mostra/oculta a área de trabalho;
- `Alt + Tab` alterna janelas;
- atalho apagado ≠ alvo apagado.

## Área de transferência

- `Ctrl + C` → copiar;
- `Ctrl + X` → recortar;
- `Ctrl + V` → colar;
- copiar + colar: origem permanece;
- recortar + colar: item muda de local.

Arrasto usual:

| Situação | Resultado padrão |
| --- | --- |
| mesma unidade/dispositivo | mover |
| unidade/dispositivo diferente | copiar |
| `Ctrl` durante arrasto | copiar |
| `Shift` durante arrasto | mover |

## Linux

```text
/home/ana/documentos/relatorio.pdf
```

- `/` = raiz e separador;
- `/home` = diretórios pessoais;
- `/etc` = configuração do sistema;
- `/tmp` = temporários;
- no GNOME Files, nome iniciado por `.` fica oculto; `Ctrl + H` alterna a exibição.

### Referências

- `ln -s alvo link` cria **link simbólico**;
- alvo removido/mudado pode deixar link pendente;
- arquivo `.desktop` descreve lançamento/menu gráfico; não é sinônimo de link simbólico.

## Contrastes decisivos

| Windows | Linux |
| --- | --- |
| `C:\...` | `/...` |
| `\` no caminho | `/` no caminho |
| Explorador de Arquivos | gerenciador depende do ambiente |
| atalho | link simbólico é uma forma de referência |
| atributo/opção para ocultar | no GNOME Files, `.` inicial oculta |

## Pegadinhas

- renomear `.jpg` para `.png` **não converte** o arquivo;
- minimizar janela **não fecha** arquivo ou aplicativo;
- oculto **não é** apagado nem criptografado;
- área de transferência **não cria a cópia no destino antes da colagem**;
- apagar referência **não significa** apagar o alvo;
- não aplique automaticamente atalhos do Windows a qualquer interface Linux.

> **Roteiro:** ambiente → objeto → caminho → operação → condição → efeito.
