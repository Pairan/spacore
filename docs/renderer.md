# Renderer
A simple class yet so effectiv! It translates boilerplates within a string into values.
Usually it is invoked as a method within the `AppCore` enabling all components to use it without further imports.

Think of a DTO with several values that needs to be visible in a html file. 

And to make it more fun: it can detect pipes and be extended!

## Usage
```Javascript
// ### prepare a new text renderer, register pipes ###
app.renderer = new Renderer();

// ### prepare a new text renderer with localiuation ###
app.renderer = new Renderer(
    {
        app: app,
        useDictionary: true
    }   
);

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

// ### translate the html with a set in myValues ###
const translatedHtml = app.renderer.translate(html,myValues);

// "CoffeeCup - color: gray price: 4.99"

// ### OR add a component string to the 2nd param to
// ### indicate which node of the language file to use 
// ### if the dictionary is used!
const translatedHtml = app.renderer.translate(html,"<some-string>");

// ### in an component that would be <this.name>! ###
const translatedHtml = app.renderer.translate(html,this.name);

```

## Pipe objects
Pipe objects (or Pipes) extend the boilerplates as the have the option to transform the output of the value to anything that can be programmed!
In order to take advantage of pipes you'll need to register them into the `Renderer`.

## useDictionary setting
By providing the app and the setting set to `true` the renderer will use the dictionary data of the current language to translate the boilerplates into phrases. More on this is described in [Languages](languages.md).

### passing an identifier string to the 2nd parameter
As an option and if the dictionary is used the 2nd parameter 
can be used to indicate which node within that is wanted 
for the translation of the html. 

let's assume your language file is set up like
```Javascript
...
"my-component-name": {
        title: "Dialog-Widget",
        intro: "this is an example"
}
...
```
And basically you would need only these translations to complete the html then you translate your file like this:
```Javascript
  this.name = "my-component-name";
  ...
  translatedHtml = app.renderer.translate(html,this.name);
```