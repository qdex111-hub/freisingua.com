// АКТИВАЦИЯ СЛУЖЕБНОГО ФАЙЛА (SERVICE WORKER)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker успешно зарегистрирован!', reg))
      .catch(err => console.log('Ошибка SW:', err));
  });
}

// ЛОГИКА КНОПКИ УСТАНОВКИ НА ТЕЛЕФОН
let deferredPrompt;
const installButton = document.getElementById('install-btn'); 

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Запрещаем браузеру показывать свое окно раньше времени
  deferredPrompt = e;  // Сохраняем событие установки
  if (installButton) {
    installButton.removeAttribute('disabled');
    installButton.style.opacity = '1';
  }
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Показываем системное окно установки на экран смартфона
      const { outcome } = await deferredPrompt.userChoice; 
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null; 
    } else {
      // Сообщение-подстраховка для Opera, Safari и режима инкогнито
      alert('Автоматическая установка заблокирована вашим браузером. Чтобы установить сайт, нажмите на меню браузера (три точки) и выберите пункт "Добавить на главный экран".');
    }
  });
}

window.addEventListener('appinstalled', () => {
  if (installButton) installButton.style.display = 'none';
  deferredPrompt = null;
});
