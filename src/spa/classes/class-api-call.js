export class ApiCall {
    #errorHandler = null;
    mode = "cors";
    credentials = "same-origin";
    redirect = "follow";
    referrerPolicy = "no-referrer";
    headers = {
        // "Authorization": (app?.jwt) ? "Bearer " + app.jwt : '',
        "Upgrade-Insecure-Requests": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
    }
    setErrorHandler(handlerFunction) {
        this.#errorHandler = handlerFunction;
    }
    #getOptions(method) {
        let options = {
            "method": method.toUpperCase(),
            "mode": this.mode,
            "credentials": this.credentials,
            "headers": this.headers,
            "redirect": this.redirect, // manual, *follow, error
            "referrerPolicy": this.referrerPolicy, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }

        // ### bearer token? ###
        if (this.app?.jwt) {
            options.headers.Authorization = "Bearer " + app.jwt;
        }

        return options;
    }
    async #doReqeuest(path, options) {
        const response = await fetch(path, options);

        // ### Promise resolved and HTTP status is successful ###
        if (response.ok) {

            // ### check for JSON ###
            if (response.headers.get("content-type").includes("json")) {

                try {
                    return response.json();

                } catch (exeption) {
                    // ### or go as plain TEXT with warning ###
                    console.log("expected JSON as reply but got something else!");
                    console.log(dataPackage);

                    response.text().then(response => {

                        throw response;
                    });
                }
            }
            // ### TEXT as response is default and fallback ###
            return response.text();

        } else {
            if (this.#errorHandler) {
                this.#errorHandler(response);
            }

            // Custom message for failed HTTP codes
            console.error(`${response.status} ${response.statusText}`);

            // ### For any other server error ###
            throw response;
        }
    }

    constructor(app) {
        this.app = app;
    }

    /**
    * runs a call against the api (GET)
    * @param {string} path 
    * @returns {Promise}
    */
    async get(path) {
        return this.#doReqeuest(path, this.#getOptions("GET"));
    }

    /**
     * POST - most commonly used to create objects
     * @param {String} path 
     * @param {Object} payload 
     * @returns {Promise}
     */
    async post(path, payload) {
        payload = (typeof (payload) === "object") ? JSON.stringify(payload) : payload;
        let options = { ... this.#getOptions("POST"), "body": payload };

        return await fetch(path, options);
    }
    /**
     * PUT - most commonly used to create objects
     * @param {String} path 
     * @param {Object} payload 
     * @returns {Promise}
     */
    async put(path, payload) {
        payload = (typeof (payload) === "object") ? JSON.stringify(payload) : payload;
        let options = { ... this.#getOptions("PUT"), "body": payload };

        return await fetch(path, options);
    }

    async patch(path, payload) {
        payload = (typeof (payload) === "object") ? JSON.stringify(payload) : payload;
        let options = { ... this.#getOptions("PATCH"), "body": payload };

        return await fetch(path, options);
    }
    /**
     * DELETE - most commonly used to create objects
     * @param {String} path 
     * @param {Object} payload 
     * @returns {Promise}
     */
    async delete(path, payload) {
        payload = (typeof (payload) === "object") ? JSON.stringify(payload) : payload;
        let options = { ... this.#getOptions("DELETE"), "body": payload };

        return await fetch(path, options);
    }
}

/**
 * manages the api response and filter the common things like
 * - not authorized
 * - bad request
 * - success
 * 
 * @param {Object} responeObject 
 * @param {Function?} callbackOnSuccess 
 * @param {Function?} callbackOnError 
function apiResponseHandler(responeObject) {
    
    if (responeObject.status == 400) {
        responeObject.text().then(response => {
            
            if (callbackOnError) {
                callbackOnError(response);
            }
        });
    };
    
    if (responeObject.status == 401) {
        responeObject.text().then(response => {
            
            logout();
            
            message({
                text: response,
                context: "danger",
                ttl: 8
            });
            
            if (callbackOnError) {
                callbackOnError(response);
            }
        });
    };
}
*/