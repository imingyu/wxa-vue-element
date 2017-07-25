<template>
    <WxaElement :tag="'progress'" :element="'div'" :hidden="hidden">
        <div class="wxa-progress-bar">
            <div class="wxa-progress-inner"></div>
        </div>
        <div v-if="$$showInfo" class="wxa-progress-info">
            {{$$percent+'%'}}
        </div>
        <div class="wxa-progress-slot">
            <slot></slot>
        </div>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-progress {
    display: block;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.wxa-progress-bar {
    width: 100%;
    display: inline-block;
    background: #f7f7f7;
}

.wxa-progress-inner {
    width: 20%;
    height: 6px;
    background: $clr-primary;
}

.wxa-progress-info {
    padding-left: 15px;
    text-align: right;
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaProgress",
    props: {
        percent: {
            type: Number,
            default: 0,
            validator(val) {
                return val >= 0 && val <= 100;
            }
        },
        'show-info': {
            type: Boolean,
            default: true
        },
        'stroke-width': true,
        'color': true,
        'activeColor': true,
        backgroundColor: true,
        active: true
    },
    data() {
        return {
        }
    },
    computed: {
        $$percent() {
            var percent = this.percent,
                val;

            if (util.isEmpty(percent)) {
                return 0;
            } else {
                val = parseFloat(percent);
                val = isNaN(val) ? 0 : val;
                return val;
            }
        },
        $$showInfo() {
            if (typeof this.showInfo != 'undefined' && this.showInfo === '') {
                return true;
            }
            return !util.isFalse(this.showInfo);
        }
    },
    mounted() {
        console.log(this);
    }
});
</script>