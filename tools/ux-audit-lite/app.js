const form=document.getElementById("diagnostic-form");
const input=document.getElementById("page-url");
const status=document.getElementById("status");
const next=document.getElementById("next-step");
const workflowUrl="https://github.com/inforeincluder/re-includer-ux/actions/workflows/gemini-ux.yml";
const submit=form.querySelector('button[type="submit"]');
submit.disabled=false;
submit.textContent="Preparar diagnóstico";

input.addEventListener("input",()=>{input.setCustomValidity("");input.removeAttribute("aria-invalid");});

form.addEventListener("submit",async event=>{
  event.preventDefault();
  let url;
  try{
    url=new URL(input.value.trim());
    if(!["http:","https:"].includes(url.protocol)||!url.hostname||url.username||url.password)throw new Error("URL inválida");
  }catch{
    input.setCustomValidity("Informe uma URL pública válida, iniciada por http:// ou https://, sem usuário ou senha.");
    input.setAttribute("aria-invalid","true");
    input.reportValidity();
    return;
  }

  input.setCustomValidity("");
  next.hidden=false;
  status.textContent="Abrindo o GitHub Actions e copiando a URL…";
  form.setAttribute("aria-busy","true");

  // Abrir durante o gesto do usuário reduz bloqueios de popup em navegadores móveis.
  window.open(workflowUrl,"_blank","noopener,noreferrer");
  next.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});

  try{
    await navigator.clipboard.writeText(url.href);
    status.textContent="URL copiada. No GitHub Actions, toque em Run workflow, cole no campo page_url e execute.";
  }catch{
    status.textContent="A cópia automática foi bloqueada. Copie a URL do campo acima e cole no campo page_url do GitHub Actions.";
    input.focus();
    input.select();
  }finally{
    form.removeAttribute("aria-busy");
  }
});
