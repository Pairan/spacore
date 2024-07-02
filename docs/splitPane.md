# SplitPane
A widget that makes two output areas and a splitter in between them to manage their sizes. 

## generated HTML structure
Styling the `SplitPane` is straight down the road in case you want to. 
```html
<div class="spa-split-pane">
    <div class="pane left"></div>
    <div class="splitter"></div>
    <div class="pane right"></div>
</div>
```

## usage
```JavaScript
import { SplitPane } from "../../classes/class-split-pane.js";

// ### some optional settings ###
const optionalSettings = {
    limit: 5, // ### min max limits in % - default is 10
    class: "some-class", // ### add a css class to the widget
    leftPaneSize: 25 // ### initial size of the left pane
}

let splitPane = new SplitPane();
let anotherSplitPane = new SplitPane(optionalSettings);

// ### add the widget to dom ###
document.body.appendChild(splitPane.widget);

// ### The methods leftPane and rightPane are direct access 
// ### to the output nodes

// ### fill some content into the panes ###
splitPane.leftPane.innerHTML = leftContent;
splitPane.rightPane.innerHTML = rightContent;

// ### show only the LEFT pane ###
splitPane.leftOnly();

// ### or only the RIGHT pane ###
splitPane.rightOnly();

// ### show both again ###
splitPane.both();
```
## Methods, objects and functions
* [widget](#widget)
* [leftPane](#leftPane)
* [rightPane](#rightPane)
* [setLeftPane()](#setLeftPane)
* [setRightPane()](#setRightPane)
* [leftOnly()](#leftOnly)
* [rightOnly()](#rightOnly)
* [both()](#both)

## widget
returns the reference to the widget object
```JavaScript
// ### add the widget to dom ###
document.body.appendChild(splitPane.widget);
```
## leftPane
returns the reference to the left pane
```JavaScript
// ### add the widget to dom ###
splitPane.leftPane.innerHTML = "some content";
```
## rightPane
returns the reference to the right pane
```JavaScript
// ### add the widget to dom ###
splitPane.rightPane.innerHTML = "Lorem ipsum";
```
## setLeftPane()
resizes the `SplitPane` where the left pane becomes a given size in %. The right pane will be adjusted accordingly. The splitter element in between will be hidden.
```JavaScript
// ### Resize left pane to 45% ###
splitPane.setLeftPane(45);
```
## setRightPane()
resizes the `SplitPane` where the right pane becomes a given size in %. The right pane will be adjusted accordingly. The splitter element in between will be hidden.
```JavaScript
// ### Resize right pane to 80% ###
splitPane.setRightPane(80);
```
## leftOnly()
Hides both splitter and right pane of the widget. 
```JavaScript
// ### Resize left pane to 45% ###
splitPane.leftOnly();
```
## rightOnly()
Hides both left pane and splitter of the widget. 
```JavaScript
// ### Resize left pane to 45% ###
splitPane.rightOnly();
```
## both()
Reverts the hidden elements from `leftOnly()` and `rightOnly()` - the complete widget will show up. 
```JavaScript
// ### show the complete widget ###
splitPane.both();
```