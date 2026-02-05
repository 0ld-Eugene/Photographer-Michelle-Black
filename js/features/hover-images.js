
export function initStagesImages() {

   const stagesItems = document.querySelectorAll('.stages__item');
   const stagesImageItems = document.querySelectorAll('.stages__image-item');


   stagesItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
         const currentData = this.dataset.elem;
         stagesImageItems.forEach(function (img) {
            img.classList.remove('active');
            const currentImgData = img.dataset.elem;
            if (currentData === currentImgData) {
               img.classList.add('active')
            }
         });
      });
      item.addEventListener('mousemove', function (e) {
         let pageX = e.pageX;
         let pageY = e.pageY;
         const activeImage = document.querySelector('.stages__image-item.active');
         activeImage.style.left = pageX + 'px';
         activeImage.style.top = pageY + 'px';
      });
      item.addEventListener('mouseleave', function () {
         const activeImage = document.querySelector('.stages__image-item.active');
         activeImage.classList.remove('active');
      })
   })
}