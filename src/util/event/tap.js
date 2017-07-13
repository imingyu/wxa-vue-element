import { $on, $off, extend } from '../util.js';

export var on = (el, namespace, handler, options) => {
    options = options || {};
    extend(true, {
    }, options);
    namespace = namespace || 'default';
    namespace = `tap-${namespace}`;
    var startEvent = null;
    $on(el, `touchstart.${namespace}`, function (event) {
        startEvent = event;
    });
    $on(el, 'touchend.${namespace}', function (event) {
        var dom = this;
        el = null;
        options = null;
        startEvents = null;
    });
}

export var off = (el, namespace) => {
    namespace = namespace || 'default';
    var eventType = `tap-${namespace}`;
    $off(el, `touchstart.${eventType}`);
    $off(el, `touchend.${eventType}`);
}