require('./common.less');
import WxaView from './elements/view.vue';
import WxaText from './elements/text.vue';

import tap from './directives/tap.js';

const coms = [WxaView, WxaText],
    directives = [tap];

var pluginSpec = {
    install: (Vue, options) => {
        //将组件安装到全局
        coms.forEach(item => {
            Vue.component(item.name, item);
        });

        //安装指令到全局
        directives.forEach(item => {
            Vue.directive(item.name, item);
        });
    }
}

//script直引时，默认安装插件
if (typeof window === 'object' && window.window === window && window.Vue) {
    window.Vue.use(pluginSpec);
}

export default pluginSpec;