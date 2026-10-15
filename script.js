const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".menu");
if(toggle&&menu){
  toggle.addEventListener("click",()=>{
    const open=menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded",open);
  });
  menu.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click",()=>menu.classList.remove("open"));
  });
}
document.querySelectorAll("#year").forEach(el=>el.textContent=new Date().getFullYear());

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');
  const galleryLinks = document.querySelectorAll('.gallery-link');

  // Проверяем, есть ли вообще галерея и модалка на этой странице
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

  // БЕЗОПАСНО: Проверяем, существует ли кнопка-крестик на странице
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // БЕЗОПАСНО: Проверяем фон модалки перед кликом
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {

const dropdownButtons =
document.querySelectorAll(".dropdown-btn");

dropdownButtons.forEach(function (button) {

button.addEventListener("click", function (event) {

  event.stopPropagation();

  const dropdown =
    button.closest(".dropdown");

  // Закрываем другие подменю
  document.querySelectorAll(".dropdown").forEach(function (item) {

    if (item !== dropdown) {
      item.classList.remove("open");
    }

  });

  // Открываем / закрываем текущее
  dropdown.classList.toggle("open");

});

});

// Клик в любом месте страницы закрывает подменю
document.addEventListener("click", function () {



});

});


// ========================================================
// КОД ДЛЯ КНОПКИ УСТАНОВКИ НА РАБОЧИЙ СТОЛ (PWA)
// ========================================================
let deferredPrompt;

// Ищем вашу кнопку. Скрипт попытается найти её по id="install-btn" или по классу .install-btn
const installButton = document.getElementById('install-btn') || document.querySelector('.install-btn'); 

// 1. Ловим событие готовности браузера к установке приложения
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Запрещаем браузеру показывать свое окно раньше времени
  deferredPrompt = e;  // Сохраняем событие
  
  // Если кнопка найдена, делаем её активной/видимой
  if (installButton) {
    installButton.removeAttribute('disabled');
    installButton.style.opacity = '1';
  }
});

// 2. Обрабатываем нажатие на кнопку на мобильном телефоне
if (installButton) {
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Показываем системное окно установки
      const { outcome } = await deferredPrompt.userChoice; // Ждем выбора пользователя
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null; // Очищаем переменную, так как событие одноразовое
    } else {
      // Сообщение-подстраховка для Opera, Safari и режима инкогнито
      alert('Автоматическая установка заблокирована вашим браузером. Чтобы установить сайт, нажмите на меню браузера (три точки) и выберите пункт "Добавить на главный экран".');
    }
  });
}

// 3. Если приложение успешно установилось — скрываем кнопку
window.addEventListener('appinstalled', () => {
  console.log('Сайт успешно добавлен на рабочий стол');
  if (installButton) {
    installButton.style.display = 'none';
  }
  deferredPrompt = null;
});
