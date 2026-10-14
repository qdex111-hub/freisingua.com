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

```
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
```

});

// Клик в любом месте страницы закрывает подменю
document.addEventListener("click", function () {



});

});
