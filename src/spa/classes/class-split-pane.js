export class SplitPane {
    #md = {};
    #splitPaneWidget;
    #splitPane;
    #leftPane;
    #rightPane;
    #setup = {
        leftPaneSize: "10",
        limit: "10",
        class: ""
    };
    #lastSetup;

    #eventHandler = (event) => {
        event.preventDefault();
        const self = this;

        // ### mousedown ###
        if (event.type === "mousedown") {
            this.#md = {
                event,
                leftWidth: this.#leftPane.offsetWidth,
            };

            // ### flag "mouseDown" ###           
            document.addEventListener("mousemove", this.#eventHandler);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", self.#eventHandler);
                self.#md = {};
            });
        }

        // ### mouse moving and mouseDown
        if (event.type === "mousemove") {
            var delta = event.clientX - this.#md.event.x;

            // ### calculate new sizes ###
            delta = Math.max(delta, -this.#md.leftWidth);
            delta = (this.#md.leftWidth + delta);

            // ### min ### 
            if (((100 / this.#splitPaneWidget.offsetWidth) * delta) < this.#setup.limit) {
                delta = (this.#splitPaneWidget.offsetWidth / 100) * this.#setup.limit;
            }

            // ### max ### 
            if (((100 / this.#splitPaneWidget.offsetWidth) * delta) > (100 - this.#setup.limit)) {
                delta = (this.#splitPaneWidget.offsetWidth / 100) * (100 - this.#setup.limit);
            }

            // ### set the sizes ###
            this.#splitPaneWidget.style.gridTemplateColumns = delta + "px 5px auto";
        }
    }

    constructor(settings = {}) {
        // ### the main element ###
        this.#splitPaneWidget = document.createElement("div");

        // ### the bar to pull ###
        this.#splitPane = document.createElement("div");

        // ### two outputs ###
        this.#leftPane = document.createElement("div");
        this.#rightPane = document.createElement("div");

        // ### initial size of left Pane in % ###
        if (settings.hasOwnProperty("leftPaneSize")) {
            this.#setup.leftPaneSize = settings.leftPaneSize;
        }

        // ### min max limits in % ###
        if (settings.hasOwnProperty("limit")) {
            this.#setup.limit = settings.limit;
        }

        // ### should we set a specific class? ###
        if (settings.hasOwnProperty("class")) {
            this.#setup.class = settings.class;
        }

        // ### add some style to it ###
        this.#splitPaneWidget.classList.add("spa-split-pane");
        this.#leftPane.classList.add("pane", "left");
        this.#rightPane.classList.add("pane", "right");

        if (this.#setup.class !== "")
            this.#splitPaneWidget.classList.add(this.#setup.class);

        this.#splitPaneWidget.style.display = "grid";

        this.#splitPane.classList.add("splitter");

        // ### create the basic setup ###
        this.#splitPaneWidget.appendChild(this.#leftPane);
        this.#splitPaneWidget.appendChild(this.#splitPane);
        this.#splitPaneWidget.appendChild(this.#rightPane);

        // ### set the size ###
        this.#splitPaneWidget.style.gridTemplateColumns = this.#setup.leftPaneSize + "% 5px auto";

        // ### install handler ###
        this.#splitPane.addEventListener("mousedown", this.#eventHandler);

        this.#md = {};
        this.#lastSetup = null;
    }

    get widget() {
        return this.#splitPaneWidget;
    }

    get leftPane() {
        return this.#leftPane;
    }
    get rightPane() {
        return this.#rightPane;
    }

    setLeftPane(percent) {
        this.#splitPaneWidget.style.gridTemplateColumns = percent + "% 5px auto";
    }
    setRightPane(percent) {
        this.#splitPaneWidget.style.gridTemplateColumns = "auto 5px " + percent + "%";
    }

    leftOnly() {
        if (!this.#lastSetup)
            this.#lastSetup = this.#splitPaneWidget.style.gridTemplateColumns;

        this.#splitPaneWidget.style.gridTemplateColumns = "100% 0 0";

        this.#rightPane.hidden = true;
        this.#splitPane.hidden = true;
        this.#leftPane.hidden = false;
    }

    rightOnly() {
        if (!this.#lastSetup)
            this.#lastSetup = this.#splitPaneWidget.style.gridTemplateColumns;

        this.#splitPaneWidget.style.gridTemplateColumns = "0 0 100%";

        this.#leftPane.hidden = true;
        this.#splitPane.hidden = true;
        this.#rightPane.hidden = false;
    }

    both() {
        if (!this.#lastSetup)
            return;

        this.#splitPaneWidget.style.gridTemplateColumns = this.#lastSetup;

        this.#splitPane.hidden = false;
        this.#leftPane.hidden = false;
        this.#rightPane.hidden = false;

        this.#lastSetup = null;
    };
}