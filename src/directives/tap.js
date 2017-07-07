import * as event from '../util/event.js';

var createEvent = (type, nativeEvent) => {
    var result = {};
    result.type = type;
    result.timeStamp = nativeEvent.timeStamp || new Date().getTime();
    result.native = nativeEvent;
    return result;
}

var bind = (el, binding, vnode, oldVnode) => {
    if (binding.value !== binding.oldValue) {
        event.$off(el, `click.tap`);
        event.$on(el, `click.tap`, function (e) {
            return binding.value(createEvent('tap', e));
        });
    }
}

export default {
    name: 'tap',
    inserted(el, binding, vnode, oldVnode) {
        bind(el, binding, vnode, oldVnode);
    },
    update(el, binding, vnode, oldVnode) {
        bind(el, binding, vnode, oldVnode);
    }
}