<template>
    <WxaElement :class="realHoverClass" :tag="'button'" :element="'button'" @touchstart.native="touchstart" @touchend.native="touchend" @touchcancel.native="touchcancel" :hidden="hidden">
        <slot></slot>
    </WxaElement>
</template>

<style lang="scss">
@import './var.scss';
.wxa-button {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: $clr-black;
    background-color: $clr-default;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    cursor: pointer;
}

.button-hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
}
</style>

<script>
//TODO:此组件暂时无法完美实现，先放着
import util from '../util/index.js';
const typeSet = { primary: true, 'default': true, warn: true };
const sizeSet = { 'default': true, mini: true };
const formTypeSet = { submit: true, reset: true };
const openTypeSet = { contact: true, share: true };
export default util.createElement({
    name: "WxaButton",
    props: ['type', 'size', 'plain', 'disabled', 'loading', 'form-type', 'open-type', 'hover-class', 'hover-start-time', 'hover-stay-time', 'session-from'],
    data() {
        return {
            timerTap: null,
            tapStartTime: null,
            tapStayTime: 0,
            realHoverClass: ""
        };
    },
    computed: {
        $$type() {
            if (typeSet[this.type]) {
                return this.type;
            } else {
                'default';
            }
        },
        $$size() {
            if (sizeSet[this.size]) {
                return this.size;
            } else {
                'default';
            }
        },
        $$formType() {
            if (formTypeSet[this.formType]) {
                return this.formType;
            } else {
                '';
            }
        },
        $$openType() {
            if (openTypeSet[this.openType]) {
                return this.openType;
            } else {
                '';
            }
        },
        $$hoverClass() {
            if (this.hoverClass === 'none') {
                return '';
            } else if ((this.hoverClass + "").trim() === '' || typeof this.hoverClass === 'undefined') {
                return 'button-hover';
            } else {
                return this.hoverClass;
            }
        },
        $$hoverStartTime() {
            //TODO:微信的默认值是25ms，但是使用setInterval 1ms每次叠加时间机制，算出的时间与微信这个25ms相差甚远，计时2ms后，hover-class就添加上了，故这里讲默认时间缩短至2.5ms，当然此处逻辑还要待验证下
            if (typeof this.hoverStartTime === 'undefined' || this.hoverStartTime == "" || (this.hoverStartTime + "").trim() == "") {
                return 25;
            } else {
                return parseFloat(this.hoverStartTime) / 10;
            }
        },
        $$hoverStayTime() {
            if (typeof this.hoverStayTime === 'undefined' || this.hoverStayTime == "" || (this.hoverStayTime + "").trim() == "") {
                return 70 + 100;
            } else {
                return parseFloat(this.hoverStayTime) + 100;
            }
        }
    },
    methods: {
        touchstart(event) {
            this.tapStartTime = event.timeStamp / 1000;
            this.stopTapTimer();
            var self = this;
            this.timerTap = setInterval(function () {
                self.tapStayTime++;
                if (self.tapStayTime >= self.$$hoverStartTime) {
                    if (!self.realHoverClass) self.realHoverClass = self.$$hoverClass;
                } else if (self.realHoverClass) {
                    self.realHoverClass = "";
                }
                console.log(`tapStayTime=${self.tapStayTime}, realHoverClass=${self.realHoverClass}`);
            }, 1);
        },
        touchend(event) {
            this.tapStartTime = 0;
            //this.stopTapTimer();
            this.startTapStayTimer();
        },
        touchcancel(event) {
            this.tapStartTime = 0;
            //this.stopTapTimer();
            this.startTapStayTimer();
        },
        stopTapTimer() {
            this.tapStayTime = 0 + this.tapStartTime;
            if (this.timerTap) {
                clearInterval(this.timerTap);
            }
        },
        startTapStayTimer() {
            var self = this;
            console.log(`startTapStayTimer==>self.$$hoverStayTime=${self.$$hoverStayTime}`);
            setTimeout(function () {
                self.stopTapTimer();
                self.realHoverClass = "";
                console.log(`<==startTapStayTimer, realHoverClass=${self.realHoverClass}`);
            }, (self.$$hoverStayTime || 0));
        }
    }
});
</script>