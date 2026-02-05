
export function initModalCost() {
   const modalCost = document.querySelector('.modal-cost');
   const costItems = document.querySelector('.cost__items');
   const modalWindow = document.querySelector('.modal-cost__content');
   const modalImg = modalWindow.querySelector('.modal-cost__image');
   const overlay = document.querySelector('.overlay');
   const modalClose = document.querySelector('.modal-cost__btn-close');

   costItems.addEventListener('click', function (e) {
      const currentItem = e.target.closest('.cost__item-image');
      if (!currentItem) return;
      const currentSrc = currentItem.dataset.src;
      modalImg.src = currentSrc;

      modalCost.classList.add('is-open');
      overlay.classList.add('active');
      document.body.classList.add('body--no-scroll');
   });
   modalClose.addEventListener('click', function () {
      modalCost.classList.remove('is-open');
      overlay.classList.remove('active');
      document.body.classList.remove('body--no-scroll');
   });
   overlay.addEventListener('click', function () {
      modalCost.classList.remove('is-open');
      overlay.classList.remove('active');
      document.body.classList.remove('body--no-scroll');
   });
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
         modalCost.classList.remove('is-open');
         overlay.classList.remove('active');
         document.body.classList.remove('body--no-scroll');
      }
   })
}