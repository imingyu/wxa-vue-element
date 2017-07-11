import * as prop from './prop.js';
import * as util from './util.js';
import * as event from './event.js';
import WxaElement from '../elements/wxa-element.vue';

export function mixin(componentSpec) {
    return {
        props: {
            hidden: Boolean,
            catchEvents: [Array, String]//需要以catch方式进行事件绑定
        },
        beforeCreate() {
            settingWxaValue.call(this, componentSpec);
        },
        created() {
            if (process.env.NODE_ENV !== 'development') return;
            prop.valid(this);
            event.valid(this);
        },
        mounted() {
            settingWxaValue.call(this, componentSpec);
            event.binding(this);
            console.log(this);
        },
        components: {
            WxaElement
        }
    };
}

export var isWxaElement = el => {
    return el && el.__vue__ && el.__vue__.$wxa;
}

var regNumber = /^(\d+.*)*\d$/,
    regBool = /^true|false$/;
export var getWxaDataset = (el) => {
    if (!isWxaElement(el)) return;
    var result = {},
        ds, prop, val;
    if (el.__vue__.$vnode.data.attrs) {
        ds = el.__vue__.$vnode.data.attrs;
    }
    //TODO:data-*名称转换，如：data-user-name => userName
    for (prop in ds) {
        val = ds[prop];
        if (typeof val === 'string') {
            if (regNumber.test(val)) {
                result[prop] = parseFloat(val);
            } else if (regBool.test(val)) {
                result[prop] = JSON.parse(val);
            } else {
                result[prop] = ds[prop];
            }
        }else{
            result[prop] = ds[prop];
        }
    }
    delete result.wxa;
    return result;
}

export var getWxaTagName = (el) => {
    if (!isWxaElement(el)) return;
    if (el.__vue__._vnode && el.__vue__._vnode.componentInstance) {
        return el.__vue__._vnode.componentInstance.tag;
    } else {
        return el.attributes && el.attributes['data-wxa'] ? el.attributes['data-wxa'].value : 'unkown';
    }
}

function settingWxaValue(componentSpec) {
    this.$wxa = this.$wxa || {};
    if (this.$el) {
        var _wxaValue = {
            tagName: undefined,
            dataset: undefined
        },
            self = this;
        if (!this.$wxa.hasOwnProperty('tagName')) {
            Object.defineProperty(this.$wxa, 'tagName', {
                get() {
                    if (!_wxaValue.tagName) {
                        _wxaValue.tagName = getWxaTagName(self.$el);
                    }
                    return _wxaValue.tagName;
                },
                set(val) {
                    _wxaValue.tagName = val;
                },
                enumerable: true
            });
        }
        if (!this.$wxa.hasOwnProperty('dataset')) {
            Object.defineProperty(this.$wxa, 'dataset', {
                get() {
                    return getWxaDataset(self.$el);
                },
                enumerable: true
            });
        }
        if (this.$vnode && this.$vnode.componentOptions && this.$vnode.componentOptions.listeners) {
            var listeners = this.$vnode.componentOptions.listeners;
        }
    }

    if (componentSpec && componentSpec.$wxa) {
        util.extend(true, this.$wxa, componentSpec.$wxa || {});
        delete componentSpec.$wxa;
    }
};
export function createElement(componentSpec) {
    componentSpec.mixins = componentSpec.mixins || [];
    componentSpec.mixins.push(mixin(componentSpec));
    return componentSpec;
}