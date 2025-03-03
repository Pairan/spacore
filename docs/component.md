# Component

Every app needs a component to be of any use! In this document we will take a look at how we create a component within SPA

## Basics

The `Component` class is a foundation for what should happen in the app! Luckily its a pretty simple to use construct having a constructer, a main method and the ability to start itself after everything within the component have finished.

A component commonly resides in a subdir (e.g. _./components_) beneath other components. As we define a home component we should call the directory `home`.

The home component will need some HTML to show so we create a subdir called _html_ in it's basePath. Create a file like _"home.htm"_ or a name that matches to the component or the purpose.

```html
<h1>Hello!</h1>
This is the home component sending a greeting.
```

Having done that, we can start to build up our home component.

## Usage

```Javascript
import { Component } from "../../core/class-component.js";

// ### where are the html sources deployed? ###
const basePath = "./js/spa/components/home";

// ### define a home component class ###
export default class ComponentHome extends Component {
    constructor(settings) {
        super(settings);
        this.name = "home";

        // ### fetch the template, evtl call main() afterwards ###
        this.template = this.app.createTemplate(basePath + "/html/home.htm", this.onLoaded);
    }

    main(optionalArgs) {
        // ### init the output on fist run ###
        if (!this.view) {
            // ### add it to the app view ###
            this.view = this.app.windowManager.append(this.name);
        }

        // ### if we are faster than the template, we'll wait ###
        if (!this.template.loaded) {
            this.callMainAfterLoad = true;
            this.view.innerHTML = "loading...";

            // ### save the params coming ###
            if (optionalArgs) {
              this.mainArgs = arguments;
            }
            return;
        }

        // ### place the loaded html ###
        this.view.innerHTML = this.template.html;

        // ### show the component in the view ###
        this.app.windowManager.show(this.name);
    }
}
```

As we extend the default `Component` class we import it to our file.
To make things more convenient we declare a constant `basePath` leading to the directory where we place the HTML files.

Let's call this component class `ComponentHome` and override the inheritated `main()` method from the `Component` base class.

It's important to make the Class a `default` export as the `ComponentMananger` will need to handle our component.

## constructor

In the constructor we call the `super(settings)` to get the basics.

Next we define our HTML output with the `createTemplate()` method injected by `AppCore`. It is provided to the `ComponentHome` class by `settings.app`.

The 2nd parameter is a callback to a function after the template has been loaded and processed. This is important as we most likely are faster than `createTemplate()` could possibly have finished. We will go deeper into the details on that a bit later.

## main()

Every component needs an entry point that can be called to make it do what it is supposed to do. This will be the `main()` method!
In this kind of components, the `main()` will always be there so the handling is unified.
Our example overrides the `main()` from its base component as it will differ from on component to another. The pattern in our example is the same though:

1. check if we have assigend the view to something OR simply do it! We wont be able to run without an output view so this is vital for the component.

2. check if we already received out HTML file to put into the view! Because if `createTemplate()` didn't finish by that time we can't display the content as planned! In case `this.template.loaded` is false we tell the component to run `main()` after finishing as WE ARE READY. We do so by setting the boolean `this.callMainAfterLoad` to true.

3. If we for some reasons use parameter to call `main()` these can be stored by placing `arguments` in the 'mainArgs' member. When the component is ready and calls `main()` these will be included in the call. This is usefull when we need to call the component to do something with (let's say) an id that needs to be loaded or an object to work with.

Next is to put the contents of the loaded HTML file into our view and finally tell the 'WindowManager` to show it!

You should put anything that needs to be done BEFORE your components runs in here! Basics belong to the constructor but here we init the view.

### Details on what happens in `this.onLoaded`

The (abstract) `Component` class has a tiny code that keeps track on if we should run the `main()` method AFTER having finished loading stuff.

In case that the code didn't finish by the time `main()` was called the boolean `this.callMainAfterLoad` could be set to true. If so, `Component` will run the `main()` method after finishing and we're good to go and are done handling with race conditions due to async tasks.
If optinal parameters have been passed on for the `main()`call, these will be included.

```Javascript
    callMainAfterLoad = false;

    onLoaded = () => {
      if (this.callMainAfterLoad) {
        if (this.#mainArgs != null) {
          this.main(this.#mainArgs);
          this.#mainArgs = null;
        } else {
          this.main();
        }
      }
    };
```

## mainArgs(args)

This is a small setter to save the incoming arguments from a `main()` call so the component can call the `main()` correctly and as intented after finishing the templates and other stuff!

```Javascript
    // ### if we are faster than the template, we'll wait ###
    if (!this.template.loaded) {
      this.callMainAfterLoad = true;
      this.view.innerHTML = "loading...";

      // ### save the params coming ###
      if (arguments) {
        this.mainArgs = arguments;
      }
      return false;
    }
```

## home()

The component class has got an optional function to get the user back to the `home` component. Simply call `this.home()` somewhere in your component and the componentmanager will try to run "home".

## group

Sometimes it comes in handy to know what group a component belongs to. Let's just assume for a second that our user token (e.g. JWT) has a group member telling us what groups he may access.

We could define the component "sales-grid" to require a "sales" group membership to be run. With that we could check if the user is permitted to call the component by calling the components `group` member.

```Javascript
// ### get a the permission group from sales-grid app ###
const salesPermission = this.app.componentManager.byName("sales-grid").group);

// ### check if we have permission for "sales" components ###
if (!this.app.userContext.fromJWT("group").includes(salesPermission)) {
  console.log("permission denied");
  return;
}
```

## ual

Similar to the `group` the `ual` member gives us information about an optional requirement a user needs to provide for this component.

We could define the component "sales-grid" to require an "administration" ual (user access level) to be run. With that we could check if the user is permitted to call the component by calling the components `ual` member.

```Javascript
// ### get a the permission group from sales-grid app ###
const salesUal = this.app.componentManager.byName("sales-grid").ual);

// ### check if we have permission for "sales" components ###
if (!this.app.userContext.fromJWT("ual").includes(salesUal)) {
  console.log("permission denied");
  return;
}
```
