/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./js/theme.js ***!
  \*********************/
const themesSwitcherCheckbox = document.querySelector(`#theme-checkbox`),
  header = document.querySelector(`.header`),
  main = document.querySelector(`.main`),
  footer = document.querySelector(`.footer`),
  themeImage = document.querySelector(`#theme-image`),
  telegramImage = document.querySelector(`#telegram-image`),
  linkedinImage = document.querySelector(`#linkedin-image`),
  githubImage = document.querySelector(`#github-image`),
  currentPath = window.location.pathname;
if (localStorage.getItem('theme') === 'dark') {
  themesSwitcherCheckbox.checked = true;
} else if (localStorage.getItem('theme') === 'light') {
  themesSwitcherCheckbox.checked = false;
}
if (themesSwitcherCheckbox.checked) {
  header.classList.toggle('primary-style');
  main.classList.toggle('secondary-style');
  footer.classList.toggle('primary-style');
  if (currentPath.includes('/html/')) {
    themeImage.src = '../icons/header/theme-dark.svg';
    telegramImage.src = '../icons/footer/telegram-dark.svg';
    linkedinImage.src = '../icons/footer/linkedin-dark.svg';
    githubImage.src = '../icons/footer/github-dark.svg';
  } else {
    themeImage.src = './icons/header/theme-dark.svg';
    telegramImage.src = './icons/footer/telegram-dark.svg';
    linkedinImage.src = './icons/footer/linkedin-dark.svg';
    githubImage.src = './icons/footer/github-dark.svg';
  }
} else {
  header.classList.toggle('primary-style-light');
  main.classList.toggle('secondary-style-light');
  footer.classList.toggle('primary-style-light');
  if (currentPath.includes('/html/')) {
    themeImage.src = '../icons/header/theme-light.svg';
    telegramImage.src = '../icons/footer/telegram-light.svg';
    linkedinImage.src = '../icons/footer/linkedin-light.svg';
    githubImage.src = '../icons/footer/github-light.svg';
  } else {
    themeImage.src = './icons/header/theme-light.svg';
    telegramImage.src = './icons/footer/telegram-light.svg';
    linkedinImage.src = './icons/footer/linkedin-light.svg';
    githubImage.src = './icons/footer/github-light.svg';
  }
}
themesSwitcherCheckbox.addEventListener('change', function () {
  header.classList.toggle('primary-style');
  main.classList.toggle('secondary-style');
  footer.classList.toggle('primary-style');
  header.classList.toggle('primary-style-light');
  main.classList.toggle('secondary-style-light');
  footer.classList.toggle('primary-style-light');
  if (themesSwitcherCheckbox.checked) {
    localStorage.theme = 'dark';
    if (currentPath.includes('/html/')) {
      themeImage.src = '../icons/header/theme-dark.svg';
      telegramImage.src = '../icons/footer/telegram-dark.svg';
      linkedinImage.src = '../icons/footer/linkedin-dark.svg';
      githubImage.src = '../icons/footer/github-dark.svg';
    } else {
      themeImage.src = './icons/header/theme-dark.svg';
      telegramImage.src = './icons/footer/telegram-dark.svg';
      linkedinImage.src = './icons/footer/linkedin-dark.svg';
      githubImage.src = './icons/footer/github-dark.svg';
    }
  } else {
    localStorage.theme = 'light';
    if (currentPath.includes('/html/')) {
      themeImage.src = '../icons/header/theme-light.svg';
      telegramImage.src = '../icons/footer/telegram-light.svg';
      linkedinImage.src = '../icons/footer/linkedin-light.svg';
      githubImage.src = '../icons/footer/github-light.svg';
    } else {
      themeImage.src = './icons/header/theme-light.svg';
      telegramImage.src = './icons/footer/telegram-light.svg';
      linkedinImage.src = './icons/footer/linkedin-light.svg';
      githubImage.src = './icons/footer/github-light.svg';
    }
  }
});
/******/ })()
;
//# sourceMappingURL=bundle_theme.js.map