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

    transformNewYorkClock(hours, minutes, seconds) {
        this.getSecondContainer('NEW_YORK').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('NEW_YORK').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('NEW_YORK').style.transform = `rotate(${30 * hours + 0.5 * minutes - 240}deg)`;
    }

    transformLondonClock(hours, minutes, seconds) {
        this.getSecondContainer('LONDON').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('LONDON').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('LONDON').style.transform = `rotate(${30 * hours + 0.5 * minutes - 90}deg)`;
    }

    transformTokyoClock(hours, minutes, seconds) {
        this.getSecondContainer('TOKYO').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('TOKYO').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('TOKYO').style.transform = `rotate(${30 * hours + 0.5 * minutes - 180}deg)`;
    }

    transformBerlinClock(hours, minutes, seconds) {
        this.getSecondContainer('BERLIN').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('BERLIN').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('BERLIN').style.transform = `rotate(${30 * hours + 0.5 * minutes - 60}deg)`;
    }

    transformChinaClock(hours, minutes, seconds) {
        this.getSecondContainer('CHINA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CHINA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CHINA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 210}deg)`;
    }

    transformSydneyClock(hours, minutes, seconds) {
        this.getSecondContainer('SYDNEY').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('SYDNEY').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('SYDNEY').style.transform = `rotate(${30 * hours + 0.5 * minutes - 120}deg)`;
    }

    transformCaliforniaClock(hours, minutes, seconds) {
        this.getSecondContainer('CALIFORNIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CALIFORNIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CALIFORNIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 330}deg)`;
    }

    transformIndiaClock(hours, minutes, seconds) {
        this.getSecondContainer('INDIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('INDIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds + 180}deg)`;
        this.getHourContainer('INDIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 285}deg)`;
    }

}