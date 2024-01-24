'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const hourContainer = document.querySelector('#hour-container-current'),
        minuteContainer = document.querySelector('#minute-container-current'),
        secondContainer = document.querySelector('#second-container-current'),
        subtitle = document.querySelector('#subtitle-current'),

        hourContainerNewYork = document.querySelector('#hour-container-new-york'),
        minuteContainerNewYork = document.querySelector('#minute-container-new-york'),
        secondContainerNewYork = document.querySelector('#second-container-new-york'),
        subtitleNewYork = document.querySelector('#subtitle-new-york'),

        hourContainerLondon = document.querySelector('#hour-container-london'),
        minuteContainerLondon = document.querySelector('#minute-container-london'),
        secondContainerLondon = document.querySelector('#second-container-london'),
        subtitleLondon = document.querySelector('#subtitle-london'),

        hourContainerTokyo = document.querySelector('#hour-container-tokyo'),
        minuteContainerTokyo = document.querySelector('#minute-container-tokyo'),
        secondContainerTokyo = document.querySelector('#second-container-tokyo'),
        subtitleTokyo = document.querySelector('#subtitle-tokyo'),

        hourContainerBerlin = document.querySelector('#hour-container-berlin'),
        minuteContainerBerlin = document.querySelector('#minute-container-berlin'),
        secondContainerBerlin = document.querySelector('#second-container-berlin'),
        subtitleBerlin = document.querySelector('#subtitle-berlin'),

        hourContainerChina = document.querySelector('#hour-container-china'),
        minuteContainerChina = document.querySelector('#minute-container-china'),
        secondContainerChina = document.querySelector('#second-container-china'),
        subtitleChina = document.querySelector('#subtitle-china'),

        hourContainerSydney = document.querySelector('#hour-container-sydney'),
        minuteContainerSydney = document.querySelector('#minute-container-sydney'),
        secondContainerSydney = document.querySelector('#second-container-sydney'),
        subtitleSydney = document.querySelector('#subtitle-sydney'),

        hourContainerCalifornia = document.querySelector('#hour-container-california'),
        minuteContainerCalifornia = document.querySelector('#minute-container-california'),
        secondContainerCalifornia = document.querySelector('#second-container-california'),
        subtitleCalifornia = document.querySelector('#subtitle-california'),
        
        hourContainerIndia = document.querySelector('#hour-container-india'),
        minuteContainerIndia = document.querySelector('#minute-container-india'),
        secondContainerIndia = document.querySelector('#second-container-india'),
        subtitleIndia = document.querySelector('#subtitle-india');

    timeChange();
    setInterval(timeChange, 1000);

    function timeChange() {
        const currentDate = new Date();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        secondContainer.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainer.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainer.style.transform = `rotate(${30 * hours + 0.5 * minutes}deg)`;

        secondContainerNewYork.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerNewYork.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerNewYork.style.transform = `rotate(${30 * hours + 0.5 * minutes - 240}deg)`;

        secondContainerLondon.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerLondon.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerLondon.style.transform = `rotate(${30 * hours + 0.5 * minutes - 90}deg)`;

        secondContainerTokyo.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerTokyo.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerTokyo.style.transform = `rotate(${30 * hours + 0.5 * minutes - 180}deg)`;

        secondContainerBerlin.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerBerlin.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerBerlin.style.transform = `rotate(${30 * hours + 0.5 * minutes - 60}deg)`;

        secondContainerChina.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerChina.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerChina.style.transform = `rotate(${30 * hours + 0.5 * minutes - 210}deg)`;

        secondContainerSydney.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerSydney.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerSydney.style.transform = `rotate(${30 * hours + 0.5 * minutes - 120}deg)`;

        secondContainerCalifornia.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerCalifornia.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainerCalifornia.style.transform = `rotate(${30 * hours + 0.5 * minutes - 330}deg)`;

        secondContainerIndia.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainerIndia.style.transform = `rotate(${6 * minutes + 0.1 * seconds + 180}deg)`;
        hourContainerIndia.style.transform = `rotate(${30 * hours + 0.5 * minutes - 285}deg)`;

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


});