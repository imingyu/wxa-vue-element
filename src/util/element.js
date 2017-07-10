import * as prop from './prop.js';
import * as util from './util.js';
import WxaElement from '../elements/wxa-element.vue';

export var mixin = {
    props: {
        hidden: Boolean
    },
    created() {
        console.log(this);
        if (process.env.NODE_ENV !== 'development') return;
        prop.valid(this);
    },
    components: {
        WxaElement
    }
};

export var getWxaDataset = (el) => {
    var dataset = JSON.parse(JSON.stringify(el.dataset || {}));
    for (var prop in dataset) {
        try {
            dataset[prop] = JSON.parse(dataset[prop]);
        } catch (error) {
        }
    }
    return dataset;
}

export var getWxaTagName = (el) => {
    if (!isWxaElement(el)) return;
    if (el.__vue__._vnode && el.__vue__._vnode.componentInstance) {
        return el.__vue__._vnode.componentInstance.tag;
    } else {
        return el.attributes && el.attributes['data-wxa'] ? el.attributes['data-wxa'].value : (el.className || '').split(' ').find(item => {
            return item.indexOf('wxa-tag-') == 0;
        }).replace('wxa-tag-', '');
    }
}

function settingWxaValue(componentSpec) {
    this.$wxa = this.$wxa || {};
    var _wxaValue = {
        tagName: undefined,
        dataset: undefined
    },
        self = this;
    Object.defineProperties(this.$wxa, {
        tagName: {
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
        },
        dataset: {
            get() {
                return getWxaDataset(self.$el);
            },
            enumerable: true
        }
    });
    util.extend(true, this.$wxa, componentSpec.$wxa || {});
    delete componentSpec.$wxa;
};

export function createElement(componentSpec) {
    componentSpec.mixins = componentSpec.mixins || [];
    componentSpec.mixins.push(mixin);
    componentSpec.mixins.push({
        beforeCreate() {
            this.$wxa = this.$wxa || {};
        },
        mounted() {
            settingWxaValue.call(this, componentSpec);
        }
    });
    return componentSpec;
}

export var isWxaElement = el => {
    return el && el.__vue__ && el.__vue__.$wxa;
}