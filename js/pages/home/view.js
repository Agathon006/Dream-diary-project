import i18next from 'i18next';

export default class View {

    static ID = {
        REASONS_SECTIONS: {
            BUTTON: 'reasons-sections-button',
        },
        DO_NOT_HAVE_DREAM_SECTIONS: {
            BUTTON: 'do-not-have-dreams-sections-button',
        },
    }

    static CLASSES = {
        DO_NOT_HAVE_DREAMS_BLOCK: 'do-not-have-dreams-block',
    }

    getReasonsSectionsButtonElement() {
        return document.querySelector(`#${View.ID.REASONS_SECTIONS.BUTTON}`);
    }

    getDoNotHaveDreamsBlockElement() {
        return document.querySelector(`.${View.CLASSES.DO_NOT_HAVE_DREAMS_BLOCK}`);
    }

    getDoNotHaveDreamSectionsButtonElement() {
        return document.querySelector(`#${View.ID.DO_NOT_HAVE_DREAM_SECTIONS.BUTTON}`);
    }

    translatePage() {
        fetch('./dictionary.json')
            .then(response => response.json())
            .then(data => {
                i18next.init({
                    lng: 'ru',
                    debug: false,
                    resources: {
                        ru: {
                            translation: data
                        }
                    }
                });

                document.querySelector(`#header-link-home`).textContent = i18next.t('header.home');
                document.querySelector(`#header-link-time`).textContent = i18next.t('header.time');
                document.querySelector(`#header-link-moon`).textContent = i18next.t('header.moon');
                document.querySelector(`#header-link-music`).textContent = i18next.t('header.music');
                document.querySelector(`#header-link-register`).textContent = i18next.t('header.register');
                document.querySelector(`#header-link-sign-in`).textContent = i18next.t('header.sign_in');

                document.querySelector(`#main-title`).textContent = i18next.t('home.main_title');
                document.querySelector(`#main-subtitle`).textContent = i18next.t('home.main_subtitle');

                document.querySelector(`#reasons-block-title`).textContent = i18next.t('home.reasons_block_title');
                document.querySelector(`#reasons-block-subtitle`).textContent = i18next.t('home.reasons_block_subtitle');
                document.querySelector(`#reasons-block-fisrt-plot-title`).textContent = i18next.t('home.reasons_block_first_plot_title');
                document.querySelector(`#reasons-block-fisrt-plot`).textContent = i18next.t('home.reasons_block_fisrt_plot');
                document.querySelector(`#reasons-block-second-plot-title`).textContent = i18next.t('home.reasons_block_second_plot_title');
                document.querySelector(`#reasons-block-second-plot`).textContent = i18next.t('home.reasons_block_second_plot');
                document.querySelector(`#reasons-block-third-plot-title`).textContent = i18next.t('home.reasons_block_third_plot_title');
                document.querySelector(`#reasons-block-third-plot`).textContent = i18next.t('home.reasons_block_third_plot');
                document.querySelector(`#reasons-sections-button`).textContent = i18next.t('home.reasons_sections_button');

                document.querySelector(`#do-not-have-dreams-block-title`).textContent = i18next.t('home.do_not_have_dreams_block_title');
                document.querySelector(`#do-not-have-dreams-block-subtitle`).textContent = i18next.t('home.do_not_have_dreams_block_subtitle');
                document.querySelector(`#do-not-have-dreams-block-first-section-title`).textContent = i18next.t('home.do_not_have_dreams_block_first_section_title');
                document.querySelector(`#do-not-have-dreams-block-first-section-plot`).textContent = i18next.t('home.do_not_have_dreams_block_first_section_plot');
                document.querySelector(`#do-not-have-dreams-block-second-section-title`).textContent = i18next.t('home.do_not_have_dreams_block_second_section_title');
                document.querySelector(`#do-not-have-dreams-block-second-section-plot`).textContent = i18next.t('home.do_not_have_dreams_block_second_section_plot');
                document.querySelector(`#do-not-have-dreams-block-third-section-title`).textContent = i18next.t('home.do_not_have_dreams_block_third_section_title');
                document.querySelector(`#do-not-have-dreams-block-third-section-plot`).textContent = i18next.t('home.do_not_have_dreams_block_third_section_plot');
                document.querySelector(`#do-not-have-dreams-block-fourth-section-title`).textContent = i18next.t('home.do_not_have_dreams_block_fourth_section_title');
                document.querySelector(`#do-not-have-dreams-block-fourth-section-plot`).textContent = i18next.t('home.do_not_have_dreams_block_fourth_section_plot');
                document.querySelector(`#do-not-have-dreams-sections-button`).textContent = i18next.t('home.do_not_have_dreams_sections_button');
                
                document.querySelector(`#start-using-block-title`).textContent = i18next.t('home.start_using_block_title');
                document.querySelector(`#start-using-block-subtitle`).textContent = i18next.t('home.start_using_block_subtitle');
                document.querySelector(`#start-using-block-link`).textContent = i18next.t('home.start_using_block_link');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}