<template>
    <wxa-view @wxa-tap="fun('view','tap',$event)" @wxa-longtap="fun('view','longtap',$event)">
        <wxa-text @wxa-tap="fun('text','tap',$event)">
            测试
        </wxa-text>
    </wxa-view>
</template>

<script>
export default {
    name: 'tap',
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
    display: inline-block;
    padding: 20px 40px;
    background: green;
    color: #fff;
    margin: 20px;
}

.wxa-text {
    display: inline-block;
    padding: 5px 10px;
    background: yellow;
    color: #000;
    margin: 10px;
}
</style>
