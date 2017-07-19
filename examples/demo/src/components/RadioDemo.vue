<template>
    <wxa-view>
        <wxa-radio-group @wxa-change="cd">
            <wxa-radio value="1">Gril</wxa-radio>
            <wxa-radio value="2">Boy</wxa-radio>
        </wxa-radio-group>
        <wxa-radio value="3">Un</wxa-radio>
    </wxa-view>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
        }
    },
    methods: {
        cd(e){
            console.log(e);
        }
    }
}
</script>

<style>
.wxa-view {
    padding: 20px 40px;
    background: green;
    color: #fff;
    margin: 20px;
}
</style>
