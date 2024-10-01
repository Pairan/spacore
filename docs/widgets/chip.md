# Chips (spa-chip)
A nice little helper widget is the `Chip`. It can indicate many things as the UI needs to show selections of variuos types. 
`Chip` offers some optional nifty things that let you do more than just have it sitting in the UI. 

Her are some features - you can ...
- add an icon to it 
- add and image to it
- change the text any time
- add a remover icon with an optional callback on removal
- add data to it, that is accessable from the dom!

## Created html structure
`Chip` creates `<spa-chip>` elements that can be added to the dom. 
```html
<spa-chip>
    <i class="fa-solid fa-plane"></i>
    <img src=""/>
    <span class="text">new Text</span>
    <i class="far fa-times-circle remover"></i>
</spa-chip>
```
These are stylable as everything else here. But there are some css variables to enable your own style on-the-fly
## CSS styling variables
```css
   --spa-chip-background-color: #0d6efd;
   --spa-chip-text-color: rgba(255, 255, 255, 0.9);
   --spa-chip-border-color: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Usage
```javascript
import { Chip } from "../../classes/class-chip.js";


// ### get a new chip ###
this.chip = new Chip(
    {
        text: "demo Chip",
        icon: "fa-solid fa-plane",
        class: "chip-red",
        data: {
                a: 1,
                b: 2
            },
        removable: true,
        onRemove: chipRemovedHandler  
    }
);
// ### add it to the dom where we want it ###
this.view.appendChild(this.chip.element);

// ### change the Text to something else ###
this.chip.text = "new Text";

// ### put some data into it ###
this.chip.data = {
    id: "1234567"
 }

// ### remove it from dom ###
this.chip.remove();
```
Please note that every param in the above example is optional! Nothing is mandatory. After creation you will be able to change some things depending upon you've added things on invocation.

- the remover is only there if you added it on creation!
- icon can only be altered if you added it on creation!
- you can't change the callback function on removal. 

Yet you can extend the `Chip` and append whatever you want as it is a regular class :)

## Methods and functions
* [element](#element)
* [class](#class)
* [text](#text)
* [icon](#icon)
* [data](#data)
* [remove()](#remove)

## element
This member returns the created HTMLElement (`spa-chip`) so it can be added in the dom.
```javascript
this.view.appendChild(this.chip.element);

// ### access the members of the dom element ###
this.chip.element.title = "a usefull Chip";
```
And of course it references to the element in the dom.

## class
With the class member the style can be altered. It will be written to the `<spa-chip>` element and as thus you are invited to create your own flavours with it!
Alternatively you could change it by accessing the `element` member ...
```javascript
// ### change the class of the element ###
this.chip.class = "chip-green"; // ### <spa-chip class="chip-green">

// ### alternativly by element ###
this.chip.element.classList.add("chip-gradient");
```
## text
This member get or sets the text of the `Chip`. It will insert the text as HTML
```javascript
// ### get the text ###
const oldText = this.chip.text;

// ### put some new into it ###
this.chip.text = "some new <strong>bold</strong> text!";
```

## icon
The optional icon is a simple CSS class definition as defined in several icon sets like fontawesome - as also used in this widget. The Member enables you to change the icon if you choosed to have an icon in the `Chip` straight from the beginning.
```javascript
// ### change the icon class ###
this.chip.icon = "fa-solid fa-plane-circle-xmark";
```
## data
On of the cooler features is the data member! It is added to the dom element as where everybody can access it! Put your object into it and do some nice stuff with it! 
```javascript
this.chip.data = {
    id: "1234567",
    status: 10,
    group: "sales"
 }
```
## remove()
Sometime we need those `Chips` to be removed! That is possible by calling the `remove()` method. 
When called it will remove the `Chip` from the dom. If you've added a function on the `onRemove` member as you invoked it, the function will get a callback with the current stored data so you can do something with it!
```javascript
// ### remove the from the dom ###
this.chip.remove();

// ### A function to call at removal ###
chipRemovedHandler = (data) => {
    console.log("the removed chip had this data:",data);
}
```