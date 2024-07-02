class Subscriber {
    constructor(pCallBack, pAction, pOnlyOnce) {
        this.callback = pCallBack || null;
        this.action = pAction || null;
        this.onlyOnce = pOnlyOnce || false;
    }
}

export class Observable {
    #observers = [];
    constructor() {
        this.#observers = [];
    }
    /**
     * notify all subscribers
     * - optinally all subscribers with matching action phrase
     *
     * @param {Object|String} pPayload
     * @param {String} pAction
     * @memberof Observable
     */
    notify(pPayload, pAction) {
        let i,
            observers = this.#observers;

        for (i = 0; i < observers.length; i++) {

            if (observers[i].callback) {
                // ### did we get a filter? ###
                if (pAction) {

                    // ### we will only call back to the matching subscribers ###
                    if (observers[i].action == pAction) {
                        observers[i].callback(pPayload);

                        if (observers[i]) {


                            if (observers[i].onlyOnce) {
                                console.log("unsubscribe action:", observers[i]);
                                observers[i].unsubscribe();
                            }
                        }
                    }
                } else {
                    // ### no filter => all subscribers without action are called back ###
                    if (observers[i].action == null) {
                        observers[i].callback(pPayload);

                        if (observers[i].onlyOnce) {
                            console.log("unsubscribe:", observers[i]);
                            observers[i].unsubscribe();
                        }
                    }

                }
            }


        }
    }

    /**
     * subscribe to the observer with optional action filter
     * - tries to catch dupe subscriptions!
     * 
     * @param {Funktion} pCallBack
     * @param {String} pAction
     * @param {Boolean} pOnlyOnce
     * @returns Function used to unsubscribe
     * @memberof Observable
     */
    subscribe(pCallBack, pAction, pOnlyOnce) {
        let newSubscriber = new Subscriber(pCallBack, pAction),
            i,
            observers = this.#observers;
        /**
         * remove a subscriber from the observer array
         *
         * @param {Funktion} pCallBack
         * @param {String} pAction
         * @memberof Observable
         */
        function removeSubscription(pCallBack, pAction) {
            var i;
            for (i = 0; i < observers.length; i++) {

                if ((observers[i].callback == pCallBack) && (observers[i].action == pAction)) {
                    observers.splice(i, 1);
                    break;
                }
            }
        }

        if (typeof (pOnlyOnce) !== "boolean") {
            pOnlyOnce = false;
        }

        // ### check if we've already got this subscription! ###
        for (i = 0; i < observers.length; i++) {

            if (
                (observers[i].callback.toString() == pCallBack.toString()) &&
                (observers[i].action == pAction) &&
                (observers[i].onlyOnce == pOnlyOnce)
            ) {
                return (observers[i].unsubscribe);
            }
        }

        newSubscriber.unsubscribe = function () {
            console.log("removing prior subscribtion:", pCallBack);
            removeSubscription(pCallBack, pAction);
        };

        // ### register the subscription ###
        observers.push(newSubscriber);

        // ### return a remove function ###
        return (newSubscriber.unsubscribe);
    }


}

