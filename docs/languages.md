# Languages and translations
Supporting different languages is a common feature. Within spaCore this is possible using

- a [Dictionary](dictionary.md)
- a [languagePack](dictionary.md#languagepack)
- maybe a [pipe](pipes.md) called `localized`.
- a userContext
- and the [renderer](renderer.md)

 While using the [renderer](renderer.md) it can translate the tokens of the template to a phrase defined in a [languagePack](dictionary.md#languagepack).

## How to set up the app
```JavaScript
import { Dictionary } from "./spa/classes/class-dictionary.js";
import { Renderer } from "./spa/classes/class-renderer.js";
import { UserContext } from "./spa/classes/user-context.js";
import { PipeLocalized } from "./spa/tools/pipe-localized.js";

// ### get an Instance with basic settings of the spa ###
let app = new AppCore(
    {
        name: "spaCore",
        selector: "spa-app",
        title: "My localized app"
    }
);

// ### we would need to login and logout ###
app.userContext = new UserContext();

// ### our App needs a Dictionary for certain boilerplates ###
app.dictionary = new Dictionary();

// ### prepare a new text renderer, register pipes ###
app.renderer = new Renderer();
app.renderer.addPipe(
    new PipeLocalized(app.dictionary)
);
```

## Pipe localized
This pipe will try to translate the found tokens into the language of the current user. Simply place the pipe behind a token in the template and you're ready to go

```html
<h1>{{home.title|localized}}</h1>
```
The above example will try to translate the token home.title to the representation within the current `languagePack` (e.g. node "home", member "title"). That should make it easy.

## useDictionary
But there is another way to reach localization. On creation of the renderer instance you can provide some settings to make things even easier. Let's try the above example again with a little change:

```JavaScript
// ### prepare a new text renderer, register pipes ###
app.renderer = new Renderer(
    {
        app: app,
        useDictionary: true
    }
);
```
Providing the settings `app` and  `useDictionary` (set to `true`) will let the renderer go for the dictionary even without the pipe!
First the provided boilerplates would be used and if the needed token isn't included, the dictionary will be checked for that. Our html code then looks like this:

```html
<h1>{{home.title}}</h1>
```

