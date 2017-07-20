<template>
    <wxa-view>
        <wxa-button @wxa-tap="tap">Button</wxa-button>
    </wxa-view>
</template>

<script>
export default {
    name: 'Index',
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
        tap() {
            console.log('hello!');
        },
        cd(e) {
            console.log(e);
        },
        cd2(e) {
            console.log('cd2', e);
        }
    }
}
</script>

<style>
.wxa-view {
    margin: 20px;
}
</style>
