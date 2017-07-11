<template>
    <wxa-view>
        <wxa-view id="view" :class="'hello-view'" v-tap="viewShow" data-name="imingyu" :data-obj="JSON.stringify(obj)">
            你好<wxa-text v-tap="textShow">{{ msg }}</wxa-text><wxa-text v-tap.catch="textShow">text</wxa-text>
        </wxa-view>
        <wxa-icon v-for="icon in icons" :class="'ac-'+icon" :type="icon" :key="icon" />


    </wxa-view>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: '小程序',
            obj: {
                name: 123
            },
            icons: 'success, success_no_circle, info, warn, waiting, cancel, download, search, clear'.split(', ')
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
.hello-view {
    display: inline-block !important;
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
