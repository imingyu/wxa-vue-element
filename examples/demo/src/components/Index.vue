<template>
    <wxa-view>
        <wxa-progress :percent="80" show-info @wxa-tap="tap" data-name="123" data-sd="3" :data-user="user"></wxa-progress>
    </wxa-view>
</template>

<script>
export default {
    name: 'Index',
    props: {
    },
    data() {
        return {
            user: {
                name: 'Tom',
                age: 20
            }
        }
    },
    methods: {
        tap(e) {
            console.log(e);
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
