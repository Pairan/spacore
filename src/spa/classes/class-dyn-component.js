export class DynComponent {
    constructor(settings) {
        this.src = settings.src || null;
        this.name = settings.name || null;
        this.preload = settings.preload || false;
    }
}
export class DynComponentWithNav extends DynComponent {
    constructor(settings) {
        super(settings);
        this.text = settings.text || this.name;
        this.icon = settings.icon || "";
        this.ual = settings.ual || null;
        this.group = settings.group || null;
        this.hideIt = settings.hideIt || false;
        this.order = settings.order || 9999;
    }
}