import Vue from 'vue';
export default function mark(type, content) {
    if (arguments.length == 1) {
        content = type;
        type = "default";
    }
    if(!type){
        type = "default";
    }
    window.$markList = window.$markList || [];
    window.$markList.push({
        type: type,
        content: content,
        time: new Date()
    });
}
Vue.filter('mark', (value, type) => {
    mark(type, value);
    return "";
});

window.__showMarkList__ = (el) => {
    var html = '';

    var groups = {};
    window.$markList.forEach(item => {
        groups[item.type] = groups[item.type] || [];
        groups[item.type].push(item);
    });

    html += '<ul>';
    for (var type in groups) {
        html += `<li><h4>${type}</h4><ul>`;
        groups.forEach(item => {
            html += `<li><p>${item.content}</p></li>`;
        })
        html += '</ul></li>';
    }
    html += '</ul>';
    el.innerHTML = html;
}