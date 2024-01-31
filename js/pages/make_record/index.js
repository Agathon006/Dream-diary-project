'use strict';

import Model from './model.js'
import View from './view.js'
import Controller from './controller.js'

window.addEventListener('DOMContentLoaded', () => {
    new Controller(new View(), new Model()).init();
});