// ### definition of the valid tags for eventHandler in class ###
// let validTags = ['INPUT', 'SELECT', 'TEXTAREA'];

export class FormGroup {

    // ### some private members ###
    #parentNode = null;
    #occ = null;
    #translateIn = null;
    #translateOut = null;
    #validate = null;
    #whenDone = null;
    #debug = false;

    /**
     * Unified event handler for all tags listed in `validTags` array
     *
     * @param {event} event
     * @return {*} 
     * @memberof FormGroup
     */

    #eventHandler(event) {
        let target = event.target;

        if (this.#debug)
            console.log(target.name + ": " + target.value);

        // ### do we have a translator for INCOMING values? ###
        if (this.#translateIn instanceof Function) {
            target.value = this.#translateIn.apply(target, [target.value]);
        }

        // ### call for validation ###
        if (this.#validate instanceof Function) {
            this.#validate(target);
        }
        // ### do we have a translator for OUTGOING values? ###
        if (this.#translateOut instanceof Function) {
            target.value = this.#translateOut.apply(target, [target.value]);
        }

        // ### apply changes to occurrence ###
        if ((target.type === "checkbox") && (!target.checked)) {
            this.#occ.set(target.name, null);
        } else {
            this.#occ.set(target.name, target.value);
        }

        // ### refresh controls ###
        this.refreshControls();

        // ### callback after we're done ###
        if (this.#whenDone instanceof Function) {
            this.#whenDone();
        }
    }

    constructor(settings) {

        // ### did we get an object with values? ###
        if (typeof (settings) == "object") {

            if (settings.parentNode)
                this.#parentNode = settings.parentNode;

            // ### occurrence provided? ###
            //if (settings.occurrence instanceof Occurrence)
            this.#occ = settings.occurrence;

            if (settings.translateIn instanceof Function) {
                this.#translateIn = settings.translateIn;
            }

            if (settings.translateOut instanceof Function) {
                this.#translateOut = settings.translateOut;
            }

            if (settings.validate instanceof Function) {
                this.#validate = settings.validate;
            }

            if (settings.whenDone instanceof Function) {
                this.#whenDone = settings.whenDone;
            }

            if (settings.debug instanceof Boolean) {
                this.#debug = (settings.debug === true);
            }

        }

        // ### update controls to occurrence value ###
        this.refreshControls();

        // ### assign eventhandler to #parentNode ###
        this.#parentNode.addEventListener("input", this.#eventHandler.bind(this));
    }

    /**
    * sets the occ
    *
    * @memberof FormGroup
    */
    set occ(occurrence = {}) {
        this.#occ = occurrence;
    }
    get occ() {
        return (this.#occ);
    }

    refreshControls() {
        let controls = this.#parentNode.querySelectorAll("input, select, textarea");

        controls.forEach(element => {
            if (this.#occ.data.hasOwnProperty(element.name)) {
                if ((element.type !== "checkbox") && (element.type !== "radio"))
                    element.value = this.#occ.data[element.name];
            }
        });
    }

    /**
     * checks if the controls are "invalid". If so, they'll be reported on in the form
     * @param {boolean} inNumbers - should the total "invalid" be reported instead of a boolean
     * @returns Boolean|Number
     */
    controlsValid(inNumbers) {
        let invalidControls = 0,
            isValid = true,
            controls = this.#parentNode.querySelectorAll("input, select, textarea");

        for (const control of controls) {

            if (!control.checkValidity()) {
                isValid = false;

                if (inNumbers == "true") {
                    invalidControls++;
                } else {
                    return isValid;
                }

            }
        }

        if (inNumbers == "true")
            return (invalidControls);

        return (isValid);
    }
}
