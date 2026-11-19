# IA no Re-Includer UX

## Primeira integração: Gemini via GitHub Actions

A primeira versão usa o próprio GitHub como interface operacional:
- O fluxo **Consultor UX com Gemini** é iniciado manualmente em Actions.
- A entrada é fornecida no formulário de execução.
- A chave fica em **Settings → Secrets and variables → Actions** como `GEMINI_API_KEY`.
- O resultado aparece no resumo da execução (**Summary**).

Não há chave no navegador, no HTML ou no repositório. Não é necessário Cloudflare, Hugging Face ou servidor externo próprio.

## Como executar

1. Abra a aba **Actions** do repositório.
2. Selecione **Consultor UX com Gemini**.
3. Toque em **Run workflow**.
4. Informe o nome da página e cole evidências/observações. A URL é opcional.
5. Abra a execução concluída e consulte **Summary**.

## Configuração única da chave

Crie uma chave Gemini no Google AI Studio e cadastre-a no GitHub:
**Settings → Secrets and variables → Actions → New repository secret**.
Nome exato: `GEMINI_API_KEY`.

O valor nunca deve ser colocado em arquivos, Issues, comentários, logs ou no chat.

## Limitações e privacidade

- O workflow não navega na URL. Ele analisa apenas o texto/evidências colados.
- Execuções e seus resumos podem ficar visíveis a quem tem acesso ao repositório. Este repositório é público: use somente páginas públicas, dados sintéticos ou conteúdo que possa ser divulgado.
- Não envie dados pessoais, informações de clientes, credenciais ou material confidencial.
- A chamada à API pode consumir cota ou gerar cobrança conforme o plano e as condições vigentes do Google.
- A saída é uma análise assistida por IA, não pesquisa com usuários, certificação WCAG ou garantia de resultados comerciais.
- O fluxo é manual e sob demanda; ainda não é uma experiência de IA embutida no site público.

## Modelo e API

Modelo inicial: `gemini-3.8-flash`, via API Interactions REST:
`POST https://generativelanguage.googleapis.com/v1beta/interactions`.

A seleção do modelo pode ser atualizada no arquivo de workflow conforme disponibilidade, custo e qualidade.
