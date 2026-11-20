# Framework de diagnóstico e decisão — Re-Includer UX

## Finalidade

Transformar inspeção automatizada em material de trabalho rastreável para profissionais de UX e produto. A ferramenta não emite vereditos sobre qualidade geral, não substitui pesquisa com usuários e não decide prioridades de negócio sozinha.

## Cadeia de raciocínio

1. **Evidência:** dado observado no DOM, URL, status HTTP, erro de execução ou comportamento de layout capturado.
2. **Fato:** descrição literal do que a coleta mostra, sem inferência.
3. **Interpretação:** significado possível do fato no contexto da experiência.
4. **Hipótese:** explicação causal ou efeito ainda não confirmado.
5. **Impacto plausível:** consequência possível para compreensão, encontrabilidade, acessibilidade, confiança ou conclusão de tarefa. Sem números quando não há dados.
6. **Decisão de trabalho:** corrigir, investigar, experimentar ou monitorar.
7. **Validação:** método humano ou fonte de dados que pode confirmar/refutar a hipótese.
8. **Decisão de produto:** decisão final contextualizada por estratégia, usuários, negócio, tecnologia e risco.

## Classes de achado

- **Defeito observável:** falha diretamente demonstrada pela evidência capturada. Não extrapolar para além da ocorrência.
- **Risco potencial:** condição que pode causar problema, mas cujo efeito depende de contexto ou interação não testada.
- **Oportunidade:** possibilidade de melhorar compreensão, descoberta ou eficiência, ainda sem comprovação de impacto.
- **Lacuna:** informação necessária para decidir, mas ausente da inspeção.

## Prioridade sem falsa precisão

A prioridade é uma recomendação de sequência de investigação, não uma métrica de qualidade.

| Nível | Uso | Regra |
|---|---|---|
| P0 | Urgente | Apenas risco crítico diretamente observável, com impacto material e imediato. |
| P1 | Alta | Obstáculo relevante com evidência forte e consequência plausível clara. |
| P2 | Média | Risco ou oportunidade plausível que merece validação. |
| P3 | Exploratória | Melhoria de baixo risco, evidência fraca ou pergunta de descoberta. |

Não atribuir P0/P1 a hipótese de baixa confiança. Separar sempre prioridade, confiança e severidade. Quando faltarem frequência, público afetado ou dados de negócio, declarar que não podem ser estimados.

## Formato mínimo de cada achado

- ID e classe.
- Prioridade e confiança, justificadas em texto.
- URLs, `evidence_id` e caminho exato dos dados.
- Fato observado.
- Interpretação.
- Hipótese (ou “não formulada”).
- Impacto plausível, sem quantificação inventada.
- Próxima ação: corrigir, investigar, experimentar ou monitorar.
- Método de validação e sinal a observar.
- Responsável humano sugerido (produto, design, engenharia, conteúdo ou dados).

## Registro de decisão

Para cada decisão sugerida, registrar:
- o que pode ser decidido com evidência atual;
- o que depende de validação;
- suposições e dependências;
- risco de agir sem validar;
- função responsável;
- condição para encerrar a investigação.

## Métodos de validação possíveis

A IA pode propor, mas não alegar ter realizado:
- teste de usabilidade com participantes representativos;
- entrevista contextual;
- análise de analytics e funis;
- análise de busca interna e suporte;
- revisão editorial e de arquitetura da informação;
- avaliação manual de acessibilidade com tecnologias assistivas;
- teste técnico de responsividade, performance e segurança;
- revisão de código e comportamento interativo.

Cada método deve responder a uma pergunta específica. Não recomendar “fazer teste” genericamente.

## Limites conhecidos

- Inspeção somente leitura, sem autenticação, cliques ou submissão.
- Até 20 páginas, profundidade máxima 2 e limite de 500 requisições.
- Descoberta por links presentes no DOM; sitemap e rotas não linkadas não são cobertos.
- Recursos de terceiros são bloqueados, inclusive fontes, scripts, imagens e APIs. A página pode renderizar de forma diferente do ambiente normal.
- Estados após interação, conteúdo personalizado, áreas privadas e breakpoints não cobertos podem ficar ausentes.
- Validação de DNS não é isolamento de rede e não elimina risco de DNS rebinding/SSRF. Antes de exposição pública ampla, é necessário egress controlado ou execução isolada com política de rede.
- O conteúdo coletado é enviado à API Gemini e fica sujeito à visibilidade/retention da execução no GitHub.

## Critério de qualidade do relatório

Um relatório bom pode ter poucos achados. Deve ser possível rastrear cada conclusão a uma evidência ou pergunta explícita, compreender a incerteza e executar a próxima validação sem inventar contexto. A ferramenta deve reduzir trabalho de síntese e orientar julgamento profissional, não automatizar o julgamento.
