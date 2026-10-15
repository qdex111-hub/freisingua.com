// 1. АКТИВАЦИЯ SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker зарегистрирован!', reg))
      .catch(err => console.log('Ошибка SW:', err));
  });
}

// 2. УЛУЧШЕННАЯ ЛОГИКА ДЛЯ КНОПКИ УСТАНОВКИ
let deferredPrompt;
const installButton = document.getElementById('install-btn');
const hintBox = document.getElementById('opera-safari-hint'); // Наш новый блок для текста

if (installButton) {
  // Браузер (Chrome) подтвердил, что сайт готов стать приложением
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.opacity = '1';
    installButton.style.background = '#0057b7'; 
  });

  // Обработка клика по кнопке
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Скрываем подсказку, если она была открыта до этого
      if (hintBox) hintBox.style.display = 'none';

      deferredPrompt.prompt(); // Показываем системное меню Chrome
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null;
    } else {
      // ЕСЛИ ЭТО OPERA ИЛИ SAFARI (автоматическое окно заблокировано браузером)
      if (hintBox) {
        // Плавно выводим красивый текст прямо на странице вместо грубого alert
        hintBox.innerHTML = 'ℹ️ <strong>Инструкция для Opera и Safari:</strong> чтобы установить сайт, нажмите на <strong>меню браузера (три точки или значок "поделиться" в углу)</strong> и выберите пункт <strong>"Добавить на главный экран"</strong> или <strong>"Установить приложение"</strong>.';
        hintBox.style.display = 'block';
      }
    }
  });
}

// Скрываем кнопку и подсказку, если приложение уже успешно установлено
window.addEventListener('appinstalled', () => {
  if (installButton) installButton.style.display = 'none';
  if (hintBox) hintBox.style.display = 'none';
  deferredPrompt = null;
});
