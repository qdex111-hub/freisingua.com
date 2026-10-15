const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

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

/* =========================================================
   ОБРАБОТКА КЛИКОВ ДЛЯ ВЫПАДАЮЩЕГО МЕНЮ (DROPDOWN)
   ========================================================= */
/* =========================================================
   ИСПРАВЛЕННАЯ ОБРАБОТКА КЛИКОВ ДЛЯ ВЫПАДАЮЩЕГО МЕНЮ (DROPDOWN)
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Полностью изолируем клик по кнопке
      event.stopPropagation();
      event.preventDefault();

      const dropdown = button.closest(".dropdown");

      // Закрываем все остальные меню
      document.querySelectorAll(".dropdown").forEach(function (item) {
        if (item !== dropdown) {
          item.classList.remove("open");
        }
      });

      // Переключаем текущее меню
      dropdown.classList.toggle("open");
    });
  });

  // ЖЕЛЕЗНОЕ ЗАКРЫТИЕ: Отслеживаем клики на уровне ВСЕГО окна (window)
  window.addEventListener("click", function (event) {
    // Если клик пришелся НЕ на саму кнопку и НЕ на элементы внутри выпадающего списка
    if (!event.target.closest('.dropdown-btn') && !event.target.closest('.submenu')) {
      document.querySelectorAll(".dropdown").forEach(function (item) {
        item.classList.remove("open");
      });
    }
  });

  // Отдельно закрываем выпадающее подменю, если кликнули на ссылку внутри него
  document.querySelectorAll(".submenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      const dropdown = link.closest(".dropdown");
      if (dropdown) {
        dropdown.classList.remove("open");
      }
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
