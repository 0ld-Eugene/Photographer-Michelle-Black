export function intiBurger() {
   const burgerBtn = document.querySelector('#burger');
   const burgerMenu = document.querySelector('.header__right');
   const menuList = document.querySelector('.header__items');

   if (!burgerBtn || !burgerMenu || !menuList) return;

   function setAria() {
      const isMobile = window.innerWidth <= 992;
      const isMenuOpen = burgerMenu.classList.contains('is-open');

      if (isMobile) {
         burgerBtn.setAttribute('aria-expanded', isMenuOpen);
         menuList.setAttribute('aria-hidden', !isMenuOpen);
      } else {
         burgerBtn.setAttribute('aria-expanded', 'true');
         menuList.setAttribute('aria-hidden', 'false');
      }
   }

   function toggleMenu() {
      burgerBtn.classList.toggle('active');
      burgerMenu.classList.toggle('is-open');
      document.body.classList.toggle('body--no-scroll');
      setAria();
   }

   function closeMenu() {
      burgerBtn.classList.remove('active');
      burgerMenu.classList.remove('is-open');
      document.body.classList.remove('body--no-scroll');
      setAria();
   }

   burgerBtn.addEventListener('click', toggleMenu);

   document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burgerMenu.classList.contains('is-open')) {
         closeMenu();
      }
   });

   const menuLinks = menuList.querySelectorAll('a');
   menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
         if (window.innerWidth <= 992 && burgerMenu.classList.contains('is-open')) {
            closeMenu();
         }
      });
   });

   window.addEventListener('resize', function () {
      const wasOpen = burgerMenu.classList.contains('is-open');
      const isMobile = window.innerWidth <= 992;

      // Закрываем меню только при переходе с мобилки на десктоп
      if (wasOpen && window.innerWidth > 992) {
         closeMenu();
      }

      setAria();
   });

   // Инициализация
   setAria();
}