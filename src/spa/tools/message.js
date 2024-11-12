/** 
 *  display a message/notification
 * @param {string|object} pContent  Text/html as it is or as object accepting
*  param {object} [pContent.root]  the parent/root object to attach the message to
 * @param {string} [pContent.text]  the text/html to display
 * @param {string} [pContent.context]  like shown in https://getbootstrap.com/docs/4.3/components/alerts/#examples
 * @param {boolean} [pContent.closer]  show a closer icon
 * @param {Number} [pContent.ttl]  time to live in seconds before auto-dismiss!
 */
export function message(pContent) {
    var vRoot = document.createElement("div"),
        vMessage = document.createElement("div"),
        vCloser = document.createElement("button");

    var dismiss = function () {

        // ### remove the message from dom ###
        function removeIt() {
            vMessage.remove();

            if (vRoot.children.length == 0) {

                if (document.getElementById(vRoot.id))
                    document.getElementById(vRoot.id).remove();
            }
        }
        // ### remove old animation class ###
        vMessage.classList.remove("message-in");

        // ### adding a listener to the window ###
        vMessage.addEventListener('animationend', (event) => {
            removeIt();
        });

        // ### mark message as done => starts fading animation ###
        vMessage.classList.add("message-out");

        // ### do we have an animation? ###
        if (getComputedStyle(vMessage, null)["animation-name"] != "message-out") {
            removeIt();
        }
    };

    vRoot.id = "spaMessage";

    // ### message layer already open? ##
    if (!document.getElementById(vRoot.id)) {
        let root = (pContent.root) ? pContent.root : document.body;

        // ### insertAdjacentElement is first available from FF 48, Edge 17 ! ###
        if (!root.insertAdjacentElement) {
            var vBefore = root.firstElementChild;
            root.insertBefore(vRoot, vBefore);
        } else {
            root.insertAdjacentElement("afterbegin", vRoot); // <div id="spaMessage" class="modal"></div>
        }
    } else {
        vRoot = document.getElementById(vRoot.id);
    }

    // ### style the alert ###
    vMessage.className = "alert message-in";
    vMessage.innerHTML = pContent.text || pContent;

    // ### any special context to override "alert-secondary" ? ###
    if (pContent.context) {
        vMessage.classList.add("alert-" + pContent.context);
    }
    // ### add the closer ###
    vCloser.type = "button";
    vCloser.className = "close";
    vCloser.innerHTML = '<span aria-hidden="true">&times;</span>';

    vCloser.addEventListener("click", dismiss);
    vMessage.appendChild(vCloser);

    vRoot.insertBefore(vMessage, vRoot.firstElementChild);

    if (pContent.hasOwnProperty("ttl")) {
        window.setTimeout(dismiss, pContent.ttl * 1000);
    }
};

window.message = message;