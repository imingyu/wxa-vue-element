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

var wxaEvents = ['tap', 'longtap', 'touchstart', 'touchmove', 'touchcancel', 'touchend'];
export var valid = (component) => {
    var comName = component.$options._componentTag,
        listeners = component.$vnode.componentOptions.listeners || {},
        propKeys = component.$options._propKeys || [];

    //检查使用组件时是否含有非法事件
    var notPassAttrs = [],
        acceptAttrs,
        validResult;
    acceptAttrs = wxaEvents.concat(component.$wxa.events || []);
    util.each(Object.keys(listeners), (key) => {
        if (acceptAttrs.indexOf(key) == -1) {
            if (propKeys.indexOf(key) === -1) {
                notPassAttrs.push(key);
            }
        }
    });
    if (notPassAttrs.length > 0) {
        util.error(`组件${comName}不接受${notPassAttrs.length > 1 ? '这些' : ''}事件${notPassAttrs.join(', ')}; 接受的事件列表为：${acceptAttrs.join(', ')}.`)
    }
    return notPassAttrs.length === 0;
}

//绑定组件上的事件映射
export function binding(component) {
    var listeners = component.$vnode.componentOptions.listeners || {};
    Object.keys(listeners).forEach(key => {
        if (wxaEvents.indexOf(key) != -1 && trigger[key]) trigger[key](component);
    });
}
var trigger = {
    tap: function (component) {
        $off(component.$el, `click.wxa`);
        $on(component.$el, `click.wxa`, function (e) {
            var catchEvents = typeof component.catchEvents === 'string' ? [component.catchEvents] : (Array.isArray(component.catchEvents) ? component.catchEvents : []);
            if (catchEvents.indexOf('tap') != -1) {
                //阻止冒泡：对应小程序的bind*
                e.stopPropagation();
                component.$emit('tap', new BaseEvent('tap', e, component));
            } else {
                //不阻止冒泡：对应小程序的catch*
                component.$emit('tap', new BaseEvent('tap', e, component));
            }
        });
    }
};

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

export class FormSubmitEvent extends BaseEvent {
    constructor(nativeEvent, currentComponentInc) {
        super('submit', nativeEvent, currentComponentInc);
    }
}

class Touch {
    constructor() {
    }
}

export class TouchEvent extends BaseEvent {
    constructor(type, nativeEvent, currentComponentInc) {
        super(type, nativeEvent, currentComponentInc);
    }
}