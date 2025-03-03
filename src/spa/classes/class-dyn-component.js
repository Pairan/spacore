export class DynComponent {
  #ual = null;
  #group = null;

  constructor(settings) {
    this.src = settings.src || null;
    this.name = settings.name || null;
    this.preload = settings.preload || false;
    this.#ual = settings.ual || null;
    this.#group = settings.group || null;
  }
  get group() {
    return this.#group;
  }
  get ual() {
    return this.#ual;
  }
}
export class DynComponentWithNav extends DynComponent {
  constructor(settings) {
    super(settings);
    this.text = settings.text || this.name;
    this.icon = settings.icon || "";
    this.hideIt = settings.hideIt || false;
    this.order = settings.order || 9999;
  }
}
