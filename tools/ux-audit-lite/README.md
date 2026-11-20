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


## Testes automáticos com dados sintéticos

O workflow **Validate Re-Includer UX** executa testes sem depender de um site real ou de dados fornecidos por usuários:

- valida canonicalização de URLs e preservação de parâmetros funcionais;
- confirma o bloqueio de endereços privados fora do modo de teste;
- inicia um site local descartável com páginas, links externos, rota de logout, formulário e controles sintéticos;
- verifica descoberta limitada de páginas, bloqueio de rotas sensíveis e links externos;
- verifica a coleta de rótulos, campos obrigatórios, estados ARIA e regiões dinâmicas;
- confirma que valores digitados em campos de formulário não entram no arquivo de evidências.

A exceção de loopback é habilitada exclusivamente pelo ambiente de teste `REINCLUDER_SYNTHETIC_TEST=1`; o workflow de diagnóstico real não define essa variável. Os testes não enviam formulários nem clicam em controles.

**Limite:** testes sintéticos validam o comportamento do coletor em cenários controlados. Não comprovam a qualidade das interpretações do Gemini, a cobertura de qualquer site real nem eliminam o risco de DNS rebinding/SSRF do ambiente de execução.
