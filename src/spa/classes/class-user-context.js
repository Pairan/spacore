import { Trigger } from "./class-trigger.js";

export class UserContext {
    #jwt;
    #language = navigator.language;
    #trigger = null;

    constructor(settings) {
        let oldJwt = localStorage.getItem("jwt");

        if (oldJwt !== "false") {
            this.#jwt = oldJwt;
        }

        if (settings?.hasOwnProperty("language")) {
            this.language = settings.language;
        }
    }

    get jwt() {
        return this.#jwt;
    }
    set jwt(token) {
        this.#jwt = token;
    }

    get language() {
        return this.#language;
    }
    set language(code) {
        this.#language = code;

        if (this.#trigger) {

            this.#trigger.notify(this.#language, "language");
        }
    }

    fromJWT(key) {
        if (!this.#jwt)
            return ("");

        var b64DecodeUnicode = function (str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        };

        let jwtparts = b64DecodeUnicode(this.#jwt.split(".")[1]),
            payload = JSON.parse(jwtparts);

        payload = payload[key] || "";

        return (payload);
    }

    isLoggedIn() {
        return (this.#jwt != null);
    }
    /**
    * subscribe changes of the database
    *
    * @param {function} pCallBack
    */
    subscribe = function (pCallBack, pAction) {
        // ### if we don't have an instance of Trigger(), then get one ###
        if (!this.#trigger) {
            this.#trigger = new Trigger();
        }

        // ### let's do them lower case ###
        if (pAction)
            pAction = pAction.toLowerCase();

        // ### we will use these actions and neutralize others ###
        if (pAction !== "language") {
            pAction = null;
        }

        return (this.#trigger.subscribe(pCallBack, pAction));
    };
}