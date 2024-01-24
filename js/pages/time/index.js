'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const hourContainer = document.querySelector('#hour-container'),
        minuteContainer = document.querySelector('#minute-container'),
        secondContainer = document.querySelector('#second-container'),
        subtitle = document.querySelector('#subtitle');

    timeChange();
    setInterval(timeChange, 1000);

    function timeChange() {
        let currentDate = new Date();

        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        secondContainer.style.transform = `rotate(${6 * seconds}deg)`;
        minuteContainer.style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        hourContainer.style.transform = `rotate(${30 * hours + 0.5 * minutes}deg)`;

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
    };
});