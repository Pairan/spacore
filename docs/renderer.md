# Renderer
A simple class yet so effectiv! It translates boilerplates within a string into values.
Usually it is invoked as a method within the `AppCore` enabling all components to use it without further imports.

Think of a DTO with several values that needs to be visible in a html file. 

And to make it more fun: it can detect pipes and be extended!

## Usage
```Javascript
// ### prepare a new text renderer, register pipes ###
app.renderer = new Renderer();

// ### let's register a pipe object to localize phrases ###
app.renderer.addPipe(
    new PipeLocalized(app.dictionary)
);

// ### now lets translate a html file with the renderer ###
let html = "{{name}} - color: {{color}} price: {{price}}";
let myValues = {
    "price": 4.99,
    "name": "CoffeeCup",
    "color": "gray"
};
const translatedHtml = app.renderer.translate(html,myValues);

// "CoffeeCup - color: gray price: 4.99"
```

## Pipe objects
Pipe objects (or Pipes) extend the boilerplates as the have the option to transform the output of the value to anything that can be programmed!
In order to take advantage of pipes you'll need to register them into the `Renderer`.