/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./js/theme.js ***!
  \*********************/
const themesSwitcherCheckboxes = document.querySelectorAll(`.theme-checkbox`),
  header = document.querySelector(`.header`),
  main = document.querySelector(`.main`),
  footer = document.querySelector(`.footer`),
  themeImage = document.querySelector(`#theme-image`),
  telegramImage = document.querySelector(`#telegram-image`),
  linkedinImage = document.querySelector(`#linkedin-image`),
  githubImage = document.querySelector(`#github-image`),
  burgerIconElements = document.querySelectorAll('.burger-menu__button-element'),
  currentPath = window.location.pathname;
if (localStorage.getItem('theme') === 'dark') {
  themesSwitcherCheckboxes.forEach(item => {
    item.checked = true;
  });
  burgerIconElements.forEach(item => {
    item.style.backgroundColor = '#9f9f9f';
  });
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
} else if (localStorage.getItem('theme') === 'light') {
  themesSwitcherCheckboxes.forEach(item => {
    item.checked = false;
  });
  burgerIconElements.forEach(item => {
    item.style.backgroundColor = 'black';
  });
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
} else {
  themesSwitcherCheckboxes.forEach(item => {
    item.checked = true;
  });
  burgerIconElements.forEach(item => {
    item.style.backgroundColor = '#9f9f9f';
  });
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
}
themesSwitcherCheckboxes.forEach((item, index) => {
  item.addEventListener('change', function () {
    header.classList.toggle('primary-style');
    main.classList.toggle('secondary-style');
    footer.classList.toggle('primary-style');
    header.classList.toggle('primary-style-light');
    main.classList.toggle('secondary-style-light');
    footer.classList.toggle('primary-style-light');
    if (themesSwitcherCheckboxes[0].checked && index === 0 || themesSwitcherCheckboxes[1].checked && index === 1) {
      localStorage.theme = 'dark';
      burgerIconElements.forEach(item => {
        item.style.backgroundColor = '#9f9f9f';
      });
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
      burgerIconElements.forEach(item => {
        item.style.backgroundColor = 'black';
      });
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
});
/******/ })()
;
//# sourceMappingURL=bundle_theme.js.map