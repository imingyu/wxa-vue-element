<template>
    <component :is="element" :class="['wxa-tag-'+tag, hiddenStatus]" :data-wxa="tag">
        <slot></slot>
    </component>
</template>
<script>
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
            return this.hidden ? 'wxa-is-hidden' : 'wxa-not-hidden';
        }
    },
    data() {
        return {};
    }
};
</script>