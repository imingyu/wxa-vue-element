<template>
    <WxaElement :tag="'button'" :element="'button'" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-button {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: $clr-black;
    background-color: $clr-default;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    cursor: pointer;

    &:active {
        color: rgba(0, 0, 0, 0.6);
        background-color: #DEDEDE;
        outline: none;
        cursor: pointer;
    }
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaButton",
    props: ['type'],
    data() {
        return {
        }
    }
});
</script>