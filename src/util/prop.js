import * as util from './util.js';
var wxaProps = ['id', 'class', 'hidden', 'style', (name) => {
    if (name.indexOf('data-') == 0) {
        return true;
    } else {
        return 'data-*';
    }
}];

export var valid = (component) => {
    var comName = component.$options._componentTag,
        attrs = component.$vnode.data.attrs || {},
        propKeys = component.$options._propKeys || [];

    //检查使用组件时是否含有非法属性
    var notPassAttrs = [],
        acceptAttrs,
        validResult,
        strProps = wxaProps.filter(item => typeof item === 'string'),
        funProps = wxaProps.filter(item => typeof item === 'function');
    acceptAttrs = strProps.concat(propKeys);
    util.each(Object.keys(attrs), (key) => {
        if (strProps.indexOf(key) == -1) {
            if (propKeys.indexOf(key) === -1) {
                funProps.forEach(item => {
                    validResult = item(key);
                    if (validResult !== true) {
                        acceptAttrs.push(validResult);
                        notPassAttrs.push(key);
                    }
                });
            }
        }
    });
    if (notPassAttrs.length > 0) {
        util.error(`组件${comName}不接受${notPassAttrs.length > 1 ? '这些' : ''}属性${notPassAttrs.join(', ')}; 接受的属性列表为：${acceptAttrs.join(', ')}.`)
    }
    return notPassAttrs.length === 0;
}