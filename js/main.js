/* AutoClean Joinville — comportamento da página (sem dependências) */
(function () {
  'use strict';

  var WA_NUMBER = '5547992676589';

  /* ---------------------------------------------------------- cabeçalho */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------------- menu mobile */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------------------------------------------------------- abas de serviços */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tablist [role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panels [role="tabpanel"]'));

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) {
      p.hidden = p.id !== tab.getAttribute('aria-controls');
    });
    if (focus) tab.focus();
    // mantém a aba ativa visível na faixa rolável do celular
    if (tab.scrollIntoView && window.matchMedia('(max-width: 899px)').matches) {
      var list = tab.parentElement;
      list.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
    }
  }

  if (tabs.length) {
    selectTab(tabs[0], false);
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        var vertical = window.matchMedia('(min-width: 900px)').matches;
        var fwd = vertical ? 'ArrowDown' : 'ArrowRight';
        var back = vertical ? 'ArrowUp' : 'ArrowLeft';
        if (e.key === fwd || e.key === 'ArrowRight' && !vertical) next = tabs[(i + 1) % tabs.length];
        else if (e.key === back || e.key === 'ArrowLeft' && !vertical) next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); selectTab(next, true); }
      });
    });
  }

  /* ---------------------------------------------------------- lightbox */
  var dialog = document.getElementById('lightbox');
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  var supportsDialog = dialog && typeof dialog.showModal === 'function';

  if (supportsDialog && links.length) {
    var img = document.getElementById('lb-img');
    var cap = document.getElementById('lb-cap');
    var current = 0;
    var opener = null;

    function show(i) {
      current = (i + links.length) % links.length;
      var a = links[current];
      var thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      cap.textContent = a.getAttribute('data-caption') || '';
    }
    function open(i, trigger) {
      opener = trigger;
      show(i);
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.querySelector('.lb-close').focus();
    }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i, a); });
    });
    dialog.querySelector('.lb-close').addEventListener('click', function () { dialog.close(); });
    dialog.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    dialog.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    dialog.addEventListener('click', function (e) {
      // clique fora da foto e dos botões fecha
      if (e.target === dialog || e.target.classList.contains('lb-fig')) dialog.close();
    });
    dialog.addEventListener('close', function () {
      document.body.style.overflow = '';
      if (opener) opener.focus();
    });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });
    // deslizar para trocar de foto
    var startX = null;
    dialog.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    dialog.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 60) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------------------------------------------------------- formulário → WhatsApp */
  var form = document.getElementById('quote-form');
  if (form) {
    var err = document.getElementById('form-error');
    var fNome = document.getElementById('f-nome');
    var fServico = document.getElementById('f-servico');
    var fPorte = document.getElementById('f-porte');

    [fNome, fPorte].forEach(function (el) {
      el.addEventListener('input', function () { el.removeAttribute('aria-invalid'); });
      el.addEventListener('change', function () { el.removeAttribute('aria-invalid'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = fNome.value.trim();
      var porte = fPorte.value;
      var missing = [];
      if (!nome) { fNome.setAttribute('aria-invalid', 'true'); missing.push('seu nome'); }
      if (!porte) { fPorte.setAttribute('aria-invalid', 'true'); missing.push('o porte do veículo'); }
      if (missing.length) {
        err.textContent = 'Informe ' + missing.join(' e ') + ' para enviar.';
        err.hidden = false;
        (nome ? fPorte : fNome).focus();
        return;
      }
      err.hidden = true;

      var servico = fServico.value;
      var msg = 'Olá! Gostaria de um orçamento' + (servico ? ' do serviço: ' + servico : '') + '.';
      msg += ' Veículo: ' + porte + '.';
      msg += ' Meu nome é ' + nome + '.';

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
      var w = window.open(url, '_blank');
      if (w) { w.opener = null; }
      else { window.location.href = url; } // pop-up bloqueado: abre na mesma aba
    });
  }
})();
