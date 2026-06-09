/* ═══════════════════════════════════════════════════════════
   NEXA STUDIO — DESIGN DIGITAL PREMIUM
   script.js
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Navbar scroll behavior ─────────────────────────── */
const navbar = document.getElementById('navbar');
const scrollThreshold = 40;

function handleNavbarScroll() {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ── Mobile menu ─────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── Scroll reveal ───────────────────────────────────── */
const revealElements = document.querySelectorAll(
  '.section-header, .sobre-grid, .servico-card, .plano-card, ' +
  '.portfolio-item, .dep-card, .faq-item, .ad-grid, .form-card, ' +
  '.diferencial, .sobre-visual, .sobre-copy'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ── FAQ accordion ───────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    faqItems.forEach(other => {
      const otherBtn = other.querySelector('.faq-question');
      const otherAnswer = other.querySelector('.faq-answer');
      otherBtn.setAttribute('aria-expanded', 'false');
      otherAnswer.style.maxHeight = null;
    });

    // Toggle this
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ── Smooth anchor scroll with offset ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ── WhatsApp form submission ─────────────────────────── */
const form = document.getElementById('orcamentoForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Basic required field validation
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#EF4444';
      field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
      valid = false;
      if (valid === false) field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  if (!valid) {
    showToast('Preencha os campos obrigatórios (*) antes de continuar.', 'error');
    return;
  }

  // Collect form data
  const v = id => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const nome         = v('nome');
  const empresa      = v('empresa');
  const whatsapp     = v('whatsapp');
  const email        = v('email');
  const cidade       = v('cidade');
  const tipoNegocio  = v('tipo_negocio');
  const servico      = v('servico');
  const temSite      = v('tem_site');
  const linkSite     = v('link_site') || 'Não informado';
  const cardapio     = v('cardapio');
  const imagens      = v('imagens');
  const estilo       = v('estilo');
  const cores        = v('cores') || 'Não informado';
  const objetivo     = v('objetivo');
  const orcamento    = v('orcamento_val');
  const prazo        = v('prazo');
  const obs          = v('obs') || 'Nenhuma observação';

  const message =
    `Olá, tenho interesse em criar um projeto com a Nexa Studio.\n\n` +
    `Nome: ${nome}\n` +
    `Empresa: ${empresa}\n` +
    `WhatsApp: ${whatsapp}\n` +
    `E-mail: ${email || 'Não informado'}\n` +
    `Cidade: ${cidade}\n` +
    `Tipo de negócio: ${tipoNegocio}\n` +
    `Serviço desejado: ${servico}\n` +
    `Já possui site? ${temSite}\n` +
    `Link do site: ${linkSite}\n` +
    `Precisa de cardápio digital? ${cardapio}\n` +
    `Precisa de imagens aprimoradas? ${imagens}\n` +
    `Estilo desejado: ${estilo}\n` +
    `Cores preferidas: ${cores}\n` +
    `Objetivo do projeto: ${objetivo}\n` +
    `Orçamento: ${orcamento}\n` +
    `Prazo: ${prazo}\n` +
    `Observações: ${obs}`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/5511986015919?text=${encoded}`;

  window.open(url, '_blank', 'noopener,noreferrer');
});

/* ── Toast notification ──────────────────────────────── */
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = msg;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    right: '28px',
    padding: '14px 20px',
    background: type === 'error' ? '#EF4444' : '#25D366',
    color: '#fff',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.88rem',
    fontWeight: '600',
    zIndex: '9999',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    maxWidth: '320px',
    lineHeight: '1.5',
    transform: 'translateY(12px)',
    opacity: '0',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(12px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ── Input mask for WhatsApp field ───────────────────── */
const wppInput = document.getElementById('whatsapp');
if (wppInput) {
  wppInput.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0,2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    e.target.value = val;
  });
}

/* ── Show/hide link field based on has-site select ────── */
const temSiteSelect = document.getElementById('tem_site');
const linkGroup = document.getElementById('link_site')?.closest('.form-group');

if (temSiteSelect && linkGroup) {
  function toggleLinkField() {
    const hasSite = temSiteSelect.value === 'Sim';
    linkGroup.style.opacity = hasSite ? '1' : '0.4';
    linkGroup.querySelector('input').disabled = !hasSite;
  }
  temSiteSelect.addEventListener('change', toggleLinkField);
  toggleLinkField();
}

/* ── Subtle parallax on hero aurora ─────────────────── */
const auroras = document.querySelectorAll('.aurora');
if (auroras.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    auroras.forEach((a, i) => {
      const strength = (i + 1) * 8;
      a.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  }, { passive: true });
}
