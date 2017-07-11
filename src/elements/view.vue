<template>
    <WxaElement :tag="'view'" :element="'div'" v-bind="$props">
        <slot></slot>
    </WxaElement>
</template>

<style>
.wxa-view {
    display: block;
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaView",
    props: {
        hoverClass: [String, Number]
    },
    data() {
        return {
        }
    }
});
</script>
