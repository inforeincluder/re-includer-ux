# Re-Includer UX

Ferramenta experimental de inspeção pública, limitada e não invasiva para apoiar profissionais de UX e produto.

## Produto atual: Diagnóstico de produto

A pessoa informa uma URL pública. O GitHub Actions executa um crawler Playwright que percorre links do mesmo host (até 20 páginas, profundidade máxima 2 e 500 requisições) e envia evidências estruturadas à API do Gemini. O relatório aparece no Summary da execução.

**Fluxo atual:** a pessoa precisa abrir o workflow, tocar em **Run workflow**, colar a URL em `page_url` e confirmar. O site não dispara a análise automaticamente nem exibe o relatório dentro da própria página.

## Limites e segurança

- Somente páginas públicas; não autentica, não clica em controles, não envia formulários, não compra, não altera dados e não acessa áreas privadas.
- A inspeção não é cobertura completa: páginas sem links descobertos, rotas condicionais, estados interativos e conteúdo autenticado podem ficar de fora.
- Requisições de terceiros são bloqueadas, inclusive scripts, fontes, imagens e APIs; a renderização pode diferir do site em uso normal.
- A validação DNS não elimina DNS rebinding/SSRF; é necessária política de egress isolada antes de uso público amplo.
- A URL e os dados públicos coletados são processados no GitHub Actions e enviados à API do Gemini. Execuções e resumos podem ficar visíveis conforme as permissões do repositório.
- Não enviar dados pessoais, credenciais, conteúdo confidencial ou URLs privadas.
- O relatório é uma base de trabalho, não auditoria formal, teste com usuários, certificação WCAG ou substituto da avaliação profissional.

## Configuração

O workflow requer o segredo de repositório `GEMINI_API_KEY`, configurado em **Settings → Secrets and variables → Actions**. A chave não deve aparecer no frontend nem em arquivos versionados.

## Estrutura

- `.github/scripts/inspect_page.py`: crawler e coleta de evidências.
- `.github/workflows/gemini-ux.yml`: execução manual e geração do relatório.
- `tests/test_inspect_page.py`: testes sintéticos de ponta a ponta no Chromium.
- `docs/framework-diagnostico-decisao.md`: padrão de evidência, priorização, validação e registro de decisão.
- `tools/ux-audit-lite/`: interface pública.
- `docs/`: arquitetura, estratégia e decisões.
- `ai-backend/` e `worker/`: experimentos anteriores, não conectados ao fluxo atual.

## Princípios

Evidência antes de conclusão; incerteza explícita; recomendações verificáveis; revisão humana; custos e exposição de dados sob controle.
