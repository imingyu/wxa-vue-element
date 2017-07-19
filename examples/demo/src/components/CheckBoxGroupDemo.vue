<template>
    <wxa-view>
        <wxa-checkbox-group @wxa-change="change">
            <wxa-checkbox value="1" color="red" :checked.sync="chk">Gril</wxa-checkbox>
            <wxa-label>
                <wxa-checkbox value="2" />Boy
            </wxa-label>
        </wxa-checkbox-group>


        <button type="button" @click="ck">修改</button>
    </wxa-view>
</template>

<script>
export default {
    name: 'CheckBoxGroupDemo',
    data() {
        return {
            chk: true
        }
    },
    methods: {
        fun(tag, type, e) {
            console.log(`view.tap=>`, e);
        },
        change(event) {
            console.log(event);
        },
        ck() {
            this.chk = !this.chk;
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
