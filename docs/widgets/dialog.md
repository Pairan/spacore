# Dialog widget
Based on the `dialog` tag this class delivers two classes build on top on `dialog`. The most important one will be the `DialogWindow` which this documentation will focus on.

With `DialogWindow` you can set up windows on top of your application ... modal or even non-modal. These windows are completely customizeable- you can even add icons to it or stuff the footer with let's say buttons. Here is the generated structure:

## HTML structure
```
* dialog
* |-div.flex
* | |-header
* | | |-h2.title
* | | |-div.icons
* | | |-i.closer
* | |-div.content
* | |-div.footer
```
There is some css ready for you but aside of the css variables you can style it as you need it! And yes ... you can change the used html to something of your liking.
## Usage 
```Javascript
// ### A simple instance (e.g. in an common component) ###
this.dialog = new DialogWindow();

// ### get an instance with basic settings straight away ###
this.dialog2 = new DialogWindow(
    {
        html: "some html to be place on creation",
        id: "dialog2-full";
    }
);

// ### add it to dom - yet not visible! ###
this.dialog.append();

// ### show the dialog non-modal ... not so cool but possible! ###
this.dialog.show();

// ### OR better: ... modal ###
this.dialog.showModal();

```
True ... not very overwhelming and consider using the dialog modal.


## Methods and functions
* [`element`](#element)
* [`id`](#id)
* [`isVisible`](#isvisible)
* [`html`](#html)
* [`append()`](#append)
* [`remove()`](#remove)
* [`title`](#title)
* [`content`](#content)
* [`footer`](#footer)
* [`icons`](#icons)
* [`addIcon()`](#addicon)
* [`clearIcons()`](#clearicons)

## element
getter, returns the dialog element
```javascript
// ### adds a class to the dialog element ###
this.dialog.element.classList.add("with-borders");
```

## id
getter, returns the id of the dialog element which commonly is "dialog-" with a random value.
```javascript
console.log(this.dialog.id);
```
## isVisible
returns if the dialog is visible
```javascript
 return this.dialog.isVisible // ### true or false
```

## html
getter and setter - this will put the string into the 
```javascript
// ### saving the current html content ###
let oldHtmlContent = this.dialog.html;

// ### and setting something new ###
this.dialog.html = "<div class='content'></div>";
```
## append()
The append method will add the dialog tag to the dom.
```javascript
// ### add it to dom - yet not visible! ###
this.dialog.append();
```
## remove()
You can remove the dialog tag from the dom by calling the `remove()` method.
```javascript
// ### remove it from the dom ###
this.dialog.remove();
```

## title
Changing the title with this setter is straight down the road as you might assume it!
```javascript
this.dialog.title = "This is your window";
```
## content
Same as the title the `content` setter puts the string or HTML into the content part of the window.
```javascript
this.dialog.content = "Lorem Ipsum - you know what this means, right?";
```
## footer
The third of these is the `footer` setter. Most likely it will be the best place for buttons or minor texts.
```javascript
this.dialog.footer = "You've reached the end! <button>OK</button>";
```
## icons
This getter/setter deliver or fills the `icons` container in the structure.
```javascript
// ### save current icons as html ###
let currentIcons = this.dialog.icons.innerHTML;

// ### set some new content into it ###
this.dialog.icons = "<div class='icon fa-fantasy-icon'></div>";
```
## addIcon()
Adds an icon to the icon container giving it specific css from the parameter
#### params: 
* `String`: html or text to be put into the dialog tag
```javascript
// ### add an icon to the container ###
this.dialog.addIcon("fa-solid fa-pen-to-square push-edit");
```
## clearIcons()
As the name says all icons will be removed from the icon container- as simple as that!
```javascript
// ### No more icons! ###
this.dialog.clearIcons();
```
