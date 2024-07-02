# WindowManager
Within an app every component needs its view or display root. The `WindowManager` takes care of this and make handling such windows easy.

### Usage
```JavaScript
import { WindowManager } from "./spa/classes/class-window-manager.js";

...
// ### lets say we want to use the body as our view in an app ###
app.view = document.body;

// ### get a new WindowManager for our app ###
app.windowManager = new WindowManager(
    {
        parent: app.view
    }
);
```
Providing an existing HTML node with the `parent` setting enables the `WindowManager` to easy `append()` new `window`elements to the app. Each created `window` has some feature on it's own. We will look into that later. 

## Methods, functions and objects
* [create()](#create)
* [append()](#append)
* [show()](#show)
* [Window](#window)

## create()
Creates a new window object by the provided name and returns the `HTMLObject` or more precise a `<DIV>`.
```JavaScript
let myWindowObject = this.app.windowManager.create("name-of-window");

// ### add the view to the app.view ###
app.view.append(myWindowObject);
```
## append()
Does the same as `create` yet it adds the created window to the root of the `WindowManager` and returns the `HTMLObject` as reference.
```JavaScript
this.view = this.app.windowManager.append("name-of-window");
```
## show()
The `show` method hides the current window and shows the wanted one instead.
```JavaScript
// ### show the component in the view ###
this.app.windowManager.show("name-of-window");
```

# Window
The `WindowManager` creates intances of the `Window` class that has methods. These instances can be accessed via the `WindowManager` but currently won't be any use otherwise.

## Methods, functions and objects
* [content](#content)

## content
A get/setter that gives or sets the `innerHTML` of the window.
```JavaScript
let oldContent = this.app.windowManager.windows["name-of-window"].content;
// ### show the component in the view ###
this.app.windowManager.windows["name-of-window"].content = "some new markup";
```