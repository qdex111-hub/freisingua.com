// ========================================================
// 1. АКТИВАЦИЯ SERVICE WORKER (ФОНОВОГО ПРОЦЕССА PWA)
// ========================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker успешно зарегистрирован!', reg))
      .catch(err => console.log('Ошибка регистрации Service Worker:', err));
  });
}

// ========================================================
// 2. ЛОГИКА ДЛЯ КНОПКИ УСТАНОВКИ НА РАБОЧИЙ СТОЛ
// ========================================================
let deferredPrompt;
const installButton = document.getElementById('install-btn');
const hintBox = document.getElementById('opera-safari-hint'); // Блок для текстовой подсказки

if (installButton) {
  // Ловим сигнал от браузера (Chrome), что сайт готов к установке
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Запрещаем браузеру показывать свое окно раньше времени
    deferredPrompt = e;  // Сохраняем системное событие установки
    
    // Делаем кнопку яркой, так как Chrome подтвердил готовность PWA
    installButton.style.opacity = '1';
    installButton.style.background = '#0057b7'; 
  });

  // Обрабатываем нажатие на кнопку на мобильном телефоне
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Если подсказка для Оперы была открыта — скрываем её
      if (hintBox) hintBox.style.display = 'none';

      deferredPrompt.prompt(); // Показываем родное меню установки Android Chrome
      const { outcome } = await deferredPrompt.userChoice; // Ждем выбора пользователя
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null; // Очищаем переменную, так как событие одноразовое
    } else {
      // ЕСЛИ ЭТО OPERA ИЛИ SAFARI (где автоматическое окно заблокировано браузером)
      if (hintBox) {
        // Плавно выводим красивый текст прямо на странице вместо грубого alert
        hintBox.innerHTML = 'ℹ️ <strong>Инструкция для Opera и Safari:</strong> автоматическая установка заблокирована вашим браузером. Чтобы установить сайт на рабочий стол, нажмите на <strong>меню браузера (три точки или значок "поделиться" в углу)</strong> и выберите пункт <strong>"Добавить на главный экран"</strong> или <strong>"Установить приложение"</strong>.';
        hintBox.style.display = 'block';
      }
    }
  });
}

// 3. ЕСЛИ ПРИЛОЖЕНИЕ УЖЕ УСПЕШНО УСТАНОВЛЕНО — ПОЛНОСТЬЮ СКРЫВАЕМ ВСЕ БЛОКИ
window.addEventListener('appinstalled', () => {
  console.log('Сайт успешно добавлен на рабочий стол');
  if (installButton) installButton.style.display = 'none';
  if (hintBox) hintBox.style.display = 'none';
  deferredPrompt = null;
});
