# Re-Includer UX

**Ferramentas de UX, inteligência artificial e produtos digitais.**

O Re-Includer UX desenvolve ferramentas e serviços de experiência do usuário (UX), com apoio de IA e foco em resultados práticos.

## Primeiro produto: UX Audit Lite
Diagnóstico inicial de uma página digital, com achados explicáveis e recomendações priorizadas sobre clareza, navegação, chamadas para ação e acessibilidade básica.

**Limite:** análise heurística não substitui pesquisa com usuários, auditoria formal de acessibilidade ou avaliação técnica completa. Não há promessa de aumento de conversão.

## Consultor UX com Gemini
A primeira integração de IA funciona pelo GitHub Actions: você fornece o nome da página e evidências, o Gemini produz um diagnóstico estruturado e o resultado aparece no resumo da execução.

**Como usar:** abra [Actions](../../actions/workflows/gemini-ux.yml), selecione **Consultor UX com Gemini** e toque em **Run workflow**.

A integração exige o segredo `GEMINI_API_KEY`. Consulte [docs/ia-arquitetura.md](docs/ia-arquitetura.md).

## Estrutura
- `docs/` — estratégia, produto, monetização e arquitetura de IA.
- `tools/ux-audit-lite/` — protótipo da auditoria.
- `ai-backend/` e `worker/` — experimentos anteriores, não usados nesta primeira integração Gemini.
- `research/` — evidências e aprendizados de validação.

## Princípios
- Evidências antes de conclusões.
- IA como apoio, com revisão humana.
- Não inventar observações ou resultados.
- Não solicitar senhas, credenciais ou dados sensíveis.
- Custos controlados e operação mobile-first.
