---
title: Re-Includer UX AI
emoji: 🧭
colorFrom: green
colorTo: blue
sdk: gradio
sdk_version: 5.49.1
app_file: app.py
pinned: false
---

# Re-Includer UX — Consultor de UX com IA

Backend de IA para interpretar relatórios do Re-Includer UX.

## Configuração obrigatória

Em **Settings → Variables and secrets → New secret**, crie:

- Nome: `HF_TOKEN`
- Valor: token Hugging Face com permissão **Make calls to Inference Providers**.

Opcionalmente, crie uma variável:

- Nome: `MODEL_ID`
- Valor: `deepseek-ai/DeepSeek-V4.1-Flash:cheapest`

Nunca coloque o token no código do site, no GitHub ou em arquivos JavaScript públicos.

## Como funciona

Recebe um relatório ou dados de avaliação, envia o conteúdo ao endpoint Chat Completions da Hugging Face e devolve uma análise estruturada em português.

O modelo não deve alegar que visitou ou inspecionou uma URL. A qualidade da resposta depende das evidências fornecidas.

## Custos

Inference Providers pode gerar cobrança. Confira créditos, preço do modelo e consumo na conta Hugging Face antes de disponibilizar a usuários. Configure limites de uso e monitore os gastos.

## Privacidade e segurança

- Não enviar senhas, dados pessoais ou dados confidenciais.
- Limite de entrada: 18 mil caracteres.
- O token existe apenas como Secret do Space.
- O conteúdo submetido é encaminhado ao provedor de inferência escolhido.
