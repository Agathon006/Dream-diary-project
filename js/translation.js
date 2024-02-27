/**
 * translation script.
 * @module js/translation
 */

if (localStorage.getItem('language') === 'ru') {
    document.querySelectorAll('.language-container').forEach(item => {
        item.children[0].classList.toggle('underlined');
        item.children[2].classList.toggle('underlined');
    });
}

document.querySelectorAll('.language-container').forEach(item => {
    item.addEventListener('click', (event) => {
            if (event.target.innerText === 'en' && !event.target.classList.contains('underlined')) {
                event.target.parentNode.children[0].classList.toggle('underlined');
                event.target.parentNode.children[2].classList.toggle('underlined');
                localStorage.setItem('language', 'en');
                window.location.reload();
            };
            if (event.target.innerText === 'ru' && !event.target.classList.contains('underlined')) {
                event.target.parentNode.children[0].classList.toggle('underlined');
                event.target.parentNode.children[2].classList.toggle('underlined');
                localStorage.setItem('language', 'ru');
                window.location.reload();
            };
        });
});
