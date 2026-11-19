# Deploy do backend Re-Includer UX (Cloudflare Workers)

## Por que esta arquitetura
O Hugging Face Space Gradio foi bloqueado pela quota CPU Basic. O backend passa a usar Cloudflare Workers + Workers AI. O plano Workers Free inclui até 100.000 requisições/dia; Workers AI tem uma alocação gratuita de 10.000 Neurons/dia. O consumo depende do modelo e do tamanho dos prompts. Consulte os limites e preços antes de abrir o serviço ao público.

## Arquivos
- `worker/index.js`: API, CORS, validação de entrada e verificação Turnstile.
- `worker/wrangler.toml`: configuração do Worker e binding Workers AI.

## Publicação pelo dashboard (celular)
1. Crie/acesse uma conta em https://dash.cloudflare.com/
2. Abra **Workers & Pages** → **Create application** → **Connect to Git**.
3. Conecte GitHub e selecione `inforeincluder/re-includer-ux`.
4. Configure o projeto para usar o diretório raiz `worker` (onde está `wrangler.toml`) e o nome `re-includer-ux-ai`.
5. Salve e publique. O dashboard deve reconhecer a configuração Wrangler.
6. Em Workers & Pages, abra o Worker → Settings → Variables and Secrets → Add → Secret.
7. Crie `TURNSTILE_SECRET` com o secret de um widget Turnstile.
8. Em https://dash.cloudflare.com/ → Turnstile, crie um widget para `inforeincluder.github.io`. Use o sitekey no frontend quando a integração for implementada.
9. Faça novo deploy depois de salvar o secret.

## Teste de saúde
Abra `https://NOME-DO-WORKER.SUBDOMINIO.workers.dev/health`.
Resposta esperada: JSON com `ok: true`.

## Segurança
- O endpoint de análise exige Turnstile validado no servidor.
- CORS permite somente `https://inforeincluder.github.io`; CORS não substitui autenticação nem antiabuso.
- Nunca coloque TURNSTILE_SECRET ou credenciais no JavaScript.
- O Worker não persiste os relatórios.
- O endpoint ainda não deve ser ligado à interface pública até criar o widget Turnstile, configurar o secret e implementar o widget/sitekey no frontend.
- A alocação gratuita não é ilimitada. Monitore o painel de uso e configure alertas/limites quando disponíveis.

## Modelo
Usa `@cf/zai-org/glm-4.7-flash`, listado pela Cloudflare como disponível no Workers Free na documentação consultada em 18/11/2026. Disponibilidade e limites podem mudar.
