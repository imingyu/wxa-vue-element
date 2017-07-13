import { isWxaElement } from '../element.js';
import { $on, $off } from './index.js';

var transformTimeStamp = val => { return parseInt(val.toFixed(0)); };

export class BaseEvent {
    constructor(type, nativeEvent, currentComponentInc) {
        this.type = type;
        this.timeStamp = transformTimeStamp(nativeEvent.timeStamp);
        this.target = {};
        var target = nativeEvent.target;
        if (isWxaElement(target)) {
            Object.defineProperties(this.target, {
                id: {
                    get() {
                        return target.id;
                    },
                    enumerable: true
                },
                tagName: {
                    get() {
                        return target.__vue__.$wxa.tagName;
                    },
                    enumerable: true
                },
                dataset: {
                    get() {
                        return target.__vue__.$wxa.dataset;
                    },
                    enumerable: true
                }
            })
        }
        this.currentTarget = {};
        if (currentComponentInc) {
            Object.defineProperties(this.currentTarget, {
                id: {
                    get() {
                        return currentComponentInc.$el.id;
                    },
                    enumerable: true
                },
                tagName: {
                    get() {
                        return currentComponentInc.$wxa.tagName;
                    },
                    enumerable: true
                },
                dataset: {
                    get() {
                        return currentComponentInc.$wxa.dataset;
                    },
                    enumerable: true
                }
            });
        }

        if (process.env.NODE_ENV === 'development') {
            this.$native = nativeEvent;
        }
    }
}

export class FormSubmitEvent extends BaseEvent {
    constructor(nativeEvent, currentComponentInc) {
        super('submit', nativeEvent, currentComponentInc);
    }
}

var createTouchItem = (nativeTouch) => {
    return {
        identifier: nativeTouch.identifier,
        pageX: nativeTouch.pageX,
        pageY: nativeTouch.pageY,
        clientX: nativeTouch.clientX,
        clientY: nativeTouch.clientY
    }
}

export class TouchEvent extends BaseEvent {
    constructor(type, nativeEvent, currentComponentInc) {
        super(type, nativeEvent, currentComponentInc);
        this.touches = Array.prototype.map.call(nativeEvent.targetTouches, (item => {
            return createTouchItem(item);
        }));
        this.changedTouches = Array.prototype.map.call(nativeEvent.changedTouches, (item => {
            return createTouchItem(item);
        }));
    }
}