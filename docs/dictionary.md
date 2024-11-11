# Dictionary
The dictionary loads pre-defined [languagePack](#languagepack)s. The current browser language is taken as default. But the language can be switched.

## Fallback feature like en-US => en
Let's assume the current browser setting reports a language code "en-US". The Dictionary will try to load the file "boilerplates.en-us.js". If this isn't available it will fallback to "boilerplates.en.js"

## languagePack
Language packs are nothing more than an JavaScript object (by the name of "languagePack") holding members and values. 
To make things more convenient its possible to make sub nodes (e.g. a componentname) to keep the packs comprehensive and tidy.

Here is a quick example of a german pack: 
```javaScript
export let languagePack = {
    "login": "Anmeldung",
    "userId": "Kennung",
    "password": "Passwort",
    "submit": "Senden",
    "hello": "Hallo",
    "home": {
        "title": "Willkommen bei spaCore 2024"
    },
    "dialog": {
        "small": {
            "title": "kleiner Titel",
            "content": "Der Inhalt des kleinen Dialogs!"
        },
        "full": {
            "title": "Fullscreen-Dialog",
            "content": "Inhalt für den Fullscreen-Dialog"
        }
    }
}
```
Since the latest update its possible to add subtokens that may be objects itself. This will make the language files even better to manage.
### Filenames
The `languagePack` file needs to be placed within the `languages` directory and is stored as `./languages/<code>.js` (e.g. "languages/de.js").
