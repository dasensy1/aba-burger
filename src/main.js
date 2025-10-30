// Основной JS: меню, аккордеон, простой слайдер, слайдшоу и отправка формы

// --- Fullscreen menu ---
const menuToggle = document.getElementById('menuToggle');
const fullMenu = document.getElementById('fullMenu');
const menuClose = document.getElementById('menuClose');

function openMenu() {
  fullMenu.classList.add('is-active');
  fullMenu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  fullMenu.classList.remove('is-active');
  fullMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  if (fullMenu.classList.contains('is-active')) closeMenu();
  else openMenu();
});
menuClose?.addEventListener('click', closeMenu);

// Закрытие по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && fullMenu.classList.contains('is-active')) closeMenu();
});

// --- Accordion (измеряем высоту скрытого блока) ---
document.querySelectorAll('.js-accordion').forEach((accordion) => {
  accordion.addEventListener('click', (e) => {
    const head = e.target.closest('.accordion__head');
    if (!head) return;
    const item = head.closest('.accordion__item');
    const wrap = item.querySelector('.accordion__wrap');

    const isActive = head.classList.contains('is-active');

    // закрыть все
    accordion.querySelectorAll('.accordion__head').forEach(h => h.classList.remove('is-active'));
    accordion.querySelectorAll('.accordion__wrap').forEach(w => w.style.height = '0');

    if (!isActive) {
      head.classList.add('is-active');
      const inner = wrap.querySelector('.accordion__content');
      // измеряем высоту содержимого
      const height = inner.getBoundingClientRect().height;
      wrap.style.height = height + 'px';
    }
  });
});

// --- Простой слайдер (фолбэк vanilla JS) ---
(function simpleSlider() {
  const slider = document.querySelector('.js-slider');
  if (!slider) return;
  const slides = Array.from(slider.children);
  let current = 0;

  function show(i) {
    slides.forEach((s, idx) => {
      s.style.display = idx === i ? 'block' : 'none';
    });
  }
  show(current);

  document.querySelector('.slider-prev')?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  });
  document.querySelector('.slider-next')?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    show(current);
  });

  // Если вы хотите подключить библиотеку (slick, bxSlider, owlCarousel),
  // подключите её скрипты/стили и инициализируйте здесь, например для slick (jQuery):
  // $(document).ready(function(){ $('.js-slider').slick({ dots: true, arrows: true }); });
})();

// --- Slideshow (аватары <-> контент) ---
(function slideshow() {
  const avatars = document.querySelectorAll('.js-slideshow-avatars .avatar');
  const contents = document.querySelectorAll('.js-slideshow-content .content-item');
  if (!avatars.length || !contents.length) return;

  function activate(index) {
    avatars.forEach(a => a.classList.toggle('active', Number(a.dataset.index) === index));
    contents.forEach((c, i) => c.classList.toggle('active', i === index));
  }

  avatars.forEach(a => {
    a.addEventListener('click', () => {
      const idx = Number(a.dataset.index);
      activate(idx);
    });
  });

  // default
  activate(0);
})();

// --- Order form (fetch -> JSON) ---
(function orderForm() {
  const form = document.getElementById('orderForm');
  const result = document.getElementById('orderResult');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.textContent = '';

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const comment = form.comment.value.trim();
    const to = form.to.value.trim();

    if (!name || !phone || !to) {
      result.textContent = 'Пожалуйста, заполните обязательные поля: имя, телефон и email.';
      return;
    }

    const payload = { name, phone, comment, to };

    try {
      const res = await fetch('https://webdev-api.loftschool.com/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.status === 'ok' || json.status === 'success') {
        result.textContent = json.message || 'Заявка успешно отправлена (сервер в режиме эмуляции).';
        form.reset();
      } else {
        result.textContent = json.message || JSON.stringify(json);
      }
    } catch (err) {
      result.textContent = 'Ошибка отправки: ' + err.message;
    }
  });
})();
