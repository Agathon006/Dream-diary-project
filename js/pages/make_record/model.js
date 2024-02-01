export default class Model {

    isTitleOkay(title) {
        if (title) {
            return true;
        } else {
            return false;
        }
    }

    isPlotOkay(plot) {
        if (plot.length > 9) {
            return true;
        } else {
            return false;
        }
    }

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