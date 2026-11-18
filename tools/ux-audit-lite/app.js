const criteria=[
{ id:"value",title:"Proposta de valor",question:"Em poucos segundos, fica claro o que é oferecido e para quem?",tip:"Verifique título principal, subtítulo e benefício central.",priority:"Alta",recommendation:"Reescreva o título para explicar o serviço ou produto, o público e o principal benefício em linguagem concreta."},
{ id:"audience",title:"Linguagem e compreensão",question:"Os textos usam linguagem direta, específica e compreensível para o público?",tip:"Procure jargões, frases longas, ambiguidades e promessas vagas.",priority:"Média",recommendation:"Substitua jargões por termos conhecidos e explique expressões inevitavelmente técnicas."},
{ id:"cta",title:"Chamada para ação",question:"A ação principal que o visitante deve realizar está visível e é específica?",tip:"Exemplos: solicitar orçamento, agendar consulta ou comprar.",priority:"Alta",recommendation:"Destaque uma ação principal com rótulo específico e contraste suficiente; evite botões genéricos como “Saiba mais” quando houver uma ação mais clara."},
{ id:"navigation",title:"Navegação",question:"É fácil entender onde estou e encontrar as informações principais?",tip:"Observe menu, rótulos, organização e caminhos de retorno.",priority:"Alta",recommendation:"Agrupe conteúdos relacionados, use rótulos previsíveis e reduza opções concorrentes no menu."},
{ id:"hierarchy",title:"Hierarquia visual",question:"Títulos, subtítulos e blocos ajudam a localizar rapidamente as informações?",tip:"Percorra a página sem ler cada palavra.",priority:"Média",recommendation:"Organize o conteúdo em seções com títulos descritivos, parágrafos curtos e espaçamento consistente."},
{ id:"trust",title:"Confiança e transparência",question:"A página apresenta informações que ajudam a avaliar a credibilidade da oferta?",tip:"Considere autoria/empresa, contato, condições, preços ou próximos passos.",priority:"Alta",recommendation:"Inclua identificação do responsável, canais de contato e informações claras sobre condições e próximos passos."},
{ id:"mobile",title:"Uso em dispositivos móveis",question:"O conteúdo e as ações principais funcionam bem em uma tela pequena?",tip:"Confira rolagem horizontal, tamanho dos alvos e legibilidade no celular.",priority:"Alta",recommendation:"Revise a versão móvel, elimine rolagem horizontal e garanta alvos de toque confortáveis e textos legíveis."},
{ id:"contrast",title:"Contraste e legibilidade",question:"Texto e elementos importantes são distinguíveis do fundo?",tip:"Não dependa apenas da cor para transmitir informação.",priority:"Alta",recommendation:"Aumente o contraste entre texto e fundo e use também rótulos, ícones ou formas para diferenciar estados."},
{ id:"forms",title:"Formulários",question:"Os formulários pedem apenas o necessário e explicam como corrigir erros?",tip:"Observe rótulos, campos obrigatórios, mensagens e confirmação.",priority:"Média",recommendation:"Reduza campos, associe rótulos aos controles e apresente erros próximos ao campo com orientação de correção."},
{ id:"access",title:"Acessibilidade de conteúdo",question:"Imagens informativas têm alternativa textual e controles têm nomes compreensíveis?",tip:"Verifique textos alternativos, rótulos de botões e links descritivos.",priority:"Alta",recommendation:"Adicione alternativas textuais adequadas a imagens informativas e nomes acessíveis a botões e links."},
{ id:"focus",title:"Operação por teclado",question:"É possível navegar pelos controles principais usando apenas o teclado?",tip:"Use Tab e Shift+Tab e observe o indicador de foco.",priority:"Alta",recommendation:"Garanta ordem de foco lógica, foco visível e operação por teclado para menus, diálogos e controles."},
{ id:"consistency",title:"Consistência",question:"Componentes e padrões semelhantes se comportam da mesma forma ao longo da página?",tip:"Compare botões, links, títulos, mensagens e estados.",priority:"Baixa",recommendation:"Padronize estilos e comportamentos de elementos equivalentes para reduzir esforço de aprendizagem."}
];
const root=document.getElementById("criteria");
root.innerHTML=criteria.map(c=>`<article class="criterion"><h3>${c.title}</h3><p>${c.question} <span class="hint">${c.tip}</span></p><div class="choices" role="radiogroup" aria-label="${c.title}">${[["yes","Atende"],["partial","Parcialmente"],["no","Precisa melhorar"],["na","Não se aplica"]].map(([v,t])=>`<label class="choice"><input type="radio" name="${c.id}" value="${v}" required> ${t}</label>`).join("")}</div><label for="note-${c.id}" class="hint">Evidência ou observação (opcional)</label><input id="note-${c.id}" name="note-${c.id}" maxlength="240" placeholder="O que você observou?"></article>`).join("");
const form=document.getElementById("audit-form");
let reportText="";
form.addEventListener("submit",e=>{
 e.preventDefault();
 const missing=criteria.filter(c=>!form.querySelector(`input[name="${c.id}"]:checked`));
 if(missing.length){missing[0].querySelector("input").focus();return;}
 const name=document.getElementById("page-name").value.trim()||"Página não identificada";
 const url=document.getElementById("page-url").value.trim();
 const context=document.getElementById("context").value.trim();
 const answers=criteria.map(c=>({...c,value:form.querySelector(`input[name="${c.id}"]:checked`).value,note:document.getElementById("note-"+c.id).value.trim()}));
 const applicable=answers.filter(a=>a.value!=="na");
 const points={yes:1,partial:.5,no:0};
 const score=applicable.length?Math.round(applicable.reduce((s,a)=>s+points[a.value],0)/applicable.length*100):0;
 const problems=answers.filter(a=>a.value==="no"||a.value==="partial");
 const positives=answers.filter(a=>a.value==="yes");
 document.getElementById("report-title").textContent="Relatório — "+name;
 document.getElementById("score").textContent=applicable.length?score+"/100":"Sem pontuação";
 document.getElementById("score-note").textContent=applicable.length?`Índice indicativo baseado em ${applicable.length} critérios aplicáveis. Não representa uma nota científica nem mede conversão.`:"Marque ao menos um critério como aplicável para calcular o índice.";
 const sections=[];
 if(context)sections.push(`<p><strong>Objetivo informado:</strong> ${escapeHtml(context)}</p>`);
 if(url)sections.push(`<p><strong>URL:</strong> <a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>`);
 sections.push(`<h3>Oportunidades de melhoria (${problems.length})</h3>`);
 sections.push(problems.length?problems.map(a=>`<article class="finding"><span class="priority">Prioridade ${a.priority} · ${a.value==="no"?"Precisa melhorar":"Parcialmente atendido"}</span><h3>${a.title}</h3><p>${a.recommendation}</p>${a.note?`<p><strong>Sua observação:</strong> ${escapeHtml(a.note)}</p>`:""}</article>`).join(""):"<p>Nenhum item foi marcado como parcial ou precisa melhorar. Isso não comprova ausência de problemas.</p>");
 sections.push(`<h3>Critérios atendidos (${positives.length})</h3>`);
 sections.push(positives.length?positives.map(a=>`<p class="good">✓ ${a.title}${a.note?" — "+escapeHtml(a.note):""}</p>`).join(""):"<p>Nenhum critério foi marcado como atendido.</p>");
 sections.push("<h3>Próximos passos sugeridos</h3><ol><li>Comece pelos itens de prioridade alta.</li><li>Escolha até três mudanças para executar primeiro.</li><li>Depois das mudanças, peça feedback a pessoas que representem o público da página.</li><li>Repita a avaliação e compare as evidências, não apenas a pontuação.</li></ol>");
 document.getElementById("report-content").innerHTML=sections.join("");
 reportText=[`RELATÓRIO UX — ${name}`,url?`URL: ${url}`:"",context?`Objetivo: ${context}`:"",`Índice indicativo: ${score}/100`,"", "OPORTUNIDADES DE MELHORIA",...problems.map(a=>`- [Prioridade ${a.priority}] ${a.title}: ${a.recommendation}${a.note?" Observação: "+a.note:""}`),"","CRITÉRIOS ATENDIDOS",...positives.map(a=>`- ${a.title}${a.note?": "+a.note:""}`),"","Próximos passos: priorize até três melhorias, valide com pessoas do público e reavalie.","","Limitação: avaliação heurística baseada nas respostas fornecidas; não substitui testes com usuários nem auditoria técnica."].filter(Boolean).join("\n");
 const report=document.getElementById("report");report.hidden=false;report.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); 
});
function escapeHtml(s){return s.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function escapeAttr(s){return escapeHtml(s);}
document.getElementById("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(reportText);document.getElementById("copy").textContent="Relatório copiado";}catch{alert("Não foi possível copiar automaticamente. Use Imprimir / salvar PDF.");}});
document.getElementById("print").addEventListener("click",()=>window.print());
document.getElementById("reset").addEventListener("click",()=>{form.reset();document.getElementById("report").hidden=true;window.scrollTo({top:0,behavior:"smooth"});});
