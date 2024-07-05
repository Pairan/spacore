## FormGroup
Observes `input`, `select` and `textarea` tags on changes. The changes are directly transported to a connected [Occurrence](occurrence.md) object. In addition content translators for in- and outgoing values as well as a validation function can be defined. 

### preamble - how it is supposed to work
The `FormGroup` class takes advantage of [setCustomValidity()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity). Depending upon how you set up your validation function the method comes in handy to mark a control as valid or invalid by using `setCustomValidity()`. 
The `FormGroup` has optional callbacks for modifying incoming and outgoing values called `translateIn` and `translateOut`. To make this visually work the pseudo classes `:invalid` needs to be styled for the controls and perhaps the `<form>`

The FormGroup observes the `input` event of the controls.

As for now the easiest way to use `FormGroup`is the [ValidatedForm](validateForm.md) class!


### usage
```javascript
 // ### simple two way binding of occurrence and controls ###
 let formGroupPos = new FormGroup(
    {
    parentNode: myformObject,
    occurrence: myOccurrenceObject,
    translateIn: functionForIncomingValues, // ### optional
    translateOut: functionForOutgoingValues, // ### optional
    validate: functionforValidation, // ### optional
    debug: true // ### optional
    }
 );
```
But the best way to to use the `FormGroup` is currently something like this- simply define a validator class that extends `FormGroup` and overrides the `validate` method:
```javascript
class ValidatedForm extends FormGroup {
    #activeValidations = 0;

    constructor(settings) {
        // ### hand over the settings to FormGroup ###
        super(settings);
    }
    /** 
     * returns the current active validations- useful when working with async reqeuest 
     * @returns Number
     */
    get activeValidations() {
        return this.#activeValidations;
    }

    /**
     * runs a validation within a promise to handle the async requests
     *
     * @param {HTMLElement} pControl
     * @returns
     * @memberof ValidateForm
     */
    validate(pControl) {

        // ### mark this validation run as active ###
        this.#activeValidations++;

        pControl.setCustomValidity("");

        // ### Optional : wrap async validations in a promise to stay in control ###
        const validation = new Promise((resolve, reject) => {

            // ### which control is to be validated? ####
            switch (pControl.name) {

                // ### place each control here ###
                case "<fieldname>":
                    if (pControl.value != "hello")
                        pControl.setCustomValidity("this is not hello");
                    break;
            }
            resolve();
        }).finally((info) => {
            this.#activeValidations--;
        });

        validation.then((data) => {
            console.log(pControl.name, " done: ", this.activeValidations);
        })
    }
}

let occ = new Occurrence(),
    myValidatedForm = new ValidatedForm(
        {
            parentNode: document.body,
            occurrence: occ
        }
    );
```

### Translation of incoming and outgoing values with `translateIn` and `translateOut`
Sometimes it's necessary to convert values forth and back from the [Occurrence](occurence.md) to the HTML form. This can be done with these optional handlers. When the value of an input is transfered from/to an occurrence it will call the defined functions to get the value in shape. The callback functions receive the request to translate like in the following example.
```javascript
// ### function to translate data entered in the form to match the demands of an occurrence value ###
function functionForIncomingValues(pValue) {

  // ### this => the HTMLinputelement ###
  switch (this.name) {

    // ### myField - always lowercase ###
    case "myField":
        return (pValue.tolowerCase());

    // ### otherwise just return the value as-is ##
    default:
        return (pValue);
  }
}

/**
 * Translate outgoing values from Occurrence to the form
 * - called by FormGroup
 * - `this` is the htmlelement aka control
 * 
 * @param {Any} pValue - the value of `this`
 * @returns Any
 */
function translateOut(pValue) {
    asNumber = function(value) {
        return (String(Number(value)));
    }
    asCurrency = function(value) {
        return (String(Number(value)).replace(/\./g, ","));
    }
    asUnifaceBoolean = function(value) {
        return (value === true)
                return ("T");
            else
                return ("F");
    }

    // ### translate basic rules ###
    if (this.classList.contains("as-currency-comma")) {
        pValue = asCurrency(pValue);
    }

    if (this.classList.contains("as-numeric")) {
        pValue = asNumber(pValue);
    }

    switch (this.name) {

        // ### JavaScript to Uniface Boolean ###
        case "BOOLEAN-FIELD":
            return asMysqlBoolean(pValue);
            break;

        case "NUMERIC-FIELD1":
        case "NUMERIC-FIELD2":
            return asNumber(pValue);

        default:
            return (pValue);
    }
}
```
## methods and functions
* [`controls`](#controls)
* [`controlsValid()`](#controlsValid)
* [`occ`](#occ)
* [`refreshControls()`](#refreshControls)
* [`parentNode`](#parentNode)


## controls
returns a `Nodelist` with all current controls the FormGroup knows, basically behaves like an array

### usage:
```javascript
myValidatedForm.controls;

NodeList(10) [ input, input, input#ANLAGEN_ID, select#FU_ART, input#WUNSCH_DATUM.IN_FU_ANFO
 ]
```

## controlsValid
checks if the controls are "valid" and returns the answer as `boolean` or the 
amount of invalid controls.
As invalid controls at that point should already be marked (css style) and flagged (css custom class `:invalid`) there is no need to report the invalid ones in this method- this has been deprecated.

```javascript
// ### get the boolean response ###
let valid = myValidatedForm.controlsValid();

// ### get the amount of invalid controls as an integer ###
let invalid = myValidatedForm.controlsValid(true);
```

## occ
Gets or sets the occurrence used in the `FormGroup`.
### usage:
```javascript
// ### get the used occurrence ##
let myOcc = myValidatedForm.occ;

// ### set the occurrence to be used ##
myOcc = new Occurrence({a:1,b:2,c:3});
myValidatedForm.occ = myOcc;
```

## parentNode
returns the parent node of the the FormGroup

## refreshControls
Changes the values of the controls to the current value of the occurrence. Commonly used to update the frontend after validation and changes within the occurence.

### usage:
```javascript
myValidatedForm.refreshControls();
```
