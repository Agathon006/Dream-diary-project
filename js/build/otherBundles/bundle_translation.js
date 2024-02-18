/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./js/translation.js ***!
  \***************************/
if (localStorage.getItem('language') === 'ru') {
  document.querySelector('.language-container').children[0].classList.toggle('underlined');
  document.querySelector('.language-container').children[2].classList.toggle('underlined');
}
document.querySelector('.language-container').addEventListener('click', event => {
  if (event.target.innerText === 'en' && !event.target.classList.contains('underlined')) {
    event.target.parentNode.children[0].classList.toggle('underlined');
    event.target.parentNode.children[2].classList.toggle('underlined');
    localStorage.setItem('language', 'en');
    window.location.reload();
  }
  ;
  if (event.target.innerText === 'ru' && !event.target.classList.contains('underlined')) {
    event.target.parentNode.children[0].classList.toggle('underlined');
    event.target.parentNode.children[2].classList.toggle('underlined');
    localStorage.setItem('language', 'ru');
    window.location.reload();
  }
  ;
});
/******/ })()
;
//# sourceMappingURL=bundle_translation.js.map