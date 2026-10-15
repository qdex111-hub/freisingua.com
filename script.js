const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

// 1. Управление мобильной шторкой (кнопка ☰)
if (toggle && menu) {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Изолируем клик по гамбургеру
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  
  // При клике на обычные ссылки внутри шторки — закрываем её
  menu.querySelectorAll("> a").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("open"));
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

/* =========================================================================
   УМНОЕ ЗАКРЫТИЕ ВСЕХ МЕНЮ (И МОБИЛЬНОЙ ШТОРКИ ☰, И ВЫПАДАЮЩИХ ДОКУМЕНТОВ)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  // Открытие/закрытие выпадающих подменю по клику на их кнопки
  dropdownButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();

      const dropdown = button.closest(".dropdown");

      document.querySelectorAll(".dropdown").forEach(function (item) {
        if (item !== dropdown) {
          item.classList.remove("open");
        }
      });

      dropdown.classList.toggle("open");
    });
  });

  // ГЛОБАЛЬНЫЙ КЛИК: Закрывает всё, если кликнули мимо активных элементов
  window.addEventListener("click", function (event) {
    const target = event.target;

    // 1. Проверяем клик для выпадающего меню документов
    if (!target.closest('.dropdown-btn') && !target.closest('.submenu')) {
      document.querySelectorAll(".dropdown").forEach(function (item) {
        item.classList.remove("open");
      });
    }

    // 2. Проверяем клик для всей мобильной шторки ☰
    // Если шторка открыта, и клик пришёлся НЕ на кнопку ☰, НЕ на кнопку подменю и НЕ на саму ссылку
    if (menu && menu.classList.contains("open")) {
      if (!target.closest('.menu-toggle') && (!target.closest('.menu') || target === menu || target.classList.contains('menu-item'))) {
        menu.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        
        // Попутно закрываем и открытые внутри документы
        document.querySelectorAll(".dropdown").forEach(function (item) {
          item.classList.remove("open");
        });
      }
    }
  });

  // Закрываем всё при клике на ссылки внутри выпадающего подменю
  document.querySelectorAll(".submenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu) menu.classList.remove("open");
      const dropdown = link.closest(".dropdown");
      if (dropdown) dropdown.classList.remove("open");
    });
  });
});

// ========================================================
// КОД ДЛЯ КНОПКИ УСТАНОВКИ НА РАБОЧИЙ СТОЛ (PWA)
// ========================================================
let deferredPrompt;
const installButton = document.getElementById('install-btn') || document.querySelector('.install-btn'); 

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  deferredPrompt = e;  
  
  if (installButton) {
    installButton.removeAttribute('disabled');
    installButton.style.opacity = '1';
  }
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); 
      const { outcome } = await deferredPrompt.userChoice; 
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null; 
    } else {
      alert('Автоматическая установка заблокирована вашим браузером. Чтобы установить сайт, нажмите на меню браузера (три точки) и выберите пункт "Добавить на главный экран".');
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Сайт успешно добавлен на рабочий стол');
  if (installButton) {
    installButton.style.display = 'none';
  }
  deferredPrompt = null;
});

