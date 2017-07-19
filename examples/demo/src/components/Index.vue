<template>
    <wxa-view>
        <wxa-button>你好</wxa-button>
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
