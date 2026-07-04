// ============================================
// OWOEYE GLORY — PORTFOLIO SCRIPTS
// ============================================

// --- Mobile nav toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const tabs = document.querySelector('.tabs');
  if (toggle && tabs) {
    toggle.addEventListener('click', () => {
      tabs.classList.toggle('open');
      const isOpen = tabs.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    // Close menu when a tab link is chosen
    tabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => tabs.classList.remove('open'));
    });
  }

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // --- Hero typing effect ---
  const typedEl = document.getElementById('typed-line');
  if (typedEl) {
    const fullText = typedEl.getAttribute('data-text') || '';
    typedEl.textContent = '';
    let i = 0;
    const speed = 38;
    function type() {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    }
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      typedEl.textContent = fullText;
    } else {
      type();
    }
  }

  // --- Contact form: builds a mailto link with the message ---
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = '// please fill in every field';
        status.style.color = '#FFA657';
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailto = `mailto:owoeyeglory68@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailto;
      status.textContent = '// opening your email app...';
      status.style.color = '#7EE787';
      form.reset();
    });
  }

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});