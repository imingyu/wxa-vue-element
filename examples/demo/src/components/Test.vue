<template>
    <wxa-view>
        <wxa-text>checked true</wxa-text>
        <wxa-checkbox checked="false">true</wxa-checkbox>
        <wxa-checkbox checked="0">true</wxa-checkbox>
        <wxa-checkbox checked="null">true</wxa-checkbox>
        <wxa-checkbox checked="undefined">true</wxa-checkbox>
        <wxa-checkbox checked="NaN">true</wxa-checkbox>
        <wxa-checkbox checked="1">true</wxa-checkbox>
        <wxa-checkbox checked="sd">true</wxa-checkbox>
        <wxa-checkbox :checked="'asdf'">true</wxa-checkbox>
        <wxa-checkbox :checked="1">true</wxa-checkbox>
        <wxa-checkbox :checked="sd">true</wxa-checkbox>
        <wxa-checkbox :checked="{}">true</wxa-checkbox>
        <wxa-checkbox :checked="[]">true</wxa-checkbox>


        <wxa-text>checked false</wxa-text>
        <wxa-checkbox :checked="''">false</wxa-checkbox>
        <wxa-checkbox :checked="null">false</wxa-checkbox>
        <wxa-checkbox :checked="NaN">false</wxa-checkbox>
        <wxa-checkbox :checked="false">false</wxa-checkbox>
    </wxa-view>
</template>

<script>
export default {
    name: 'test',
    data() {
        return {
            sd:{name:'Tom'}
        }
    },
    methods: {
        fun(tag, type, e) {
            console.log(`view.tap=>`, e);
        }
    }
}
</script>

<style>
.wxa-view {
    display: inline-block;
    padding: 20px 40px;
    background: green;
    color: #fff;
    margin: 20px;
}

.wxa-text {
    display: block !important;
    width:100%;
    padding: 5px 10px;
    background: yellow;
    color: #000;
    margin: 10px 0;
}
.wxa-checkbox{
    width:100px;
    display: inline-block !important;
    background: #d6871d;
    padding: 2px 10px;
    margin: 0 10px 10px 0;
}
</style>
