export class ComponentSettings {
  constructor(settings) {
    this.app = settings.app ? settings.app : null;
    this.view = settings.view ? settings.view : null;
    this.name = settings.name ? settings.name : null;
  }
}

export class Component {
  callMainAfterLoad = false;
  #mainArgs = null;

  /**
   * function to run `main()` after all has been loaded
   */
  onLoaded = () => {
    if (this.callMainAfterLoad) {
      if (this.#mainArgs != null) {
        this.main(this.#mainArgs);
        this.#mainArgs = null;
      } else {
        this.main();
      }
    }
  };
  /**
   * function to call the home component
   */
  home = () => {
    if (this.app.components) this.app.components.run("home");
  };
  /**
   * returns the group this component may belong to
   */
  get group() {
    return this.#group ?? null;
  }

  /**
   * returns the ual for this component
   */
  get ual() {
    return this.#ual ?? null;
  }

  /**
   * set the calling arguments for main in case its needed
   * @param {arguments} args
   */
  set mainArgs(args) {
    this.#mainArgs = args;
  }

  constructor(settings) {
    this.app = settings.app ? settings.app : null;
    this.view = settings.view ? settings.view : null;
    this.name = settings.name ? settings.name : null;
    this.text = settings.text || this.name;
    this.icon = settings.icon || null;
    this.#ual = settings.ual || null;
    this.#group = settings.group || null;
    this.hideIt = settings.hideIt || false;
    this.order = settings.order || 9999;
  }
  main() {
    // some defaults
  }
}
