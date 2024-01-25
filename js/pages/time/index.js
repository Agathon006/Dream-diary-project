'use strict';

import View from './view.js'
import Controller from './controller.js'

window.addEventListener('DOMContentLoaded', () => {
    new Controller(new View()).init();
});