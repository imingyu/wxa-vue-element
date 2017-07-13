<template>
    <WxaElement :tag="'checkbox'" :element="'label'" :hidden="hidden">
        <input class="wxa-checkbox-inner" type="checkbox" :value="$value" :disabled="$disabled" :checked="$checked">
        <slot></slot>
    </WxaElement>
</template>

<style>
.wxa-checkbox {
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
}
/*TODO:checkbox的样式余小程序的保持一致，另外需要支持color选项*/
.wxa-checkbox-inner {
    display: inline;
    margin-right: 3px;
}
</style>

<script>
import util from '../util/index.js';
var isFalse = val => {
    return val === false || val === null || val === undefined || val === '' || (typeof val === 'number' && isNaN(val));
}
export default util.createElement({
    name: "WxaCheckbox",
    props: ['checked', 'value', 'disabled'],
    computed: {
        $value() {
            var val = this.value;
            if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
                return '';
            } else {
                return val + '';
            }
        },
        $checked() {
            return !isFalse(this.checked);
        },
        $disabled() {
            return !isFalse(this.disabled);
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        var el = this.$el,
            style = el.attributes.style;
        if (style && style.value) {
            var styleObj = util.convertStyle(style.value);
            console.log(styleObj);
            //TODO:外部设置checkbox组件的style时，需要解决一些问题
        }
    }
});
</script>