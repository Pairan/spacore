export class Renderer {
    #pipes = {};

    constructor(settings) {
    }
    addPipe(newPipe) {
        this.#pipes[newPipe.token.toLowerCase()] = newPipe;
    }
    translate(html, boilerplates = {}) {
        let bracketEnd,
            value,
            brackets = html.split("{{");

        // ### skip the first! ###
        for (let i = 1; i < brackets.length; i++) {
            let bracket = brackets[i],
                field = null,
                pipe = null;

            // ### find closing brackets }} ###
            bracketEnd = bracket.indexOf('}}');

            // ### we didn't find it - bail ###
            if (bracketEnd === -1)
                continue;

            // ### get contents of the bracket ###
            bracket = bracket.substr(0, bracketEnd);

            // ### still in html? ###
            if (!html.indexOf('{{' + bracket + '}}'))
                continue;

            // ### inspect content: do we have a pipe? ###
            if (bracket.indexOf("|")) {
                field = String(bracket.split("|")[0]).trim();
                pipe = bracket.split("|")[1];
                if (pipe)
                    pipe = pipe.toLowerCase();
                /*
                    console.log("found field:", field, " found pipe:", pipe);
            */
            } else {
                field = bracket.trim();
                //console.log("found field:", field,);
            }

            if (boilerplates.hasOwnProperty(field)) {

                value = boilerplates[field];
            }

            if (pipe) {
                if (this.#pipes.hasOwnProperty(pipe)) {
                    value = this.#pipes[pipe].run(field, value);
                }
            }

            // ### finally replace all matching brackets ###
            bracket = '{{' + bracket + '}}';
            /*
            bracket = '{{' + bracket.replace('|', '\\|') + '}}';
            let reg = new RegExp(bracket, "gi");
            html = html.replace(reg, value);
            */
            html = html.replaceAll(bracket, value);
        }
        return (html);
    }
}
