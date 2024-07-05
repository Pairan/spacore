# ValidatedForm
This class extends the [FormGroup](formGroup.md) and is supposed to make you life easy when working with forms and values.

The main goal is to have an easy two-way binding between the data object and the view. Every change in the view will be visible in the object after the changes.

Next it offers a smooth way to add a validation to it- things that commonly are needed.

## usage
```JavaScript
// ### reference the <form> ###
const customerForm = this.view.querySelector("form.customer");

// ### create a validation for it ###
this.validate = new ValidateForm(
    {
        parentNode: customerForm,
        occurrence: this.data,
        validate: functionForValidation, // ### optional
        translateIn: functionForIncomingValues, // ### optional
    }
);
```
Keep in mind that your data remains where it was (e.g. like above in `this.data`).

The validation function can be placed in an seperate import and should look like in this example:
```JavaScript

export function validate(pControl) {

    switch (pControl.name) {

        // ### place each field here ###            
        case "pon":
            let optionTag = pControl.selectedOptions[0];
            break;

        case "tarif": {

            break
        }

        // ### provider muss gefüllt sein ###            
        case "ekpauf":
        case "ekpabg":

            if (pControl.value == "") {
                pControl.setCustomValidity("this field is mandatory!");
            }
            break;
    }
}
```
This keeps your code clean and helps to bundle things that belong together.