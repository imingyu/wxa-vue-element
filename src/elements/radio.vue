<template>
    <WxaElement :tag="'radio'" :element="'label'" :hidden="hidden">
        <input class="wxa-radio-native" type="radio" :name="field" @change="onChange" :value="$$value" :disabled="$$disabled" :checked="$$checked">
        <span class="wxa-radio-inner" :style="{color:color}"></span>
        <slot></slot>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-radio {
    -webkit-tap-highlight-color: transparent;
    display: inline-block;

    .wxa-radio-native {
        display: none;
    }

    /*TODO:checkbox的样式余小程序的保持一致，另外需要支持color选项*/
    .wxa-radio-inner {
        width: $sz-radio;
        height: $sz-radio;
        display: inline-block;
        margin-right: 3px;
        background: $clr-white;
        border-radius: 50%;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.08);
        text-align: center;
        vertical-align: top;
        color: $clr-primary;

        &:before {
            content: "\EA08";
            font-family: $ft-icon;
            color: inherit;
            display: none;
            font-size: $sz-radio - 6px;
            line-height: $sz-radio;
        }
    }
    .wxa-radio-native:checked+.wxa-radio-inner {
        &:before {
            display: inline-block;
        }
    }
}
</style>

<script>
import util from '../util/index.js';
var isFalse = val => {
    return val === false || val === null || val === undefined || val === '' || (typeof val === 'number' && isNaN(val));
}
export default util.createElement({
    name: "WxaRadio",
    props: ['checked', 'value', 'disabled', 'color'],
    data() {
        return {
            field: ""
        }
    },
    computed: {
        $$value() {
            var val = this.value;
            if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
                return '';
            } else {
                return val + '';
            }
        },
        $$checked() {
            return !isFalse(this.checked);
        },
        $$disabled() {
            return !isFalse(this.disabled);
        }
    },
    methods: {
        onChange(event) {
            //WARN:此处，当数据checked发生变化时，不会引起onchagne的触发，只有浏览器的chagne事件发生时才会触发，与当前小程序行为保持一致，如果后续小程序修复了这个问题，这里在做同步修改
            this.$emit('update:checked', event.target.checked)
            this.updateGroup(event.target.checked, true, event);
        },
        updateGroup(checked, isEmit, event) {
            var group = this.$$closest('radio-group');
            if (group) {
                if (this.field != group.field) {
                    this.field = group.field;
                }
                if (!isFalse(checked)) {
                    group.value = this.$$value;
                }
                if (isEmit) {
                    group.$$emitChange(event, this);
                }
            }
        }
    },
    watch: {
        checked(val) {
            this.updateGroup(val, false);
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.updateGroup(this.$$checked, false);
        });
    }
});
</script>