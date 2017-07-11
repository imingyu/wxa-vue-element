<template>
    <wxa-view :class="'hello'">
        <wxa-view id="view" @tap="viewShow" data-name="imingyu" data-age="2" :data-obj="obj" data-userName="tom" data-userage='20' data-user-address="上海" data-Company="同程">
            你好
            <wxa-text @tap="textShow">{{ msg }}</wxa-text>
            <wxa-text @tap="textShow" :catchEvents="['tap']">text</wxa-text>
        </wxa-view>
        <wxa-view class="icons">
            <wxa-icon v-for="icon in icons" :class="'ac-'+icon" :type="icon" :key="icon" />
        </wxa-view>

        <wxa-view id="touch1" @touchstart="touch">touchstart</wxa-view>
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
        },
        show(msg) {
            console.log(msg);
        }
    }
}
</script>

<style>
.wxa-view {
    padding: 20px 40px;
    background: green;
    color: #fff;
    margin-bottom: 10px;
}

.wxa-text {
    display: inline-block;
    padding: 5px 10px;
    background: yellow;
    color: #000;
    margin: 10px;
}

.hello {
    display: block!important;
    background: none;
}
</style>
