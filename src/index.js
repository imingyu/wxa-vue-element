require('./styles/index.less');
import WxaView from './elements/view.vue';
import WxaText from './elements/text.vue';
import WxaIcon from './elements/icon.vue';
import WxaLabel from './elements/label.vue';
import WxaCheckbox from './elements/checkbox.vue';
import WxaCheckboxGroup from './elements/checkbox-group.vue';
import WxaRadio from './elements/radio.vue';
import WxaRadioGroup from './elements/radio-group.vue';

const coms = [WxaView, WxaText, WxaIcon, WxaLabel, WxaCheckbox, WxaCheckboxGroup, WxaRadio, WxaRadioGroup];

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