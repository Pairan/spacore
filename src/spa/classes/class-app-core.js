import { Trigger } from "./class-trigger.js";

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
    #trigger = null;
    #titleTag;
    #currentTheme = "light";

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

        // ### preferred theme? light is default, check for dark ###
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.#currentTheme = "dark";
        }
        // ### check for a save preference ###
        if (localStorage.getItem('theme')) {
            this.#currentTheme = localStorage.getItem('theme');
        }

        // ### set theme ###
        this.setTheme(this.#currentTheme);
    }
    setTheme(which) {
        if (which) {
            this.#currentTheme = which;
        }

        localStorage.setItem('theme', this.#currentTheme);

        if (which == "light") {
            this.#currentTheme = "";
        }
        document.documentElement.className = this.#currentTheme;
    }
    get title() {
        if (!this.#titleTag)
            return "";

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
        // ### if we don't have an instance of Trigger(), then get one ###
        if (!this.#trigger) {
            this.#trigger = new Trigger();
        }

        // ### let's do them lower case ###
        if (!action)
            return;

        action = action.toLowerCase();

        return (this.#triggger.subscribe(callBack, action));
    }

    notify(payload = null, action) {
        if (!this.#trigger)
            return;

        if (!action)
            return;

        action = action.toLowerCase();

        this.#trigger.notify(payload, action)
    }
    name = "SPA app";
    view = null;
    data = {};
}