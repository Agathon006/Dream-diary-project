'use strict';

/**
 * time page index module.
 * @module js/pages/time/index
 */

import View from './view.js'
import Controller from './controller.js'

window.addEventListener('DOMContentLoaded', () => {
    new Controller(new View()).init();
});