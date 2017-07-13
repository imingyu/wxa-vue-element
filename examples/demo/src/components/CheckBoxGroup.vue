<template>
    <wxa-view>
        <wxa-checkbox value="1" style="width:30px; height:30px;">Girl</wxa-checkbox>
        <wxa-checkbox value="2" />Boy
    </wxa-view>
</template>

<script>
export default {
    name: 'CheckBoxGroup',
    data() {
        return {
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
    padding: 20px 40px;
    background: green;
    color: #fff;
    margin: 20px;
}
</style>
