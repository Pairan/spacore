# TabManager
The class manages a set of tab objects and switches in between those according to which is clicked.

## Some html to start with
```html
<div class="spa-tab">
    <div class="spa-tab-items">

    </div>
</div>
<div class="tab-output"></div>
```
Our above construct has to important HTML elements that are needed to run the `TabManager`: 
- a DIV for the `Tab` pushers (`spa-tab-items`)
- a DIV for the output of the individual `Tab` (`tab-output`)
If you use these classes you are good to go with pre-defined styles. But you are free to name and style them however you want of course.


## usage
```javascript
// ### invoke a new tab manager ###
// ### two nodes are needed to start the manager: 
// ### pusherNode: the node where the tabs are named
// ### contentNode: 
var tm = new TabManager(pusherNode, contentNode);

```
The new instance offers two methods.

## Methods, functions and objects
* [add()](#add)
* [remove()](#remove)
* [show()](#show)
* [allTabs](#allTabs)
* [tab()](#tab)
* [current](#current)
* [subscribe()](#subscribe)

## add
adds a new tab to the manager and returns the object.
#### params: 
* `String`: name 
* `String`: caption
* `String`: content  
or
* `Object`: {name: String[, caption: String, content: string]}

```javascript
// ### adding a tab ###
var tabMain = tm.add("main");

// ### changing a caption of the tab push control ###
tabMain.caption("Main Tab");

// ### changing the content of the tab ###
tabMain.content("Please wait- data loading!");

// ### Alternative: add with an object ###
tabMain = tm.add(
    {
        name: "main",
        caption:"Main Tab",
        content: "Please wait- data loading!"
    }
);

// ### get the name of the tab ###
console.log("Name of new tab is"+tabMain.name);
```
## remove
removes a tab from the DOM and the manager
#### params: 
* `String`: name - the name (as in tabMain.name) of the tab to be removed
```javascript
// ### remove the main tab ###
tm.remove("main");
```

## show
switches from the current visible tab to the one specified in the param.
#### params: 
* `String`: name - the name (as in tabMain.name) of the tab to be shown
```javascript
// ### remove the main tab ###
tm.show("main");
```

## allTabs
Returns a reference to the defined tabs in the manager. The tabs are stored by their name and with that accessible to the code.

```javascript
// ### change the caption of a tab pusher to become "home" ###
tm.allTabs.main.caption("home");
```

## tab
Used to access a single tab by it's name
```javascript
// ### change the caption of a tab pusher to become "my home" ###
tm.tab("home").caption("my home");
```
## current
A getter that returns the current active `Tab` object
```javascript
// ### get the name of the current active tab ###
let currentTabName =  tm.current.name;
```
## subscribe
Lets you subscribe to the moment, where a `Tab` gets shown (e.g. `show()` is used). In return you'll get an unsubscribe() function :)
```javascript
// ### get the name of the current active tab ###
let subscribtion = tm.subscribe((tabName) => {
    console.log(`showing tab ${tabName}`);
    }
);
```

# Tabs 
Each tab has its own set of function and methods to give control on what should happen with it without any creepy hacks.

Each tab has two elements:
* the pusher
* the output container for its content

Both are directly accessable via the `pusher` and `output` methods of the tab. This comes in handy where you need to find some controls or containers within the tab content.

The tab offers an additional feature to make notifications visual on each tab. This can be useful to indicate errors or actions in that tab.

## Methods, functions and objects
* [`content()`](#content)
* [`caption()`](#caption)
* [`name`](#name)
* [`output`](#output)
* [`pusher`](#pusher)
* [`setNotification()`](#setNotification)


## content
The method acts as getter and setter. By calling `tab.content()` without params, the current content will be returned as String.

#### params: 
* `String`: content (optional) - the html string to be insertet into the tab output
```javascript
// ### getting the current content of tab "main" ###
var contentString = tm.tabs.main.content();

// ### extending it ... ###
contentString += "<hr />some <strong>new</strong> html string at the end";

// ### updating the tab with the altered content ###
tm.tabs.main.content(contentString);
```
## caption
As a setter the method takes the new (html)content in the first param.
calling it without params, the current content of the pusher will be returned as String.
#### params: 
* `String`: optional html string - the html string to be insertet into the pusher element
```javascript
// ### getting the content of the pusher ###
var oldPusherContent = tm.tabs.main.caption();

// ### change the caption of a tab pusher to become "home" ###
tm.tabs.main.caption("home");
```
## name
A simple getter of the tabs name. Useful if you only got the tab object and don't work with the tab manager. Usually it's easier to work with the tab managers `tabs` object directly.
```javascript
// ### tell the tab manager to show a specific tab ###
tm.show(myTab.name);
```

## pusher
A reference to the pusher element of the tab in the dom. Commonly used to check some events, css classes or similar.
```javascript
// ### check, if the main tab has the css class "current" ###
tm.tabs.main.pusher.classList.has("current");
```
## output
A reference to the output element of the tab used to check or finding controls.
```javascript
// ### find that one input control in the tab ###
var myControl = tm.tabs.main.output.querySelector("input.that-one-control");
```
## setNotification
Each tab can show notifications just like on your smartfone! At the right outer part of the pusher a red circle with optional (usually numeric) content becomes visible. The color and styling is changeable by giving another css class parameter.

Very useful to give the user a hint that there is something to do in a tab (eg. there are 3 faulty input controls in that tab).

#### params: 
* `number`: value - the value to be shown on the notification item. By setting the value to 0 or null, the notification would disappear.
* `CSS class`: optional, string - added to the indicator class list
```javascript
// ### mark tab main to have 4 notes ###
tm.tabs.main.setNotification(4);

// ### mark tab main to have 2 notes with other style ###
tm.tabs.main.setNotification(4,"notification-info");

// ### remove the notification on tab main ###
tm.tabs.main.setNotification();
```
