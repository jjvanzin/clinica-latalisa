/*! Bicho Bom · © 2026 Upward Academy · UPW-BICHOBOM-P2W7 · licença __UPW_LICENCA__ · revenda e redistribuição proibidas (LICENCA.txt) · https://app.upwardacademy.com.br/app/templates */

// ===== Dados do negócio: troque aqui =====
const NEGOCIO = {
  whatsapp: '5531981049102', // só números, com DDI e DDD
  mensagemPadrao: 'Olá! Vim pelo site da Clínica Latalisa.',
};

// Autoria (não remover)
window.__UPW__ = Object.freeze({ template: 'UPW-BICHOBOM-P2W7', licenca: '__UPW_LICENCA__', autor: 'Upward Academy', site: 'https://app.upwardacademy.com.br/app/templates' });
console.info('%cClínica Latalisa · baseado em template criado por Upward Academy · UPW-BICHOBOM-P2W7', 'color:#ff6b4a');

document.documentElement.classList.add('js');

const linkZap = (msg) => `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg || NEGOCIO.mensagemPadrao)}`;

// Links de WhatsApp: <a data-whatsapp="mensagem">
document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  a.href = linkZap(a.dataset.whatsapp);
  a.target = '_blank';
  a.rel = 'noopener';
});

// Topo: fundo ao rolar e menu do celular
const topo = document.getElementById('topo');
const abrir = document.getElementById('abrir');
const aoRolar = () => topo.classList.toggle('is-rolou', window.scrollY > 20);
aoRolar();
window.addEventListener('scroll', aoRolar, { passive: true });
abrir?.addEventListener('click', () => {
  const aberto = topo.classList.toggle('is-aberto');
  abrir.setAttribute('aria-expanded', String(aberto));
});
document.querySelectorAll('#menu a').forEach((a) => a.addEventListener('click', () => {
  topo.classList.remove('is-aberto');
  abrir?.setAttribute('aria-expanded', 'false');
}));

// Pacotes: troca o preço conforme o porte escolhido
const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-porte]').forEach((botao) => {
  botao.addEventListener('click', () => {
    const porte = botao.dataset.porte;
    document.querySelectorAll('[data-porte]').forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
    document.querySelectorAll('.pacote__preco b').forEach((b) => {
      b.textContent = b.dataset[porte];
      if (reduzir) return;
      b.classList.remove('preco-troca');
      void b.offsetWidth;
      b.classList.add('preco-troca');
    });
  });
});

// Agendamento: monta a mensagem e abre o WhatsApp
document.getElementById('pedido')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const pet = f.pet.value.trim() || 'meu pet';
  const primeira = f.primeira.checked ? ' É a primeira vez na clínica.' : '';
  const msg = `Olá! Quero agendar: ${f.motivo.value.toLowerCase()} para ${pet} (${f.especie.value.toLowerCase()}), de preferência no período da ${f.periodo.value.toLowerCase()}.${primeira}`;
  window.open(linkZap(msg), '_blank', 'noopener');
});

// Revelar ao rolar
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((itens) => {
    itens.forEach((it) => {
      if (!it.isIntersecting) return;
      it.target.classList.add('is-visivel');
      io.unobserve(it.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  document.querySelectorAll('.revela').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
    io.observe(el);
  });
} else {
  document.querySelectorAll('.revela').forEach((el) => el.classList.add('is-visivel'));
}

document.getElementById('ano').textContent = new Date().getFullYear();
