const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

// 1. Управление мобильной шторкой (кнопка ☰)
if (toggle && menu) {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

// Код для фотогалереи и модального окна
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');
  const galleryLinks = document.querySelectorAll('.gallery-link');

  if (galleryLinks.length > 0 && modal && modalImg) {
    galleryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const imageSrc = link.getAttribute('href');
        modalImg.setAttribute('src', imageSrc);
        modal.classList.add('active');
      });
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

// Открытие/закрытие выпадающих документов и клики по экрану
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      const dropdown = button.closest(".dropdown");
      document.querySelectorAll(".dropdown").forEach(function (item) {
        if (item !== dropdown) item.classList.remove("open");
      });
      dropdown.classList.toggle("open");
    });
  });

  window.addEventListener("click", function (event) {
    const target = event.target;
    if (!target.closest('.dropdown-btn') && !target.closest('.submenu')) {
      document.querySelectorAll(".dropdown").forEach(function (item) {
        item.classList.remove("open");
      });
    }
    if (menu && menu.classList.contains("open")) {
      if (!target.closest('.menu-toggle') && !target.closest('a') && !target.closest('.dropdown-btn')) {
        menu.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        document.querySelectorAll(".dropdown").forEach(function (item) {
          item.classList.remove("open");
        });
      }
    }
  });

  window.addEventListener("scroll", function () {
    document.querySelectorAll(".dropdown").forEach(function (item) {
      if (item.classList.contains("open")) item.classList.remove("open");
    });
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  }, { passive: true });

  document.querySelectorAll(".menu a, .submenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      const dropdown = link.closest(".dropdown");
      if (dropdown) dropdown.classList.remove("open");
    });
  });
});

// КНОПКА PWA БЕЗ ДУБЛИРОВАНИЯ ОБЪЯВЛЕНИЯ ПЕРЕМЕННОЙ
const installButton = document.getElementById('install-btn') || document.querySelector('.install-btn'); 

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  window.deferredPrompt = e;  
  if (installButton) {
    installButton.removeAttribute('disabled');
    installButton.style.opacity = '1';
  }
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt(); 
      const { outcome } = await window.deferredPrompt.userChoice; 
      console.log(`Пользователь выбрал: ${outcome}`);
      window.deferredPrompt = null; 
    } else {
      alert('Автоматическая установка заблокирована вашим браузером. Чтобы установить сайт, нажмите на меню браузера (три точки) и выведите пункт "Добавить на главный экран".');
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Сайт успешно добавлен на рабочий стол');
  if (installButton) installButton.style.display = 'none';
  window.deferredPrompt = null;
});

