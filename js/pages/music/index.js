'use strict';

/**
 * music page index module.
 * @module js/pages/music/index
 */

import View from './view.js'
import Controller from './controller.js'

window.addEventListener('DOMContentLoaded', () => {
    new Controller(new View()).init();
});