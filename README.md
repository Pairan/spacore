# spaCore
A tiny SPA JavaScript toolkit

## Basic directory structure
```
/js
  ├─spa
     ├─ classes (all js classes)
     ├─ components (mainly for your components)
     ├─ languages (for languagePacks)
```

## Documentation
- [localization and languages](docs/languages.md)
### Classes
- #### Features
    - [AppCore](docs/appCore.md) - the core to hold all your awesome app functions 
    - [ApiCall](docs/apiCall.md) - http client
    - [Component](docs/component.md) - component defaults
    - [ComponentManager](docs/componentManager.md) - load and manage components lazy
    - [Dictionary](docs/dictionary.md) - manage multiple languages and boilerplates/placeholders
    - [FormGroup](docs/formGroup.md) - making form handling easy
    - [Renderer](docs/renderer.md) - render placeholders in html templates
        - [Pipe](docs/pipes.md) - enhance placeholders
    - [WindowManager](docs/windowManager.md) - manage multiple outputs/views
    - [Trigger](docs/trigger.md) - subscribe to custom events
- #### Components
    - [SplitPane](docs/splitpane.md) - two outputs, switchable , size alterable
    - [TabManager](docs/tabManager.md) - tab widget
    - [Chip](docs/widgets/chip.md) - chip widget
  ### Functions
- [Occurrence](docs/occurrence.md)
- [LocalDatabase](docs/localdatabase.md)