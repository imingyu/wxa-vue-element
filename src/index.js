require('./styles/index.less');
import WxaView from './elements/view.vue';
import WxaText from './elements/text.vue';
import WxaIcon from './elements/icon.vue';

const coms = [WxaView, WxaText, WxaIcon];

var pluginSpec = {
    install: (Vue, options) => {
        //将组件安装到全局
        coms.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}

//script直引时，默认安装插件
if (typeof window === 'object' && window.window === window && window.Vue) {
    window.Vue.use(pluginSpec);
}

export default pluginSpec;