

export function initGalleryTabs() {
   const buttons = document.querySelectorAll('.gallery__tabs-btn');
   const tabsContent = document.querySelectorAll('.gallery__tabs-images');
   const tabsContentArray = Array.from(tabsContent);

   let offset = 0; // текущее смещение track
   let speed = 0.6; // скорость движения

   // 1. Главная функция, которая двигает активный track
   function moveActiveTrack() {
      const activeTab = tabsContentArray.find(tab => tab.classList.contains('active'));
      if (!activeTab) return;

      const track = activeTab.querySelector('.gallery__tabs-track');
      const slideWidth = track.querySelector('.gallery__tabs-slide').offsetWidth;

      offset += speed;
      track.style.transform = 'translateX(-' + offset + 'px)';

      if (offset >= slideWidth) {
         const firstSlide = track.querySelector('.gallery__tabs-slide');
         track.appendChild(firstSlide);
         offset -= slideWidth;
      }

      requestAnimationFrame(moveActiveTrack); // запускаем снова
   }

   moveActiveTrack(); // старт движения сразу

   // 2. Логика табов
   buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
         const currentBtnData = this.dataset.tab;

         // кнопки
         buttons.forEach(b => b.classList.remove('active'));

         this.classList.add('active');

         // контент
         tabsContent.forEach(content => content.classList.remove('active'));
         const newActive = document.querySelector('.gallery__tabs-images[data-tab="' + currentBtnData + '"]');
         newActive.classList.add('active');

         // Сбрасываем смещение для нового track
         offset = 0;
      });
   });
}