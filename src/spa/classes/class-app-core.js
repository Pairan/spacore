import { Observable } from "./class-observable.js";

export class AppCoreSettings {
    constructor(settings) {

        if (settings.hasOwnProperty("name")) {
            this.name = settings.name;
        }
        if (settings.hasOwnProperty("selector")) {
            this.selector = settings.selector;
        }
        if (settings.hasOwnProperty("title")) {
            this.title = settings.title;
        }

    }
    name = "SPA app";
    selector = "spa-app";
}

export class AppCore {
    #observer = null;
    #titleTag;
    constructor(settings) {

        if (settings.hasOwnProperty("name")) {
            this.name = settings.name;
        }

        // ### bootstrapping the app ###
        this.view = document.querySelector(settings.selector) || null;

        if (!this.view) {
            console.error(this.name + `: can't find '<${settings.selector}></${settings.selector}> in dom!`);
            return;
        }

        // ### reference the title tag ###
        this.#titleTag = document.querySelector("title") || null;

        if (settings.hasOwnProperty("title")) {
            this.title = settings.title;
        }
    }

    get title() {
        if (!this.#titleTag)
            return;
        return this.#titleTag.innerHTML;
    }
    set title(text) {
        if (!this.#titleTag)
            return;

        // ### backup the last title ###
        this.#titleTag.oldTitle = this.#titleTag.innerHTML;

        // ### set the new title ###
        this.#titleTag.innerHTML = text;
    }

    subscribe(callBack, action) {
        // ### if we don't have an instance of Observable(), then get one ###
        if (!this.#observer) {
            this.#observer = new Observable();
        }

        // ### let's do them lower case ###
        if (!action)
            return;

        action = action.toLowerCase();

        return (this.#observer.subscribe(callBack, action));
    }

    notify(payload = null, action) {
        if (!this.#observer)
            return;

        if (!action)
            return;

        action = action.toLowerCase();

        this.#observer.notify(payload, action)
    }
    name = "SPA app";
    view = null;
    data = {};
}