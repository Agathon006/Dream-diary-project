import i18next from 'i18next';

export default class View {

    static ID = {
        HOUR_CONTAINERS: {
            CURRENT: 'hour-container-current',
            NEW_YORK: 'hour-container-new-york',
            LONDON: 'hour-container-london',
            TOKYO: 'hour-container-tokyo',
            BERLIN: 'hour-container-berlin',
            CHINA: 'hour-container-china',
            SYDNEY: 'hour-container-sydney',
            CALIFORNIA: 'hour-container-california',
            INDIA: 'hour-container-india',
        },
        MINUTE_CONTAINERS: {
            CURRENT: 'minute-container-current',
            NEW_YORK: 'minute-container-new-york',
            LONDON: 'minute-container-london',
            TOKYO: 'minute-container-tokyo',
            BERLIN: 'minute-container-berlin',
            CHINA: 'minute-container-china',
            SYDNEY: 'minute-container-sydney',
            CALIFORNIA: 'minute-container-california',
            INDIA: 'minute-container-india',
        },
        SECOND_CONTAINERS: {
            CURRENT: 'second-container-current',
            NEW_YORK: 'second-container-new-york',
            LONDON: 'second-container-london',
            TOKYO: 'second-container-tokyo',
            BERLIN: 'second-container-berlin',
            CHINA: 'second-container-china',
            SYDNEY: 'second-container-sydney',
            CALIFORNIA: 'second-container-california',
            INDIA: 'second-container-india',
        },
        SUBTITLES: {
            CURRENT: 'subtitle-current',
            NEW_YORK: 'subtitle-new-york',
            LONDON: 'subtitle-london',
            TOKYO: 'subtitle-tokyo',
            BERLIN: 'subtitle-berlin',
            CHINA: 'subtitle-china',
            SYDNEY: 'subtitle-sydney',
            CALIFORNIA: 'subtitle-california',
            INDIA: 'subtitle-india',
        },
    }

    getHourContainer(name) {
        return document.querySelector(`#${View.ID.HOUR_CONTAINERS[name]}`);
    }
    getMinuteContainer(name) {
        return document.querySelector(`#${View.ID.MINUTE_CONTAINERS[name]}`);
    }
    getSecondContainer(name) {
        return document.querySelector(`#${View.ID.SECOND_CONTAINERS[name]}`);
    }
    getSubtitle(name) {
        return document.querySelector(`#${View.ID.SUBTITLES[name]}`);
    }

    transformCurrentClock(hours, minutes, seconds) {
        this.getSecondContainer('CURRENT').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CURRENT').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CURRENT').style.transform = `rotate(${30 * hours + 0.5 * minutes}deg)`;
    }

    transformCurrentSubtitle(currentDate, options) {
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CURRENT').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options));
        } else {
            this.getSubtitle('CURRENT').textContent = currentDate.toLocaleString('en-US', options);
        }
    }

    transformNewYorkClock(hours, minutes, seconds) {
        this.getSecondContainer('NEW_YORK').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('NEW_YORK').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('NEW_YORK').style.transform = `rotate(${30 * hours + 0.5 * minutes - 240}deg)`;
    }

    transformNewYorkSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 8);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('NEW_YORK').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("-5");
        } else {
            this.getSubtitle('NEW_YORK').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-5");
        }
    }

    transformLondonClock(hours, minutes, seconds) {
        this.getSecondContainer('LONDON').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('LONDON').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('LONDON').style.transform = `rotate(${30 * hours + 0.5 * minutes - 90}deg)`;
    }

    transformLondonSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 5);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('LONDON').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat(" -");
        } else {
            this.getSubtitle('LONDON').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat(" -");
        }
    }

    transformTokyoClock(hours, minutes, seconds) {
        this.getSecondContainer('TOKYO').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('TOKYO').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('TOKYO').style.transform = `rotate(${30 * hours + 0.5 * minutes - 180}deg)`;
    }

    transformTokyoSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 9);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('TOKYO').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+9");
        } else {
            this.getSubtitle('TOKYO').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+9");
        }
    }

    transformBerlinClock(hours, minutes, seconds) {
        this.getSecondContainer('BERLIN').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('BERLIN').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('BERLIN').style.transform = `rotate(${30 * hours + 0.5 * minutes - 60}deg)`;
    }

    transformBerlinSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 8);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('BERLIN').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+1");
        } else {
            this.getSubtitle('BERLIN').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+1");
        }
    }

    transformChinaClock(hours, minutes, seconds) {
        this.getSecondContainer('CHINA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CHINA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CHINA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 210}deg)`;
    }

    transformChinaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 7);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CHINA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+8");
        } else {
            this.getSubtitle('CHINA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+8");
        }
    }

    transformSydneyClock(hours, minutes, seconds) {
        this.getSecondContainer('SYDNEY').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('SYDNEY').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('SYDNEY').style.transform = `rotate(${30 * hours + 0.5 * minutes - 120}deg)`;
    }

    transformSydneySubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 3);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('SYDNEY').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+11");
        } else {
            this.getSubtitle('SYDNEY').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+11");
        }
    }

    transformCaliforniaClock(hours, minutes, seconds) {
        this.getSecondContainer('CALIFORNIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CALIFORNIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CALIFORNIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 330}deg)`;
    }

    transformCaliforniaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 5);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CALIFORNIA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("-8");
        } else {
            this.getSubtitle('CALIFORNIA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-8");
        }
    }

    transformIndiaClock(hours, minutes, seconds) {
        this.getSecondContainer('INDIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('INDIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds + 180}deg)`;
        this.getHourContainer('INDIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 285}deg)`;
    }

    transformIndiaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 11);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('INDIA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+5:30");
        } else {
            this.getSubtitle('INDIA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+5:30");
        }
    }

    defineRuMonth(date) {
        const month = date.substring(0, 3);
        switch (month) {
            case 'Jan':
                return 'Янв' + date.substring(3);
            case 'Feb':
                return 'Фев' + date.substring(3);
            case 'Mar':
                return 'Мар' + date.substring(3);
            case 'Apr':
                return 'Апр' + date.substring(3);
            case 'May':
                return 'Май' + date.substring(3);
            case 'Jun':
                return 'Июн' + date.substring(3);
            case 'Jul':
                return 'Июл' + date.substring(3);
            case 'Aug':
                return 'Авг' + date.substring(3);
            case 'Sep':
                return 'Сен' + date.substring(3);
            case 'Oct':
                return 'Окт' + date.substring(3);
            case 'Nov':
                return 'Ноя' + date.substring(3);
            case 'Dec':
                return 'Дек' + date.substring(3);
            default:
                return '???';
        }
    }

    translatePage() {
        fetch('../dictionary.json')
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

                document.querySelector(`#header-link-home`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-moon`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-music`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#title`).textContent = i18next.t('time.title');
                document.querySelector(`#new-york-span`).textContent = i18next.t('time.new_york_span');
                document.querySelector(`#london-span`).textContent = i18next.t('time.london_span');
                document.querySelector(`#tokyo-span`).textContent = i18next.t('time.tokyo_span');
                document.querySelector(`#berlin-span`).textContent = i18next.t('time.berlin_span');
                document.querySelector(`#china-span`).textContent = i18next.t('time.china_span');
                document.querySelector(`#sydney-span`).textContent = i18next.t('time.sydney_span');
                document.querySelector(`#california-span`).textContent = i18next.t('time.california_span');
                document.querySelector(`#india-span`).textContent = i18next.t('time.india_span');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }

}