/**
 * make_record page model module.
 * @module js/pages/make_record/model
 */
export default class Model {

    /**
    Checks if the title is okay.
    @param {string} title - The title to be checked.
    @returns {boolean} - True if the title is okay, false otherwise. */
    isTitleOkay(title) {
        if (title) {
            return true;
        } else {
            return false;
        }
    }

    /**
    Checks if the plot is okay.
    @param {string} plot - The plot to be checked.
    @returns {boolean} - True if the plot length is greater than 9 characters, false otherwise. */
    isPlotOkay(plot) {
        if (plot.length > 9) {
            return true;
        } else {
            return false;
        }
    }

    /**
    Registers a new record by making a POST request to the specified URL.
    @param {Object} data - The data to be sent in the request body.
    @returns {Promise<Response>} - The Promise that resolves to the response of the POST request. */
    registerNewRecord(data) {
        return fetch(`http://localhost:3000/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
    }

}