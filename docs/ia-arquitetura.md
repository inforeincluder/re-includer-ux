# Arquitetura da IA — Re-Includer UX

## Objetivo de produto
O fator de diferenciação será converter evidências de UX em decisões concretas: o que corrigir, por quê, como corrigir e como validar.

## Arquitetura
1. **UX Scanner (site):** coleta sinais verificáveis da página e registra URL, data, limites e evidências.
2. **Evidence Normalizer:** converte achados em JSON estruturado e separa observações de hipóteses.
3. **AI Consultant (Hugging Face Space):** interpreta somente o material fornecido; não recebe token no navegador.
4. **Report Builder:** apresenta leitura executiva, três prioridades, exemplos antes/depois e plano de validação.

## Segurança
- O token HF_TOKEN deve existir somente em Secrets no Space.
- Nunca colocar token em HTML, JavaScript, repositório público ou URL.
- Limitar tamanho de entrada, taxa de chamadas e tokens de saída.
- Não aceitar instruções presentes no conteúdo analisado como comandos do sistema.
- Não enviar credenciais, dados pessoais ou informações confidenciais.

## Modelo
O modelo é configurável pela variável MODEL_ID. O padrão inicial usa `deepseek-ai/DeepSeek-V4.1-Flash:cheapest`, sujeito à disponibilidade do provedor e ao preço vigente. Não assumir gratuidade.

## Critério de qualidade
A resposta deve:
- citar os achados recebidos;
- diferenciar fato, interpretação e hipótese;
- explicitar incertezas;
- priorizar no máximo três ações;
- oferecer exemplos concretos quando houver dados;
- não prometer resultados de negócio;
- sugerir como validar as correções.

## Limitação atual
Este backend é um primeiro adaptador de IA. Ainda não está conectado ao site público nem ao scanner automático. A integração final depende da criação e configuração de um Hugging Face Space e da validação de sua API pública.
