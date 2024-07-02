# Pipes
Pipe objects (or Pipes) change/extend the output of boilerplates. A value can we tranformed to anything that can be programmed!

```html
        <div>
            <label>{{password|localized}}</label>
            <input type="password" name="PWD" />
        </div>
        <br />
        <button>{{submit|localized}}</button>
        <i>{{renderDate|localedate}}</i>
```
To use pipes simply append a `|` to a field and state the desired pipe to use! in the above example the field `renderDate` will be reformated by a pipe called `localedate`. Other boilerplates use a localization pipe called `localized`.

Pipes use a simple interface to comply to `Renderer`:
- they have a `token` to be recognized on - it's converted to lowercase on registration
- they offer a `run()` method that offers the field and value as params

We will build a simple pipe that shapes a date into local format to get to know pipes better

## basic interface
```Javascript
export class Pipe {
    constructor() {
    }
    run(field, value) {

    }
}
```

## A simple date pipe
### scenario
In the DTOs from our backend dates are delivered as `YYYY.MM.DD` but that's not how we want to show these values in the UI!
### todo
The UI needs to show that date in the format of the `userContext`. 

```Javascript
export class PipeLocaleDate extends Pipe{
    #userContext;

    constructor(userContext) {
        super();
        this.token = "localedate";
        if (userContext)
            this.#userContext = userContext;
    }

    run(field, dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        // ### pick language from userContext.language or the browser setting! ###
        const targetLanguageCode = this.#userContext.language || navigator.language;
        
        return date.toLocaleDateString(targetLanguageCode, options);
    }
```
As pipes need to be registered in the `Renderer` on start-up we will inject the `userContext`. That enables the pipe to figure which language currently is used.

Lets do so in the `App` as we start up:
```Javascript
app.renderer.addPipe(
    new PipeLocaleDate(app.userContext)
);
```
Now we can convert date strings to a locale representation


