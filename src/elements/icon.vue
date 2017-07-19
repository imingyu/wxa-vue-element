<template>
    <WxaElement :tag="'icon'" :element="'i'" :class='[type ? "wxa-icon-"+type : ""]' :style="{width:size+'px', height:size+'px', fontSize:size+'px', color:color}" :hidden="hidden">
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
/*以下图标样式取自weui项目，地址：https://weui.io */
.wxa-icon {
    display: inline-block;
    font: normal normal normal 14px/1 "weui";
    font-family: $ft-icon;
}
.wxa-icon:before {
    margin: 0;
}
.wxa-icon-success {
    font-size: 23px;
    color: $clr-primary;
}
.wxa-icon-waiting {
    font-size: 23px;
    color: $clr-info;
}
.wxa-icon-warn {
    font-size: 23px;
    color: $clr-danger;
}
.wxa-icon-info {
    font-size: 23px;
    color: $clr-info;
}
.wxa-icon-success-circle {
    color: $clr-primary;
}
.wxa-icon-success_no_circle {
    color: $clr-primary;
}
.wxa-icon-waiting-circle {
    color: $clr-info;
}
.wxa-icon-circle {
    color: #C9C9C9;
}
.wxa-icon-download {
    color: $clr-primary;
}

.wxa-icon-info-circle {
    color: $clr-primary;
}

.wxa-icon-safe-success {
    color: $clr-primary;
}
.wxa-icon-safe-warn {
    color: $clr-warning;
}

.wxa-icon-cancel {
    color: $clr-danger;
}

.wxa-icon-search {
    color: $clr-light;
}

.wxa-icon-clear {
    color: $clr-light;
}

.wxa-icon-circle:before {
    content: "\EA01"
}

.wxa-icon-download:before {
    content: "\EA02"
}

.wxa-icon-info:before {
    content: "\EA03"
}

.wxa-icon-safe-success:before {
    content: "\EA04"
}

.wxa-icon-safe-warn:before {
    content: "\EA05"
}

.wxa-icon-success:before {
    content: "\EA06"
}

.wxa-icon-success-circle:before {
    content: "\EA07"
}

.wxa-icon-success_no_circle:before {
    content: "\EA08"
}

.wxa-icon-waiting:before {
    content: "\EA09"
}

.wxa-icon-waiting-circle:before {
    content: "\EA0A"
}

.wxa-icon-warn:before {
    content: "\EA0B"
}

.wxa-icon-info-circle:before {
    content: "\EA0C"
}

.wxa-icon-cancel:before {
    content: "\EA0D"
}

.wxa-icon-search:before {
    content: "\EA0E"
}

.wxa-icon-clear:before {
    content: "\EA0F"
}

.wxa-icon-back:before {
    content: "\EA10"
}

.wxa-icon-delete:before {
    content: "\EA11"
}
</style>

<script>
import util from '../util/index.js';
export default util.createElement({
    name: "WxaIcon",
    props: {
        type: {
            type: String,
            validator(val) {
                return 'success, success_no_circle, info, warn, waiting, cancel, download, search, clear'.split(', ').indexOf(val) != -1;
            }
        },
        size: {
            type: Number,
            default: 23
        },
        color: String
    },
    data() {
        return {
        }
    }
});
</script>