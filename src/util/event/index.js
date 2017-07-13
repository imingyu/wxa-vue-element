import * as util from '../util.js';
import $binding from './binding.js';

var wxaEvents = ['wxa-tap', 'wxa-longtap', 'wxa-touchstart', 'wxa-touchmove', 'wxa-touchcancel', 'wxa-touchend'];
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
        if (wxaEvents.indexOf(key) != -1) {
            $binding(key, component);
        }
    });
}