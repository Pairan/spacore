export class ComponentManager {
    #components = [];
    #app;
    #currentComponent;

    #allComponentsLoaded = () => {
        let markedAsLoaded = 0;
        this.#components.forEach(c => {
            if (c.hasOwnProperty("main"))
                ++markedAsLoaded;
        });
        return (markedAsLoaded === this.#components.length);
    }

    constructor(app) {
        this.#app = app;
    }

    add(component) {
        // ### mark it as loaded if we got it directly ###
        this.#components.push(component);
    }

    import(dynComponents) {
        const thisInstance = this;

        return new Promise(function (doneLoading) {
            // ### load the components ###
            dynComponents.forEach(comp => {


                thisInstance.add(comp);

                if (comp.preload) {
                    thisInstance.load(comp).then(() => {
                        if (thisInstance.#allComponentsLoaded) {
                            //doneLoading();
                        }
                    });
                }
            });
            doneLoading();
        });
    }

    /**
     * imports a single component and adds it to the list.
     * - marks the component as loaded after finishing
     * - returns a promise on success
     * 
     * @param {Component} component 
     * @returns Promise
     */
    load(component) {
        const self = this;

        if (!component)
            return;

        if (!component.hasOwnProperty("src")) {
            console.log("skipping ", component.name);
            return;
        }

        let componentIndex = self.#components.findIndex(c => (c.src == component.src));
        if (componentIndex == -1) {
            console.log("skipping as not found ", component);

            doneLoading(self.#components.find(c => (c.name == component.name)));
            return;
        }

        return new Promise(function (doneLoading) {

            import(component.src).then(
                function (loadedComponent) {
                    //if (componentIndex > -1) {
                    self.#components.splice(componentIndex, 1);
                    //}

                    // ### invoke the new component ###
                    const newComponentInstance = new loadedComponent.default(
                        {
                            app: self.#app
                        }
                    );
                    // ### hand component to app.components ###
                    self.add(newComponentInstance);

                    // ### we have finished ###
                    doneLoading(newComponentInstance);
                }

            );
        });
    };


    /**
     * runs a component
     * - if it isn't loaded, it will first load and then run it!
     * 
     * @param {string} componentName 
     * @returns boolean;
     */
    run(componentName, args = {}) {
        let component = this.#components.find(component => component.name == componentName);

        if (!component) {
            console.log(this.#components);

            return false;
        }

        if (!component.hasOwnProperty("app")) {
            this.load(component).then((newComp) => { newComp.main(args); });
            return true;
        }

        component.main(args);

        // ### reference the current component for later use (re-run) ###
        this.#currentComponent = component;
        return true;
    }

    get list() {
        return this.#components;
    }
}