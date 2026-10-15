const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

// 1. Управление мобильной шторкой (кнопка ☰)
if (toggle && menu) {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Изолируем клик по гамбургеру
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

/* =========================================================================
   АБСОЛЮТНОЕ ЗАКРЫТИЕ ПРИ КЛИКЕ В ЛЮБОМ МЕСТЕ ЭкРАНА
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  // Открытие/закрытие выпадающих документов
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

  // САМЫЙ ГЛАВНЫЙ СЛУШАТЕЛК КЛИКА НА ВСЁМ ОКНЕ
  window.addEventListener("click", function (event) {
    const target = event.target;

    // Если кликнули МИМО кнопки "Документы" и МИМО самого выпадающего списка документов
    if (!target.closest('.dropdown-btn') && !target.closest('.submenu')) {
      document.querySelectorAll(".dropdown").forEach(function (item) {
        item.classList.remove("open");
      });
    }

    // Если мобильная шторка открыта
    if (menu && menu.classList.contains("open")) {
      // И клик пришёлся НЕ на гамбургер ☰ и НЕ на ссылку (т.е. на любое пустое место сайта или шторки)
      if (!target.closest('.menu-toggle') && !target.closest('a') && !target.closest('.dropdown-btn')) {
        menu.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        
        // До кучи закрываем и подменю документов
        document.querySelectorAll(".dropdown").forEach(function (item) {
          item.classList.remove("open");
        });
      }
    }
  });

  // Закрываем вообще всё меню при клике на ЛЮБУЮ ссылку (и в шторке, и в подменю)
  document.querySelectorAll(".menu a, .submenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      
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
      alert('Автоматическая установка заблокирована вашим браузером. Чтобы установить сайт, нажмите на меню браузера (три точки) и выведите пункт "Добавить на главный экран".');
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

