/* ### tab manager for SpaCore !VERSION! / BUILD !BUILD! ### */

import { Trigger } from "./class-trigger.js";

/**
 * describes the tab and it's content
 *
 * @class Tab
 */
class Tab {
    #name;
    constructor(name, caption, content = null) {
        if (typeof (name) == "object") {
            if (name.hasOwnProperty("caption")) {
                caption = name.caption;
            }
            if (name.hasOwnProperty("content")) {
                content = name.content;
            }
            if (name.hasOwnProperty("name")) {
                name = name.name;
            }
        }

        if (name == "") {
            console.log("class tab error: name not defined! ");
            return (null);
        }
        this.#name = name;

        // ### creating a pusher element and adding the given name to it ###
        this.pusher = document.createElement("span");
        this.pusher.className = "pusher";
        this.pusher.name = name;
        this.pusher.text = document.createElement("span");
        this.pusher.notification = document.createElement("notify");

        this.pusher.appendChild(this.pusher.text);
        this.pusher.appendChild(this.pusher.notification);

        if (caption != "") {
            this.caption = caption;
        }

        // ### creating an outpot container ###
        this.output = document.createElement("div");

        // ### prefill the content ###
        if (content != "") {
            this.content = content;
        }
    }
    get name() {
        return this.#name;
    }

    get content() {
        return this.output.innerHTML;
    }

    set content(html) {
        this.output.innerHTML = html;
    }

    get caption() {
        return (this.pusher.text.innerHTML);
    }

    set caption(text) {
        this.pusher.text.innerHTML = text;
    }

    setNotification(pValue, pType) {
        if (!pValue) {
            this.pusher.classList.remove("notify");
            this.pusher.notification.innerText = "";
            this.pusher.notification.className = "";
            return;
        }

        // ### flag this pusher to have an active notification
        this.pusher.classList.add("notify");

        // ### optional type, eg. color class ###
        if (pType)
            this.pusher.notification.className = pType;

        this.pusher.notification.innerText = pValue;
    }
    get name() {
        return this.#name;
    }
}

/**
 * builds a new instance of the tabManager
 * 
 * Prefers a html construct like: 
 * ```html <div class="spa-tab">
    <div class="spa-tab-items">

    </div>
</div>
<div class="tab-output"></div>
```
 * 
 * @param {HTMLElement} tabNode
 * @param {HTMLElement} viewContainer
 */
export class TabManager {
    #currentTab = null;
    #trigger = null;
    #lastTabName = null;

    #eventhandler = (event) => {
        let target = event.target,
            parent = event.target.parentNode;

        // ### pusher: show a tab on click of a pusher ###
        if (target.classList.contains("pusher")) {
            this.show(target.name);
            return;
        }

        // ### pusher text: show a tab on click of a pusher ###
        if (parent.classList.contains("pusher")) {
            this.show(parent.name);
        }
    }
    constructor(tabNode, viewContainer) {

        if (!tabNode) {
            alert("tabManager: no tabArea defined!");
            return;
        }

        // ### check if node is there ###
        if (typeof (tabNode) !== "object") {
            alert("tabManager: tabArea not found");
            return;
        }

        if (typeof (viewContainer) !== "object") {
            alert("tabManager: no contentArea defined!");
            return;
        }

        this.tabObjects = {};
        this.#currentTab = null;
        this.#trigger = null;

        this.tabContainer = tabNode;
        this.view = viewContainer;

        // ### attach the event handler ###
        this.tabContainer.addEventListener("click", this.#eventhandler);
    }

    #switchCurrentTo(tabName) {
        if (!this.tab(tabName))
            return;

        if (tabName == this.#currentTab.name)
            return;

        // ### do we still have that tab? ###
        if (this.tab(this.#currentTab.name)) {

            // ### remember the last tab we used ###
            this.#lastTabName = this.#currentTab.name;

            // ### handle old "current" tab ###
            this.#currentTab.output.hidden = true;
            this.#currentTab.pusher.classList.remove("current");
        }

        // ### make tabName the new current ###
        this.#currentTab = this.tab(tabName);
        this.#currentTab.pusher.classList.add("current");
        this.#currentTab.output.hidden = false;

        // ### notify subscriber ###
        if (this.#trigger) {
            this.#trigger.notify(tabName);
        }
    }
    /**
     * get a tab by its name
     * @param {string} tabName 
     * @returns Tab
     */
    tab(tabName) {
        return this.tabObjects[tabName] || null;
    }

    /**
     * returns all tabs in an object
     */
    get allTabs() {
        return this.tabObjects;
    }

    /**
     * returns the current active tab
     */
    get current() {
        return this.#currentTab;
    }

    show(tabName) {
        // ### set it as current active tab ###
        this.#switchCurrentTo(tabName);
    }
    /**
     * adds a new tab to the tab manager
     * @param {string} tabName 
     * @param {string} caption 
     * @param {string} content 
     * @returns Tab
     */
    add(tabName, caption, content) {

        // ### create new Tab ###
        let newTab = new Tab(tabName, caption, content);

        // ### put it to the others ###
        this.tabObjects[newTab.name] = newTab;

        // ### make sure, tabName from here is newTab.name as tabName could have been an object! ###
        tabName = newTab.name;

        // ### add pusher to tab element ###
        this.tabContainer.appendChild(this.tab(tabName).pusher);

        // ### add output container to view ###
        this.view.appendChild(this.tab(tabName).output);

        // ### mark the first tab as current active ###
        if (!this.#currentTab) {
            this.#currentTab = this.tab(tabName);
            this.tab(tabName).pusher.classList.add("current");

            this.#lastTabName = tabName;
        }

        if (this.#currentTab.name != tabName) {
            this.tab(tabName).output.hidden = true;
        }
        return this.tab(tabName);
    }

    /**
     * removes a tab by its name
     * @param {string} tabName 
     * @returns boolean
     */
    remove(tabName) {
        if (!this.tab(tabName))
            return false;

        // ### switch to the last tab? ###
        if (this.#currentTab.name == tabName) {
            this.show(this.#lastTabName);
        }

        // ### remove HTMLObjects ###
        this.tab(tabName).output.remove();
        this.tab(tabName).pusher.remove();

        // ### and finally the tab itself ###
        delete this.tabObjects[tabName];

        return true;
    };
    subscribe(callBack, action, onlyOnce = false) {
        if (!this.#trigger) {
            this.#trigger = new Trigger();
        }
        // ### action: "commit", "set","refresh" ...
        if (!action)
            action = "";

        return (this.#trigger.subscribe(callBack, action, onlyOnce));
    }
}