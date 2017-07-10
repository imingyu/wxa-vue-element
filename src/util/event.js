import mark from './mark.js';
import * as element from './element.js';
import * as util from './util.js';
export var $on = (el, type, handler) => {
    el.$$handlers = el.$$handlers || {};
    var handlers = el.$$handlers,
        namespace = "default",
        index = type.indexOf('.');
    if (index != -1) {
        namespace = type.substr(index + 1, type.length);
        type = type.substr(0, index);
    }
    if (!handlers[type]) {
        handlers[type] = handlers[type] || {};
        var realHandler = function (e) {
            var dom = this,
                handlers = Object.values(this.$$handlers[e.type] || {}),
                result;
            if (handlers && handlers.length > 0) {
                handlers.forEach(item => {
                    if (item.call(dom, e) === false) {
                        result = false;
                    }
                });
            }
            return result;
        };
        handlers[type + '-real'] = realHandler;
        el.addEventListener(type, realHandler, false);
    }
    handlers[type][namespace] = handler;
}
export var $off = (el, type) => {
    el.$$handlers = el.$$handlers || {};
    var handlers = el.$$handlers,
        namespace = "default",
        index = type.indexOf('.');
    if (index != -1) {
        namespace = type.substr(index + 1, type.length);
        type = type.substr(0, index);
        if (handlers[type]) delete handlers[type][namespace];
    } else {
        el.removeEventListener(type, handlers[type + '-real']);
    }
}

//dispatch：由子到父
//broadcast：由父到子

export class BaseEvent {
    constructor(type, nativeEvent, currentComponentInc) {
        this.type = type;
        this.timeStamp = nativeEvent.timeStamp || new Date().getTime();
        this.target = {};
        var target = nativeEvent.target;
        if (element.isWxaElement(target)) {
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
    }
}