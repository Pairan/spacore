# Trigger
In every app there are moments you would love to catch and react on, much like a custom defined event. Within `spaCore` you can do this with `Trigger`. 
A Trigger is basically an array of subscriptions that can be added to any code.

Let's say you have code that adds some data to a database. Every time that happens, you want to refresh your data grid as to stay up-to-date! 

So, how about simply tell you code to call back at those moments? That's about what `Trigger` does!

## Within a code block or global!
It started off as an enhancement to catch some special events within a code block when it started. But you can also use `Trigger` in the `AppCore` and with that add many little custom events, that all can subscribe!

The `AppCore` demo does this to catch moments, when a user runs *login* or *logout* to update the frontend!

## usage
This is how to add `Trigger` in your code block or class:
```Javascript
// ### import Trigger to the code ###
import { Trigger } from "../classes/class-trigger.js";

class AddingData {
    // ### create a private member for trigger ###
    #trigger = null;

    ...
    addMethod() {

        // ### create some DTO as example ###
        let dto = new Dto();

        // ### NOW we inform all subscribers about it and WHAT we added ###
        this.notify(dto);

        // ### return the dto to who ever called us! ###
        return(dto);
    }

    // ### enable others to subscribe to an action with their callback function ###
    subscribe(callBack, action="",onlyOnce = false) {
        // ### if we don't have an instance of Trigger()), then get one ###
        if (!this.#trigger) {
            this.#trigger = new Trigger();
        }

        // ### subscribe and return an unsubscibe function as return ###
        return (this.#triggger.subscribe(callBack, action, onlyOnce));
    }

    // ### notify all subscribers ###
    notify(payload = null, action = "") {
        if (!this.#trigger)
            return;

        this.#trigger.notify(payload, action)
    }
}
```
After having set up `Trigger` in our code we can subscribe to it and react on that trigger:

```Javascript
 let myAddData = new AddingData();

 // ### a function that does so
 myCallBackFunction = (newDto) => {
    refreshView();
 }
 ...

 // ### subscribe to when we added data in myAddData ###
 AddingData.subscribe(myCallBackFunction);
```
## Methods and functions
* [subscribe()](#subscribe)
* [notify()](#notify)

## subscribe()
Adds a callback function to the `Trigger`. There are some optional params on this that we will look at in a sec. 

As we need the a callback function to subscribe, `Trigger` will check for duplicate subscriptions and take care that we only subscribe once!
#### params: 
* `Function`: callBack - the function to call
* `String`: action (*optional*) - which action we want to 
be notified on
* `Boolean`: onlyOnce (*optional*) - receive only ONE notification and then unsubscribe 
```javascript
// ### simple subscription ###
AddingData.subscribe(myCallBackFunction);
...
// ### more specific subscription to action "first" ###
AddingData.subscribe(myCallBackFunction,"first");
... 
// ### more specific subscription to action "first",only ONE time ###
AddingData.subscribe(myCallBackFunction,"first",true);
```
Basically you can subscribe to get an notification callback. But you can be more specific and decide on what `action` to be notified! As mentioned above you could define actions as *login* and *logout*

The name of the action is defined with [notify()](#notify). It will notify only those matching the action if provided in the params!

Further you can tell the subscription to only run once! If specified as true, the subscription is removed after that.

When we `subscribe()` a function to unsubscribe is returned so we could stop the subscription in case we need to!

## nofity()
`notify()` starts the call backs to the subscribers. Place it anywhere within the code and call it, when the event or actions happens. 
#### params: 
* `any`: payload(*optional*) - the data to provide to the callback functions
* `String`: action (*optional*) - which action we want to notify about
```Javascript
// ### simply notify all! ###
this.notify();

// ### notify all with a payload ###
this.notify(
    {
        id: Math.random(),
        text: "lorem ipsum"
    }
);

// ### or notify only for a specific action, e.g. "logout" ###
this.notify(null, "logout");
```
