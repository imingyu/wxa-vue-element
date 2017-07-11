<template>
    <component :is="element" :class="['wxa-'+tag, hiddenStatus]" :data-wxa="tag">
        <slot></slot>
    </component>
</template>
<script>
import mark from '../util/mark.js';
mark('class',`
wxml tag转vue component时，需要将class转换为vue的v-bind形式，如：
\`\`\`html
<view class="box"></view>
<!--转换后-->
<wxa-view :class="'box'"></wxa-view>
\`\`\``);
export default {
    name: 'WxaElement',
    props: {
        tag: String,
        element: String,
        hidden: Boolean
    },
    computed: {
        //根据hidden属性值给element添加class，指示element显示状态
        hiddenStatus() {
            return this.hidden ? 'wxa-is-hidden' : '';
        }
    },
    data() {
        return {};
    }
};
</script>