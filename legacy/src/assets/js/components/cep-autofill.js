/**
 * CEP Autofill — preenche país/estado/cidade/endereço a partir do CEP via ViaCEP.
 *
 * Markup esperado dentro de um mesmo container (drawer, form, etc.):
 *   <input data-cep-autofill ...>           ← origem (CEP)
 *   <input data-cep-fill="logradouro" ...>  ← destino: rua/endereço
 *   <input data-cep-fill="localidade" ...>  ← destino: cidade
 *   <input data-cep-fill="uf"         ...>  ← destino: estado (UF)
 *   <select data-cep-fill="pais"     ...>   ← destino: país (forçado para "Brasil")
 *
 * Comportamento:
 *   - Aplica máscara 00000-000 enquanto o usuário digita.
 *   - Ao completar 8 dígitos (ou no blur), faz fetch em viacep.com.br.
 *   - Se sucesso, preenche os destinos no mesmo container ancestral comum.
 *   - Não sobrescreve campos já editados manualmente pelo usuário (a menos que estejam vazios).
 */

const VIACEP_BASE = 'https://viacep.com.br/ws/';

function maskCep(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

function findContainer(input) {
  return (
    input.closest('[role="dialog"]') ||
    input.closest('form') ||
    input.closest('[data-component]') ||
    document
  );
}

function fillTarget(target, value) {
  if (!target) return;
  // Não sobrescreve se o usuário já preencheu algo diferente
  if (target.value && target.value !== value) return;
  target.value = value;
  target.dispatchEvent(new Event('input',  { bubbles: true }));
  target.dispatchEvent(new Event('change', { bubbles: true }));
}

async function lookup(input) {
  const cep = input.value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  if (input.dataset.cepLast === cep) return; // evita refetch idêntico
  input.dataset.cepLast = cep;

  try {
    const res = await fetch(`${VIACEP_BASE}${cep}/json/`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.erro) {
      if (typeof window.showToast === 'function') {
        window.showToast('warning', 'CEP não encontrado.', { duration: 3000 });
      }
      return;
    }

    const root = findContainer(input);
    fillTarget(root.querySelector('[data-cep-fill="pais"]'),       'Brasil');
    fillTarget(root.querySelector('[data-cep-fill="uf"]'),         data.uf || '');
    fillTarget(root.querySelector('[data-cep-fill="localidade"]'), data.localidade || '');
    fillTarget(root.querySelector('[data-cep-fill="logradouro"]'), data.logradouro || '');
  } catch (_) {
    // silencioso — sem internet, sem autofill
  }
}

export function init() {
  document.addEventListener('input', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (!input.matches('[data-cep-autofill]')) return;

    const masked = maskCep(input.value);
    if (masked !== input.value) {
      const start = input.selectionStart;
      input.value = masked;
      // Reposiciona o cursor próximo do fim quando muda o tamanho
      try { input.setSelectionRange(start, start); } catch (_) {}
    }

    if (input.value.replace(/\D/g, '').length === 8) {
      lookup(input);
    }
  });

  document.addEventListener('blur', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (!input.matches('[data-cep-autofill]')) return;
    lookup(input);
  }, true);
}
