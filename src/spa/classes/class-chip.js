export class Chip {
    #element = null;
    #textElement;
    #iconElement = null;
    #imgElement = null;
    #remover;
    #onRemove;

    constructor(settings) {
        this.#textElement = document.createElement("span");
        this.#remover = document.createElement("i");

        // ### add css styles ###
        this.#textElement.className = "text";
        this.#remover.className = "far fa-times-circle remover";

        // ### create the element ###
        this.#element = document.createElement("spa-chip");
        this.#element.data = {};

        // ### a class? ###
        if (settings.hasOwnProperty("class")) {
            this.#element.className = settings.class;
        }

        // ### icon? ###
        if (settings.hasOwnProperty("icon")) {
            this.#iconElement = document.createElement("i");
            this.#element.appendChild(this.#iconElement);
            this.#iconElement.className = settings.icon;
        }
        // ### image ? ###
        if (settings.hasOwnProperty("image")) {
            this.#imgElement = document.createElement("img");
            this.#element.appendChild(this.#imgElement);
            this.#imgElement.src = settings.image;
        }
        // ### text ###
        if (settings.hasOwnProperty("text")) {
            // ### set the text ###
            this.text = settings.text;

            // ### append the node ### 
            this.#element.appendChild(this.#textElement);
        }

        // ### data ###
        if (settings.hasOwnProperty("data")) {
            this.#element.data = settings.data;
        }

        // ### remover ###
        if (settings.hasOwnProperty("removable")) {
            const isRemovable = (typeof (settings.removable) === "boolean") ? settings.removable : false;

            if (isRemovable) {
                // ### add the element ###
                this.#element.appendChild(this.#remover);

                // ### want a callBack? ###
                if (settings.hasOwnProperty("onRemove")) {
                    if (settings.onRemove instanceof Function) {
                        this.#onRemove = settings.onRemove;
                    }
                }
                // ### add the event listener ###
                this.#remover.addEventListener("click", () => this.remove.apply(this));
            }
        }
    }
    get element() {
        return this.#element;
    }

    get class() {
        return this.#element.className;
    }
    set class(cssClass) {
        this.#element.className = cssClass;
    }

    get text() {
        return his.#textElement.innerHTML;
    }
    set text(textContent) {
        this.#textElement.innerHTML = textContent;
    }

    get icon() {
        return this.#iconElement?.className;
    }

    set icon(cssClass) {
        if (!this.#iconElement)
            return;
        this.#iconElement.className = cssClass;
    }

    get data() {
        return this.#element.data;
    }
    set data(content) {
        this.#element.data = content;
    }

    remove() {
        this.#element.remove();

        if (this.#onRemove)
            this.#onRemove(this.data);
    }
}