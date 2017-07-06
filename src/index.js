require('./common.less');
import WxaView from './elements/view.vue';

if (typeof window === 'object' && window.window === window && window.Vue) {
    window.Vue.component(WxaView.name, WxaView);
}

export default {
    WxaView
}