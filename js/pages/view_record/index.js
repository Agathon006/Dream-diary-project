'use strict';

/**
 * view_record page index module.
 * @module js/pages/view_record/index
 */

import Model from './model.js'
import View from './view.js'
import Controller from './controller.js'

window.addEventListener('DOMContentLoaded', () => {
    new Controller(new View(), new Model()).init();
});