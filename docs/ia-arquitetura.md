# Arquitetura de IA — Re-Includer UX

## Fluxo ativo: GitHub Actions + Playwright + Gemini

1. A interface pública recebe uma URL.
2. A pessoa abre o workflow **Consultor UX com Gemini** e inicia manualmente a execução.
3. O script `.github/scripts/inspect_page.py` valida a URL e inspeciona páginas públicas.
4. A coleta limita a navegação a até 20 páginas, profundidade 2 e 500 requisições.
5. O workflow envia evidências à API Gemini usando o segredo `GEMINI_API_KEY`.
6. O relatório é publicado no Summary da execução.

A interface não dispara o workflow nem recebe o relatório diretamente. O processo depende de ação manual no GitHub.

## Segurança e privacidade

- A chave Gemini fica em GitHub Actions Secrets e nunca deve ser incluída no frontend.
- O crawler não autentica, não clica, não envia formulários, não realiza compras, não altera dados e não acessa áreas privadas.
- URLs locais, IPs não públicos e hosts que não resolvem para endereços públicos são rejeitados.
- Todas as requisições para outros hosts são bloqueadas, inclusive scripts, fontes, imagens e APIs. Isso reduz a superfície de rede, mas pode alterar a renderização e causar falhas aparentes em recursos que dependem de terceiros.
- A URL e os dados públicos coletados são enviados ao GitHub Actions e à API Gemini. O conteúdo não permanece apenas no navegador.
- Execuções e resumos podem ficar visíveis conforme as permissões do repositório. Use apenas conteúdo que possa ser processado e divulgado.
- A validação DNS reduz riscos, mas não equivale a isolamento de rede ou proteção absoluta contra DNS rebinding. Antes de abrir a ferramenta a uso público em escala, é necessária revisão adicional de segurança e egress controlado.

## Limites da inspeção

- Até 20 páginas, profundidade 2 e 500 requisições.
- Descoberta por links encontrados no DOM; não é spider completo nem usa sitemap atualmente.
- Não cobre autenticação, estados após clique, formulários submetidos, conteúdo carregado apenas por interação, nem todos os breakpoints.
- Erros de rede/console podem vir de serviços externos ou condições transitórias.
- Ausência de evidência não prova ausência de problema.

## Estrutura de decisão profissional

O relatório segue o encadeamento evidência → fato → interpretação → hipótese → impacto plausível → ação → validação → decisão. Cada achado deve apontar para `evidence_id` e caminho dos dados; prioridade e confiança são separadas; não há score geral. O relatório inclui registro de decisão, plano de validação humana e matriz de rastreabilidade. Consulte [framework de diagnóstico e decisão](framework-diagnostico-decisao.md).

## Contrato de qualidade do relatório

O Gemini deve separar fatos observados, interpretações, hipóteses e itens não verificados; citar URL e evidência específica; não inventar usuários, tarefas, métricas, testes ou falhas; distinguir atributos HTML explícitos de propriedades DOM padrão; tratar sinais automatizados como indícios; reduzir achados quando a evidência for insuficiente; e apresentar perguntas de validação.

## Experimentos anteriores

`ai-backend/` (Hugging Face) e `worker/` (Cloudflare Workers) são protótipos não conectados à interface atual. Não devem ser considerados backend ativo nem publicados sem revisão de segurança, configuração antiabuso e atualização da documentação.
