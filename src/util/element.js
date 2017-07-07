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
    components:{
        WxaElement
    }
};

export function createElement(componentSpec) {
    componentSpec.mixins = componentSpec.mixins || [];
    componentSpec.mixins.push(mixin);
    return componentSpec;
}