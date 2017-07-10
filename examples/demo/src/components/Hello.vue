<template>
    <div class="hello">
        <wxa-view id="view" class="abc sd" v-tap="viewShow" @touchstart="touch" data-id="123" data-alpha-beta="1" data-alphaBeta="2" data-name="imingyu" :data-obj="JSON.stringify(obj)">
            你好----
            <wxa-text v-tap.catch="textShow">{{ msg }}</wxa-text>
        </wxa-view>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: '小程序',
            obj:{
                name:123
            }
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
.wxa-tag-view {
    display: inline-block;
    padding: 20px 40px;
    background: green;
    color: #fff;
}

.wxa-tag-text {
    display: inline-block;
    padding: 5px 10px;
    background: yellow;
    color: #000;
    margin: 10px;
}
</style>
