
export class ComponentSettings {
    constructor(settings) {
        this.app = settings.app ? settings.app : null;
        this.view = settings.view ? settings.view : null;
        this.name = settings.name ? settings.name : null;
    }
}

export class Component {
    callMainAfterLoad = false;

    onLoaded = () => {
        if (this.callMainAfterLoad)
            this.main();
    };

    constructor(settings) {
        this.app = settings.app ? settings.app : null;
        this.view = settings.view ? settings.view : null;
        this.name = settings.name ? settings.name : null;
        this.text = settings.text || this.name;
        this.icon = settings.icon || null;
        this.ual = settings.ual || null;
        this.group = settings.group || null;
        this.hideIt = settings.hideIt || false;
        this.order = settings.order || 9999;
    }
    main() {

    }
}

export class CrudComponent extends Component {
    constructor(settings) {
        super(settings);
    }
    main() {

    }

    create() {

    }
    read() {

    }
    update() {

    }
    delete() {
    }
}