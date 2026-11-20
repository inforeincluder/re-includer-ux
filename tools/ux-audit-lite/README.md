# Diagnóstico de produto — Re-Includer UX

Interface pública para iniciar uma inspeção preliminar de páginas públicas.

## Fluxo real

1. Informe uma URL HTTP/HTTPS pública.
2. A interface tenta copiar a URL e abre o workflow do GitHub Actions.
3. No GitHub, toque em **Run workflow**, cole a URL em `page_url` e confirme.
4. Consulte o relatório em **Summary** na execução concluída.

A interface não inicia o workflow automaticamente e não apresenta o relatório dentro da página. Essa etapa manual é uma limitação conhecida da arquitetura atual.

## Limites

O crawler percorre links descobertos no mesmo host, até 20 páginas, profundidade 2 e 500 requisições. Não autentica, não clica em controles, não envia formulários e não acessa áreas privadas. A coleta não garante cobertura completa do site.

A URL e os dados públicos coletados são processados pelo GitHub Actions e enviados à API do Gemini. Não use dados pessoais, credenciais, conteúdo confidencial ou páginas privadas.

O relatório é apoio preliminar à avaliação de profissionais, não substitui pesquisa com usuários, avaliação contextual, auditoria WCAG ou análise de negócio.
