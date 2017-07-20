<template>
    <WxaElement :tag="'radio-group'" :element="'div'" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-radio-group {
    display: inline-block;
}
</style>

<script>
import util from '../util/index.js';
import { CustomEvent } from '../util/event/model.js';
export default util.createElement({
    name: "WxaRadioGroup",
    $wxa: {
        events: ['wxa-change']
    },
    props: [],
    data() {
        return {
            field: ("" + new Date().getTime()),
            value: null
        }
    },
    methods: {
        $$emitChange(nativeEvent, triggerComponent) {
            var detail = {};
            detail.value = JSON.parse(JSON.stringify(this.value));
            this.$emit('wxa-change', new CustomEvent('change', nativeEvent, this, detail, triggerComponent))
        }
    }
});
</script>