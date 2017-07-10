import * as event from '../util/event.js';

var bind = (el, binding, vnode, oldVnode) => {
    if (binding.value !== binding.oldValue) {
        event.$off(el, `click.tap`);
        event.$on(el, `click.tap`, function (e) {
            if(binding.modifiers && binding.modifiers.catch){
                //阻止冒泡：对应小程序的bindtap
                e.stopPropagation();
                return binding.value(new event.BaseEvent('tap', e, vnode.componentInstance));
            }else{
                //不阻止冒泡：对应小程序的catchtap
                return binding.value(new event.BaseEvent('tap', e, vnode.componentInstance));
            }
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