class Subscriber {
    constructor(pCallBack, pAction, pOnlyOnce) {
        this.callback = pCallBack || null;
        this.action = pAction || null;
        this.onlyOnce = pOnlyOnce || false;
    }
}

export class Trigger {
    #subscribers = [];
    constructor() {
        this.#subscribers = [];
    }
    /**
     * notify all subscribers
     * - optinally all subscribers with matching action phrase
     *
     * @param {Object|String} pPayload
     * @param {String} pAction
     * @memberof Trigger
     *
     */
    notify(pPayload, pAction) {
        let i,
            subscribers = this.#subscribers;

        for (i = 0; i < subscribers.length; i++) {

            if (subscribers[i].callback) {
                // ### did we get a filter? ###
                if (pAction) {
                    pAction = pAction.toLocaleLowerCase();

                    // ### we will only call back to the matching subscribers ###
                    if (subscribers[i].action == pAction) {
                        subscribers[i].callback(pPayload);

                        if (subscribers[i]) {


                            if (subscribers[i].onlyOnce) {
                                console.log("unsubscribe action:", subscribers[i]);
                                subscribers[i].unsubscribe();
                            }
                        }
                    }
                } else {
                    // ### no filter => all subscribers without action are called back ###
                    if (subscribers[i].action == null) {
                        subscribers[i].callback(pPayload);

                        if (subscribers[i].onlyOnce) {
                            subscribers[i].unsubscribe();
                        }
                    }
                }
            }
        }
    }

    /**
     * subscribe to the trigger with optional action filter
     * - tries to catch dupe subscriptions!
     * 
     * @param {Funktion} pCallBack
     * @param {String} pAction
     * @param {Boolean} pOnlyOnce
     * @returns Function used to unsubscribe
     * @memberof Trigger
     */
    subscribe(pCallBack, pAction, pOnlyOnce) {
        let newSubscriber = new Subscriber(pCallBack, pAction),
            i,
            subscribers = this.#subscribers;
        /**
         * remove a subscriber from the trigger array
         *
         * @param {Funktion} pCallBack
         * @param {String} pAction
         * @memberof Trigger
         */
        function removeSubscription(pCallBack, pAction) {
            for (i = 0; i < subscribers.length; i++) {

                if ((subscribers[i].callback == pCallBack) && (subscribers[i].action == pAction)) {
                    subscribers.splice(i, 1);
                    break;
                }
            }
        }
        if (pAction) {
            pAction = pAction.toLocaleLowerCase();
        }

        if (typeof (pOnlyOnce) !== "boolean") {
            pOnlyOnce = false;
        }

        // ### check if we've already got this subscription! ###
        for (i = 0; i < subscribers.length; i++) {

            if (
                (subscribers[i].callback.toString() == pCallBack.toString()) &&
                (subscribers[i].action == pAction) &&
                (subscribers[i].onlyOnce == pOnlyOnce)
            ) {
                return (subscribers[i].unsubscribe);
            }
        }

        newSubscriber.unsubscribe = () => {
            console.log("removing prior subscription:", pCallBack);
            removeSubscription(pCallBack, pAction);
        };

        // ### register the subscription ###
        subscribers.push(newSubscriber);

        // ### return a remove function ###
        return (newSubscriber.unsubscribe);
    }
}