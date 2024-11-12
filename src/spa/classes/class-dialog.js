export class Dialog {
    #element = document.createElement("dialog");

    constructor(settings) {
        // ### passthrough the main needed features ###
        this.classList = this.#element.classList;
        this.close = this.#element.close.bind(this.#element);
        this.show = this.#element.show.bind(this.#element);
        this.showModal = this.#element.showModal.bind(this.#element);
        this.#element.role = "dialog";
        this.element.id = "dialog-" + Math.random();


        // ### any desired id? otherwise default ###
        if (settings) {

            if (settings.hasOwnProperty("id")) {
                this.element.id = settings.id;
            }
            // ### place initial html into the dialog? ###
            if (settings.hasOwnProperty("html")) {
                this.html = settings.html;
            }
        }
    }

    get element() {
        return this.#element;
    }
    get id() {
        return this.#element.id;
    }
    set id(pId) {
        this.#element.id = pId;
    }
    get isVisible() {
        return this.#element.open;
    }
    set html(pContent) {
        this.#element.innerHTML = pContent;
    }
    get html() {
        return this.#element.innerHTML;
    }
    append() {
        document.body.appendChild(this.#element);
    }
    remove() {
        this.#element.remove();
    }
};
//d = new Dialog();
/*
export default makePublic = function () {
    window.Dialog = Dialog;
}
*/

/** d
* dialog
* |-div.flex
* | |-header
* | | |-h2.title
* | | |-div.icons
* | | |-i.closer
* | |-div.content
* | |-div.footer
 */

export class DialogWindow extends Dialog {
    constructor(settings) {
        super();
        this.html = '<div class="flex">        <header>          <h2 class="title"></h2><div class="icons"></div><div class="closer">X</div></header><div class="content"></div><div class="footer"></div></div>';

        // ### enable a closer ###
        if (this.element.querySelector(".closer"))
            this.element.querySelector(".closer").addEventListener("click", this.close);
    }
    set title(content) {
        this.element.querySelector('.title').innerHTML = content;
    }
    set content(content) {
        this.element.querySelector('.content').innerHTML = content;
    }
    set footer(content) {
        this.element.querySelector('.footer').innerHTML = content;
    }
    get icons() {
        return this.element.querySelector('.icons');
    }
    set icons(content) {
        this.icons.innerHTML = content;
    }

    addIcon(iconStyle) {
        const newIcon = document.createElement("div"),
            icons = this.icons;
        newIcon.className = "icon " + iconStyle;

        if (icons) {
            icons.append(newIcon);
        }
    }

    clearIcons() {
        this.icons.innerHTML = "";
    }
}
/*
createDialog = (pId) => {
    let vObject = {
        isVisible: false,
        id: null,
        node: null,
        html: null,
        abortCallback: null,
        closeCallback: null
    };
    
}

*/