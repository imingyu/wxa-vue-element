import { $on, $off } from '../util.js';
import { BaseEvent, TouchEvent } from './model.js';
import Hammer from 'hammerjs';

export default (eventName, component) => {
    var map = { tap: 'click' },
        eventType = eventName.replace('wxa-', ''),
        nativeType = map[eventType] || eventType,
        ns = `wxa-event-${eventType}`,
        el = component.$el;
    if (eventType === 'longtap') {
        $on(el, 'touchstart', e => {
            console.log('touchstart', e);
        })
        $on(el, 'touchend', e => {
            console.log('touchend', e);
        })
        var mc = new Hammer.Manager(el);
        mc.add(new Hammer.Press({ event: 'longtap', pointers: 1, time: 350 }));
        mc.off('longtap');
        mc.on('longtap', function (e) {
            console.log('longtap', e);
            var catchEvents = typeof component.catchEvents === 'string' ? [component.catchEvents] : (Array.isArray(component.catchEvents) ? component.catchEvents : []);

            if (catchEvents.indexOf(eventType) != -1) {
                //阻止冒泡：对应小程序的bind*
                e.stopPropagation();
                component.$emit(eventName, createEvent(eventType, e, component));
            } else {
                //不阻止冒泡：对应小程序的catch*
                component.$emit(eventName, createEvent(eventType, e, component));
            }
        });
    } else {
        $off(el, `${nativeType}.${ns}`);
        $on(el, `${nativeType}.${ns}`, function (e) {
            var catchEvents = typeof component.catchEvents === 'string' ? [component.catchEvents] : (Array.isArray(component.catchEvents) ? component.catchEvents : []);

            if (catchEvents.indexOf(eventType) != -1) {
                //阻止冒泡：对应小程序的bind*
                e.stopPropagation();
                component.$emit(eventName, createEvent(eventType, e, component));
            } else {
                //不阻止冒泡：对应小程序的catch*
                component.$emit(eventName, createEvent(eventType, e, component));
            }
        });
    }
}

var createEvent = (type, nativeEvent, currentComponentInc) => {
    if (type == 'tap' || type == 'longtap') return new BaseEvent(type, nativeEvent, currentComponentInc);
    if (type == 'touchstart' || type == 'touchend' || type == 'touchmove' || type == 'touchcancel') return new TouchEvent(type, nativeEvent, currentComponentInc);
}