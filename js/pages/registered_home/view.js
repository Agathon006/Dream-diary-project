export default class View {

    static ID = {
        MAIN: {
            MAIN_PLOT: 'main-plot',
        },
    }

    // static JS_CLASSES = {
    //     COMMON: {
    //         HIDDEN: 'hidden',
    //     },
    // }

    getMainPlotElement() {
        return document.querySelector(`#${View.ID.MAIN.MAIN_PLOT}`);
    }
}