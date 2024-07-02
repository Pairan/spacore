# ComponentManager
lets you add and install components the easy way. The main goal is to know all possible components and lazy-load them at that time they are used the first time. Before that they mainly stay as a definition.

## some prerequisites
The common use-case is to have an array of `DynComponent`-Objects to be added via the `import` method. Let's take a look at the `DynComponent`:
```javascript
export class DynComponent {
    constructor(settings) {
        this.src = settings.src || null;
        this.name = settings.name || null,
        this.preload = settings.preload || false;
    }
}
```
The object simply describes where to find the component, it's internal `name`,  and if it needs to be pre-loaded. The main content and features of the component. Please make sure it has a name in case you want to `run()` it after loading!

## usage
```javascript
// ### invoke the component manager with this app ###
app.components = new ComponentManager(app);

// ### adds a single component ###
app.components.add(new Component);

// ### imports an array of DynComponents for lazy loading ###
app.components.import(dynComponents);

// ### runs a component by its name ###
app.components.run("myComponent");
```

The `run()` method will start the component if it's already loaded. Otherwise the component will be lazy-loaded and started after it finished loading.
That makes it convenient to start a component.