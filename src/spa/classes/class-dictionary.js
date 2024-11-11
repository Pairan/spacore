export class Dictionary {
    #currentLanguage = navigator.language;
    #languages = {};

    constructor(settings) {

        if (settings?.hasOwnProperty("language")) {
            this.#currentLanguage = settings.language;
        }

        this.loadLanguage(this.#currentLanguage);
    }
    setLanguage = (code) => {
        this.#currentLanguage = code;

        if (!this.#languages.hasOwnProperty(code)) {
            this.loadLanguage(code);
        }
    }

    loadLanguage = (code) => {
        self = this;
        const fileName = `../languages/${code}.js`;

        return new Promise(function (doneLoading) {
            import(fileName).then((pack) => {
                self.#languages[code] = pack.languagePack;
                console.log("loaded language pack: ", code);

                doneLoading();
            }).catch((err) => {
                const fallbackCode = code.substring(0, 2);
                const fallbackFileName = `../languages/${fallbackCode}.js`

                import(fallbackFileName).then((pack) => {
                    self.#languages[code] = pack.languagePack;
                    console.log("loaded language pack: ", code);

                    doneLoading();
                });
                console.log("fallback to language pack: ", fallbackCode);
            });
        });
    }
    /**
     * get all tokens with their translations in the desired language 
     * @param {string?} code - a language code or the current set language is used
     * @returns Object
     */
    language(code = this.#currentLanguage) {

        if (!this.#languages.hasOwnProperty(code)) {
            console.log(`Dictonary: no language pack for ${code}`);
            return {};
        }

        return this.#languages[code];
    }
    /**
     * returns the translation of the given token. Per default the current language is used
     * @param {string} token - the token of which we want the translation
     * @param {string?} language - optional, uses the current set language as default
     * @returns String
     */
    getToken(token, language = this.#currentLanguage) {
        let dict = this.#languages[language];
        let tokenParts = token.split(".");

        // ### component node? ###
        if (token.includes(".")) {
            while (tokenParts.length > 2) {
                let subtoken = tokenParts.shift();
                if (!dict.hasOwnProperty(subtoken)) {
                    break;
                }
                dict = { ...dict[subtoken] };
            }
        }

        let componenNode = (dict.hasOwnProperty(tokenParts[0])) ? dict[tokenParts[0]] : null,
            index = tokenParts[1];

        // ### look for the componentNode ###
        if (componenNode) {
            if (componenNode.hasOwnProperty(index)) {
                return componenNode[index];
            }
        }

        return dict[token] || token;
    }
}