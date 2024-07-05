import { Observable } from "../classes/class-observable.js";
import { fromJWT } from "../tools/from-jwt.js";

export class UserContext {
    #jwt;
    #language = navigator.language;
    #observer = null;

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

        if (this.#observer) {

            this.#observer.notify(this.#language, "language");
        }
    }

    jwtPayload(key) {
        return fromJWT(this.#jwt, key);
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
        // ### if we don't have an instance of Observable(), then get one ###
        if (!this.#observer) {
            this.#observer = new Observable();
        }

        // ### let's do them lower case ###
        if (pAction)
            pAction = pAction.toLowerCase();

        // ### we will use these actions and neutralize others ###
        if (pAction !== "language") {
            pAction = null;
        }

        return (this.#observer.subscribe(pCallBack, pAction));
    };
}