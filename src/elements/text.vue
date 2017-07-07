<template>
    <WxaElement :tag="'text'" :element="'span'" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style>
.wxa-text {
    display: inline;
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaText",
    props: {},
    data() {
        return {
        }
    }
});
</script>