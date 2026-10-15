// 1. РЕГИСТРАЦИЯ SERVICE WORKER
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

// Проверяем, нашел ли вообще скрипт кнопку на странице
if (installButton) {
  console.log("Кнопка успешно найдена в HTML!");

  // Браузер подтвердил, что сайт готов стать приложением
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.opacity = '1';
    installButton.style.background = '#0057b7'; // Меняем цвет на синий, когда кнопка готова
  });

  // Отслеживаем клик (Этот блок теперь сработает ВСЕГДА)
  installButton.addEventListener('click', async () => {
    console.log("Клик по кнопке зафиксирован");

    if (deferredPrompt) {
      deferredPrompt.prompt(); // Показываем меню Android
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null;
    } else {
      // ЕСЛИ БРАУЗЕР ЕЩЕ НЕ ПОДТВЕРДИЛ PWA ИЛИ ОПЕРА БЛОКИРУЕТ ЕГО:
      alert('Установка: Нажмите на меню браузера (три точки в углу) и выберите пункт "Добавить на главный экран" / "Установить приложение".');
    }
  });
} else {
  console.error("Ошибка: Скрипт не смог найти кнопку с id='install-btn' в HTML-коде!");
}

window.addEventListener('appinstalled', () => {
  if (installButton) installButton.style.display = 'none';
  deferredPrompt = null;
});
