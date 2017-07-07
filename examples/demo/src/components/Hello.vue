<template>
    <div class="hello">
        <wxa-view id="view" class="abc sd" v-tap="viewShow" @touchstart="touch" data-id="123" data-name="imingyu">
            你好----
            <wxa-text v-tap="textShow">{{ msg }}</wxa-text>
        </wxa-view>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: '小程序'
        }
    },
    methods: {
        viewShow(event) {
            console.log('view.show', event);
        },
        textShow(event) {
            console.log('text.show', event);
        },
        touch(event) {
            console.log('touchstart', event);
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
}

.wxa-text {
    display: inline-block;
    padding: 5px 10px;
    background: yellow;
    color: #000;
    margin: 10px;
}
</style>
