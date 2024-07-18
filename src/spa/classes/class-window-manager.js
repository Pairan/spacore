import { Trigger } from "./class-trigger.js";

class Window {
    // ### triggers ###
    #trigger;


    constructor(windowName) {
        this.element = document.createElement("window-" + windowName.toLowerCase());
        this.isVisible = false;
        this.#trigger = null;
    }
    /**
     * sets the innerHTML of the element
     * @params {Html} pContext
     * @memberof Window
     */
    set content(pContent) {
        this.element.innerHTML = pContent;
    }
    /**
     * returns the HTML content of the element
     *
     * @memberof Window
     */
    get content() {
        return (this.element.innerHTML);
    }
    /**
     * is the window visible
     * @returns boolean
     * @memberof Window
     */
    get visible() {
        return (this.isVisible);
    }
    /**
     * set the window to be visible or invisible
     * @params {boolean} pVisible
     * @memberof Window
     */
    set visible(pVisible) {
        if (pVisible === this.isVisible)
            return;

        // ### change state ###
        this.isVisible = pVisible;

        // ### notify subscribers ###
        if (this.#trigger) {
            if (pVisible === false) {
                this.#trigger.notify("", "hide");
            } else {
                this.#trigger.notify("", "show");
            }
        }
    }

    /**
     * subscribe to events on the window
     * - hide : callback on window is hidden
     * - show : callback on window is shown
     * 
     * @param {Function} pCallback
     * @param {String} pAction "hide", "show"
     * @param {boolean} pOnlyOnce get a callback only once and then unsubscribe (default FALSE)
     * @returns function - can be called to unsubscribe
     * @memberof Window
     */
    subscribe(pCallback, pAction, pOnlyOnce) {
        if (!this.#trigger) {
            this.#trigger = new Trigger();
        }

        return (this.#trigger.subscribe(pCallback, pAction, pOnlyOnce));
    }
}

export class WindowManager {
    constructor(settings) {

        // ### now with support for parent node ###
        if (settings.hasOwnProperty("parent")) {
            this.parent = settings.parent;

            // ### reset the parent ###
            this.parent.innerHTML = "";
        }

        this.windows = {};
        this.focused = null;
    }

    /**
     * Creates a new window object by the name pWindowname and returns the object
     *
     * @param {String} pWindowName
     * @returns HTMLDivElement
     * @memberof WindowManager
     */
    create(pWindowName) {
        this.windows[pWindowName] = new Window(pWindowName);

        // ### first window becomes focus ###
        if (!this.focused)
            this.focused = pWindowName;
        else {
            this.windows[pWindowName].visible = false;
            this.windows[pWindowName].element.hidden = true;
        }

        return (this.windows[pWindowName].element);
    }

    /**
     * addes a new html window to parent node if defined
     * 
     * @param {string} pWindowName 
     * @returns HTMLDivElement
     * @memberof WindowManager
     */
    append(pWindowName) {
        if (!this.parent) {
            console.log("WindowManager: no parent defined!");
            return;
        }

        // ### we create the new window, ###
        let newWindow = this.create(pWindowName);

        // ### add it to our parent node ###
        this.parent.appendChild(newWindow);

        // ### and return it to the caller ###
        return newWindow;
    }

    /**
     * Switches the desired window into focus and hides the previous
     *
     * @param {String} pWindowName
     * @memberof WindowManager
     */
    show(pWindowName) {
        // ### hide the focused window ###
        if (this.focused) {

            // same window => abort ###
            if (this.focused == pWindowName) {

                // ### notify the window about it ###
                this.windows[this.focused].element.hidden = false;
                return;
            }

            // ### make the window invisible ###
            this.windows[this.focused].element.hidden = true;

            // ### notify the window about it ###
            this.windows[this.focused].visible = false;
        }

        // ### set pWindowName to be the focused one ###
        this.focused = pWindowName;

        // ### show the focused window ###
        //if (this.windows[this.focused]?.element) {
        if (this.windows[this.focused]) {

            this.windows[this.focused].element.hidden = false;

            // ### notify the window about it ###
            this.windows[this.focused].visible = true;
        }
    }
}