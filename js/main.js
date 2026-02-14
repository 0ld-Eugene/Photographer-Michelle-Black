import { initGalleryTabs } from "./features/gallery-tabs.js";
import { initStagesImages } from "./features/hover-images.js";
import { initModalCost } from "./features/modal-cost.js";
import { intiBurger } from "./features/burger.js";


document.addEventListener('DOMContentLoaded', function () {

   initGalleryTabs();
   initStagesImages();
   initModalCost();
   intiBurger();

});

