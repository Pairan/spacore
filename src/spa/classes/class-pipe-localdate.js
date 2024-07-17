import { Pipe } from "./class-pipe.js";

export class PipeLocaleDate extends Pipe {
    #userContext;

    constructor(userContext) {
        super();
        this.token = "localedate";
        if (userContext)
            this.#userContext = userContext;
    }

    run(field, dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        // ### pick language from userContext.language or the browser setting! ###
        const targetLanguageCode = this.#userContext.language || navigator.language;

        return date.toLocaleDateString(targetLanguageCode, options);
    }
}