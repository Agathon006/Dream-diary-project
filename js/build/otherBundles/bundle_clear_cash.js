/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./js/clear_cash.js ***!
  \**************************/
/**
 * clear cash script.
 * @module js/clear_cash
 */

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key !== 'theme' && key !== 'language') {
    localStorage.removeItem(key);
  }
}
/******/ })()
;
//# sourceMappingURL=bundle_clear_cash.js.map