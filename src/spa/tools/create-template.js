export function createTemplate(pFile, pCallback) {
    var template = {
        file: pFile || "",
        html: "",
        fieldscope: [],
        loaded: false,
        parsed: false,
    };

    if (!template.file)
        return (template);


    // ### load the template, pre-parse it ###
    fetch(template.file)
        .then(response => response.text())
        .then(function (response) {
            var i,
                vFields,
                vNode,
                vHtml = document.createElement("DIV");

            // ### put the data into html ###
            template.html = response || response.text || response;
            vHtml.innerHTML = template.html;

            // ### mark template as loaded ###
            template.loaded = true;

            // ### get the fieldscope of the template 1: Attributes and Inputs ###
            vFields = vHtml.querySelectorAll("input,textarea,select, [data-field]") || "";
            if (vFields.length) {
                for (i = 0; i < vFields.length; i++) {
                    vNode = vFields[i];

                    if (vNode.hasAttribute("name"))
                        template.fieldscope.push(vNode.name);

                    if (vNode.getAttribute("data-field")) {
                        if (!template.fieldscope.includes(vNode.getAttribute("data-field")))
                            template.fieldscope.push(vNode.getAttribute("data-field"));
                    }
                }
            }

            // ### modify template for prefix and suffix ###
            if (template.html.indexOf("<!--") === 0) {
                template.prefix = template.html.substring(template.html.indexOf("<!--"), template.html.indexOf("\n")) || "";
                template.html = template.html.substring(template.html.indexOf("\n") + 1);
            }
            if (template.html.indexOf("\n <!--") > -1) {
                template.suffix = template.html.substring(template.html.indexOf("\n <!--")) || "";
                template.html = template.html.substring(0, template.html.indexOf("\n <!--"));
            }

            // ### get the fieldscope of the template 2: {{FIELDNAME}} ###
            vFields = String(template.html).match(/\{\{[\wß|:.-\s]*\w*\}\}/gim) || "";
            if (vFields.length) {
                for (i = 0; i < vFields.length; i++) {
                    vNode = vFields[i];

                    // ### do we have a modier? ###
                    if (vNode.indexOf(":") > -1) {
                        vNode = vNode.split(":")[1];
                    }

                    // ### remove brackets ###
                    vNode = vNode.replaceAll("{", "").replaceAll("}}", "");

                    if (!template.fieldscope.includes(vNode)) template.fieldscope.push(vNode);
                }
            }

            // ### reformat the fieldscope array to a String with ";" as seperator ###
            template.fieldscope = template.fieldscope.join(";");

            // ### mark template as parsed ###
            template.parsed = true;
            if (pCallback) {
                pCallback();
            }
        });

    return (template);
}