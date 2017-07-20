<template>
    <WxaElement :tag="'checkbox-group'" :element="'div'" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-checkbox-group {
    display: inline-block;
}
</style>

<script>
import util from '../util/index.js';
import { CustomEvent } from '../util/event/model.js';
export default util.createElement({
    name: "WxaCheckboxGroup",
    $wxa: {
        events: ['wxa-change']
    },
    props: [],
    data() {
        return {
            values: []
        }
    },
    methods: {
        $$emitChange(nativeEvent, triggerComponent) {
            var detail = {};
            detail.value = JSON.parse(JSON.stringify(this.values));
            this.$emit('wxa-change', new CustomEvent('change', nativeEvent, this, detail, triggerComponent))
        }
    }
});
</script>