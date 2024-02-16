/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./js/clear_cash.js ***!
  \**************************/
const keyToKeep = 'theme';
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key !== keyToKeep) {
    localStorage.removeItem(key);
  }
}
/******/ })()
;
//# sourceMappingURL=bundle_clear_cash.js.map