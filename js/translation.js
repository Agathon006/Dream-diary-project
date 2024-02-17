import i18next from 'i18next';

i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
        ru: {
            translation: {
                header: {
                },
                registered_header: {
                },
                footer: {
                },
                home: {
                },
                make_record: {
                },
                moon: {
                },
                music: {
                },
                register: {
                },
                registered_home: {
                },
                sign_in: {
                },
                time: {
                },
                user: {
                },
                view_record: {
                },
            }
        }
    }
});

if (localStorage.getItem('language') === 'ru') {
    document.querySelector('.language-container').children[0].classList.toggle('underlined');
    document.querySelector('.language-container').children[2].classList.toggle('underlined');
}

document.querySelector('.language-container').addEventListener('click', (event) => {
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
    console.log(i18next.t('greeting.hi'));
});
