
import { FormGroup } from "./class-formgroup.js";

export class ValidateForm {

    constructor(settings) {
        let setup = {};

        // ### did we get an object with values? ###
        if (typeof (settings) != "object") {
            console.warn("ValidateForm: missing param object!");
            return;
        }

        if (settings.parentNode) {
            setup.parentNode = settings.parentNode;
            this.parentNode = settings.parentNode;
        }


        // ### occurrence provided? ###
        if (settings.occurrence) {
            this.occ = settings.occurrence;
            setup.occurrence = settings.occurrence;
        }

        if (settings.validate)
            setup.validate = settings.validate;

        if (settings.translateIn)
            setup.translateIn = settings.translateIn;

        // ### make a new formGroup ###
        this.formGroup = new FormGroup(setup);
    }
    /**
     * runs a validation 
     *
     * @param {HTMLElement} pControl
     * @returns
     * @memberof ValidateForm
     */
    validate(pControl) {
        /*

        switch (pControl.name) {

            // ### place each field here ###            
            case "pon":
                console.log(pControl.obj);

                this.occ.set("Boxtyp", pControl.obj.boxType);

                break;

        }
        */
    }
    /**
     * shortcut to the FormGroup feature
     * @param {any} ?inNumbers - optional out param
     * @returns boolean
     */
    controlsValid(inNumbers) {
        return this.formGroup.controlsValid(inNumbers);
    }
}