# AppCore
This is what we need to start a project with: the app core! It holds all threads together and enables the reuse of features all through the components. 

The `AppCore` further offers a notification system, that let's the developer register custom events and subscribe to these across the app. This could as an example be a successful login or a logout. Loaded components could react on that as they get notified after they have subscribed to it. 

A simple `<script type="module" src="">` tag within the main HTML document gets the `AppCore` loaded. 

Further it supports switching between light and dark theme and makes changes persistent by saving the choice in the `localStorage` (key `theme`).

Next we place a reference in the main HTML document to bootstrap the spa app:
```html
<!DOCTYPE html>
<html lang="de">

<head>
    <title>SPA DI</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="/css/main.css" />

    <script type="module" src="/js/my-spa-app.js"></script>
</head>

<body>
    <spa-di>Hello spa</spa-di>
</body>

</html>
```
In this example we will place the app within the `<spa-di></spa-di>` tag in the HTML body. Everything the app will do with happen within that, unless you create some other global stuff.


## usage
```javascript
import { AppCore } from "./spa/classes/class-app-core.js"
import { ComponentManager } from "./spa/classes/class-component-manager.js";
import { WindowManager } from "./spa/classes/class-window-manager.js";

// ### get an Instance with basic settings of the spa ###
let app = new AppCore(
    {
        name: "spaDI",
        selector: "spa-di",
        title: "my SPA title"
    }
);

// ### add the component manager ###
app.components = new ComponentManager(app);

// ### as we want to show components, we need a window mananger in the app.view ###
app.windowManager = new WindowManager(
    {
        parent: app.view
    }
);

```
Above is something you most likey are going to use: the AppCore that features a `ComponententManager` and a `WindowManager`. The settings for `AppCore` in this example defines a selector which otherwise will be `spa-app` (`<spa-app></spa-app>`). As an initial title we wish to have *"my SPA title"*. This can be changed with the `title` get/setter.

### Extending the app features
Feel free to extend the `app` with the features you want to use!
Here we add the `createTemplate()` factory and the `message()` function:
```javascript
import { createTemplate } from "./spa/tools/create-template.js";
import { message } from "./spa/tools/message.js";
...
// ### we want to load templates ###
app.createTemplate = createTemplate;

// ### we want to offer messages ###
window.message = message;

// ### let's change the app title ###
app.title = "welcome SPA";

// ### about themes ... ###
app.setTheme("dark");
app.setTheme("light"); // ### this is the default one
```

### Theming 
The method `setTheme()` let's you switch forth and back between the themes. Default is `"light"` and can be overwritten by any other phrase, that describes your css theme. It's advised to use css variables for that. Here's an example:
```css
:root {    
    /* ### DEFAULT is light mode ### */

    /* ### Content area ### */
    --content-bg-color: #f3f3f3;
    --content-heading-color: #090909;
}

/* ### overwrite vars for dark mode ### */
.dark {
    /* ### Content area ### */
    --content-bg-color: #202020;
    --content-heading-color: #f3f3f3;
}

body {
    background-color: var(--content-bg-color);
}

h1,
h2,
h3,
h4,
h5 {
    color: var(--content-heading-color);
}
```
This should pave the way for themes of any kind.


### Subcribe to a token and get notified!
As mentioned in the introduction we can add subscribeable tokens and get notified as these are triggered. Technically we use the `Observeable` object (which is *NOT related to RXJS*).

To demonstrate this we will add tokens for "login" and "logout" to our app:
```javascript

// ### we will send a phrase to the console on login and logout ###
let onLogin = () => { console.log("NOTIFY: Login");}
let onLogout = () => {console.log("NOTIFY: Logout");}

// ### to get these called we subscribe to them ###
app.subscribe(onLogin, "login");
app.subscribe(onLogout, "logout");
...
// ### somewhere in the component that handles Login: ###
this.app.notify("<payload>","login");

// ### ... and at Logout : ###
this.app.notify("<payload>","logout");
```
As shown above the tokens are a simple string that is used to name the subscription. The `payload` is optional but will be transmitted to the subscribers that are called. 

To subscribe to a token the `app.subscribe()` method is used. You will have to deliver a callback function and the desired token.

To notify all subscribers on a token, `app.notify()` is used.

More details on the `Observeable` class will follow an extra documentation!


And that's all for the `AppCore`