<template>
    <WxaElement :tag="'label'" :element="'label'" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style>
.wxa-label {
    display: inline;
    font-weight: normal;
    font-style: normal;
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaLabel",
    props: {
        for: String
    },
    data() {
        return {
        }
    }
});
</script>