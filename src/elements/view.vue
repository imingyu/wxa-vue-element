<template>
    <div :class="['wxa-view', hiddenStatus]">
        <slot></slot>
    </div>
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
