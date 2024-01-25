export default class Controller {
    constructor(view) {
        this.view = view;
        this._updateClocks = this._updateClocks.bind(this);
    }

    init() {
        this._updateClocks();
        setInterval(this._updateClocks, 1000);
    }

    _updateClocks() {

        const subtitle = this.view.getSubtitle('CURRENT'),
            subtitleNewYork = this.view.getSubtitle('NEW_YORK'),
            subtitleLondon = this.view.getSubtitle('LONDON'),
            subtitleTokyo = this.view.getSubtitle('TOKYO'),
            subtitleBerlin = this.view.getSubtitle('BERLIN'),
            subtitleChina = this.view.getSubtitle('CHINA'),
            subtitleSydney = this.view.getSubtitle('SYDNEY'),
            subtitleCalifornia = this.view.getSubtitle('CALIFORNIA'),
            subtitleIndia = this.view.getSubtitle('INDIA');

        const currentDate = new Date();

        const hours = currentDate.getHours(),
            minutes = currentDate.getMinutes(),
            seconds = currentDate.getSeconds();

        this.view.transformCurrentClock(hours, minutes, seconds);
        this.view.transformNewYorkClock(hours, minutes, seconds);
        this.view.transformLondonClock(hours, minutes, seconds);
        this.view.transformTokyoClock(hours, minutes, seconds);
        this.view.transformBerlinClock(hours, minutes, seconds);
        this.view.transformChinaClock(hours, minutes, seconds);
        this.view.transformSydneyClock(hours, minutes, seconds);
        this.view.transformCaliforniaClock(hours, minutes, seconds);
        this.view.transformIndiaClock(hours, minutes, seconds);

        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        const formattedDate = currentDate.toLocaleString('en-US', options);

        subtitle.textContent = formattedDate;

        currentDate.setHours(currentDate.getHours() - 8);
        const formattedDateNewYork = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-5");
        subtitleNewYork.textContent = formattedDateNewYork;

        currentDate.setHours(currentDate.getHours() + 5);
        const formattedDateLondon = currentDate.toLocaleString('en-US', options).slice(0, -2).concat(" -");
        subtitleLondon.textContent = formattedDateLondon;

        currentDate.setHours(currentDate.getHours() + 9);
        const formattedDateTokyo = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+9");
        subtitleTokyo.textContent = formattedDateTokyo;

        currentDate.setHours(currentDate.getHours() - 8);
        const formattedDateBerlin = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+1");
        subtitleBerlin.textContent = formattedDateBerlin;

        currentDate.setHours(currentDate.getHours() + 7);
        const formattedDateChina = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+8");
        subtitleChina.textContent = formattedDateChina;

        currentDate.setHours(currentDate.getHours() + 3);
        const formattedDateSydney = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+11");
        subtitleSydney.textContent = formattedDateSydney;

        currentDate.setHours(currentDate.getHours() + 5);
        const formattedDateCalifornia = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-8");
        subtitleCalifornia.textContent = formattedDateCalifornia;

        currentDate.setHours(currentDate.getHours() - 11);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
        const formattedDateIndia = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+5:30");
        subtitleIndia.textContent = formattedDateIndia;
    };

}