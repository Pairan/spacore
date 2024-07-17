import { Pipe } from "./class-pipe.js";

/**
* localizes the token into the current language
* @param {string} token
* @returns string
*/
export class PipeLocalized extends Pipe {
    #dictionary = {};
    constructor(dictionary) {
        super();
        this.#dictionary = dictionary;
        this.token = "localized";
    }

    run(token) {

        // ### component node? ###
        if (token.includes(".")) {
            const tokenParts = token.split(".");
            let componentNode = (this.#dictionary.language().hasOwnProperty(tokenParts[0])) ? this.#dictionary.language()[tokenParts[0]] : null,
                index = tokenParts[1];

            // ### look for the componentNode ###
            if (componentNode) {
                if (componentNode.hasOwnProperty(index)) {
                    return componentNode[index];
                }

                console.info(`pipe-localized: can't find translation ${tokenParts[0]} => ${index}`);
            }
        }

        return this.#dictionary.language()[token] || token;
    }
}