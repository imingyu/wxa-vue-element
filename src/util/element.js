import * as util from './util.js';
var wxaProps = ['id', 'class', 'hidden', 'style', (name) => {
    if (name.indexOf('data-') == 0) {
        return true;
    } else {
        return 'data-*';
    }
}],
    wxaMixin = {
        props: {
            hidden: Boolean
        },
        computed: {
            //根据hidden属性值给element添加class，指示element显示状态
            hiddenStatus() {
                return this.hidden ? 'wxa-is-hidden' : 'not-hidden';
            }
        },
        created() {
            console.log(this);
            if (process.env.NODE_ENV !== 'development') return;

            validProps(this);
        }
    };


export var validProps = (component) => {
    //以下检查仅在开发环境检查
    var comName = component.$options._componentTag,
        attrs = component.$vnode.data.attrs,
        propKeys = component.$options._propKeys;

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
        util.warn(`组件${comName}不接受${notPassAttrs.length > 1 ? '这些' : ''}属性${notPassAttrs.join(', ')}; 接受的属性列表为：${acceptAttrs.join(', ')}.`)
    }
    return notPassAttrs.length === 0;
}

export var validEvents = (component) => {
    var eventKeys = Object.keys(component._events);
    eventKeys.forEach(item => {
        if (item.indexOf('bind') == 0 || name.indexOf('catch') == 0) {
            return true;
        }
    });
}

/**
 * $wxa属性
$wxa:{
    props:[String, Function],//本组件可接受的属性
    events:{String:Function},//本组件可绑定的事件，以及事件发射器，针对可绑定的事件指定一个发射器，定义事件应该怎样发射
}
 */
export var settingWxaPropValue = (componentSpec) => {
    componentSpec.$wxa = componentSpec.$wxa || {};
    componentSpec.$wxa = util.extend(true, {
        props: ['id', 'class', 'hidden', 'style', (name) => {
            if (name.indexOf('data-') == 0) {
                return true;
            } else {
                return 'data-*';
            }
        }],
        events: ['tap']
    }, componentSpec.$wxa);
}

export function createElement(componentSpec) {
    settingWxaPropValue(componentSpec);//给组件添加一个$wxa属性，上面包括了一些小程序element方面的约束
    componentSpec.mixins = componentSpec.mixins || [];
    componentSpec.mixins.push(wxaMixin);
    console.log(componentSpec);
    return componentSpec;
}
